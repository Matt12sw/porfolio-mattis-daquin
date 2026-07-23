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

  const height = 3.2;
  const width = height * aspect;

  const uniforms = useMemo(
    () => ({
      uTex: { value: texture },
      uTime: { value: 0 },
      uAmp: { value: 0.9 },
      uInk: { value: new THREE.Color('#0A0A0A') },
      uPaper: { value: new THREE.Color('#FBFBF9') },
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

  // Mise à l'échelle selon la largeur du viewport 3D.
  const scale = Math.min(1.25, Math.max(0.65, viewport.width / 6.5));

  return (
    <group ref={groupRef} scale={scale}>
      <points>
        <planeGeometry args={[width, height, segments, Math.round(segments * 1.25)]} />
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          transparent
          depthWrite={false}
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

    // Taille des points attenuée par la distance.
    gl_PointSize = 2.4 * (1.0 / -mv.z) * 90.0 / 100.0;
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  uniform sampler2D uTex;
  uniform float uTime;
  uniform vec3 uInk;
  uniform vec3 uPaper;
  uniform vec3 uSignal;
  varying vec2 vUv;
  varying float vLum;

  void main() {
    // Point circulaire doux.
    vec2 d = gl_PointCoord - vec2(0.5);
    if (dot(d, d) > 0.25) discard;

    // Duotone encre → papier selon la luminosité.
    vec3 col = mix(uInk, uPaper, smoothstep(0.05, 0.85, vLum));

    // Lignes de balayage rouge signal qui montent (effet hologramme).
    float scan = sin(vUv.y * 140.0 - uTime * 3.0);
    float scanMask = smoothstep(0.6, 1.0, scan);
    col = mix(col, uSignal, scanMask * 0.5);

    // Ligne de scan brillante qui balaie verticalement.
    float sweep = smoothstep(0.02, 0.0, abs(fract(vUv.y - uTime * 0.12) - 0.5) - 0.01);
    col = mix(col, uSignal, sweep * 0.6);

    // Les zones très sombres deviennent transparentes (fond papier visible).
    float alpha = smoothstep(0.02, 0.25, vLum) * 0.92 + 0.08;

    gl_FragColor = vec4(col, alpha);
  }
`;
