/**
 * Liens réels et informations de contact.
 * Centralisés ici pour être réutilisés dans le footer et la page contact.
 */

export const CONTACT = {
  name: 'Mattis Daquin',
  role: 'Développeur Full-Stack',
  email: 'mattis.daquin@efrei.net',
  phone: '+33 6 32 49 26 21',
  location: 'Paris, France',
  cvPath: '/cv-mattis-daquin.pdf',
  // TODO: remplacer par l'URL réelle du profil GitHub.
  github: 'https://github.com/matt12sw',
} as const;

export type Social = {
  label: string;
  href: string;
  /** Handle affiché sous le label. */
  handle: string;
  /** Icône SVG inline (24x24, currentColor). */
  icon: string;
};

export const SOCIALS: Social[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mattis-daquin-0b1734291/',
    handle: 'mattis-daquin',
    icon: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z',
  },
  {
    label: 'GitHub',
    href: CONTACT.github,
    handle: 'matt12sw',
    icon: 'M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/mattis.dqn/',
    handle: 'mattis.dqn',
    icon: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.4a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z',
  },
  {
    label: 'Snapchat',
    href: 'https://www.snapchat.com/@matt12_me',
    handle: 'matt12_me',
    // Fantôme Snapchat simplifié : tracé net, lisible même à 18px.
    icon: 'M12 2C8.69 2 6 4.69 6 8v5.38l-1.7 1.71A1 1 0 0 0 4 15.8V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.2a1 1 0 0 0-.29-.71L18 13.38V8c0-3.31-2.69-6-6-6zm-2 6.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zm4 0a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z',
  },
  {
    label: 'Girl MGMT',
    href: 'https://www.girlmgmt.com/models/men/development/1377-mattis-daquin',
    handle: 'Portfolio mannequinat',
    icon: 'M12 2 2 7v10l10 5 10-5V7L12 2zm0 2.3 6.9 3.45L12 11.2 5.1 7.75 12 4.3zM4 9.3l7 3.5v6.9l-7-3.5V9.3zm16 0v6.9l-7 3.5v-6.9l7-3.5z',
  },
  {
    label: 'Exhibition Mag.',
    href: 'https://www.exhibition-magazine.com/articles/olga-sokal-room-issue',
    handle: 'Portrait — Olga Sokal',
    icon: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v12h16V6H4zm2 2h7v2H6V8zm0 3h7v2H6v-2zm0 3h5v2H6v-2zm10-6h2v8h-2V8z',
  },
];
