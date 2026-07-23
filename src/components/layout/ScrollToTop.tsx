import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Remet le scroll en haut à chaque changement de route. */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}
