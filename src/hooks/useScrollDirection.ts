import { useEffect, useRef } from 'react';

/**
 * Suit le sens du scroll sans provoquer de re-render (ref mutable).
 * Utilisé pour jouer les animations de ballons dans le sens du parcours.
 */
export function useScrollDirection() {
  const dir = useRef<'down' | 'up'>('down');

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) > 4) {
        dir.current = y > last ? 'down' : 'up';
        last = y;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return dir;
}
