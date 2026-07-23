import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../../data/nav';
import MobileMenu from './MobileMenu';

/**
 * Header fixe : logo/nom, liens de navigation avec indicateur de page active,
 * et bouton burger pour le menu mobile.
 */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
        <div className="container-page flex h-16 items-center justify-between">
          {/* Logo / nom */}
          <Link
            to="/"
            className="group flex items-center gap-2"
            aria-label="Mattis Daquin — accueil"
          >
            <span className="grid h-8 w-8 place-items-center bg-ink font-display text-lg font-black text-paper transition-colors duration-300 group-hover:bg-signal">
              M
            </span>
            <span className="font-display text-lg font-bold uppercase tracking-tight">
              Daquin
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
          </Link>

          {/* Navigation desktop */}
          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className="link-underline font-mono text-sm text-ink/80 transition-colors hover:text-ink"
                  >
                    {({ isActive }) => (
                      <span data-active={isActive} className="link-underline">
                        {link.label}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Indicateur de page active (mono) + burger */}
          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-xs uppercase tracking-widest text-smoke sm:block">
              {NAV_LINKS.find(
                (l) => l.to === location.pathname || (l.to === '/' && location.pathname === '/')
              )?.index ?? '—'}{' '}
              / 06
            </span>

            {/* Bouton burger — visible sous lg */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            >
              <span className="block h-0.5 w-6 bg-ink" />
              <span className="block h-0.5 w-6 bg-ink" />
              <span className="block h-0.5 w-4 bg-signal" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
