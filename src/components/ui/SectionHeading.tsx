import type { ReactNode } from 'react';

type Props = {
  /** Numéro / index monospace (ex. "02"). */
  index?: string;
  /** Petit label technique au-dessus du titre. */
  eyebrow?: string;
  title: ReactNode;
  className?: string;
};

/** Titre de section normalisé : eyebrow mono + grand titre display. */
export default function SectionHeading({ index, eyebrow, title, className = '' }: Props) {
  return (
    <header className={className}>
      {(index || eyebrow) && (
        <div className="mb-4 flex items-center gap-3">
          {index && <span className="tech-label text-signal">{index}</span>}
          {eyebrow && (
            <>
              <span className="h-px w-8 bg-line" aria-hidden="true" />
              <span className="tech-label">{eyebrow}</span>
            </>
          )}
        </div>
      )}
      <h2 className="text-display-md text-ink">{title}</h2>
    </header>
  );
}
