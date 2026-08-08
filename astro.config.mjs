import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// GitHub Pages project site: https://dsiddharth2.github.io/siddharthd.dev/
// When adding a custom domain, update `site` and set `base: '/'`.
// See README.md for custom domain setup instructions.
export default defineConfig({
  site: 'https://dsiddharth2.github.io',
  base: '/siddharthd.dev',
  integrations: [tailwind(), sitemap(), mdx()],
  output: 'static',
});
