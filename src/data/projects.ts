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
  /**
   * Captures d'écran illustrant le projet (galerie sur la page détail).
   * `src` pointe vers un fichier à déposer dans public/… (voir README).
   * Si le fichier n'existe pas encore, un cadre « capture à venir » s'affiche.
   */
  images?: { src: string; alt: string; caption: string }[];
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
      'Interface bilingue (FR/EN) et panneau d’administration complet.',
    ],
    stack: ['HTML', 'PHP', 'JavaScript', 'SQL'],
    images: [
      {
        src: '/projects/cwc-inventory/01-carte-interactive.png',
        alt: "Carte interactive de l'inventaire HP CWC par zones",
        caption: 'Carte interactive CWC — inventaire par zones et volumes d’équipements.',
      },
      {
        src: '/projects/cwc-inventory/02-detail-equipement.png',
        alt: "Fiche détaillée d'un équipement avec spécifications techniques",
        caption: 'Fiche équipement — description, spécifications techniques et statut (ex. ENVY Inspire 7200e).',
      },
      {
        src: '/projects/cwc-inventory/03-ajout-equipement.png',
        alt: "Formulaire d'ajout d'un équipement",
        caption: 'Ajout d’un équipement — image, catégorie, zone, statut et spécifications techniques.',
      },
      {
        src: '/projects/cwc-inventory/04-admin-vue-ensemble.png',
        alt: "Panneau d'administration, vue d'ensemble",
        caption: 'Panneau d’administration — vue d’ensemble (23 zones, 15 catégories, 5 fabricants).',
      },
      {
        src: '/projects/cwc-inventory/05-gestion-zones.png',
        alt: 'Écran de gestion des zones CWC',
        caption: 'Gestion des zones — liste complète avec édition et suppression.',
      },
      {
        src: '/projects/cwc-inventory/06-edition-zone.png',
        alt: "Fenêtre d'édition d'une zone (nom et couleur)",
        caption: 'Édition d’une zone — nom et couleur personnalisables.',
      },
      {
        src: '/projects/cwc-inventory/07-gestion-categories.png',
        alt: 'Gestion des catégories produits en arborescence',
        caption: 'Gestion des catégories — arborescence produits (HP Solutions, Personal Systems, Print…).',
      },
      {
        src: '/projects/cwc-inventory/08-gestion-fabricants.png',
        alt: 'Gestion des fabricants',
        caption: 'Gestion des fabricants — HP, HP HYPERX, HP OMEN, POLY…',
      },
      {
        src: '/projects/cwc-inventory/09-gestion-utilisateurs.png',
        alt: 'Gestion des utilisateurs et des rôles',
        caption: 'Gestion des utilisateurs — création, rôles (admin / utilisateur) et statut.',
      },
      {
        src: '/projects/cwc-inventory/10-configuration.png',
        alt: "Configuration bilingue de l'application",
        caption: 'Configuration — libellés de l’application en français et anglais.',
      },
    ],
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
      'Chaîne complète : surveillance, détection d’incident, rédaction IA et alerte email.',
    ],
    stack: ['N8N', 'Perl', 'JavaScript'],
    images: [
      {
        src: '/projects/incident-tracker/01-surveillance-trafic-ebus.png',
        alt: 'Workflow n8n de surveillance du trafic EBUS',
        caption:
          'Workflow principal — surveillance du trafic EBUS : planification, requête ES, analyse par machine à états, agent IA de rédaction puis envoi de l’alerte.',
      },
      {
        src: '/projects/incident-tracker/02-sonde-llm-proxy.png',
        alt: 'Workflow n8n de sonde santé du proxy LLM',
        caption:
          'Workflow — sonde santé du proxy LLM : détection de changement d’état et alerte conditionnelle.',
      },
      {
        src: '/projects/incident-tracker/03-sub-fenetre-surveillance.png',
        alt: 'Sous-workflow n8n de calcul de la fenêtre de surveillance',
        caption: 'Sous-workflow — calcul de la fenêtre de surveillance (réutilisable).',
      },
      {
        src: '/projects/incident-tracker/04-sub-envoi-email-alerte.png',
        alt: "Sous-workflow n8n d'envoi d'email d'alerte",
        caption: 'Sous-workflow — envoi d’email d’alerte (SMTP / RabbitMQ).',
      },
    ],
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
    images: [
      {
        src: '/projects/streamflix/01-accueil.png',
        alt: "Page d'accueil de Streamflix avec un film à la une",
        caption: 'Accueil — film à la une (note, durée, genre, synopsis) et bande de recommandations.',
      },
      {
        src: '/projects/streamflix/02-top10.png',
        alt: 'Classement Top 10 des films actuels',
        caption: 'Top 10 des films actuels — carrousel numéroté.',
      },
      {
        src: '/projects/streamflix/03-catalogue-genres.png',
        alt: 'Catalogue organisé par genres (comédie, horreur…)',
        caption: 'Catalogue — rangées par genre (Comédie, Horreur…) avec défilement horizontal.',
      },
      {
        src: '/projects/streamflix/04-science-fiction.png',
        alt: 'Section science-fiction et pied de page',
        caption: 'Section Science-Fiction et pied de page (catalogue, genres, mentions légales).',
      },
      {
        src: '/projects/streamflix/05-logo.png',
        alt: 'Logo de la plateforme Streamflix',
        caption: 'Identité visuelle — logo Streamflix.',
      },
    ],
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
    images: [
      {
        src: '/projects/smartbike/01-accueil.jpeg',
        alt: 'Aperçu du site SmartBike sur mobile et ordinateur portable',
        caption: 'Site SmartBike — présentation responsive (mobile & desktop).',
      },
      {
        src: '/projects/smartbike/02-produit.jpeg',
        alt: "Fiche produit d'un vélo SmartBike avec tableau comparatif",
        caption: 'Fiche produit — atouts du vélo, tableau avantages / inconvénients et appel à commander.',
      },
      {
        src: '/projects/smartbike/03-plan-site.jpeg',
        alt: 'Plan du site SmartBike (accueil, produits, à propos, contact)',
        caption: 'Plan du site — accueil, catalogue produits, fiche vélo, à propos et contact.',
      },
    ],
  },
];

export const getProject = (id: string) => PROJECTS.find((p) => p.id === id);
