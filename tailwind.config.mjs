/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFFBF2',
        ink: '#1a1a1a',
        amber: {
          DEFAULT: '#F5A623',
          dark: '#D4871C',
          hover: '#B06E0A',
        },
        muted: {
          DEFAULT: '#666666',
          light: '#999999',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1100px',
      },
    },
  },
  plugins: [],
};
