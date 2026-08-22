import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// Custom domain: https://siddharthdeshpande.com (GitHub Pages user site)
export default defineConfig({
  site: 'https://siddharthdeshpande.com',
  base: '/',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) =>
        !page.includes('/draft') &&
        !page.endsWith('.md') &&
        !page.endsWith('.txt') &&
        !page.includes('/resume-print'),
    }),
    mdx(),
  ],
  output: 'static',
  vite: {
    server: {
      watch: {
        // Cursor/agent edits can miss native FS events on macOS; polling keeps HMR reliable.
        usePolling: true,
        interval: 300,
      },
    },
  },
});
