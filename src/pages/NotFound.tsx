import { Link } from 'react-router-dom';
import PageTransition from '../components/ui/PageTransition';

export default function NotFound() {
  return (
    <PageTransition>
      <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="tech-label mb-4 text-signal">// erreur 404</p>
        <h1 className="text-display-lg">
          Page<br />introuvable
        </h1>
        <p className="mt-6 max-w-md text-smoke">
          Cette route n'existe pas — un peu comme un shooting sans lumière. Revenons
          au cadre.
        </p>
        <Link to="/" className="btn-primary mt-8">
          ← Retour à l'accueil
        </Link>
      </section>
    </PageTransition>
  );
}
