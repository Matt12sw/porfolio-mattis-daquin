import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/ui/PageTransition';
import HeroCanvas from '../components/three/HeroCanvas';
import PixelWorld from '../components/pixel/PixelWorld';
import Reveal from '../components/ui/Reveal';
import InteractiveTitle from '../components/ui/InteractiveTitle';
import SectionHeading from '../components/ui/SectionHeading';
import { CONTACT } from '../data/socials';
import { SKILL_GROUPS } from '../data/skills';
import { PROJECTS } from '../data/projects';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function Home() {
  const reduced = usePrefersReducedMotion();

  return (
    <PageTransition>
      {/* ============================ HÉROS ============================ */}
      <section className="relative overflow-hidden border-b border-line">
        {/* Décor pixel-art parallax (original, en arrière-plan). */}
        <PixelWorld />

        {/* Ballons 3D — plein cadre, au-dessus du décor, sous le texte. */}
        <div className="absolute inset-0 z-[1]">
          <HeroCanvas />
        </div>

        {/* Voile papier : garde le texte lisible par-dessus les ballons. */}
        <div
          className="absolute inset-0 z-[1] bg-gradient-to-b from-paper/85 via-paper/40 to-paper/70 lg:bg-gradient-to-r lg:from-paper lg:via-paper/50 lg:to-transparent"
          aria-hidden="true"
        />

        <div className="container-page relative z-[2] grid min-h-[calc(100vh-4rem)] items-center py-12 lg:grid-cols-2">
          {/* Colonne texte */}
          <div className="order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 border border-ink bg-paper/80 px-3 py-2 font-pixel text-[10px] uppercase text-ink backdrop-blur-sm"
            >
              <span className="text-signal">▶</span> Player 01 — Développeur Full-Stack
            </motion.p>

            <InteractiveTitle lines={[{ text: 'MATTIS' }, { text: 'DAQUIN', accent: true }]} />

            <p className="mt-6 max-w-md text-lg text-smoke">
              Développeur full-stack en formation à l'EFREI Paris — je conçois des
              applications web performantes et centrées sur l'utilisateur, du
              back-end à l'interface.
            </p>

            {/* CTA : CV + GitHub */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={CONTACT.cvPath}
                download
                className="btn-primary"
                aria-label="Télécharger le CV de Mattis Daquin (PDF)"
              >
                ↓ Télécharger le CV
              </a>
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-ghost"
              >
                Voir GitHub ↗
              </a>
            </div>

            <p className="mt-8 font-mono text-xs text-smoke">
              {reduced
                ? '// animations réduites'
                : '// bougez la souris — les ballons et le décor réagissent'}
            </p>
          </div>

          {/* La colonne de droite reste vide : les ballons occupent le fond. */}
          <div className="order-1 hidden lg:order-2 lg:block" aria-hidden="true" />
        </div>

        {/* Indicateur de scroll */}
        <div className="pointer-events-none absolute inset-x-0 bottom-4 z-[2] flex justify-center">
          <span className="font-pixel text-[9px] uppercase text-ink/70">↓ défiler</span>
        </div>
      </section>

      {/* ===================== APERÇU DES SECTIONS ===================== */}

      {/* À propos condensé */}
      <section className="border-b border-line py-20 md:py-28">
        <div className="container-page grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <SectionHeading index="02" eyebrow="À propos" title={<>Du back-end<br />à l'interface</>} />
          <Reveal className="max-w-xl">
            <p className="text-lg leading-relaxed text-ink/80">
              Étudiant en Bachelor Ingénierie du numérique à l'EFREI Paris, je
              développe des applications web full-stack et j'ai signé des missions
              chez <strong>Orange</strong> et <strong>HP France</strong>. Je
              recherche une alternance de 12 mois à partir de septembre 2026.
            </p>
            <Link to="/about" className="link-underline mt-6 inline-block font-mono text-sm">
              En savoir plus →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Compétences condensé */}
      <section className="border-b border-line py-20 md:py-28">
        <div className="container-page">
          <SectionHeading
            index="03"
            eyebrow="Compétences"
            title="Stack technique"
            className="mb-12"
          />
          <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {SKILL_GROUPS.slice(0, 3).map((g) => (
              <Reveal key={g.id} className="bg-paper p-6">
                <p className="tech-label mb-3 text-signal">{g.caption}</p>
                <h3 className="mb-4 font-display text-xl">{g.title}</h3>
                <ul className="flex flex-wrap gap-2">
                  {g.skills.slice(0, 6).map((s) => (
                    <li key={s} className="border border-line px-2 py-1 font-mono text-xs text-ink/70">
                      {s}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <Link to="/skills" className="link-underline mt-8 inline-block font-mono text-sm">
            Toutes les compétences →
          </Link>
        </div>
      </section>

      {/* Projets condensé */}
      <section className="py-20 md:py-28">
        <div className="container-page">
          <SectionHeading index="05" eyebrow="Projets" title="Sélection" className="mb-12" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.slice(0, 3).map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <Link
                  to={`/projects/${p.id}`}
                  className="group flex h-full flex-col justify-between border border-line p-6 transition-colors duration-300 hover:border-signal"
                >
                  <div>
                    <span className="tech-label">{p.category}</span>
                    <h3 className="mt-3 font-display text-2xl transition-colors group-hover:text-signal">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-smoke">{p.tagline}</p>
                  </div>
                  <span className="mt-6 font-mono text-xs text-ink/60">{p.year}</span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Link to="/projects" className="link-underline mt-8 inline-block font-mono text-sm">
            Tous les projets →
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
