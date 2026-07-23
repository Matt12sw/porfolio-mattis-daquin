import { Link } from 'react-router-dom';
import PageTransition from '../components/ui/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import { CONTACT } from '../data/socials';

const VALUES = [
  {
    k: 'Précision',
    v: "Qu'il s'agisse d'une API ou d'une pose, le détail fait la différence. Je travaille au geste juste.",
  },
  {
    k: 'Curiosité',
    v: "J'apprends vite et volontiers : nouvelle stack, nouveau plateau, nouveau contexte international.",
  },
  {
    k: 'Rigueur',
    v: 'Le sport de compétition m’a appris la discipline ; je l’applique au code comme au reste.',
  },
  {
    k: 'Collectif',
    v: 'Je donne le meilleur au service d’une équipe — en mission technique comme en shooting.',
  },
];

export default function About() {
  return (
    <PageTransition>
      <section className="container-page py-16 md:py-24">
        <SectionHeading
          index="02"
          eyebrow="À propos"
          title={<>Développeur le jour,<br />mannequin à l'objectif</>}
          className="mb-16 max-w-3xl"
        />

        {/* Risque créatif de la page : split portrait / texte asymétrique. */}
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Portrait (placeholder à remplacer) */}
          <Reveal>
            <figure className="relative">
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-line bg-grid">
                {/* Placeholder — remplacer par une vraie photo portrait. */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-4 grid h-24 w-24 place-items-center rounded-full border border-ink/30 font-display text-4xl">
                      MD
                    </div>
                    <p className="font-mono text-xs text-smoke">portrait.jpg</p>
                    <p className="mt-1 font-mono text-[10px] text-smoke/70">
                      // placeholder à remplacer
                    </p>
                  </div>
                </div>
                <span className="absolute right-3 top-3 h-3 w-3 rounded-full bg-signal" />
              </div>
              <figcaption className="mt-3 font-mono text-xs text-smoke">
                Mattis Daquin — Paris, {CONTACT.location}
              </figcaption>
            </figure>
          </Reveal>

          {/* Parcours */}
          <div className="space-y-8">
            <Reveal>
              <p className="text-2xl font-light leading-relaxed text-ink">
                Je m'appelle Mattis, j'ai deux terrains de jeu qui se répondent :
                <span className="text-signal"> l'écran et l'objectif</span>.
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="leading-relaxed text-ink/80">
                En formation d'ingénierie du numérique à l'EFREI Paris (Bachelor
                2023–2027), je conçois des applications web performantes et
                centrées sur les besoins des utilisateurs. J'ai mis les mains dans
                le code en entreprise : une application de suivi d'incidents chez{' '}
                <strong>Orange</strong> et un outil d'inventaire chez{' '}
                <strong>HP France</strong>. Un échange académique à Toronto est
                venu affûter mon anglais et mon autonomie.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="leading-relaxed text-ink/80">
                En parallèle, je suis mannequin — représenté par{' '}
                <strong>Girl MGMT</strong> en France et <strong>BNM Models</strong>{' '}
                au Canada : Fashion Week, e-commerce, éditorial. Un portrait signé
                Olga Sokal a été publié dans Exhibition Magazine. Cette double vie
                m'a appris à passer d'un langage à l'autre — technique et visuel —
                sans jamais perdre le fil de l'exigence.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="border-l-2 border-signal bg-paper py-2 pl-5">
                <p className="tech-label mb-1">Objectif</p>
                <p className="text-ink">
                  Alternance de 12 mois dès septembre 2026 — rythme 1 semaine
                  école / 2 semaines entreprise.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Valeurs */}
        <div className="mt-24">
          <SectionHeading eyebrow="Ce qui me guide" title="Valeurs" className="mb-10" />
          <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((val, i) => (
              <Reveal key={val.k} delay={i * 0.05} className="bg-paper p-6">
                <p className="mb-2 font-mono text-xs text-signal">0{i + 1}</p>
                <h3 className="mb-2 font-display text-xl">{val.k}</h3>
                <p className="text-sm leading-relaxed text-smoke">{val.v}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Sports / discipline */}
        <Reveal className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-8">
          <span className="tech-label">Discipline forgée par le sport :</span>
          {['Volley — ESYVB (régional)', 'Natation — SNM Montgeron', 'Basket — ESMBB'].map(
            (s) => (
              <span key={s} className="font-mono text-sm text-ink/70">
                {s}
              </span>
            )
          )}
        </Reveal>

        <div className="mt-16 flex flex-wrap gap-3">
          <Link to="/experience" className="btn-primary">
            Voir le parcours
          </Link>
          <Link to="/contact" className="btn-ghost">
            Me contacter
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
