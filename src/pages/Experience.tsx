import PageTransition from '../components/ui/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import { TIMELINE, KIND_LABEL, CAREER_GOAL, type TimelineKind } from '../data/experience';

// Couleur du marqueur selon le type d'élément.
const kindDot: Record<TimelineKind, string> = {
  formation: 'bg-ink',
  mission: 'bg-signal',
  parution: 'bg-paper border-2 border-ink',
};

export default function Experience() {
  // Tri chronologique décroissant (le plus récent en haut).
  const items = [...TIMELINE].sort((a, b) => b.sortKey - a.sortKey);

  return (
    <PageTransition>
      <section className="container-page py-16 md:py-24">
        <SectionHeading
          index="04"
          eyebrow="Expériences"
          title="Parcours"
          className="mb-6 max-w-3xl"
        />

        {/* Objectif alternance mis en avant. */}
        <Reveal className="mb-16 flex flex-col gap-1 border-l-2 border-signal pl-5">
          <p className="font-display text-2xl uppercase md:text-3xl">{CAREER_GOAL.headline}</p>
          <p className="font-mono text-sm text-smoke">{CAREER_GOAL.detail}</p>
        </Reveal>

        {/* Légende des types */}
        <div className="mb-10 flex flex-wrap gap-x-6 gap-y-2">
          {(Object.keys(KIND_LABEL) as TimelineKind[]).map((k) => (
            <span key={k} className="flex items-center gap-2 font-mono text-xs text-smoke">
              <span className={`h-2.5 w-2.5 rounded-full ${kindDot[k]}`} aria-hidden="true" />
              {KIND_LABEL[k]}
            </span>
          ))}
        </div>

        {/* Timeline verticale */}
        <ol className="relative border-l border-line">
          {items.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 0.04} className="relative pb-12 pl-8 last:pb-0">
              {/* Marqueur */}
              <span
                className={`absolute -left-[6px] top-1.5 h-3 w-3 rounded-full ${kindDot[item.kind]}`}
                aria-hidden="true"
              />

              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-mono text-xs uppercase tracking-widest text-signal">
                  {item.period}
                </span>
                <span className="tech-label">{KIND_LABEL[item.kind]}</span>
              </div>

              <h2 className="mt-2 font-display text-2xl">{item.title}</h2>
              <p className="mt-0.5 text-sm font-semibold text-ink/70">{item.org}</p>
              <p className="mt-3 max-w-2xl leading-relaxed text-ink/80">{item.description}</p>

              {item.tags && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <li key={t} className="border border-line px-2 py-0.5 font-mono text-xs text-smoke">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </ol>
      </section>
    </PageTransition>
  );
}
