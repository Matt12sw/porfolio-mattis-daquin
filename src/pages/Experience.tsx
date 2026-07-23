import { useState } from 'react';
import PageTransition from '../components/ui/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import { TIMELINE, KIND_LABEL, CAREER_GOAL, type TimelineItem, type TimelineKind } from '../data/experience';

// Couleur de la pastille de type (petit repère à côté de la période).
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

        {/* Liste des expériences — style « LinkedIn » : logo à gauche, contenu à droite. */}
        <ol className="space-y-12">
          {items.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 0.04}>
              <div className="flex gap-4 sm:gap-6">
                {/* Logo de l'entité (ou monogramme de repli). */}
                <div className="shrink-0">
                  <ExperienceLogo item={item} />
                </div>

                {/* Contenu */}
                <div className="min-w-0 flex-1 border-b border-line pb-8">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono text-xs uppercase tracking-widest text-signal">
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-xs text-smoke">
                      <span
                        className={`h-2 w-2 rounded-full ${kindDot[item.kind]}`}
                        aria-hidden="true"
                      />
                      {KIND_LABEL[item.kind]}
                    </span>
                  </div>

                  {/* LOGO — NOM DU POSTE */}
                  <h2 className="mt-2 font-display text-2xl leading-tight">{item.title}</h2>
                  <p className="mt-0.5 text-sm font-semibold text-ink/70">{item.org}</p>

                  {/* LES ENTITÉS UTILISÉES (badges) */}
                  {item.tags && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {item.tags.map((t) => (
                        <li
                          key={t}
                          className="border border-line px-2 py-0.5 font-mono text-xs text-smoke"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* DESCRIPTIF (sans technologies) */}
                  <p className="mt-3 max-w-2xl leading-relaxed text-ink/80">{item.description}</p>

                  {/* 3 PHOTOS de l'expérience */}
                  {item.photos && item.photos.length > 0 && (
                    <div className="mt-5 grid grid-cols-3 gap-2 sm:max-w-xl">
                      {item.photos.map((src) => (
                        <ExperiencePhoto key={src} src={src} org={item.org} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>
    </PageTransition>
  );
}

/**
 * Logo d'une expérience : affiche l'image (object-contain pour respecter les
 * logos de marque), sinon un monogramme si le fichier est absent.
 */
function ExperienceLogo({ item }: { item: TimelineItem }) {
  const [failed, setFailed] = useState(false);
  const monogram = item.logoText ?? item.org.slice(0, 2).toUpperCase();

  const box =
    'grid h-14 w-14 place-items-center overflow-hidden border border-line bg-white sm:h-16 sm:w-16';

  if (item.logo && !failed) {
    return (
      <div className={box}>
        <img
          src={item.logo}
          alt={`Logo ${item.org}`}
          className="h-full w-full object-contain p-1.5"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div className={`${box} font-display text-xl text-ink`} aria-label={item.org}>
      {monogram}
    </div>
  );
}

/** Vignette photo d'expérience, avec repli propre si le fichier est absent. */
function ExperiencePhoto({ src, org }: { src: string; org: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="bg-grid grid aspect-square place-items-center border border-line bg-paper">
        <span className="font-mono text-[9px] text-smoke/60">photo</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${org} — photo`}
      loading="lazy"
      onError={() => setFailed(true)}
      className="aspect-square w-full border border-line object-cover"
    />
  );
}
