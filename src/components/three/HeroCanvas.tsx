import { Suspense, lazy, useEffect, useState } from 'react';
import { isWebGLAvailable } from '../../lib/webgl';

// La scène 3D (three.js + R3F) n'est chargée que sur l'accueil, à la demande.
const HeroScene = lazy(() => import('./HeroScene'));

/**
 * Enveloppe la scène 3D :
 *  - vérifie le support WebGL et affiche un fallback statique sinon
 *  - lazy-load le canvas uniquement côté client (évite le SSR / le poids)
 *  - fournit un fond de repli pendant le chargement
 */
export default function HeroCanvas() {
  const [webgl, setWebgl] = useState<boolean | null>(null);

  // Détection au montage, côté client uniquement.
  useEffect(() => {
    setWebgl(isWebGLAvailable());
  }, []);

  // Fallback statique : dégradé/grille discrète + points décoratifs CSS.
  if (webgl === false) {
    return <StaticFallback />;
  }

  return (
    <Suspense fallback={<StaticFallback pulsing />}>
      {webgl && <HeroScene />}
    </Suspense>
  );
}

/**
 * Repli sans WebGL : composition statique évoquant le nuage de points,
 * conforme à la charte (papier / encre / rouge signal).
 */
function StaticFallback({ pulsing = false }: { pulsing?: boolean }) {
  return (
    <div
      className={`bg-grid relative h-full w-full ${pulsing ? 'animate-pulse' : ''}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-56 w-56">
          {/* Silhouette stylisée en pur CSS pour le repli. */}
          <div className="absolute left-1/2 top-1/2 h-40 w-28 -translate-x-1/2 -translate-y-1/2 rounded-t-full border border-ink/30" />
          <div className="absolute left-1/2 top-6 h-16 w-16 -translate-x-1/2 rounded-full border border-ink/40" />
          <span className="absolute right-2 top-2 h-3 w-3 rounded-full bg-signal" />
        </div>
      </div>
    </div>
  );
}
