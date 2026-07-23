import { Suspense, lazy, useEffect, useState } from 'react';
import { isWebGLAvailable } from '../../lib/webgl';

// La scène 3D (three.js + R3F) n'est chargée que sur l'accueil, à la demande.
const BallsScene = lazy(() => import('./BallsScene'));

/**
 * Enveloppe la scène 3D des ballons :
 *  - vérifie le support WebGL et affiche un fallback statique sinon
 *  - lazy-load le canvas uniquement côté client
 */
export default function HeroCanvas() {
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    setWebgl(isWebGLAvailable());
  }, []);

  if (webgl === false) return <StaticFallback />;

  return (
    <Suspense fallback={<StaticFallback pulsing />}>
      {webgl && <BallsScene />}
    </Suspense>
  );
}

/** Repli sans WebGL : deux pastilles ballon en CSS. */
function StaticFallback({ pulsing = false }: { pulsing?: boolean }) {
  return (
    <div
      className={`relative h-full w-full ${pulsing ? 'animate-pulse' : ''}`}
      aria-hidden="true"
    >
      <div className="absolute bottom-6 left-6 h-28 w-28 rounded-full bg-[#E1772A]" />
      <div className="absolute right-8 top-8 h-24 w-24 rounded-full border-4 border-[#1f4fd0] bg-white" />
    </div>
  );
}
