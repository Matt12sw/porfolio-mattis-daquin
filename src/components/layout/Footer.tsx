import { Link } from 'react-router-dom';
import { CONTACT, SOCIALS } from '../../data/socials';
import { NAV_LINKS } from '../../data/nav';
import SocialIcon from '../ui/SocialIcon';

/** Footer présent sur toutes les pages : liens, réseaux, copyright. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        {/* Bloc identité + accroche */}
        <div>
          <p className="font-display text-2xl uppercase leading-none">
            Mattis Daquin
            <span className="text-signal">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-smoke">
            Développeur full-stack en formation à l'EFREI Paris. Des applications
            web performantes, du back-end à l'interface.
          </p>
          <a
            href={`mailto:${CONTACT.email}`}
            className="link-underline mt-4 inline-block font-mono text-sm"
          >
            {CONTACT.email}
          </a>
        </div>

        {/* Plan du site */}
        <nav aria-label="Plan du site">
          <p className="tech-label mb-4">Navigation</p>
          <ul className="space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-ink/80 transition-colors hover:text-signal"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Réseaux */}
        <div>
          <p className="tech-label mb-4">Réseaux</p>
          <ul className="flex flex-wrap gap-3">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  title={s.label}
                  className="grid h-10 w-10 place-items-center border border-line text-ink transition-colors duration-300 hover:border-signal hover:text-signal"
                >
                  <SocialIcon path={s.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-5 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-smoke">
            © {year} Mattis Daquin — Tous droits réservés.
          </p>
          <p className="font-mono text-xs text-smoke">
            Conçu avec React · Three.js · Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
