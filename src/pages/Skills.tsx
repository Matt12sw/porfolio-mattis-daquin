import PageTransition from '../components/ui/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import { SKILL_GROUPS } from '../data/skills';

export default function Skills() {
  return (
    <PageTransition>
      <section className="container-page py-16 md:py-24">
        <SectionHeading
          index="03"
          eyebrow="Compétences"
          title={<>Ce que je manie</>}
          className="mb-6 max-w-3xl"
        />
        <p className="mb-16 max-w-xl text-lg text-smoke">
          Une stack full-stack éprouvée en projet académique et en entreprise,
          groupée par domaine.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal
              key={group.id}
              delay={i * 0.05}
              className="border border-line p-8 transition-colors duration-300 hover:border-ink"
            >
              <div className="mb-6 flex items-baseline justify-between">
                <h2 className="font-display text-2xl md:text-3xl">{group.title}</h2>
                <span className="tech-label text-signal">{group.caption}</span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="border border-line px-3 py-1.5 font-mono text-sm text-ink/80 transition-colors duration-200 hover:border-signal hover:text-signal"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* Bandeau récapitulatif chiffré (risque créatif de la page). */}
        <Reveal className="mt-16 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
          {[
            { n: '3+', l: 'ans de code' },
            { n: '2', l: 'stages en entreprise' },
            { n: 'B2', l: "niveau d'anglais" },
          ].map((stat) => (
            <div key={stat.l} className="bg-paper p-8 text-center">
              <p className="font-display text-5xl text-ink">
                {stat.n}
                <span className="text-signal">.</span>
              </p>
              <p className="tech-label mt-2">{stat.l}</p>
            </div>
          ))}
        </Reveal>
      </section>
    </PageTransition>
  );
}
