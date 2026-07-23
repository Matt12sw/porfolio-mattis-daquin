import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Project } from '../../data/projects';

type Img = NonNullable<Project['images']>[number];

/**
 * Galerie de captures d'écran d'un projet.
 * - Grille responsive de vignettes.
 * - Clic → lightbox plein écran (fermeture Échap / clic hors image).
 * - Si un fichier image est absent, un cadre « capture à venir » propre
 *   s'affiche à la place d'une image cassée (dégradation gracieuse).
 */
export default function ProjectGallery({ images }: { images: Img[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section aria-label="Captures d'écran du projet">
      <h2 className="mb-6 font-display text-2xl">Aperçu</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((img, i) => (
          <figure key={img.src} className="group">
            <button
              type="button"
              onClick={() => setActive(i)}
              className="block w-full overflow-hidden border border-line transition-colors duration-300 hover:border-signal"
              aria-label={`Agrandir : ${img.caption}`}
            >
              <Thumb img={img} />
            </button>
            <figcaption className="mt-2 font-mono text-xs leading-relaxed text-smoke">
              {img.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={images[active].caption}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center text-2xl text-paper"
              aria-label="Fermer"
            >
              <span aria-hidden="true">✕</span>
            </button>
            <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <img
                src={images[active].src}
                alt={images[active].alt}
                className="max-h-[80vh] w-auto border border-paper/20"
              />
              <figcaption className="mt-3 text-center font-mono text-xs text-paper/80">
                {images[active].caption}
              </figcaption>
            </figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/**
 * Vignette : affiche l'image, ou un placeholder si le fichier est absent.
 * On teste le chargement via onError pour ne jamais montrer d'image cassée.
 */
function Thumb({ img }: { img: Img }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="bg-grid flex aspect-video items-center justify-center bg-paper">
        <div className="text-center">
          <p className="font-mono text-xs text-smoke">// capture à ajouter</p>
          <p className="mt-1 max-w-[220px] px-3 font-mono text-[10px] text-smoke/60">
            {img.src.replace('/projects/', '')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={img.src}
      alt={img.alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="aspect-video w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
    />
  );
}
