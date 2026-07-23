/** Rend une icône sociale à partir d'un tracé SVG (24x24, currentColor). */
export default function SocialIcon({ path }: { path: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={path} />
    </svg>
  );
}
