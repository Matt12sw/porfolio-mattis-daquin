import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * Enveloppe chaque page pour animer son entrée / sortie (fade + slide léger).
 * Respecte prefers-reduced-motion en désactivant le mouvement.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();

  const variants = reduced
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -16 },
      };

  return (
    <motion.main
      id="main-content"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: reduced ? 0.15 : 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}
