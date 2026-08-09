import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// Custom domain: https://siddharthd.dev (GitHub Pages user site)
export default defineConfig({
  site: 'https://siddharthd.dev',
  base: '/',
  integrations: [tailwind(), sitemap(), mdx()],
  output: 'static',
});
