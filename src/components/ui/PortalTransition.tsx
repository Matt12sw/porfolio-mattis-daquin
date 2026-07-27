import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

type PortalState = { x: number; y: number; to: string; phase: 'grow' | 'fade' } | null;

type PortalApi = { open: (e: { clientX: number; clientY: number }, to: string) => void };

const PortalContext = createContext<PortalApi>({ open: () => {} });

/** À consommer dans les pages pour déclencher la transition « portail ». */
export const usePortal = () => useContext(PortalContext);

/**
 * Fournit l'effet « portail » : au clic, un disque encre se dilate depuis le
 * point cliqué jusqu'à recouvrir l'écran, la route change *sous* le disque,
 * puis le disque s'efface pour révéler la nouvelle page.
 *
 * Monté au niveau de l'app (hors des routes) pour survivre à la navigation.
 */
export function PortalProvider({ children }: { children: ReactNode }) {
  const [portal, setPortal] = useState<PortalState>(null);
  const navigate = useNavigate();
  const reduced = usePrefersReducedMotion();

  const open = useCallback(
    (e: { clientX: number; clientY: number }, to: string) => {
      if (reduced) {
        navigate(to);
        return;
      }
      setPortal({ x: e.clientX, y: e.clientY, to, phase: 'grow' });
    },
    [navigate, reduced]
  );

  // Rayon nécessaire pour couvrir l'écran depuis le point de clic.
  const radius = portal
    ? Math.hypot(
        Math.max(portal.x, window.innerWidth - portal.x),
        Math.max(portal.y, window.innerHeight - portal.y)
      )
    : 0;

  return (
    <PortalContext.Provider value={{ open }}>
      {children}

      <AnimatePresence>
        {portal && (
          <motion.div
            key="portal"
            className="pointer-events-none fixed inset-0 z-[80]"
            initial={{ opacity: 1 }}
            animate={{ opacity: portal.phase === 'fade' ? 0 : 1 }}
            transition={{ duration: portal.phase === 'fade' ? 0.5 : 0 }}
            onAnimationComplete={() => {
              if (portal.phase === 'fade') setPortal(null);
            }}
            aria-hidden="true"
          >
            <motion.span
              className="absolute rounded-full bg-ink"
              style={{ left: portal.x, top: portal.y }}
              initial={{ width: 0, height: 0, x: 0, y: 0 }}
              animate={{ width: radius * 2, height: radius * 2, x: -radius, y: -radius }}
              transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
              onAnimationComplete={() => {
                // L'écran est couvert : on change de route puis on révèle.
                navigate(portal.to);
                setPortal((p) => (p ? { ...p, phase: 'fade' } : p));
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PortalContext.Provider>
  );
}
