import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * Titre d'accueil interactif : chaque lettre entre en scène (stagger), le bloc
 * « respire » en boucle, et chaque lettre réagit au survol. Cliquable pour
 * déclencher la transition « portail ».
 */
type Line = { text: string; accent?: boolean };

type Props = {
  lines: Line[];
  /** Déclenché au clic (sert au portail). */
  onActivate?: (e: { clientX: number; clientY: number }) => void;
  /** Libellé accessible du bouton quand le titre est cliquable. */
  activateLabel?: string;
};

export default function InteractiveTitle({ lines, onActivate, activateLabel }: Props) {
  const reduced = usePrefersReducedMotion();

  const content = (
    <motion.span
      className="block"
      // Respiration douce en boucle.
      animate={reduced ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {lines.map((line, li) => (
        <span key={li} className={`block whitespace-nowrap ${line.accent ? 'text-signal' : ''}`}>
          {Array.from(line.text).map((ch, ci) => {
            if (ch === ' ') return <span key={ci}>&nbsp;</span>;
            const delay = reduced ? 0 : 0.15 + (li * line.text.length + ci) * 0.03;
            return (
              <motion.span
                key={ci}
                className="inline-block"
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
    </motion.span>
  );

  // Sans action : simple titre.
  if (!onActivate) return <h1 className="text-display-xl">{content}</h1>;

  // Avec action : titre cliquable (bouton accessible au clavier).
  return (
    <h1 className="text-display-xl">
      <button
        type="button"
        onClick={(e) => onActivate({ clientX: e.clientX, clientY: e.clientY })}
        onKeyDown={(e) => {
          // Au clavier, on part du centre de l'écran.
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onActivate({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });
          }
        }}
        aria-label={activateLabel}
        className="block cursor-pointer text-left"
      >
        {content}
      </button>
    </h1>
  );
}
