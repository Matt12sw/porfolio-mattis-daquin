/** Indicateur de chargement minimal pour les pages lazy-loadées. */
export default function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <span className="tech-label animate-pulse">Chargement…</span>
    </div>
  );
}
