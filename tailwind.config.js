/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Encre / papier / rouge signal — la palette entière du site.
        ink: '#0A0A0A',
        paper: '#FBFBF9',
        signal: '#E4002B',
        'signal-dark': '#B80023',
        smoke: '#6B6B6B',
        line: '#E4E4E0',
      },
      fontFamily: {
        // Display condensée en capitales pour les titres.
        display: ['"Archivo"', 'Impact', 'system-ui', 'sans-serif'],
        // Corps de texte neutre.
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        // Labels techniques.
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        // Accents « arcade » 8-bit (à utiliser avec parcimonie, petites tailles).
        pixel: ['"Press Start 2P"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Échelle typographique fluide (clamp) pour les grands titres.
        'display-xl': ['clamp(3rem, 12vw, 11rem)', { lineHeight: '0.88', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 8vw, 6rem)', { lineHeight: '0.92', letterSpacing: '-0.01em' }],
        'display-md': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '0.95' }],
      },
      maxWidth: {
        content: '1200px',
      },
      transitionTimingFunction: {
        signal: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
