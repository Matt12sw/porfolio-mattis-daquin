import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

type Props = {
  /** Chemin de la photo portrait à holographier. */
  src: string;
  /** Fige l'auto-rotation (prefers-reduced-motion). */
  frozen: boolean;
  /** Densité de la grille (réduite sur mobile). */
  segments: number;
};

/**
 * Portrait « hologramme » : la photo est projetée sur une grille dont chaque
 * point est déplacé en profondeur selon la luminosité (relief). Duotone encre /
 * papier avec des lignes de balayage rouge signal. On maintient le clic gauche
 * et on bouge la souris pour faire tourner l'hologramme ; sinon il tourne
 * doucement tout seul.
 */
export default function HologramPortrait({ src, frozen, segments }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { gl, viewport } = useThree();

  const texture = useTexture(src);

  // Ratio portrait d'après la texture (défaut 3:4).
  const aspect = useMemo(() => {
    const img = texture.image as HTMLImageElement | undefined;
    return img && img.width && img.height ? img.width / img.height : 0.75;
  }, [texture]);

  const height = 4.3;
  const width = height * aspect;

  const uniforms = useMemo(
    () => ({
      uTex: { value: texture },
      uTime: { value: 0 },
      uAmp: { value: 1.05 },
      uCyan: { value: new THREE.Color('#39d6ff') },
      uCyanDeep: { value: new THREE.Color('#0a7ea8') },
      uSignal: { value: new THREE.Color('#E4002B') },
    }),
    [texture]
  );

  // Rotation : cible pilotée par le drag souris, lissée dans useFrame.
  const target = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  // Écoute du drag (maintien clic gauche + déplacement).
  useEffect(() => {
    const el = gl.domElement;

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return; // clic gauche uniquement
      dragging.current = true;
      last.current = { x: e.clientX, y: e.clientY };
      el.style.cursor = 'grabbing';
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - last.current.x;
      const dy = e.clientY - last.current.y;
      last.current = { x: e.clientX, y: e.clientY };
      target.current.y += dx * 0.008;
      // limite l'inclinaison verticale
      target.current.x = THREE.MathUtils.clamp(target.current.x + dy * 0.006, -0.6, 0.6);
    };
    const onUp = () => {
      dragging.current = false;
      el.style.cursor = 'grab';
    };

    el.style.cursor = 'grab';
    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      el.style.cursor = '';
    };
  }, [gl]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (matRef.current) matRef.current.uniforms.uTime.value = t;

    if (groupRef.current) {
      // Oscillation douce autour de l'orientation choisie (reste de face,
      // sans jamais se retrouver de profil « fin »). Coupée si drag/reduced.
      const sway = !dragging.current && !frozen ? Math.sin(t * 0.5) * 0.4 : 0;
      const desiredY = target.current.y + sway;

      groupRef.current.rotation.y +=
        (desiredY - groupRef.current.rotation.y) * Math.min(1, delta * 4);
      groupRef.current.rotation.x +=
        (target.current.x - groupRef.current.rotation.x) * Math.min(1, delta * 4);

      // Léger flottement vertical.
      groupRef.current.position.y = frozen ? 0 : Math.sin(t * 0.8) * 0.06;
    }
  });

  // Mise à l'échelle selon la largeur du viewport 3D (plus grand qu'avant).
  const scale = Math.min(1.55, Math.max(0.8, viewport.width / 5.2));

  return (
    <group ref={groupRef} scale={scale}>
      <points>
        <planeGeometry args={[width, height, segments, Math.round(segments * 1.25)]} />
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexShader={VERT}
          fragmentShader={FRAG}
        />
      </points>
    </group>
  );
}

const VERT = /* glsl */ `
  uniform sampler2D uTex;
  uniform float uAmp;
  uniform float uTime;
  varying vec2 vUv;
  varying float vLum;

  void main() {
    vUv = uv;
    vec3 tex = texture2D(uTex, uv).rgb;
    float lum = dot(tex, vec3(0.299, 0.587, 0.114));
    vLum = lum;

    // Relief : les zones claires ressortent vers l'avant.
    vec3 pos = position;
    pos.z += (lum - 0.45) * uAmp;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    // Taille des points — plus gros pour un hologramme bien lisible.
    gl_PointSize = 5.0 * (1.0 / -mv.z);
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  uniform float uTime;
  uniform vec3 uCyan;
  uniform vec3 uCyanDeep;
  uniform vec3 uSignal;
  varying vec2 vUv;
  varying float vLum;

  void main() {
    // Point circulaire doux (halo).
    vec2 d = gl_PointCoord - vec2(0.5);
    float dist = dot(d, d);
    if (dist > 0.25) discard;
    float soft = smoothstep(0.25, 0.0, dist);

    // Hologramme cyan : plus la photo est claire, plus le point brille.
    float b = smoothstep(0.05, 0.9, vLum);
    vec3 col = mix(uCyanDeep, uCyan, b) * (0.35 + b * 1.1);

    // Lignes de balayage horizontales qui montent.
    float scan = sin(vUv.y * 160.0 - uTime * 3.5);
    col += uCyan * smoothstep(0.5, 1.0, scan) * 0.35;

    // Ligne de scan brillante qui balaie verticalement.
    float sweep = smoothstep(0.02, 0.0, abs(fract(vUv.y - uTime * 0.1) - 0.5) - 0.008);
    col += uCyan * sweep * 0.8;

    // Un soupçon de rouge signal sur les hautes lumières (clin d'œil charte).
    col += uSignal * smoothstep(0.75, 1.0, vLum) * 0.15;

    // Blending additif : l'intensité vient de la luminosité.
    float alpha = (0.15 + b * 0.85) * soft;
    gl_FragColor = vec4(col, alpha);
  }
`;
