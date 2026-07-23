/** Timeline chronologique : formations, missions, parutions (source : CV). */

export type TimelineKind = 'formation' | 'mission' | 'parution';

export type TimelineItem = {
  id: string;
  period: string;
  /** Utilisé pour trier — année de début. */
  sortKey: number;
  kind: TimelineKind;
  title: string;
  org: string;
  description: string;
  tags?: string[];
  /** Chemin d'un logo (public/logos/…). Sinon, on affiche un monogramme. */
  logo?: string;
  /** Monogramme de repli si pas de logo (2-3 lettres). */
  logoText?: string;
};

export const KIND_LABEL: Record<TimelineKind, string> = {
  formation: 'Formation',
  mission: 'Mission',
  parution: 'Parution',
};

export const TIMELINE: TimelineItem[] = [
  {
    id: 'orange-2026',
    period: '2026 · 2 mois',
    sortKey: 2026.5,
    kind: 'mission',
    title: 'Stage Développeur — Suivi d’incidents',
    org: 'Orange',
    logo: '/logos/orange.svg',
    description:
      "Développement d'une application web interne de gestion et de suivi des incidents techniques clients, pour les équipes de support et les techniciens. Mise en œuvre de N8N pour l'automatisation de processus et l'intégration de services.",
    tags: ['N8N', 'Perl', 'JavaScript', 'Putty CAC'],
  },
  {
    id: 'ilac-2026',
    period: 'Avr. – Juin 2026',
    sortKey: 2026.3,
    kind: 'formation',
    title: 'Échange académique — ILAC',
    org: 'Toronto, Canada',
    logo: '/logos/canada.svg',
    description:
      "Immersion dans un environnement anglophone à Toronto pour renforcer mon anglais, mon autonomie et ma communication dans un contexte international.",
    tags: ['Anglais', 'International'],
  },
  {
    id: 'hp-2025',
    period: '2025 · 2 mois',
    sortKey: 2025.5,
    kind: 'mission',
    title: 'Stage Développeur — CWC Inventory',
    org: 'HP France · Paris',
    logo: '/logos/hp.svg',
    description:
      "Développement d'une application web d'inventaire pour le suivi des équipements : base de données produits (CRUD), import/export CSV et suivi du renouvellement du parc.",
    tags: ['HTML', 'PHP', 'JavaScript', 'SQL'],
  },
  {
    id: 'jo-2024',
    period: '2024',
    sortKey: 2024.4,
    kind: 'mission',
    title: 'Bénévole FIVB — Paris 2024',
    org: 'Jeux Olympiques',
    logo: '/logos/paris2024.svg',
    description:
      "Bénévole durant les JO Paris 2024 sous la coordination de la FIVB : animation d'ateliers volley et beach-volley, accueil d'un public national et international (Champ-de-Mars, Versailles).",
    tags: ['Événementiel', 'Volley'],
  },
  {
    id: 'efrei-2023',
    period: '2023 – 2027',
    sortKey: 2023.5,
    kind: 'formation',
    title: 'Bachelor Ingénierie du numérique',
    org: 'EFREI Paris',
    logo: '/logos/efrei.svg',
    description:
      "Formation d'ingénierie du numérique. Projets académiques : jeu multijoueur (Node.js / REST API / JSON), site vitrine SmartBike (HTML/CSS responsive), plateforme de streaming Streamflix (PHP, Java).",
    tags: ['Node.js', 'REST API', 'PHP', 'Java', 'HTML/CSS'],
  },
  {
    id: 'exhibition-2025',
    period: '2025',
    sortKey: 2025.2,
    kind: 'parution',
    title: 'Portrait éditorial — Room Issue',
    org: 'Exhibition Magazine',
    logoText: 'EX',
    description:
      "Parution presse : portrait signé par la photographe Olga Sokal pour le Room Issue d'Exhibition Magazine.",
    tags: ['Éditorial', 'Presse'],
  },
  {
    id: 'prepa-2023',
    period: '2023 – 2024',
    sortKey: 2023.2,
    kind: 'formation',
    title: 'Prépa intégrée — 1re année',
    org: 'EFREI Paris',
    logo: '/logos/efrei.svg',
    description: "Cycle préparatoire intégré : fondamentaux scientifiques et informatiques.",
  },
  {
    id: 'bac-2021',
    period: '2021 – 2023',
    sortKey: 2021,
    kind: 'formation',
    title: 'Baccalauréat Général',
    org: 'Lycée Rosa Parks · Montgeron',
    logoText: 'RP',
    description: "Baccalauréat général.",
  },
];

/** Objectif affiché en tête de page (alternance recherchée). */
export const CAREER_GOAL = {
  headline: 'Recherche alternance — Septembre 2026',
  detail: '12 mois · rythme 1 semaine école / 2 semaines entreprise',
};
