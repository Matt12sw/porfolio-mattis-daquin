import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_LINKS } from '../../data/nav';
import { SOCIALS } from '../../data/socials';

type Props = { open: boolean; onClose: () => void };

/**
 * Menu plein écran mobile avec transition fluide (slide + stagger des liens).
 * Ferme sur Échap, verrouille le scroll du body, gère le focus initial.
 */
export default function MobileMenu({ open, onClose }: Props) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Verrou du scroll + fermeture au clavier (Échap).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
          className="fixed inset-0 z-[60] flex flex-col bg-paper lg:hidden"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="container-page flex h-16 items-center justify-between border-b border-line">
            <span className="font-display text-lg font-bold uppercase">Menu</span>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Fermer le menu"
              className="grid h-10 w-10 place-items-center text-2xl"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>

          <nav aria-label="Navigation mobile" className="container-page flex-1 py-8">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                  className="border-b border-line"
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={onClose}
                    className="flex items-baseline gap-4 py-5"
                  >
                    {({ isActive }) => (
                      <>
                        <span className="font-mono text-xs text-signal">{link.index}</span>
                        <span
                          className={`font-display text-4xl uppercase transition-colors ${
                            isActive ? 'text-signal' : 'text-ink'
                          }`}
                        >
                          {link.label}
                        </span>
                      </>
                    )}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="container-page flex flex-wrap gap-x-5 gap-y-2 border-t border-line py-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="tech-label transition-colors hover:text-signal"
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
