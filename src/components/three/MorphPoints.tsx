import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { buildMorphGeometry } from './generators';

type Props = {
  /** Nombre de points (réduit sur mobile pour la perf). */
  count: number;
  /** Si vrai, on fige le morph et la rotation (prefers-reduced-motion). */
  frozen: boolean;
};

/**
 * Nuage de points qui morphe en continu entre « lignes de code » et une
 * silhouette humaine. Le lerp point à point est fait dans le vertex shader
 * (performant), piloté par l'uniform uMorph. La souris fait tourner l'objet
 * comme une pièce que l'on inspecterait dans un atelier.
 */
export default function MorphPoints({ count, frozen }: Props) {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  // Géométrie + attributs (mémoïsés : recalculés uniquement si count change).
  const { geometry, uniforms } = useMemo(() => {
    const { codePositions, silhouettePositions, seeds } = buildMorphGeometry(count);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(codePositions, 3));
    geo.setAttribute('aTarget', new THREE.BufferAttribute(silhouettePositions, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));

    const uni = {
      uMorph: { value: 0 },
      uTime: { value: 0 },
      uSize: { value: 5.5 },
      uColorInk: { value: new THREE.Color('#0A0A0A') },
      uColorSignal: { value: new THREE.Color('#E4002B') },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    };
    return { geometry: geo, uniforms: uni };
  }, [count]);

  // Cible de rotation lissée pilotée par la souris.
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = t;
      // Morph : va-et-vient doux entre 0 (code) et 1 (silhouette).
      // Figé à 0.5 (état intermédiaire lisible) si reduced-motion.
      matRef.current.uniforms.uMorph.value = frozen
        ? 0.5
        : 0.5 - 0.5 * Math.cos(t * 0.35);
    }

    if (pointsRef.current) {
      if (frozen) {
        pointsRef.current.rotation.y = 0.3;
      } else {
        // Pointeur normalisé (-1..1) → rotation cible, avec dérive lente.
        const px = state.pointer.x;
        const py = state.pointer.y;
        target.current.x = py * 0.35;
        target.current.y = px * 0.6 + t * 0.08;
        // Lissage (lerp) pour un mouvement « inertiel » d'atelier.
        pointsRef.current.rotation.x +=
          (target.current.x - pointsRef.current.rotation.x) * Math.min(1, delta * 3);
        pointsRef.current.rotation.y +=
          (target.current.y - pointsRef.current.rotation.y) * Math.min(1, delta * 3);
      }
    }
  });

  // Échelle adaptée à la largeur du viewport 3D.
  const scale = Math.min(1.35, Math.max(0.75, viewport.width / 6));

  return (
    <points ref={pointsRef} geometry={geometry} scale={scale}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
        vertexShader={VERT}
        fragmentShader={FRAG}
      />
    </points>
  );
}

/* -------------------------------------------------------------------------- */
/*  Shaders                                                                    */
/* -------------------------------------------------------------------------- */

const VERT = /* glsl */ `
  uniform float uMorph;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;

  attribute vec3 aTarget;
  attribute float aSeed;

  varying float vSeed;
  varying float vMorph;

  void main() {
    vSeed = aSeed;

    // Désynchronise légèrement le morph point par point selon la graine,
    // pour que la transformation « ruisselle » au lieu de basculer d'un bloc.
    float m = clamp(uMorph + (aSeed - 0.5) * 0.25, 0.0, 1.0);
    m = smoothstep(0.0, 1.0, m);
    vMorph = m;

    vec3 pos = mix(position, aTarget, m);

    // Respiration subtile en position intermédiaire.
    pos += 0.03 * sin(uTime * 0.8 + aSeed * 6.2831) * (1.0 - abs(m - 0.5) * 2.0);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Taille attenuée par la distance, points rouges un peu plus gros.
    float sizeBoost = step(0.85, aSeed) * 1.6 + 1.0;
    gl_PointSize = uSize * sizeBoost * uPixelRatio * (1.0 / -mvPosition.z);
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;

  uniform vec3 uColorInk;
  uniform vec3 uColorSignal;

  varying float vSeed;
  varying float vMorph;

  void main() {
    // Point circulaire doux (disque avec bord adouci).
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.15, d);

    // ~15% des points en rouge signal, le reste en encre.
    vec3 color = mix(uColorInk, uColorSignal, step(0.85, vSeed));

    gl_FragColor = vec4(color, alpha * 0.9);
  }
`;
