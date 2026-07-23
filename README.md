# Portfolio — Mattis Daquin

Portfolio personnel d'un développeur full-stack **et** mannequin. Multi-pages,
scène héros 3D interactive, direction artistique « atelier » (papier / encre /
rouge signal).

## Direction artistique

- **Palette** : fond blanc dominant (`#FBFBF9`), noir encre (`#0A0A0A`), un seul
  accent rouge signal (`#E4002B`). Pas de dégradé cliché.
- **Typographie** : display condensée en capitales (**Archivo**) pour les titres,
  neutre (**Inter**) pour le corps, monospace (**JetBrains Mono**) pour les
  labels techniques et l'indicateur de page active.
- **Scène 3D** : un nuage de points qui **morphe en boucle entre des « lignes de
  code » et une silhouette humaine** — la double identité développeur/mannequin
  incarnée, inspectable à la souris.
- **Discipline** : un seul risque créatif assumé par page ; le reste reste sobre.

## Stack technique

| Domaine        | Outil                                        |
| -------------- | -------------------------------------------- |
| Framework      | React 18 + TypeScript, bundlé avec **Vite**  |
| Routing        | React Router 6 (multi-pages)                 |
| 3D             | React Three Fiber + @react-three/drei        |
| Style          | Tailwind CSS                                 |
| Transitions    | Framer Motion (pages + micro-interactions)   |
| Scroll         | GSAP + ScrollTrigger (reveal au scroll)      |

## Démarrage

```bash
npm install
npm run dev       # serveur de dev Vite
npm run build     # typecheck + build de production
npm run preview   # prévisualise le build
```

## Structure

```
src/
├── components/
│   ├── layout/     Header, Footer, MobileMenu, Layout, ScrollToTop
│   ├── three/      HeroCanvas, HeroScene, MorphPoints, generators
│   └── ui/         Reveal, PageTransition, SectionHeading, SocialIcon…
├── data/           nav, skills, experience, projects, socials (contenu du CV)
├── hooks/          usePrefersReducedMotion, useMediaQuery
├── lib/            webgl (détection)
├── pages/          Home, About, Skills, Experience, Projects,
│                   ProjectDetail, Contact, NotFound
├── App.tsx         routes + transitions de page
├── main.tsx        point d'entrée
└── index.css       design system Tailwind
```

## À compléter (placeholders)

- **CV téléchargeable** : déposer le PDF dans `public/cv-mattis-daquin.pdf`
  (chemin référencé dans `src/data/socials.ts` → `CONTACT.cvPath`).
- **Photo portrait** : page *À propos* — remplacer le placeholder par une vraie
  image (`public/portrait.jpg` + balise `<img alt="…">`).
- **URL GitHub** : `src/data/socials.ts` → `CONTACT.github`.

## Accessibilité & performance

- Pixel ratio du renderer plafonné (`dpr={[1, 2]}`).
- Complexité 3D réduite sur mobile/tablette (moins de points).
- Fallback statique si WebGL indisponible.
- `prefers-reduced-motion` respecté (3D figée, animations coupées).
- Canvas 3D lazy-loadé, uniquement sur l'accueil.
- Focus clavier visible, navigation clavier, contrastes WCAG AA, alt/aria-label.
- Testé aux points de rupture 375 px / 768 px / 1440 px.
```
