import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

/** Ossature commune : lien d'évitement, header fixe, contenu, footer. */
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Lien d'évitement pour la navigation clavier / lecteurs d'écran. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-paper"
      >
        Aller au contenu
      </a>

      <Header />

      {/* pt-16 compense la hauteur du header fixe. */}
      <div className="flex-1 pt-16">{children}</div>

      <Footer />
    </div>
  );
}
