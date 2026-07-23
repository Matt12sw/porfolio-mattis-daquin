/** Liens de navigation principaux (header + menu mobile). */
export type NavLink = { to: string; label: string; index: string };

export const NAV_LINKS: NavLink[] = [
  { to: '/', label: 'Accueil', index: '01' },
  { to: '/about', label: 'À propos', index: '02' },
  { to: '/skills', label: 'Compétences', index: '03' },
  { to: '/experience', label: 'Expériences', index: '04' },
  { to: '/projects', label: 'Projets', index: '05' },
  { to: '/contact', label: 'Contact', index: '06' },
];
