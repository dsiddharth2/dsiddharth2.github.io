export type OpenSourceIcon = 'plug' | 'hawk' | 'barcode' | 'grid';

export interface OpenSourceStat {
  metric: string;
  label: string;
}

export interface OpenSourceProject {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  url: string;
  tags: string[];
  icon: OpenSourceIcon;
  language: string;
  stats: OpenSourceStat[];
  highlights: string[];
  packagist?: string;
}

export const openSourceProjects: OpenSourceProject[] = [
  {
    slug: 'plug',
    title: 'Plug',
    subtitle: 'Package manager for Claude Code skills',
    description:
      'Discover, install, and manage reusable Skills, Commands, and Agents from GitHub-hosted registries — through an interactive TUI or the CLI.',
    fullDescription:
      'Plug is a package manager for Claude Code. It treats extensions like npm treats Node packages: vaults (GitHub-hosted registries), dependency resolution, and local or global install scopes. Browse community packages from PlugVault, or stand up a private vault so a team can share coding standards, security guardrails, and specialized agents without copying Markdown files around.',
    url: 'https://github.com/dsiddharth2/plug',
    tags: ['TypeScript', 'Node.js', 'TUI', 'Claude Code'],
    icon: 'plug',
    language: 'TypeScript',
    stats: [
      { metric: 'npm', label: 'plugvault on npm' },
      { metric: 'TUI', label: 'interactive browser' },
      { metric: 'Vaults', label: 'GitHub registries' },
      { metric: 'MIT', label: 'open source' },
    ],
    highlights: [
      'Interactive TUI to discover, install, update, and remove extensions',
      'Public PlugVault registry plus custom or private GitHub vaults',
      'DFS dependency resolution and smart removal with orphan pruning',
      'Install locally to .claude/ or globally to ~/.claude/',
      'Multi-file packages tracked and cleaned up correctly',
      'Offline registry cache for fast lookups',
    ],
  },
  {
    slug: 'codehawk',
    title: 'CodeHawk',
    subtitle: 'AI-powered pull request review pipeline',
    description:
      'Runs in CI, produces structured findings, scores code quality, and posts inline comments to Azure DevOps or GitHub.',
    fullDescription:
      'CodeHawk is an AI-powered pull request review pipeline that runs in CI. A two-phase architecture separates agent analysis from deterministic posting: Phase 1 reads the diff and writes findings.json; Phase 2 validates, scores with a penalty-based star rating, posts inline comments, and gates the build. It supports Azure DevOps and GitHub, fix verification on re-push, and developer controls for intentional code.',
    url: 'https://github.com/dsiddharth2/codehawk',
    tags: ['Python', 'OpenAI', 'Docker', 'Azure DevOps'],
    icon: 'hawk',
    language: 'Python',
    stats: [
      { metric: '2-phase', label: 'review architecture' },
      { metric: 'ADO + GH', label: 'VCS supported' },
      { metric: '0–5★', label: 'penalty scoring' },
      { metric: 'Docker', label: 'CI-ready image' },
    ],
    highlights: [
      'Phase 1: an LLM agent reads the PR diff and writes structured findings',
      'Phase 2: validates, scores, posts inline comments, and gates CI',
      'Fix verification on re-push — fixed, dismissed, or still-present',
      'Developer controls: # cr: intentional, .codereview.md, gate thresholds',
      'Model-agnostic: o3, GPT-4, Claude, Gemini, and more',
      'Per-run token cost tracking and a dry-run mode that never posts',
    ],
  },
  {
    slug: 'php-zxing',
    title: 'PHP ZXing',
    subtitle: 'PHP wrapper for the ZXing barcode library',
    description:
      'Composer package for reading barcodes and QR codes. 277K+ Packagist installs, 133 GitHub stars, and featured on the upstream ZXing repo.',
    fullDescription:
      'PHPZxing is a Composer-installable PHP wrapper around the ZXing Java library for reading barcodes and QR codes. It shells out to the local JRE, supports try-harder mode, multiple barcodes per image, crop, and format filters — and has been adopted widely enough to be featured on the primary ZXing GitHub repository.',
    url: 'https://github.com/dsiddharth2/php-zxing',
    packagist: 'https://packagist.org/packages/dsiddharth2/php-zxing',
    tags: ['PHP', 'Composer', 'ZXing', 'Java'],
    icon: 'barcode',
    language: 'PHP',
    stats: [
      { metric: '277K+', label: 'Packagist installs' },
      { metric: '133', label: 'GitHub stars' },
      { metric: 'Featured', label: 'on ZXing repo' },
      { metric: 'MIT', label: 'open source' },
    ],
    highlights: [
      'Composer package wrapping ZXing core.jar and javase.jar',
      'Decode a single file, a directory, or an array of images',
      'try_harder, multiple_bar_codes, crop, and possible_formats configs',
      'Typed results: ZxingImage vs ZxingBarNotFound with isFound()',
      'Configurable Java path for *nix and Windows environments',
      'Featured on the primary ZXing GitHub repository',
    ],
  },
  {
    slug: 'moo-pin',
    title: 'MooPin',
    subtitle: 'Pinterest-style column grid for MooTools',
    description:
      'Small MooTools plugin that packs tiles into a Pinterest-style column grid — including infinite-scroll galleries. Inspired by Wookmark for jQuery.',
    fullDescription:
      'MooPin is a MooTools plugin for building Pinterest-style column grids. Pass it a container of tiles and it packs items into columns, with events for window resize and re-render — useful for infinite-scroll galleries. Inspired by the Wookmark jQuery plugin and written for the MooTools ecosystem.',
    url: 'https://github.com/dsiddharth2/moo-pin',
    tags: ['JavaScript', 'MooTools', 'Layout', 'Infinite scroll'],
    icon: 'grid',
    language: 'JavaScript',
    stats: [
      { metric: 'Pinterest', label: 'column layout' },
      { metric: 'Infinite', label: 'scroll ready' },
      { metric: 'Events', label: 'resize & render' },
      { metric: 'MIT', label: 'open source' },
    ],
    highlights: [
      'Pinterest-style masonry column packing from a container of tiles',
      'Designed for infinite-scroll galleries as new items arrive',
      'onWindowResize and onRender events for layout hooks',
      'Simple API: new MooPin({ container: "main" })',
      'Inspired by the Wookmark jQuery plugin, built for MooTools',
      'Tested on Chrome and Firefox',
    ],
  },
];

export function getOpenSourceBySlug(slug: string): OpenSourceProject | undefined {
  return openSourceProjects.find((project) => project.slug === slug);
}
