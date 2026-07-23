import { Canvas } from '@react-three/fiber';
import Ball from './Ball';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useMediaQuery';

/**
 * Scène 3D d'accueil : deux gros ballons (basket & volley) en lévitation qui
 * tournent et s'inclinent vers la souris. Fond transparent (le décor pixel
 * blanc est derrière). Perf : dpr plafonné, moins de segments sur mobile.
 */
export default function BallsScene() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 9], fov: 42 }}
      frameloop={reduced ? 'demand' : 'always'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Lumières : un ciel doux + une clé pour le volume des ballons. */}
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 6, 5]} intensity={1.5} />
      <directionalLight position={[-5, -2, 2]} intensity={0.4} color="#ffd9a8" />

      {/* Ballons biaisés à droite pour laisser la colonne texte lisible. */}
      <Ball
        type="basket"
        position={isMobile ? [1.0, -3.0, 0] : [1.7, -1.5, 0]}
        radius={isMobile ? 1.4 : 2.0}
        spin={0.35}
        frozen={reduced}
      />
      <Ball
        type="volley"
        position={isMobile ? [1.7, 2.6, -1] : [4.0, 1.2, -1]}
        radius={isMobile ? 1.2 : 1.85}
        spin={-0.28}
        frozen={reduced}
      />
    </Canvas>
  );
}
