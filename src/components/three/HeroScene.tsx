import { Canvas } from '@react-three/fiber';
import MorphPoints from './MorphPoints';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile, useIsTabletOrLess } from '../../hooks/useMediaQuery';

/**
 * Canvas plein cadre de la scène 3D d'accueil.
 *
 * Responsive / perf :
 *  - pixel ratio plafonné à 2 (dpr={[1, 2]})
 *  - nombre de points réduit sur tablette et surtout mobile
 *  - pas de post-processing lourd (bloom) : rendu léger par défaut
 *  - `frameloop="demand"` si reduced-motion → la scène ne s'anime plus
 */
export default function HeroScene() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const isTablet = useIsTabletOrLess();

  // Densité de points selon l'appareil (moins de polygones sur petit écran).
  const count = isMobile ? 2200 : isTablet ? 4000 : 6500;

  return (
    <Canvas
      // dpr plafonné à 2 pour éviter de sur-rendre sur écrans Retina.
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      // Si reduced-motion : on rend à la demande (image quasi figée).
      frameloop={reduced ? 'demand' : 'always'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      // Le canvas est décoratif : masqué aux lecteurs d'écran (texte équivalent
      // fourni dans le héros).
      aria-hidden="true"
      style={{ touchAction: 'pan-y' }}
    >
      <ambientLight intensity={0.8} />
      <MorphPoints count={count} frozen={reduced} />
    </Canvas>
  );
}
