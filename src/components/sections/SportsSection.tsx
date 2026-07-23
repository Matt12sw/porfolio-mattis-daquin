import { useState } from 'react';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import { SPORTS, type Sport } from '../../data/sports';

/**
 * Section « Centres d'intérêt — Sport ».
 * Un bandeau animé (ballon de volley en service + ballon de basket en dribble)
 * puis 3 cartes : une par sport, avec photo, logo du club, club, lieu et durée.
 */
export default function SportsSection() {
  return (
    <div className="mt-24">
      <SectionHeading eyebrow="Centres d'intérêt" title="Le sport, mon autre terrain" className="mb-8" />

      {/* Bandeau animé : ballons qui traversent l'écran. */}
      <div
        className="relative mb-10 h-28 overflow-hidden border-y border-line bg-grid sm:h-32"
        aria-hidden="true"
      >
        <div className="ball ball--volley">
          <VolleyBall />
        </div>
        <div className="ball ball--basket">
          <BasketBall />
        </div>
      </div>

      {/* 3 cartes sport */}
      <div className="grid gap-6 md:grid-cols-3">
        {SPORTS.map((sport, i) => (
          <Reveal key={sport.id} delay={i * 0.08}>
            <SportCard sport={sport} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function SportCard({ sport }: { sport: Sport }) {
  return (
    <article className="group flex h-full flex-col border border-line transition-colors duration-300 hover:border-signal">
      {/* Photo */}
      <SportPhoto sport={sport} />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          {/* Logo du club */}
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

/* --------------------------- Ballons (SVG) --------------------------- */

function VolleyBall() {
  return (
    <svg viewBox="0 0 48 48" width="44" height="44" role="img" aria-label="ballon de volley">
      <circle cx="24" cy="24" r="22" fill="#fff" stroke="#0A0A0A" strokeWidth="1.5" />
      <g fill="none" stroke="#0A0A0A" strokeWidth="1.5">
        <path d="M24 2c-6 8-7 20-3 44" />
        <path d="M24 2c6 8 7 20 3 44" />
        <path d="M2 24c10-3 22-3 44 0" />
        <path d="M6 10c8 6 22 8 36 4" />
        <path d="M6 38c8-6 22-8 36-4" />
      </g>
    </svg>
  );
}

function BasketBall() {
  return (
    <svg viewBox="0 0 48 48" width="44" height="44" role="img" aria-label="ballon de basket">
      <circle cx="24" cy="24" r="22" fill="#E8813A" stroke="#0A0A0A" strokeWidth="1.5" />
      <g fill="none" stroke="#0A0A0A" strokeWidth="1.5">
        <line x1="24" y1="2" x2="24" y2="46" />
        <line x1="2" y1="24" x2="46" y2="24" />
        <path d="M7 8c8 6 12 22 6 34" />
        <path d="M41 8c-8 6-12 22-6 34" />
      </g>
    </svg>
  );
}
