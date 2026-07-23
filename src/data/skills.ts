/** Compétences groupées par domaine (source : CV Mattis Daquin). */

export type SkillGroup = {
  id: string;
  title: string;
  /** Légende monospace courte. */
  caption: string;
  skills: string[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Front-end',
    caption: '// interface & expérience',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Vue.js', 'Responsive Design'],
  },
  {
    id: 'backend',
    title: 'Back-end',
    caption: '// logique & serveurs',
    skills: ['Python', 'Node.js', 'Java', 'Perl', 'PHP', 'REST API', 'JSON'],
  },
  {
    id: 'data',
    title: 'Bases de données',
    caption: '// persistance',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    id: 'tools',
    title: 'Outils & Environnement',
    caption: '// workflow',
    skills: ['Docker', 'N8N', 'Git', 'GitHub', 'GitLab', 'Linux', 'VS Code', 'Postman', 'Apache', 'Putty CAC'],
  },
  {
    id: 'soft',
    title: 'Soft skills',
    caption: '// savoir-être',
    skills: [
      'Collaboration technique',
      'Gestion de projet',
      'Résolution de problèmes',
      'Autonomie',
      'Esprit d’équipe',
    ],
  },
  {
    id: 'lang',
    title: 'Langues',
    caption: '// international',
    skills: ['Français — natif', 'Anglais — B2', 'Espagnol — B1'],
  },
];
