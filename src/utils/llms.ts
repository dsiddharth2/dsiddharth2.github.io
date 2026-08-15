import { site, getSiteUrl } from '@/config/site';
import { products, type Product } from '@/data/products';
import { openSourceProjects, type OpenSourceProject } from '@/data/opensource';
import {
  experience,
  experienceTitle,
  experienceDescription,
  type ExperienceEntry,
} from '@/data/experience';

export function productMarkdown(product: Product): string {
  const url = getSiteUrl(`/projects/${product.slug}`);
  const impact = product.impact.map((item) => `- **${item.metric}** — ${item.label}`).join('\n');
  const list = (items: string[]) => items.map((item) => `- ${item}`).join('\n');
  const howItWorks = product.howItWorks
    .map((step, index) => `${index + 1}. **${step.stage}** — ${step.detail}`)
    .join('\n');
  const decisions = product.decisions
    .map((item) => `- **${item.title}** — ${item.detail}`)
    .join('\n');
  const reflections = product.reflections.map((item) => `- **${item.title}** — ${item.detail}`).join('\n');
  const evaluation = product.evaluation ? `\n## Evaluation\n\n${product.evaluation}\n` : '';
  const note = product.confidentialNote ? `\n- **Note:** ${product.confidentialNote}` : '';

  return `# ${product.title}

> ${product.subtitle}

${product.tagline}

- **Page:** ${url}
- **Built at:** ${product.company}${note}
- **Tech stack:** ${product.stack.join(', ')}

## Impact

${impact}

## Problem

${list(product.overview.problem)}

## Solution

${list(product.overview.solution)}

## Outcome

${list(product.overview.outcome)}

## How it works

${howItWorks}

## Key decisions

${decisions}
${evaluation}
## What I'd change

${reflections}
`;
}

export function openSourceMarkdown(project: OpenSourceProject): string {
  const url = getSiteUrl(`/opensource/${project.slug}`);
  const stats = project.stats.map((item) => `- **${item.metric}** — ${item.label}`).join('\n');
  const list = (items: string[]) => items.map((item) => `- ${item}`).join('\n');
  const howItWorks = project.howItWorks
    .map((step, index) => `${index + 1}. **${step.stage}** — ${step.detail}`)
    .join('\n');
  const decisions = project.decisions
    .map((item) => `- **${item.title}** — ${item.detail}`)
    .join('\n');
  const reflections = project.reflections.map((item) => `- **${item.title}** — ${item.detail}`).join('\n');
  const packagist = project.packagist ? `\n- **Packagist:** ${project.packagist}` : '';
  const npm = project.npmUrl ? `\n- **npm:** ${project.npmUrl}` : '';
  const vault = project.vaultUrl ? `\n- **Official vault:** ${project.vaultUrl}` : '';
  const dockerHub = project.dockerHub ? `\n- **Docker Hub:** ${project.dockerHub}` : '';
  const demo = project.demoUrl ? `\n- **Demos:** ${project.demoUrl}` : '';
  const evaluation = project.evaluation ? `\n## Evaluation\n\n${project.evaluation}\n` : '';

  return `# ${project.title}

> ${project.subtitle}

${project.tagline}

- **Page:** ${url}
- **Repository:** ${project.url}${packagist}${npm}${vault}${dockerHub}${demo}
- **Language:** ${project.language}
- **Tech stack:** ${project.tags.join(', ')}

## Stats

${stats}

## Problem

${list(project.overview.problem)}

## Solution

${list(project.overview.solution)}

## Outcome

${list(project.overview.outcome)}

## How it works

${howItWorks}

## Key decisions

${decisions}
${evaluation}
## What I'd change

${reflections}
`;
}

export function experienceMarkdown(entry: ExperienceEntry): string {
  const url = getSiteUrl(`/experience/${entry.id}`);
  const blocks: string[] = [`# ${entry.company}`];

  if (entry.role) {
    blocks.push(`> ${entry.role}`);
  }

  blocks.push(experienceDescription(entry));
  blocks.push(`- **Page:** ${url}\n- **Period:** ${entry.period}`);

  if (entry.metrics?.length) {
    const metrics = entry.metrics.map((item) => `- **${item.value}** — ${item.label}`).join('\n');
    blocks.push(`## Impact\n\n${metrics}`);
  }

  if (entry.items?.length) {
    const work = entry.items.map((item, index) => `${index + 1}. ${item}`).join('\n');
    blocks.push(`## What I shipped\n\n${work}`);
  }

  for (const column of entry.columns ?? []) {
    const items = column.items.map((item) => `- ${item}`).join('\n');
    blocks.push(`## ${column.title}\n\n${items}`);
  }

  if (entry.extra) {
    blocks.push(`## ${entry.extra.title}\n\n${entry.extra.description}`);
  }

  if (entry.earlierEntries?.length) {
    const earlier = entry.earlierEntries
      .map((item) => `### ${item.company}\n\n> ${item.role}\n\n${item.summary}`)
      .join('\n\n');
    blocks.push(`## Earlier roles\n\n${earlier}`);
  }

  return `${blocks.join('\n\n')}\n`;
}

export function experienceIndexMarkdown(): string {
  const items = experience
    .map((entry) => {
      const md = getSiteUrl(`/experience/${entry.id}.md`);
      return `- [${experienceTitle(entry)}](${md}): ${entry.period}`;
    })
    .join('\n');

  return `# Experience — ${site.name}

> 12 years shipping production systems — from a training institute and 0-to-1 products through logistics ERP and an AI platform serving 300+ facilities.

${items}
`;
}

export function productsIndexMarkdown(): string {
  const items = products
    .map((product) => {
      const md = getSiteUrl(`/projects/${product.slug}.md`);
      return `- [${product.title}](${md}): ${product.subtitle}`;
    })
    .join('\n');

  return `# Products — ${site.name}

> Systems architected and shipped across knowledge graphs, multi-agent AI, FinOps, search, logistics, and analytics.

${items}
`;
}

export function openSourceIndexMarkdown(): string {
  const items = openSourceProjects
    .map((project) => {
      const md = getSiteUrl(`/opensource/${project.slug}.md`);
      return `- [${project.title}](${md}): ${project.subtitle}`;
    })
    .join('\n');

  return `# Open Source — ${site.name}

> Tools built in public — package managers, review pipelines, libraries, and UI plugins.

${items}
`;
}

export function llmsTxt(): string {
  const productLinks = products
    .map((product) => {
      const md = getSiteUrl(`/projects/${product.slug}.md`);
      return `- [${product.title}](${md}): ${product.subtitle}`;
    })
    .join('\n');

  const ossLinks = openSourceProjects
    .map((project) => {
      const md = getSiteUrl(`/opensource/${project.slug}.md`);
      return `- [${project.title}](${md}): ${project.subtitle}`;
    })
    .join('\n');

  const experienceLinks = experience
    .map((entry) => {
      const md = getSiteUrl(`/experience/${entry.id}.md`);
      return `- [${experienceTitle(entry)}](${md}): ${entry.period}`;
    })
    .join('\n');

  return `# ${site.name}

> Associate Architect · AI & Cloud Systems. Builds 0-to-1 products and enterprise platforms.

${site.description}

## Experience

${experienceLinks}

## Products

${productLinks}

## Open Source

${ossLinks}

## Pages

- [Homepage](${getSiteUrl('/')}): ${site.description}
- [About](${getSiteUrl('/about')}): Background, capabilities, and technical expertise
- [Experience index](${getSiteUrl('/experience.md')}): Roles and impact
- [Products index](${getSiteUrl('/projects.md')}): All shipped systems
- [Open Source index](${getSiteUrl('/opensource.md')}): All public repositories
- [Full text](${getSiteUrl('/llms-full.txt')}): Complete markdown for every project

## Contact

- GitHub: ${site.github}
- LinkedIn: ${site.linkedin}
- Medium: ${site.medium}
- Email: ${site.email}
`;
}

export function llmsFullTxt(): string {
  const experienceBlocks = experience.map(experienceMarkdown).join('\n---\n\n');
  const productBlocks = products.map(productMarkdown).join('\n---\n\n');
  const ossBlocks = openSourceProjects.map(openSourceMarkdown).join('\n---\n\n');

  return `# ${site.name} — full project text

> Machine-readable dump of every role, product, and open-source project.

## Experience

${experienceBlocks}

## Products

${productBlocks}

## Open Source

${ossBlocks}
`;
}

export function markdownResponse(body: string): Response {
  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
