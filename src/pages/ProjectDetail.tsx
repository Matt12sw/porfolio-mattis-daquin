import { useState, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageTransition from '../components/ui/PageTransition';
import Reveal from '../components/ui/Reveal';
import ProjectGallery from '../components/ui/ProjectGallery';
import ReadingProgress from '../components/ui/ReadingProgress';
import { getProject, PROJECTS, type Project } from '../data/projects';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = id ? getProject(id) : undefined;

  // Projet introuvable : message clair + retour.
  if (!project) {
    return (
      <PageTransition>
        <section className="container-page py-24 text-center">
          <p className="tech-label mb-4 text-signal">404</p>
          <h1 className="mb-6 text-display-md">Projet introuvable</h1>
          <Link to="/projects" className="btn-primary">
            ← Retour aux projets
          </Link>
        </section>
      </PageTransition>
    );
  }

  // Navigation projet précédent / suivant.
  const index = PROJECTS.findIndex((p) => p.id === project.id);
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  const images = project.images ?? [];

  return (
    <PageTransition>
      {/* Progression de lecture de l'étude de cas. */}
      <ReadingProgress />
      <article className="container-page py-16 md:py-24">
        {/* Fil d'Ariane */}
        <nav aria-label="Fil d'Ariane" className="mb-10 font-mono text-xs text-smoke">
          <Link to="/projects" className="hover:text-signal">
            Projets
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-ink">{project.title}</span>
        </nav>

        {/* En-tête */}
        <header className="border-b border-line pb-12">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="tech-label text-signal">{project.category}</span>
            <span className="h-px w-8 bg-line" aria-hidden="true" />
            <span className="font-mono text-xs text-smoke">{project.year}</span>
          </div>
          <h1 className="text-display-lg">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-xl text-smoke">{project.tagline}</p>

          {/* Stack en badges */}
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li key={s} className="border border-line px-2.5 py-1 font-mono text-xs text-ink/80">
                {s}
              </li>
            ))}
          </ul>

          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-ghost mt-8"
            >
              Voir le code ↗
            </a>
          )}
        </header>

        {/* Image d'ouverture (grand format) */}
        {images[0] && (
          <Reveal className="mt-12">
            <CaseImage src={images[0].src} alt={images[0].alt} caption={images[0].caption} tall />
          </Reveal>
        )}

        {/* ---- Études de cas en phases ---- */}
        <div className="mt-8">
          {/* 01 — Découverte */}
          <Phase index="01" label="Découverte" title="Le contexte">
            <p className="max-w-2xl leading-relaxed text-ink/80">{project.context}</p>
          </Phase>

          {/* 02 — Approche (rôle + choix techniques) */}
          <Phase index="02" label="Approche" title="Rôle & choix techniques">
            <p className="mb-6 max-w-2xl leading-relaxed text-ink/80">{project.role}</p>
            <ul className="max-w-2xl space-y-3">
              {project.techChoices.map((c) => (
                <li key={c} className="flex gap-3 leading-relaxed text-ink/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-signal" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>

            {/* Deux captures en écran partagé, façon étude de cas. */}
            {(images[1] || images[2]) && (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[images[1], images[2]].filter(Boolean).map((img) => (
                  <CaseImage key={img!.src} src={img!.src} alt={img!.alt} caption={img!.caption} />
                ))}
              </div>
            )}
          </Phase>

          {/* 03 — Impact (résultats) */}
          <Phase index="03" label="Impact" title="Les résultats" last>
            <ul className="max-w-2xl space-y-3">
              {project.results.map((r) => (
                <li key={r} className="flex gap-3 leading-relaxed text-ink/80">
                  <span className="mt-1.5 font-mono text-signal" aria-hidden="true">
                    →
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </Phase>
        </div>

        {/* Galerie — captures restantes */}
        {images.length > 3 && (
          <Reveal className="mt-8 border-t border-line pt-12">
            <ProjectGallery images={images.slice(3)} />
          </Reveal>
        )}

        {/* Navigation projet précédent / suivant */}
        <ProjectNav prev={prev} next={next} />
      </article>
    </PageTransition>
  );
}

/**
 * Bloc « phase » d'une étude de cas : colonne de gauche avec le numéro et le
 * libellé (collante au scroll), colonne de droite avec le contenu.
 */
function Phase({
  index,
  label,
  title,
  children,
  last,
}: {
  index: string;
  label: string;
  title: string;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <Reveal
      as="section"
      className={`grid gap-6 py-12 lg:grid-cols-[0.5fr_1fr] lg:gap-12 ${
        last ? '' : 'border-b border-line'
      }`}
    >
      <div className="lg:sticky lg:top-24 lg:h-fit">
        <div className="flex items-center gap-3">
          <span className="font-display text-5xl text-signal">{index}</span>
          <span className="h-px flex-1 bg-line lg:hidden" aria-hidden="true" />
        </div>
        <p className="tech-label mt-2">{label}</p>
        <h2 className="mt-1 font-display text-2xl">{title}</h2>
      </div>
      <div>{children}</div>
    </Reveal>
  );
}

/** Image d'étude de cas avec cadre + légende et repli propre. */
function CaseImage({
  src,
  alt,
  caption,
  tall,
}: {
  src: string;
  alt: string;
  caption: string;
  tall?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const ratio = tall ? 'aspect-[16/9]' : 'aspect-video';

  return (
    <figure>
      {failed ? (
        <div className={`bg-grid ${ratio} flex items-center justify-center border border-line bg-paper`}>
          <span className="font-mono text-xs text-smoke/60">// capture à ajouter</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className={`${ratio} w-full border border-line object-cover object-top`}
        />
      )}
      <figcaption className="mt-2 font-mono text-xs leading-relaxed text-smoke">
        {caption}
      </figcaption>
    </figure>
  );
}

function ProjectNav({ prev, next }: { prev: Project; next: Project }) {
  return (
    <nav
      aria-label="Autres projets"
      className="mt-20 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2"
    >
      <Link to={`/projects/${prev.id}`} className="group bg-paper p-6 hover:bg-ink hover:text-paper">
        <span className="tech-label group-hover:text-paper/70">← Précédent</span>
        <p className="mt-2 font-display text-xl">{prev.title}</p>
      </Link>
      <Link
        to={`/projects/${next.id}`}
        className="group bg-paper p-6 text-right hover:bg-ink hover:text-paper"
      >
        <span className="tech-label group-hover:text-paper/70">Suivant →</span>
        <p className="mt-2 font-display text-xl">{next.title}</p>
      </Link>
    </nav>
  );
}
