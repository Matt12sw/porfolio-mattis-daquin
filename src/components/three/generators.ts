/**
 * Génération des deux nuages de points cibles du morph.
 *
 * Concept : la scène incarne la double identité « code / image ».
 *  - Forme A « CODE »       : des points organisés en lignes horizontales
 *                             décalées, comme des lignes de code indentées.
 *  - Forme B « SILHOUETTE » : les mêmes points redistribués sur un profil
 *                             de buste tourné (lathe), une silhouette humaine.
 *
 * Les deux tableaux partagent le même nombre de points et le même index,
 * afin que le morph se fasse point à point dans le vertex shader.
 */

export type MorphGeometry = {
  /** Positions forme A (code) — xyz plat. */
  codePositions: Float32Array;
  /** Positions forme B (silhouette) — xyz plat. */
  silhouettePositions: Float32Array;
  /** Facteur aléatoire par point (0..1) pour désynchroniser le morph. */
  seeds: Float32Array;
  count: number;
};

/** Profil (rayon en fonction de la hauteur normalisée t ∈ [0,1]) d'un buste. */
function bustProfile(t: number): number {
  // t=0 bas (épaules larges) → t=1 haut (tête). Silhouette stylisée.
  if (t < 0.28) {
    // épaules / torse : large, se resserre vers la taille du cou
    return 0.62 - t * 0.6;
  }
  if (t < 0.42) {
    // cou : fin
    return 0.14;
  }
  if (t < 0.85) {
    // tête : ovale
    const h = (t - 0.42) / 0.43; // 0..1 sur la tête
    return 0.34 * Math.sin(h * Math.PI) + 0.12;
  }
  // sommet du crâne
  return Math.max(0.02, 0.2 * (1 - (t - 0.85) / 0.15));
}

/**
 * Construit les géométries. `count` est ajusté selon l'appareil pour la perf.
 */
export function buildMorphGeometry(count: number): MorphGeometry {
  const code = new Float32Array(count * 3);
  const silhouette = new Float32Array(count * 3);
  const seeds = new Float32Array(count);

  const ROWS = 16; // nombre de « lignes de code »
  const rowHeight = 2.6 / ROWS;

  for (let i = 0; i < count; i++) {
    const seed = Math.random();
    seeds[i] = seed;

    // ---- Forme A : lignes de code ------------------------------------
    const row = i % ROWS;
    // longueur de la ligne variable (indentation façon code)
    const indent = ((row * 37) % 5) * 0.12;
    const lineLen = 1.6 - indent - ((row * 13) % 4) * 0.12;
    const cx = -0.9 + indent + Math.random() * Math.max(0.2, lineLen);
    const cy = 1.3 - row * rowHeight - (Math.random() - 0.5) * rowHeight * 0.5;
    const cz = (Math.random() - 0.5) * 0.25;
    code[i * 3] = cx;
    code[i * 3 + 1] = cy;
    code[i * 3 + 2] = cz;

    // ---- Forme B : silhouette (lathe) --------------------------------
    const t = Math.random(); // hauteur normalisée
    const theta = Math.random() * Math.PI * 2;
    const radius = bustProfile(t);
    // léger bruit pour un rendu « nuage » plutôt que surface parfaite
    const jitter = 1 + (Math.random() - 0.5) * 0.12;
    const sx = Math.cos(theta) * radius * jitter;
    const sy = t * 2.6 - 1.3; // recentre verticalement
    // on aplatit légèrement en z pour donner une profondeur de buste
    const sz = Math.sin(theta) * radius * 0.72 * jitter;
    silhouette[i * 3] = sx;
    silhouette[i * 3 + 1] = sy;
    silhouette[i * 3 + 2] = sz;
  }

  return { codePositions: code, silhouettePositions: silhouette, seeds, count };
}
