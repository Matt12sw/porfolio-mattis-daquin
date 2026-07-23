# Images du portfolio — état

Toutes les captures prévues sont intégrées. Ce fichier sert de référence si tu
veux ajouter/remplacer des images plus tard. Tant qu'un fichier référencé est
absent, un cadre « capture à venir » propre s'affiche à sa place (jamais
d'image cassée).

## ✅ Intégré

- **Portrait (À propos)** — `public/portrait.jpg` (gros plan N&B). Alternatives
  conservées : `portrait-alt1-reflet.jpg`, `portrait-alt2-porte.jpg`,
  `portrait-alt4-couleur.jpg`. Pour changer : renomme l'alternative en
  `portrait.jpg`.
- **HP France — CWC Inventory** (`/projects/cwc-inventory`) — 10 captures.
- **Orange — Suivi d'incidents** (`/projects/incident-tracker`) — 4 workflows n8n.
- **Streamflix** (`/projects/streamflix`) — 5 captures (accueil, top 10,
  catalogue par genres, science-fiction + footer, logo).
- **SmartBike** (`/projects/smartbike`) — 3 captures (aperçu responsive, fiche
  produit, plan du site).

## Ajouter / remplacer une image plus tard

1. Dépose le fichier dans le dossier `public/projects/<projet>/`.
2. Ajoute (ou modifie) l'entrée correspondante dans le tableau `images` du
   projet, dans `src/data/projects.ts` (`src`, `alt`, `caption`).
3. `npm run build` puis commit / push.
