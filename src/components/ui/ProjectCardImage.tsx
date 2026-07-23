import { useState } from 'react';
import type { Project } from '../../data/projects';

/**
 * Bandeau visuel en tête d'une carte projet : logo de marque (contain) ou
 * capture d'écran (cover). Repli stylé si le projet n'a pas de visuel ou si
 * le fichier est absent — pour ne jamais afficher d'image cassée.
 */
export default function ProjectCardImage({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [failed, setFailed] = useState(false);
  const card = project.card;

  if (!card || failed) {
    // Repli : bloc coloré discret avec l'initiale du projet.
    return (
      <div className="bg-grid flex aspect-[16/10] items-center justify-center border-b border-line bg-paper">
        <span className="font-display text-5xl text-line">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    );
  }

  return (
    <div
      className="aspect-[16/10] overflow-hidden border-b border-line"
      style={{ background: card.bg ?? '#ffffff' }}
    >
      <img
        src={card.src}
        alt={`${project.title} — visuel`}
        loading="lazy"
        onError={() => setFailed(true)}
        className={
          card.fit === 'cover'
            ? 'h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]'
            : 'h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-[1.04]'
        }
      />
    </div>
  );
}
