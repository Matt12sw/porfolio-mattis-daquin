import { useEffect, useState } from 'react';

/**
 * Hook générique de media query.
 * Sert à adapter la complexité de la scène 3D selon la taille d'écran.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Raccourci : vrai en dessous de 768px (mobile). */
export const useIsMobile = () => useMediaQuery('(max-width: 767px)');
/** Raccourci : vrai en dessous de 1024px (tablette et moins). */
export const useIsTabletOrLess = () => useMediaQuery('(max-width: 1023px)');
