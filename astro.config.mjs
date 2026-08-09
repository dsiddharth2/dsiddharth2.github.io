import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// GitHub Pages user site: https://dsiddharth2.github.io/
// When adding a custom domain, update `site` and keep `base: '/'`.
// See README.md for custom domain setup instructions.
export default defineConfig({
  site: 'https://dsiddharth2.github.io',
  base: '/',
  integrations: [tailwind(), sitemap(), mdx()],
  output: 'static',
});
