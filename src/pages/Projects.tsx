import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/ui/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import { PROJECTS, type Project } from '../data/projects';

type Filter = 'Tous' | Project['category'];
const FILTERS: Filter[] = ['Tous', 'Professionnel', 'Académique'];

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('Tous');
  const list = PROJECTS.filter((p) => filter === 'Tous' || p.category === filter);

  return (
    <PageTransition>
      <section className="container-page py-16 md:py-24">
        <SectionHeading
          index="05"
          eyebrow="Projets"
          title="Réalisations"
          className="mb-6 max-w-3xl"
        />
        <p className="mb-10 max-w-xl text-lg text-smoke">
          Des projets académiques aux missions en entreprise. Chaque carte ouvre
          une page détaillée : contexte, rôle, choix techniques et résultats.
        </p>

        {/* Filtres */}
        <div className="mb-12 flex flex-wrap gap-2" role="tablist" aria-label="Filtrer les projets">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors duration-200 ${
                filter === f
                  ? 'border-ink bg-ink text-paper'
                  : 'border-line text-ink/70 hover:border-ink'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grille de cartes */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <Link
                to={`/projects/${p.id}`}
                className="group flex h-full flex-col justify-between border border-line p-6 transition-all duration-300 hover:border-signal hover:shadow-[6px_6px_0_0_theme(colors.signal)]"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="tech-label">{p.category}</span>
                    <span className="font-mono text-xs text-smoke">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h2 className="font-display text-3xl transition-colors group-hover:text-signal">
                    {p.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-smoke">{p.tagline}</p>
                </div>

                <div className="mt-6">
                  <ul className="mb-4 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 4).map((s) => (
                      <li key={s} className="border border-line px-2 py-0.5 font-mono text-[11px] text-ink/60">
                        {s}
                      </li>
                    ))}
                  </ul>
                  <span className="flex items-center justify-between font-mono text-xs">
                    <span className="text-smoke">{p.year}</span>
                    <span className="text-ink transition-transform duration-300 group-hover:translate-x-1">
                      Détail →
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
