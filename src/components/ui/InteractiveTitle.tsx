import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * Titre d'accueil interactif : chaque lettre entre en scène (stagger) puis
 * réagit au survol (elle saute, pivote et vire au rouge signal). Inspiré des
 * portfolios où la typographie « prend vie » au passage de la souris.
 */
type Line = { text: string; accent?: boolean };

export default function InteractiveTitle({ lines }: { lines: Line[] }) {
  const reduced = usePrefersReducedMotion();

  return (
    <h1 className="text-display-xl">
      {lines.map((line, li) => (
        <span key={li} className={`block whitespace-nowrap ${line.accent ? 'text-signal' : ''}`}>
          {Array.from(line.text).map((ch, ci) => {
            // Espace insécable pour préserver les blancs.
            if (ch === ' ') return <span key={ci}>&nbsp;</span>;
            const delay = reduced ? 0 : 0.15 + (li * line.text.length + ci) * 0.03;
            return (
              <motion.span
                key={ci}
                className="inline-block cursor-default"
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: '0.4em' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={
                  reduced
                    ? undefined
                    : { y: '-0.12em', rotate: ci % 2 ? 5 : -5, color: '#E4002B' }
                }
              >
                {ch}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
