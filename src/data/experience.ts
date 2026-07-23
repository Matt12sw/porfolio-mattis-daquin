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
    title: 'Stage développeur — Application interne',
    org: 'Orange',
    description:
      "Participation au développement d'une application web interne de gestion et de suivi des incidents techniques clients. Mise en œuvre de N8N pour l'automatisation de processus et l'intégration de services, au service des équipes de support et des techniciens.",
    tags: ['N8N', 'Perl', 'JavaScript', 'Putty CAC'],
  },
  {
    id: 'ilac-2026',
    period: 'Avr. – Juin 2026',
    sortKey: 2026.3,
    kind: 'formation',
    title: 'Échange académique — Toronto',
    org: 'ILAC, Canada',
    description:
      "Immersion dans un environnement international anglophone pour renforcer mes compétences en anglais, mon autonomie et ma communication dans un contexte multiculturel.",
    tags: ['Anglais', 'International'],
  },
  {
    id: 'hp-2025',
    period: '2025 · 2 mois',
    sortKey: 2025.5,
    kind: 'mission',
    title: 'Stage développeur — CWC Inventory',
    org: 'HP France, Paris',
    description:
      "Développement d'une application web de gestion d'inventaire utilisée en interne pour le suivi des équipements : base de données produits (CRUD), import/export CSV, identification des produits défectueux et suivi du renouvellement.",
    tags: ['HTML', 'PHP', 'JavaScript', 'SQL'],
  },
  {
    id: 'exhibition-2025',
    period: '2025',
    sortKey: 2025.2,
    kind: 'parution',
    title: 'Portrait éditorial — Room Issue',
    org: 'Exhibition Magazine · par Olga Sokal',
    description:
      "Parution presse : portrait signé par la photographe Olga Sokal pour le Room Issue d'Exhibition Magazine.",
    tags: ['Éditorial', 'Presse'],
  },
  {
    id: 'efrei-2023',
    period: '2023 – 2027',
    sortKey: 2023.5,
    kind: 'formation',
    title: 'Bachelor Ingénierie du numérique',
    org: 'EFREI Paris',
    description:
      "Formation d'ingénierie du numérique. Projets académiques : jeu multijoueur en ligne (Node.js / REST API), site vitrine SmartBike (HTML/CSS), plateforme de streaming Streamflix (PHP, Java).",
    tags: ['Node.js', 'REST API', 'PHP', 'Java'],
  },
  {
    id: 'jo-2024',
    period: '2024',
    sortKey: 2024.4,
    kind: 'mission',
    title: 'Bénévolat — Jeux Olympiques Paris 2024',
    org: 'FIVB · Champ-de-Mars & Versailles',
    description:
      "Bénévole durant les JO Paris 2024 sous la coordination de la FIVB : animation d'ateliers volley et beach-volley, accueil et accompagnement d'un public national et international.",
    tags: ['Événementiel', 'Volley'],
  },
  {
    id: 'prepa-2023',
    period: '2023 – 2024',
    sortKey: 2023.2,
    kind: 'formation',
    title: 'Première année — Prépa intégrée',
    org: 'EFREI Paris',
    description: "Cycle préparatoire intégré, fondamentaux scientifiques et informatiques.",
  },
  {
    id: 'bac-2021',
    period: '2021 – 2023',
    sortKey: 2021,
    kind: 'formation',
    title: 'Baccalauréat Général',
    org: 'Lycée Rosa Parks, Montgeron',
    description: "Baccalauréat général.",
  },
];

/** Objectif affiché en tête de page (alternance recherchée). */
export const CAREER_GOAL = {
  headline: 'Recherche alternance — Septembre 2026',
  detail: '12 mois · rythme 1 semaine école / 2 semaines entreprise',
};
