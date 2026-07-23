/** Timeline chronologique : formations, missions, parutions (source : CV + LinkedIn). */

export type TimelineKind = 'formation' | 'mission' | 'parution';

export type TimelineItem = {
  id: string;
  period: string;
  /** Utilisé pour trier — année de début. */
  sortKey: number;
  kind: TimelineKind;
  /** Intitulé du poste (façon LinkedIn). */
  title: string;
  /** Entité / entreprise + contexte (ex. « Orange · Stage »). */
  org: string;
  /** Descriptif — SANS lister les technologies (elles vont dans `tags`). */
  description: string;
  /** Entités / technologies utilisées (badges). */
  tags?: string[];
  /** Chemin d'un logo (public/logos/…). Sinon, on affiche un monogramme. */
  logo?: string;
  /** Monogramme de repli si pas de logo (2-3 lettres). */
  logoText?: string;
  /**
   * Jusqu'à 3 photos illustrant l'expérience (déposées dans
   * public/experiences/<id>/). Repli propre si le fichier est absent.
   */
  photos?: string[];
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
    title: 'Ingénieur Logiciels Junior',
    org: 'Orange · Stage',
    logo: '/logos/orange.jpg',
    description:
      "Participation au développement d'une application web interne de gestion et de suivi des incidents techniques clients, destinée aux équipes de support et aux techniciens. Automatisation de processus et intégration de services.",
    tags: ['N8N', 'Perl', 'JavaScript', 'Putty CAC'],
    photos: [
      '/experiences/orange-2026/01.jpg',
      '/experiences/orange-2026/02.jpg',
      '/experiences/orange-2026/03.jpg',
    ],
  },
  {
    id: 'ilac-2026',
    period: 'Avr. – Juin 2026',
    sortKey: 2026.3,
    kind: 'formation',
    title: 'Échange académique — Toronto (ILAC)',
    org: 'ILAC International College · Alternance',
    logo: '/logos/canada.png',
    description:
      "Immersion dans un environnement international anglophone à Toronto pour renforcer mon anglais. Développement de mon autonomie, de ma capacité d'adaptation et de ma communication dans un contexte multiculturel.",
    tags: ['Anglais', 'International'],
    photos: [
      '/experiences/ilac-2026/01.jpg',
      '/experiences/ilac-2026/02.jpg',
      '/experiences/ilac-2026/03.jpg',
    ],
  },
  {
    id: 'hp-2025',
    period: '2025 · 2 mois',
    sortKey: 2025.5,
    kind: 'mission',
    title: 'Développeur Web — Site d’inventaire CWC',
    org: 'HP France · Stage · Paris',
    logo: '/logos/hp.png',
    description:
      "Développement d'une application web d'inventaire utilisée en interne pour le suivi des équipements : gestion des produits (ajout, modification, suppression), import / export de données et suivi du renouvellement du parc. Contribution à l'identification des produits défectueux.",
    tags: ['HTML', 'PHP', 'JavaScript', 'SQL'],
    photos: [
      '/experiences/hp-2025/01.jpg',
      '/experiences/hp-2025/02.jpg',
      '/experiences/hp-2025/03.jpg',
    ],
  },
  {
    id: 'jo-2024',
    period: 'Juil. – Août 2024',
    sortKey: 2024.4,
    kind: 'mission',
    title: 'Bénévole — Jeux Olympiques Paris 2024',
    org: 'Fédération Internationale de Volleyball (FIVB)',
    logo: '/logos/paris2024.webp',
    description:
      "Bénévole durant les JO Paris 2024 sous la coordination de la FIVB (Champ-de-Mars, Tour Eiffel, Versailles). Animation d'ateliers volley et beach-volley, encadrement d'activités interactives et accueil d'un public national et international.",
    tags: ['Événementiel', 'Volley'],
    photos: [
      '/experiences/jo-2024/01.jpg',
      '/experiences/jo-2024/02.jpg',
      '/experiences/jo-2024/03.jpg',
    ],
  },
  {
    id: 'efrei-2023',
    period: '2023 – 2028',
    sortKey: 2023.5,
    kind: 'formation',
    title: 'Bachelor Ingénierie du numérique',
    org: 'EFREI Paris · Grande école du numérique',
    logo: '/logos/efrei.webp',
    description:
      "Formation d'ingénierie du numérique. Projets académiques variés en développement web et logiciel, menés en solo comme en équipe : jeu multijoueur en ligne, site vitrine et plateforme de streaming.",
    tags: ['Node.js', 'REST API', 'PHP', 'Java', 'HTML/CSS'],
    photos: [
      '/experiences/efrei-2023/01.jpg',
      '/experiences/efrei-2023/02.jpg',
      '/experiences/efrei-2023/03.jpg',
    ],
  },
  {
    id: 'exhibition-2025',
    period: '2025',
    sortKey: 2025.2,
    kind: 'parution',
    title: 'Portrait éditorial — Room Issue',
    org: 'Exhibition Magazine · par Olga Sokal',
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
    logo: '/logos/efrei.webp',
    description: "Cycle préparatoire intégré : fondamentaux scientifiques et informatiques.",
  },
  {
    id: 'bac-2021',
    period: '2019 – 2022',
    sortKey: 2021,
    kind: 'formation',
    title: 'Baccalauréat Technologique STI2D',
    org: 'Lycée Rosa Parks · Montgeron',
    logo: '/logos/rosa-parks.png',
    description:
      "Baccalauréat STI2D (Sciences et Technologies de l'Industrie et du Développement Durable).",
    tags: ['SOLIDWORKS', 'Python'],
    photos: [
      '/experiences/bac-2021/01.jpg',
      '/experiences/bac-2021/02.jpg',
      '/experiences/bac-2021/03.jpg',
    ],
  },
];

/** Objectif affiché en tête de page (alternance recherchée). */
export const CAREER_GOAL = {
  headline: 'Recherche alternance — Septembre 2026',
  detail: '12 mois · rythme 1 semaine école / 2 semaines entreprise',
};
