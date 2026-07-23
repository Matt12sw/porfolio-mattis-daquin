/** Centres d'intérêt — sports pratiqués (source : CV). */

export type Sport = {
  id: 'volley' | 'basket' | 'natation';
  discipline: string;
  club: string;
  location: string;
  years: string;
  /** Ce que le sport m'a apporté (court). */
  note: string;
  /** Logo du club (public/sports/<id>/logo.*) — repli si absent. */
  logo?: string;
  /** Photo de moi pratiquant (public/sports/<id>/photo.*) — repli si absent. */
  photo?: string;
};

export const SPORTS: Sport[] = [
  {
    id: 'volley',
    discipline: 'Volley-Ball',
    club: 'ESYVB',
    location: 'Essonne · Niveau régional',
    years: '2023 – 2025 · 3 saisons',
    note: "Esprit d'équipe, rigueur et prise de décision. 🥉 3e Coupe d'Essonne 2024-2025.",
    logo: '/sports/volley/logo.png',
    photo: '/sports/volley/photo.jpg',
  },
  {
    id: 'basket',
    discipline: 'Basket-Ball',
    club: 'ESMBB',
    location: 'Montgeron',
    years: '2 ans',
    note: 'Communication, vision de jeu dans l’espace et sens du collectif.',
    logo: '/sports/basket/logo.png',
    photo: '/sports/basket/photo.jpg',
  },
  {
    id: 'natation',
    discipline: 'Natation',
    club: 'SNM Montgeron',
    location: 'Montgeron',
    years: '5 ans',
    note: 'Persévérance, discipline et dépassement de soi.',
    logo: '/sports/natation/logo.png',
    photo: '/sports/natation/photo.jpg',
  },
];
