import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { aboutBio, aboutCapabilities, aboutDepth } from '@/data/about';
import { awards } from '@/data/awards';
import { experience } from '@/data/experience';
import { openSourceProjects } from '@/data/opensource';
import { philosophyStats } from '@/data/philosophy';
import { products } from '@/data/products';
import { site } from '@/config/site';
import { cloneCommand, registryFor } from '@/utils/registry';

// Runs against `npm run build` output; skipped when dist/ has not been built.
const dist = join(process.cwd(), 'dist');
const built = existsSync(join(dist, 'index.html'));

function fileFor(route: string): string {
  if (/\.(md|txt|jpg|svg|xml|pdf)$/.test(route)) return join(dist, route);
  return join(dist, route, 'index.html');
}

function html(route: string): string {
  return readFileSync(fileFor(route), 'utf8');
}

function text(route: string): string {
  return toText(html(route));
}

function toText(markup: string): string {
  return markup
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ');
}

function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return path.endsWith('.html') ? [path] : [];
  });
}

const pageRoutes = [
  '/',
  '/about',
  '/experience',
  ...experience.map((entry) => `/experience/${entry.id}`),
  '/projects',
  ...products.map((product) => `/projects/${product.slug}`),
  '/opensource',
  ...openSourceProjects.map((project) => `/opensource/${project.slug}`),
  '/resume',
  '/resume-print',
];

const fileRoutes = [
  '/experience.md',
  ...experience.map((entry) => `/experience/${entry.id}.md`),
  '/projects.md',
  ...products.map((product) => `/projects/${product.slug}.md`),
  '/opensource.md',
  ...openSourceProjects.map((project) => `/opensource/${project.slug}.md`),
  '/llms.txt',
  '/llms-full.txt',
  '/images/profile.jpg',
  '/sitemap.xml',
  site.resumePath,
];

describe.skipIf(!built)('built site', () => {
  it('keeps every SEO URL', () => {
    const missing = [...pageRoutes, ...fileRoutes].filter((route) => !existsSync(fileFor(route)));
    expect(missing).toEqual([]);
    expect(existsSync(join(dist, 'experience', 'earlier', 'index.html'))).toBe(true);
  });

  it('adds no redesign-only routes', () => {
    expect(existsSync(join(dist, 'work'))).toBe(false);
    expect(existsSync(join(dist, 'open-source'))).toBe(false);
  });

  it('lists every page in the sitemap', () => {
    const sitemap = readFileSync(join(dist, 'sitemap-0.xml'), 'utf8');
    const locs = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1]);
    for (const route of pageRoutes.filter((r) => !r.startsWith('/resume'))) {
      expect(locs, route).toContain(route === '/' ? '/' : `${route}/`);
    }
  });

  it('never links to canvases or ships canvas prose', () => {
    for (const file of htmlFiles(dist)) {
      const markup = readFileSync(file, 'utf8');
      expect(markup, file).not.toContain('.dc.html');
      expect(markup, file).not.toContain('site-data.js');
      expect(markup, file).not.toContain('Building production AI — not prototype');
      expect(markup, file).not.toContain('Taking ideas from a whiteboard to produc');
    }
  });

  it('keeps resume-print off the index and out of the header', () => {
    expect(html('/resume-print')).toContain('name="robots" content="noindex"');
    expect(html('/')).not.toContain('href="/resume-print"');
  });

  it('keeps the full About content', () => {
    const about = text('/about');
    for (const paragraph of aboutBio) expect(about).toContain(toText(paragraph).trim());
    for (const item of aboutCapabilities) expect(about).toContain(item.description);
    for (const item of aboutDepth) {
      expect(about).toContain(item.area);
      expect(about).toContain(item.evidence);
    }
    for (const stat of philosophyStats) expect(about).toContain(stat.label);
    for (const award of awards) expect(about).toContain(award.title);
  });

  it('keeps every experience role write-up', () => {
    for (const entry of experience) {
      const page = text(`/experience/${entry.id}`);
      const index = text('/experience');
      for (const content of [page, index]) {
        expect(content).toContain(entry.summary);
        for (const item of entry.items ?? []) expect(content).toContain(item);
        for (const column of entry.columns ?? []) {
          expect(content).toContain(column.title);
          for (const item of column.items) expect(content).toContain(item);
        }
        for (const metric of entry.metrics ?? []) expect(content).toContain(metric.label);
        if (entry.extra) expect(content).toContain(entry.extra.description);
        for (const earlier of entry.earlierEntries ?? []) expect(content).toContain(earlier.summary);
      }
    }
  });

  it('keeps every project write-up', () => {
    for (const product of products) {
      const route = `/projects/${product.slug}`;
      const page = text(route);
      expect(page).toContain(product.tagline);
      if (product.context) expect(page).toContain(product.context);
      if (product.confidentialNote) expect(page).toContain(product.confidentialNote);
      if (product.evaluation) expect(page).toContain(product.evaluation);
      if (product.architectureSvg) expect(html(route)).toContain(product.architectureSvg);
      const lines = [
        ...product.stack,
        ...(product.constraints ?? []),
        ...product.overview.problem,
        ...product.overview.solution,
        ...product.overview.outcome,
        ...product.impact.map((item) => item.label),
        ...product.howItWorks.flatMap((step) => [step.stage, step.detail]),
        ...product.decisions.flatMap((item) => [item.title, item.detail]),
        ...product.reflections.map((item) => item.title),
      ];
      for (const line of lines) expect(page, `${route}: ${line}`).toContain(line);
      expect(text('/projects'), product.slug).toContain(product.description);
    }
  });

  it('keeps every open-source write-up and install command', () => {
    for (const project of openSourceProjects) {
      const route = `/opensource/${project.slug}`;
      const page = text(route);
      expect(page).toContain(project.tagline);
      expect(page).toContain(project.description);
      expect(page).toContain(cloneCommand(project));
      const registry = registryFor(project);
      if (registry) expect(page).toContain(registry.install);
      if (project.evaluation) expect(page).toContain(project.evaluation);
      if (project.architectureSvg) expect(html(route)).toContain(project.architectureSvg);
      const lines = [
        ...project.tags,
        ...project.overview.problem,
        ...project.overview.solution,
        ...project.overview.outcome,
        ...project.stats.map((item) => item.label),
        ...project.howItWorks.flatMap((step) => [step.stage, step.detail]),
        ...project.decisions.flatMap((item) => [item.title, item.detail]),
        ...project.reflections.map((item) => item.title),
      ];
      for (const line of lines) expect(page, `${route}: ${line}`).toContain(line);
      expect(text('/opensource'), project.slug).toContain(project.description);
    }
  });

  it('keeps the Case Studies SEO title on /projects', () => {
    expect(html('/projects')).toContain(`<title>Case Studies — ${site.name}</title>`);
  });

  it('generates markdown and llms files from live data', () => {
    const llms = readFileSync(fileFor('/llms.txt'), 'utf8');
    for (const product of products) expect(llms).toContain(product.title);
    const graphrag = readFileSync(fileFor('/projects/graphrag.md'), 'utf8');
    const product = products.find((item) => item.slug === 'graphrag')!;
    for (const decision of product.decisions) expect(graphrag).toContain(decision.title);
  });
});
