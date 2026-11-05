/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        ink: 'var(--ink)',
        soft: 'var(--soft)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        card: 'var(--card)',
        card2: 'var(--card2)',
        acc: 'var(--acc)',
        amber: 'var(--amber)',
      },
      fontFamily: {
        sans: ['Figtree', 'system-ui', 'sans-serif'],
        display: ['Newsreader', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '1180px',
      },
    },
  },
  plugins: [],
};
