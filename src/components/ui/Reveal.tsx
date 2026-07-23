import { useEffect, useRef, type ReactNode, type ElementType } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  /** Balise de rendu (div par défaut). */
  as?: ElementType;
  /** Décalage d'apparition en secondes. */
  delay?: number;
  /** Distance de translation initiale (px). */
  y?: number;
  className?: string;
};

/**
 * Révèle son contenu au scroll (fade + translation) via GSAP ScrollTrigger.
 * Si prefers-reduced-motion est actif, le contenu est affiché sans animation.
 */
export default function Reveal({ children, as, delay = 0, y = 40, className }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const Tag = (as ?? 'div') as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [reduced, delay, y]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
