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
      filter: (page) => !page.includes('/draft'),
    }),
    mdx(),
  ],
  output: 'static',
});
