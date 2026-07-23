import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import HologramPortrait from './HologramPortrait';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile, useIsTabletOrLess } from '../../hooks/useMediaQuery';

/**
 * Canvas de la scène 3D d'accueil : un portrait « hologramme » de Mattis,
 * relief généré depuis la photo, que l'on fait tourner à la souris.
 *
 * Responsive / perf :
 *  - pixel ratio plafonné à 2 (dpr={[1, 2]})
 *  - densité de la grille réduite sur tablette et mobile
 *  - pas de post-processing lourd
 *  - `frameloop="demand"` si reduced-motion (scène quasi figée)
 */
export default function HeroScene() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const isTablet = useIsTabletOrLess();

  // Résolution de la grille de points selon l'appareil.
  const segments = isMobile ? 120 : isTablet ? 160 : 200;

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 42 }}
      frameloop={reduced ? 'demand' : 'always'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
      style={{ touchAction: 'pan-y' }}
    >
      <ambientLight intensity={0.9} />
      {/* Suspense : le temps de charger la texture du portrait. */}
      <Suspense fallback={null}>
        <HologramPortrait src="/portrait.jpg" frozen={reduced} segments={segments} />
      </Suspense>
    </Canvas>
  );
}
