import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '../ui/SectionHeading';
import { SPORTS, type Sport } from '../../data/sports';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section « Centres d'intérêt — Sport ».
 * Au scroll, un ballon de basket (dribble) et un ballon de volley (service)
 * balaient la rangée et « révèlent » les 3 cartes de sport (essuyage clip-path).
 */
export default function SportsSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const basketRef = useRef<HTMLDivElement>(null);
  const volleyRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cards = gsap.utils.toArray<HTMLElement>('.sport-card', root);

    if (reduced) {
      // Pas d'animation : tout est visible d'emblée.
      gsap.set(cards, { clipPath: 'inset(0 0 0 0)', opacity: 1 });
      gsap.set([basketRef.current, volleyRef.current], { autoAlpha: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const basket = basketRef.current!;
      const volley = volleyRef.current!;
      const basketBall = basket.firstElementChild as HTMLElement;

      const build = (reverse: boolean) => {
        // Sens de traversée : inversé si l'on remonte la page.
        const from = reverse ? '108%' : '-12%';
        const to = reverse ? '-12%' : '108%';

        gsap.set(cards, { clipPath: 'inset(0 100% 0 0)', opacity: 0 });
        gsap.set(basket, { left: from, autoAlpha: 1, y: -140, scaleX: 1, scaleY: 1 });
        gsap.set(volley, { left: to, autoAlpha: 1, y: 0 });

        const tl = gsap.timeline();

        // ---- BASKET : dribble (translation + rebonds + squash & stretch) ----
        tl.to(basket, { left: to, duration: 2.0, ease: 'none' }, 0)
          .to(basketBall, { rotation: reverse ? -1080 : 1080, duration: 2.0, ease: 'none' }, 0);

        // 4 rebonds : chute (bounce.out) puis remontée (power2.out).
        const bounces = [
          { h: 140, d: 0.42 },
          { h: 100, d: 0.36 },
          { h: 62, d: 0.3 },
          { h: 34, d: 0.24 },
        ];
        // Position de départ : à la hauteur du premier rebond.
        gsap.set(basket, { y: -bounces[0].h });
        let t = 0;
        bounces.forEach(({ d }, i) => {
          // Chute jusqu'au sol.
          tl.to(basket, { y: 0, duration: d, ease: 'power2.in' }, t);
          t += d;
          // Impact : compression (squash) puis reprise (stretch).
          tl.to(basketBall, { scaleX: 1.22, scaleY: 0.78, duration: 0.07, ease: 'power2.out' }, t)
            .to(basketBall, { scaleX: 1, scaleY: 1, duration: 0.14, ease: 'elastic.out(1, 0.45)' }, t + 0.07);
          // Remontée (sauf après le dernier rebond).
          if (i < bounces.length - 1) {
            const next = bounces[i + 1].h;
            tl.to(basket, { y: -next, duration: d * 0.85, ease: 'power2.out' }, t + 0.05);
            t += d * 0.85;
          }
        });

        // ---- Révélation des cartes au passage du ballon ----
        tl.to(
          cards,
          {
            clipPath: 'inset(0 0% 0 0)',
            opacity: 1,
            duration: 0.6,
            stagger: { each: 0.3, from: reverse ? 'end' : 'start' },
            ease: 'power2.out',
          },
          0.4
        );

        // ---- VOLLEY : service en topspin (rotation rapide, trajectoire tendue) ----
        tl.to(volley, { left: from, duration: 1.5, ease: 'power1.inOut' }, 0.55)
          // Rotation rapide sur lui-même = effet lifté.
          .to(
            volley.firstElementChild,
            { rotation: reverse ? 1800 : -1800, duration: 1.5, ease: 'none' },
            0.55
          )
          // Trajectoire légèrement courbée (monte puis retombe).
          .to(volley, { y: -90, duration: 0.6, ease: 'power2.out' }, 0.55)
          .to(volley, { y: 20, duration: 0.9, ease: 'power2.in' }, 1.15);

        tl.to([basket, volley], { autoAlpha: 0, duration: 0.3 }, '>-0.15');
        return tl;
      };

      let tl = build(false);

      ScrollTrigger.create({
        trigger: root,
        start: 'top 75%',
        end: 'bottom 25%',
        onEnter: () => {
          tl.kill();
          tl = build(false);
        },
        // Retour en arrière : on rejoue la traversée en sens inverse.
        onEnterBack: () => {
          tl.kill();
          tl = build(true);
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={rootRef} className="mt-24">
      <SectionHeading eyebrow="Centres d'intérêt" title="Le sport, mon autre terrain" className="mb-8" />

      {/* Piste de révélation : les ballons balaient au-dessus des cartes. */}
      <div className="relative">
        {/* Ballons (au-dessus, animés au scroll) */}
        <div ref={basketRef} className="sport-ball z-10" aria-hidden="true">
          <BasketBall />
        </div>
        <div ref={volleyRef} className="sport-ball z-10" aria-hidden="true">
          <VolleyBall />
        </div>

        {/* 3 cartes sport */}
        <div className="grid gap-6 md:grid-cols-3">
          {SPORTS.map((sport) => (
            <div key={sport.id} className="sport-card">
              <SportCard sport={sport} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SportCard({ sport }: { sport: Sport }) {
  return (
    <article className="group flex h-full flex-col border border-line transition-colors duration-300 hover:border-signal">
      <SportPhoto sport={sport} />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <SportLogo sport={sport} />
          <div>
            <h3 className="font-display text-xl leading-none">{sport.discipline}</h3>
            <p className="mt-1 font-mono text-xs text-smoke">{sport.club}</p>
          </div>
        </div>

        <dl className="mt-4 space-y-1 font-mono text-xs text-smoke">
          <div className="flex justify-between gap-2">
            <dt className="text-ink/50">Lieu</dt>
            <dd className="text-right text-ink/80">{sport.location}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-ink/50">Durée</dt>
            <dd className="text-right text-ink/80">{sport.years}</dd>
          </div>
        </dl>

        <p className="mt-4 text-sm leading-relaxed text-ink/80">{sport.note}</p>
      </div>
    </article>
  );
}

/** Photo du sport, avec repli propre si le fichier est absent. */
function SportPhoto({ sport }: { sport: Sport }) {
  const [failed, setFailed] = useState(false);
  if (!sport.photo || failed) {
    return (
      <div className="bg-grid flex aspect-[4/3] items-center justify-center border-b border-line bg-paper">
        <span className="font-mono text-[10px] text-smoke/60">photo · {sport.discipline}</span>
      </div>
    );
  }
  return (
    <img
      src={sport.photo}
      alt={`Mattis Daquin — ${sport.discipline}`}
      loading="lazy"
      onError={() => setFailed(true)}
      className="aspect-[4/3] w-full border-b border-line object-cover"
    />
  );
}

/** Logo du club, avec repli (initiales) si absent. */
function SportLogo({ sport }: { sport: Sport }) {
  const [failed, setFailed] = useState(false);
  const box = 'grid h-11 w-11 shrink-0 place-items-center overflow-hidden border border-line bg-white';
  if (!sport.logo || failed) {
    return (
      <div className={`${box} font-display text-sm text-ink`} aria-hidden="true">
        {sport.club.slice(0, 3)}
      </div>
    );
  }
  return (
    <div className={box}>
      <img
        src={sport.logo}
        alt={`Logo ${sport.club}`}
        className="h-full w-full object-contain p-1"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

/* --------------------- Ballons réalistes (SVG) --------------------- */

function BasketBall() {
  return (
    <svg viewBox="0 0 64 64" width="60" height="60" role="img" aria-label="ballon de basket">
      <defs>
        <radialGradient id="bball" cx="38%" cy="30%" r="78%">
          <stop offset="0%" stopColor="#F6A860" />
          <stop offset="55%" stopColor="#E1772A" />
          <stop offset="100%" stopColor="#A94D18" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#bball)" />
      <g fill="none" stroke="#2A1608" strokeWidth="2" strokeLinecap="round">
        <line x1="32" y1="2" x2="32" y2="62" />
        <line x1="2" y1="32" x2="62" y2="32" />
        <path d="M10 9c9 8 13 30 6 46" />
        <path d="M54 9c-9 8-13 30-6 46" />
      </g>
      {/* Reflet */}
      <ellipse cx="23" cy="20" rx="10" ry="6" fill="#fff" opacity="0.18" />
    </svg>
  );
}

function VolleyBall() {
  return (
    <svg viewBox="0 0 64 64" width="60" height="60" role="img" aria-label="ballon de volley">
      <defs>
        <radialGradient id="vball" cx="38%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#EEF1F5" />
          <stop offset="100%" stopColor="#C6CCD5" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#vball)" stroke="#C6CCD5" strokeWidth="1" />
      <g fill="none" stroke="#8A94A2" strokeWidth="1.8" strokeLinecap="round">
        <path d="M32 2c-7 10-8 26-4 60" />
        <path d="M32 2c7 10 8 26 4 60" />
        <path d="M4 26c11 5 25 6 43 1" />
        <path d="M6 44c9-6 22-7 34-4" />
        <path d="M2 32c9-3 15-11 20-27" />
        <path d="M62 32c-9-3-15-11-20-27" />
      </g>
      <ellipse cx="23" cy="19" rx="9" ry="5" fill="#fff" opacity="0.5" />
    </svg>
  );
}
