# Siddharth Deshpande — Personal Website

Static personal portfolio built with [Astro](https://astro.build), TypeScript, and Tailwind CSS. Deployed to GitHub Pages.

**Live URL:** https://dsiddharth2.github.io/

## Development

```bash
npm install
npm run dev
```

Open http://localhost:4321/

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── components/     # Reusable UI sections
├── config/site.ts  # Site metadata and URLs
├── content/
│   ├── projects/   # Open-source projects (markdown)
│   └── blog/       # Blog posts (markdown/MDX)
├── data/           # Structured homepage content
├── layouts/        # Base layout with SEO
└── pages/          # Routes
```

## Adding content

### New open-source project

Create `src/content/projects/my-project.md`:

```yaml
---
title: My Project
subtitle: Short tagline
description: One-line description.
url: https://github.com/dsiddharth2/my-project
featured: true
order: 4
---
```

### New blog post

Create `src/content/blog/my-post.mdx`:

```yaml
---
title: Post Title
description: Short summary for SEO and listings.
pubDate: 2026-08-08
draft: false
---

Your content here.
```

## GitHub Pages deployment

**Repo:** [dsiddharth2/dsiddharth2.github.io](https://github.com/dsiddharth2/dsiddharth2.github.io)  
**Live URL:** https://dsiddharth2.github.io/

Pushes to `main` run `.github/workflows/deploy.yml`, which builds with `base: '/'` and deploys to the user site root.

### One-time setup

1. In **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**
2. Push to `main` — deploy runs automatically

If deploy fails with `Failed to create deployment (status: 404)`, Pages is not enabled or the source is still set to a branch. Switch it to **GitHub Actions** and re-run the workflow.

### Remotes

- `origin` → `dsiddharth2.github.io` (production)
- `legacy` → `siddharthd.dev` (old project site — disable Pages there if still active)

## Custom domain (when ready)

Do **not** hardcode your domain until DNS is configured.

1. **`astro.config.mjs`** — set your domain and root base:

   ```js
   export default defineConfig({
     site: 'https://yourdomain.com',
     base: '/',
     // ...
   });
   ```

2. **`src/config/site.ts`** — set `customDomain: 'https://yourdomain.com'`

3. **`public/CNAME`** — add a file containing only your domain:

   ```
   yourdomain.com
   ```

4. **DNS** — add the records GitHub Pages shows in repo Settings → Pages → Custom domain

5. **`public/robots.txt`** — update the sitemap URL to your custom domain

## License

Private — all rights reserved.
