/**
 * Projets (académiques & professionnels tirés du CV).
 * Chaque projet a une page détail : /projects/:id
 */

export type Project = {
  id: string;
  title: string;
  /** Accroche courte pour la carte. */
  tagline: string;
  year: string;
  context: string;
  /** Rôle tenu sur le projet. */
  role: string;
  /** Choix techniques marquants (2-4 puces). */
  techChoices: string[];
  /** Résultats / apports. */
  results: string[];
  stack: string[];
  /** Lien repo GitHub, si disponible (placeholder à compléter). */
  repo?: string;
  /** Catégorie affichée sur la carte. */
  category: 'Académique' | 'Professionnel';
};

export const PROJECTS: Project[] = [
  {
    id: 'cwc-inventory',
    title: 'CWC Inventory',
    tagline: "Application web d'inventaire d'équipements, en usage interne.",
    year: '2025 · HP France',
    category: 'Professionnel',
    context:
      "Durant un stage de deux mois chez HP France, développement d'un outil interne de gestion d'inventaire pour le suivi des équipements de l'entreprise.",
    role: 'Développeur full-stack — conception de la base de données, du back-end et de l’interface.',
    techChoices: [
      'Modèle relationnel SQL pour un CRUD produits fiable (ajout, modification, suppression).',
      'Import / export CSV pour accélérer les mises à jour de masse.',
      'Back-end PHP au plus proche de l’infrastructure existante de l’équipe.',
    ],
    results: [
      'Meilleur suivi des équipements et identification des produits défectueux.',
      'Renouvellement du parc facilité par des données à jour.',
    ],
    stack: ['HTML', 'PHP', 'JavaScript', 'SQL'],
  },
  {
    id: 'incident-tracker',
    title: 'Suivi d’incidents',
    tagline: "Application interne d'assistance et d'automatisation de processus.",
    year: '2026 · Orange',
    category: 'Professionnel',
    context:
      "Stage chez Orange : contribution à une application web interne de gestion et de suivi des incidents techniques clients, destinée aux équipes de support et aux techniciens.",
    role: 'Développeur — automatisation de processus et intégration de services.',
    techChoices: [
      'N8N pour orchestrer et automatiser les processus métier sans réécrire de glue code.',
      'Scripts Perl et JavaScript pour l’intégration avec les outils existants.',
      'Émulateur terminal Putty CAC pour l’accès aux environnements internes.',
    ],
    results: [
      'Amélioration des outils d’assistance des équipes support.',
      'Découverte et mise en œuvre concrète de l’automatisation low-code.',
    ],
    stack: ['N8N', 'Perl', 'JavaScript'],
  },
  {
    id: 'multiplayer-game',
    title: 'Jeu multijoueur en ligne',
    tagline: 'Back-end temps réel et API REST pour un jeu multijoueur.',
    year: '2024 · EFREI',
    category: 'Académique',
    context:
      "Projet académique : conception du back-end d'un jeu en ligne multijoueur avec gestion des utilisateurs et des données de partie.",
    role: 'Développeur back-end.',
    techChoices: [
      'API REST pour exposer utilisateurs et données de jeu de façon structurée.',
      'Échanges de données en JSON entre le front et le serveur.',
      'Communication front / serveur via requêtes HTTP.',
    ],
    results: [
      'Architecture client-serveur fonctionnelle.',
      'Montée en compétence sur Node.js et la conception d’API.',
    ],
    stack: ['Node.js', 'REST API', 'JSON'],
  },
  {
    id: 'streamflix',
    title: 'Streamflix',
    tagline: 'Plateforme de streaming de séries — challenge web en équipe.',
    year: '2024 · EFREI',
    category: 'Académique',
    context:
      "Projet académique réalisé dans le cadre d'un challenge web en équipe : un site de streaming permettant la consultation et la lecture de séries.",
    role: 'Développeur full-stack au sein d’une équipe.',
    techChoices: [
      'Front en HTML / CSS pour une interface de catalogue claire.',
      'Fonctionnalités back-end en PHP et Java.',
      'Travail collaboratif sous contrainte de temps (format challenge).',
    ],
    results: [
      'Plateforme de consultation et de lecture fonctionnelle.',
      'Expérience de travail d’équipe en conditions de challenge.',
    ],
    stack: ['PHP', 'Java', 'HTML', 'CSS'],
  },
  {
    id: 'smartbike',
    title: 'SmartBike',
    tagline: 'Site vitrine responsive de présentation de vélos.',
    year: '2023 · EFREI',
    category: 'Académique',
    context:
      "Projet académique : conception et développement d'un site vitrine dédié à la présentation de vélos.",
    role: 'Développeur front-end — intégration et responsive.',
    techChoices: [
      'Structure sémantique HTML et mise en page CSS.',
      'Approche responsive pour une lecture fluide sur tous les écrans.',
      'Navigation claire et hiérarchie visuelle soignée.',
    ],
    results: [
      'Site vitrine responsive et navigable.',
      'Bases solides en intégration front-end.',
    ],
    stack: ['HTML', 'CSS'],
  },
];

export const getProject = (id: string) => PROJECTS.find((p) => p.id === id);
