import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/ui/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import { CONTACT } from '../data/socials';

const VALUES = [
  {
    k: 'Précision',
    v: "D'une requête SQL à un composant d'interface, le détail fait la différence. Je travaille au geste juste.",
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
          title={<>Développeur full-stack,<br />du back-end à l'interface</>}
          className="mb-16 max-w-3xl"
        />

        {/* Risque créatif de la page : split portrait / texte asymétrique. */}
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Portrait (placeholder à remplacer) */}
          <Reveal>
            <figure className="relative">
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-line bg-grid">
                {/* Portrait — déposer le fichier dans public/portrait.jpg.
                    En cas d'absence, un cadre de repli propre s'affiche. */}
                <Portrait />
                <span className="absolute right-3 top-3 z-10 h-3 w-3 rounded-full bg-signal" />
              </div>
              <figcaption className="mt-3 font-mono text-xs text-smoke">
                Mattis Daquin — {CONTACT.location}
              </figcaption>
            </figure>
          </Reveal>

          {/* Parcours */}
          <div className="space-y-8">
            <Reveal>
              <p className="text-2xl font-light leading-relaxed text-ink">
                Je m'appelle Mattis, et je conçois des produits web
                <span className="text-signal"> de bout en bout</span> — de la
                base de données à l'interface.
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="leading-relaxed text-ink/80">
                En formation d'ingénierie du numérique à l'EFREI Paris (Bachelor
                2023–2027), je conçois des applications web performantes et
                centrées sur les besoins des utilisateurs. J'ai mis les mains dans
                le code en entreprise : une application de suivi d'incidents chez{' '}
                <strong>Orange</strong> (automatisation N8N) et un outil
                d'inventaire complet chez <strong>HP France</strong> (PHP / SQL,
                interface bilingue et panneau d'administration). Un échange
                académique à Toronto est venu affûter mon anglais et mon
                autonomie.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="leading-relaxed text-ink/80">
                J'aime les projets où la rigueur technique rencontre le soin du
                détail : une API propre, une interface lisible, un code que
                l'équipe suivante comprend. À côté du code, je fais aussi du
                mannequinat —{' '}
                <a
                  href="https://www.girlmgmt.com/models/men/development/1377-mattis-daquin"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-underline font-medium text-ink"
                >
                  voir mon portfolio Girl MGMT
                </a>
                .
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

/**
 * Portrait : affiche public/portrait.jpg si présent, sinon un cadre de repli
 * (initiales + nom du fichier attendu) pour ne jamais montrer d'image cassée.
 */
function Portrait() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 grid h-24 w-24 place-items-center rounded-full border border-ink/30 font-display text-4xl">
            MD
          </div>
          <p className="font-mono text-xs text-smoke">portrait.jpg</p>
          <p className="mt-1 font-mono text-[10px] text-smoke/70">
            // à déposer dans public/
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src="/portrait.jpg"
      alt="Portrait de Mattis Daquin"
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
