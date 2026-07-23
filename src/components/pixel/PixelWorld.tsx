import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Décor « jeu de plateforme » 100% original (aucun asset sous licence).
 * Trois calques de parallax en pixel-art dessinés à la main (nuages, collines,
 * plateformes/blocs, pièces, petites créatures « blob »). Ils dérivent au
 * scroll et suivent légèrement la souris. Palette encre / papier / rouge.
 */
export default function PixelWorld() {
  const rootRef = useRef<HTMLDivElement>(null);
  const farRef = useRef<SVGGElement>(null);
  const midRef = useRef<SVGGElement>(null);
  const nearRef = useRef<SVGGElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Parallax au scroll : chaque calque monte à une vitesse différente.
      const layers = [
        { el: farRef.current, y: -30 },
        { el: midRef.current, y: -80 },
        { el: nearRef.current, y: -150 },
      ];
      layers.forEach(({ el, y }) => {
        gsap.to(el, {
          y,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
        });
      });
    }, root);

    // Dérive horizontale douce à la souris.
    const onMove = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      gsap.to(farRef.current, { x: cx * 6, duration: 0.6, overwrite: 'auto' });
      gsap.to(midRef.current, { x: cx * 14, duration: 0.6, overwrite: 'auto' });
      gsap.to(nearRef.current, { x: cx * 24, duration: 0.6, overwrite: 'auto' });
    };
    window.addEventListener('mousemove', onMove);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', onMove);
    };
  }, [reduced]);

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        className="h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMax slice"
        shapeRendering="crispEdges"
      >
        {/* ---------- Calque lointain : nuages ---------- */}
        <g ref={farRef} opacity="0.5">
          <Cloud x={120} y={110} s={5} />
          <Cloud x={820} y={80} s={6} />
          <Cloud x={520} y={180} s={4} />
        </g>

        {/* ---------- Calque intermédiaire : collines + plateformes ---------- */}
        <g ref={midRef} opacity="0.7">
          <Hill x={-40} y={560} w={360} steps={6} />
          <Hill x={760} y={600} w={420} steps={7} />
          <Block x={280} y={300} />
          <Block x={324} y={300} red />
          <Block x={368} y={300} />
          <Platform x={900} y={360} len={4} />
        </g>

        {/* ---------- Calque proche : sol, pièces, créatures ---------- */}
        <g ref={nearRef}>
          {/* Sol pixelisé */}
          <g>
            <rect x="0" y="740" width="1200" height="60" fill="#0A0A0A" />
            <rect x="0" y="740" width="1200" height="10" fill="#E4E4E0" />
            {Array.from({ length: 40 }).map((_, i) => (
              <rect key={i} x={i * 30} y={740} width="2" height="60" fill="#1c1c1c" />
            ))}
          </g>
          <Coin x={470} y={250} />
          <Coin x={700} y={690} />
          <Platform x={150} y={470} len={3} />
          <Blob x={180} y={430} />
          <Blob x={980} y={700} red />
          <Block x={620} y={180} red />
        </g>
      </svg>
    </div>
  );
}

/* --------------------- Briques de pixel-art (SVG) --------------------- */

function px(n: number, s: number) {
  return n * s;
}

/** Nuage : amas de blocs blancs cerclés. */
function Cloud({ x, y, s }: { x: number; y: number; s: number }) {
  const cells: [number, number][] = [
    [1, 0], [2, 0], [3, 0],
    [0, 1], [1, 1], [2, 1], [3, 1], [4, 1],
    [1, 2], [2, 2], [3, 2],
  ];
  return (
    <g transform={`translate(${x} ${y})`}>
      {cells.map(([cx, cy], i) => (
        <rect
          key={i}
          x={px(cx, s)}
          y={px(cy, s)}
          width={s}
          height={s}
          fill="#ffffff"
          stroke="#D8D8D2"
          strokeWidth="1"
        />
      ))}
    </g>
  );
}

/** Colline en escalier (dégradé de gris). */
function Hill({ x, y, w, steps }: { x: number; y: number; w: number; steps: number }) {
  const stepH = 26;
  const rows = Array.from({ length: steps });
  return (
    <g transform={`translate(${x} ${y})`}>
      {rows.map((_, i) => {
        const inset = (i * w) / (steps * 2.2);
        return (
          <rect
            key={i}
            x={inset}
            y={-i * stepH}
            width={w - inset * 2}
            height={stepH + 1}
            fill={i % 2 ? '#ECECE8' : '#E2E2DC'}
          />
        );
      })}
    </g>
  );
}

/** Bloc « ? » revisité : carré cerclé avec un point central (rouge en option). */
function Block({ x, y, red = false }: { x: number; y: number; red?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="40" height="40" fill="#FBFBF9" stroke="#0A0A0A" strokeWidth="3" />
      <rect x="6" y="6" width="6" height="6" fill="#0A0A0A" />
      <rect x="28" y="6" width="6" height="6" fill="#0A0A0A" />
      <rect x="6" y="28" width="6" height="6" fill="#0A0A0A" />
      <rect x="28" y="28" width="6" height="6" fill="#0A0A0A" />
      <rect x="16" y="16" width="8" height="8" fill={red ? '#E4002B' : '#0A0A0A'} />
    </g>
  );
}

/** Petite plateforme flottante (rangée de blocs). */
function Platform({ x, y, len }: { x: number; y: number; len: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: len }).map((_, i) => (
        <rect
          key={i}
          x={i * 28}
          y={0}
          width="28"
          height="16"
          fill="#0A0A0A"
          stroke="#FBFBF9"
          strokeWidth="1"
        />
      ))}
    </g>
  );
}

/** Pièce (octogone rouge à reflet). */
function Coin({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="6" y="0" width="12" height="24" fill="#E4002B" />
      <rect x="0" y="6" width="24" height="12" fill="#E4002B" />
      <rect x="3" y="3" width="18" height="18" fill="#E4002B" />
      <rect x="8" y="4" width="3" height="16" fill="#ff6b8a" />
    </g>
  );
}

/** Créature « blob » originale : corps arrondi + deux yeux. */
function Blob({ x, y, red = false }: { x: number; y: number; red?: boolean }) {
  const body = red ? '#E4002B' : '#0A0A0A';
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="6" y="0" width="24" height="6" fill={body} />
      <rect x="0" y="6" width="36" height="24" fill={body} />
      <rect x="6" y="30" width="8" height="6" fill={body} />
      <rect x="22" y="30" width="8" height="6" fill={body} />
      {/* Yeux */}
      <rect x="9" y="12" width="7" height="9" fill="#fff" />
      <rect x="21" y="12" width="7" height="9" fill="#fff" />
      <rect x="12" y="15" width="3" height="4" fill="#0A0A0A" />
      <rect x="24" y="15" width="3" height="4" fill="#0A0A0A" />
    </g>
  );
}
