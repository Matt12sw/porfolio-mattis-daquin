import * as THREE from 'three';

/**
 * Génération procédurale des textures des ballons (canvas → CanvasTexture),
 * mappées en équirectangulaire sur une sphère. 100% dessinées ici : aucun
 * logo de marque, aucun asset externe.
 */

const W = 1024;
const H = 512;

/** Bruit « grain de cuir » léger. */
function addPebble(ctx: CanvasRenderingContext2D, alpha: number) {
  ctx.save();
  for (let i = 0; i < 9000; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const r = Math.random() * 1.2 + 0.3;
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/** Ballon de basket : orange + coutures noires (2 méridiens + 2 arcs + équateur). */
export function makeBasketballTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const ctx = c.getContext('2d')!;

  // Fond orange dégradé.
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#EE8B3D');
  g.addColorStop(0.5, '#E1772A');
  g.addColorStop(1, '#C25E1C');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  addPebble(ctx, 0.06);

  ctx.strokeStyle = '#1c0f06';
  ctx.lineWidth = 9;
  ctx.lineCap = 'round';

  // Équateur.
  ctx.beginPath();
  ctx.moveTo(0, H / 2);
  ctx.lineTo(W, H / 2);
  ctx.stroke();

  // Méridiens droits (u = 0.5).
  ctx.beginPath();
  ctx.moveTo(W * 0.5, 0);
  ctx.lineTo(W * 0.5, H);
  ctx.stroke();

  // Deux coutures courbes (arcs sinusoïdaux).
  const drawCurve = (cx: number, amp: number) => {
    ctx.beginPath();
    for (let y = 0; y <= H; y += 4) {
      const x = cx + Math.sin((y / H) * Math.PI) * amp;
      if (y === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  };
  drawCurve(W * 0.02, W * 0.14);
  drawCurve(W * 0.98, -W * 0.14);

  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Ballon de volley : panneaux blanc / bleu / jaune incurvés + coutures. */
export function makeVolleyballTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const ctx = c.getContext('2d')!;

  const cols = ['#f4f6f8', '#1f4fd0', '#f2c200']; // blanc, bleu, jaune
  const bands = 6; // 6 colonnes de panneaux

  const img = ctx.createImageData(W, H);
  for (let y = 0; y < H; y++) {
    const warp = Math.sin((y / H) * Math.PI * 2) * 0.6;
    for (let x = 0; x < W; x++) {
      const u = x / W;
      const band = Math.floor(u * bands + warp);
      const col = cols[((band % 3) + 3) % 3];
      const r = parseInt(col.slice(1, 3), 16);
      const gg = parseInt(col.slice(3, 5), 16);
      const b = parseInt(col.slice(5, 7), 16);
      // Ombrage vertical léger.
      const shade = 0.82 + 0.18 * Math.sin((y / H) * Math.PI);
      const i = (y * W + x) * 4;
      img.data[i] = r * shade;
      img.data[i + 1] = gg * shade;
      img.data[i + 2] = b * shade;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  // Coutures sombres entre les panneaux (mêmes arcs que le motif).
  ctx.strokeStyle = 'rgba(20,25,40,0.55)';
  ctx.lineWidth = 3;
  for (let bIdx = 0; bIdx <= bands; bIdx++) {
    ctx.beginPath();
    for (let y = 0; y <= H; y += 4) {
      const warp = Math.sin((y / H) * Math.PI * 2) * 0.6;
      const x = ((bIdx - warp) / bands) * W;
      if (y === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  addPebble(ctx, 0.03);

  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
