export type OpenSourceIcon = 'plug' | 'hawk' | 'barcode' | 'grid';

export interface OpenSourceStat {
  metric: string;
  label: string;
}

export interface OpenSourceOverview {
  problem: string[];
  solution: string[];
  outcome: string[];
}

export interface OpenSourceStage {
  stage: string;
  detail: string;
}

export interface OpenSourceDecision {
  title: string;
  detail: string;
}

export interface OpenSourceReflection {
  title: string;
  detail: string;
}

export interface OpenSourceProject {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  url: string;
  tags: string[];
  icon: OpenSourceIcon;
  language: string;
  stats: OpenSourceStat[];
  overview: OpenSourceOverview;
  /** Full-width diagram with fullscreen viewer. Omit when there is no architecture image. */
  architectureSvg?: string;
  howItWorks: OpenSourceStage[];
  decisions: OpenSourceDecision[];
  reflections: OpenSourceReflection[];
  evaluation?: string;
  packagist?: string;
  dockerHub?: string;
}

export const openSourceProjects: OpenSourceProject[] = [
  {
    slug: 'plug',
    title: 'Plug',
    subtitle: 'Package manager for Claude Code skills',
    tagline: 'Discover, install, and manage Claude Code skills like npm packages.',
    description:
      'Discover, install, and manage reusable Skills, Commands, and Agents from GitHub-hosted registries — through an interactive TUI or the CLI.',
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
    overview: {
      problem: [
        'Claude Code skills copied around as Markdown files',
        'No versioning or dependency tracking for agents',
        'Teams share standards by pasting files in Slack',
        'Discovery limited to random GitHub repositories',
        'Updates require a manual re-copy every time',
        'Local versus global install is entirely ad hoc',
      ],
      solution: [
        'Interactive TUI plus a full CLI for power users',
        'GitHub-hosted vaults acting as package registries',
        'DFS dependency resolution across packages',
        'Install locally to .claude/ or globally to ~/.claude/',
        'Public PlugVault plus custom private team vaults',
        'Offline registry cache for fast repeated lookups',
      ],
      outcome: [
        'Published as plugvault on npm for one-command install',
        'Community packages installable in seconds',
        'Teams share coding standards without copy-paste',
        'Smart removal with orphan pruning included',
        'Multi-file packages tracked and cleaned correctly',
        'MIT licensed and fully public',
      ],
    },
    howItWorks: [
      {
        stage: 'Discover',
        detail:
          'The TUI browses GitHub-hosted vaults — public PlugVault or a private team registry — and lists Skills, Commands, and Agents with versions and descriptions.',
      },
      {
        stage: 'Resolve',
        detail:
          'DFS dependency resolution walks the graph before install. Missing packages are pulled automatically; conflicts surface before anything is written to disk.',
      },
      {
        stage: 'Install',
        detail:
          'Packages land locally in .claude/ or globally in ~/.claude/. Multi-file packages are tracked so later updates and removals stay consistent.',
      },
      {
        stage: 'Maintain',
        detail:
          'Update and remove commands prune orphans, refresh the offline cache, and keep the lock of installed extensions in sync with the vault.',
      },
    ],
    decisions: [
      {
        title: 'GitHub vaults instead of a custom registry server',
        detail:
          'Teams already live on GitHub. Treating a repo as a registry meant zero new infrastructure, private vaults for free, and a contribution model people already understand.',
      },
      {
        title: 'TUI first, CLI always available',
        detail:
          'Discovery is visual — browsing skills is closer to an app store than to npm search. The TUI is the default path; every action still has a scriptable CLI equivalent.',
      },
      {
        title: 'Local and global scopes, like npm',
        detail:
          'A personal agent should not collide with a repo-level skill. Matching npm’s local vs global model made the mental model free for anyone who has used Node.',
      },
    ],
    reflections: [
      {
        title: 'A lockfile and signed packages earlier',
        detail:
          'Install reproducibility and supply-chain trust should have been first-class from day one, not a follow-up.',
      },
      {
        title: 'Clearer conflict UX when two vaults ship the same skill',
        detail:
          'Name collisions across public and private vaults are rare until they are not. A dedicated resolver UI would have saved support questions.',
      },
    ],
  },
  {
    slug: 'codehawk',
    title: 'CodeHawk',
    subtitle: 'AI-powered pull request review pipeline',
    tagline: 'An AI reviewer that reads the pull request before the lead engineer does.',
    description:
      'Runs in CI, produces structured findings, scores code quality, and posts inline comments to Azure DevOps or GitHub.',
    url: 'https://github.com/dsiddharth2/codehawk',
    dockerHub: 'https://hub.docker.com/r/dsiddharth2/codehawk',
    tags: ['Python', 'OpenAI Agents', 'Docker', 'Azure DevOps', 'GitHub'],
    icon: 'hawk',
    language: 'Python',
    stats: [
      { metric: '16', label: 'language rule sets' },
      { metric: '6', label: 'review modes' },
      { metric: '2-phase', label: 'agent then poster' },
      { metric: '394', label: 'unit tests' },
    ],
    overview: {
      problem: [
        'Last approval always landed on one lead engineer',
        'PRs sat until an hour opened up on the calendar',
        'AI-assisted changesets were getting much larger',
        'Team conventions slipping when people were in a hurry',
        'A 3-line helper change looked like a 3-line fixture',
        'Scale of impact was invisible to the reviewer',
      ],
      solution: [
        'Files risk-scored, batched ten at a time, three concurrent',
        '16 language rule sets and 6 review modes',
        'Two-phase: agent writes findings.json, engine posts',
        'AST graph for impact radius and missing tests',
        'Scan cheap, then verify expensive with tools',
        'Docker image for Azure DevOps and GitHub CI',
      ],
      outcome: [
        'Lead-engineer bottleneck off the critical path',
        'Inline comments posted without a human in the loop',
        'Configurable star rating and CI gate',
        'Re-push verifies fixes without a full re-review',
        'Dry-run and replay from the same findings.json',
        'Open-sourced after solving it on a team of ten',
      ],
    },
    architectureSvg: 'images/architecture/codehawk-architecture.svg',
    howItWorks: [
      {
        stage: 'Prepare',
        detail:
          'CI runs the container. Before any model call: fetch the PR, drop non-code files, check existing threads, build the AST graph if it can, risk-score every file, and split into batches of 10.',
      },
      {
        stage: 'Scan',
        detail:
          'Each batch gets two single-turn calls with the diffs already in the prompt. Pass 1A covers correctness and testing; Pass 1B covers security, performance, and architecture. Neither has tools. Candidates merge and dedupe on file, line, and category.',
      },
      {
        stage: 'Verify',
        detail:
          'A short agent loop picks up the candidates and now gets tools: file reads, ripgrep, git blame, graph queries. It confirms or drops each finding. If this pass falls over, Pass 1 candidates still ship at lower confidence.',
      },
      {
        stage: 'Score and post',
        detail:
          'Phase 2 validates against the schema, applies a confidence floor, then scores with a penalty matrix mapped to 0–5 stars. Comments go inline, a summary lands on the PR, and CI gets a structured pass/fail.',
      },
      {
        stage: 'Re-push',
        detail:
          'Deleted-file findings drop, untouched files stay open with no model call, and only modified files get re-verified. A developer can also reply and argue — if it holds, the thread resolves as WONT_FIX with a suggested .codereview.md rule.',
      },
    ],
    decisions: [
      {
        title: 'The agent writes data. It never posts.',
        detail:
          'Phase 1 produces findings.json and stops. Phase 2 does everything with consequences: validation, scoring, comments, the CI gate. Phase 2 is testable without spending a token, --dry-run is a real path, and a botched post can be replayed without paying for the review twice.',
      },
      {
        title: 'Scan cheap, then verify expensive',
        detail:
          'A single long agent loop on a 98-file PR burned 11.3M tokens. Two single-turn calls now do the reasoning against diffs already in the prompt; a short tool-using loop verifies candidates and throws out the false ones.',
      },
      {
        title: 'The graph decides how much of the PR actually gets read',
        detail:
          'An AST graph of CALLS and IMPORTS_FROM feeds a per-file risk score. HIGH files get a full read, MEDIUM get the diff plus a read if needed, LOW get a scan. The agent accounts for every file, but not with the same attention.',
      },
      {
        title: 'Split the work, don\'t summarise it',
        detail:
          'When a diff won\'t fit, compressing it throws away the detail worth reviewing. Files batch ten at a time instead. Only a single file that is still too big falls back to hunk summaries, and the agent can drill back in at full fidelity.',
      },
      {
        title: 'The poster computes the dedup ID, not the model',
        detail:
          'Findings get cr-id: sha1(file:line:category), embedded as an HTML comment in the thread. The agent writes cr_id: null; Phase 2 fills it in. Models cannot reliably compute a hash, and a near-miss posts two comments on the same line.',
      },
    ],
    evaluation:
      "No labelled benchmark — that's the honest gap. There's no held-out set of PRs with known bugs, so I can't quote precision or recall. What exists: 394 unit tests covering deterministic paths and ugly LLM failure modes, plus dogfooding — CodeHawk reviews its own pull requests. Token cost got measured properly because 11.3M tokens on one PR is a number you notice. A labelled set of about 50 PRs is the first thing I'd build if I picked this up again.",
    reflections: [
      {
        title: 'Build the eval harness before the second prompt revision',
        detail:
          "Token cost had a number attached, so it fell 80%. Review quality didn't, so it moved in whatever direction I happened to be looking that week. The risk-classifier weights shipped are still the ones I guessed on day one.",
      },
      {
        title: 'A prompt that references a file is not a prompt that contains it',
        detail:
          'Security, architecture, performance, and migration checklists were referenced by path and never injected. They produced zero findings across 100+ PRs. Nobody noticed, because "no security findings" reads as good news.',
      },
      {
        title: 'The token optimisation was the token problem',
        detail:
          'A sliding window over conversation history dropped prior tool results. The agent re-fetched files it had already read. 68% of file reads became duplicates. It cost more than it saved for a year.',
      },
      {
        title: 'cr-id shouldn\'t have been keyed on the file path',
        detail:
          'Rename a file between runs and every finding on it looks brand new, so it all gets posted twice. Hashing content or a symbol path would survive it.',
      },
    ],
  },
  {
    slug: 'php-zxing',
    title: 'PHP ZXing',
    subtitle: 'PHP wrapper for the ZXing barcode library',
    tagline: 'Composer wrapper around ZXing so PHP apps can read barcodes and QR codes.',
    description:
      'Composer package for reading barcodes and QR codes. 277K+ Packagist installs, 133 GitHub stars, and featured on the upstream ZXing repo.',
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
    overview: {
      problem: [
        'PHP had no solid barcode decoder of its own',
        'ZXing lived in Java, unusable from Composer apps',
        'Teams were shelling out to one-off scripts',
        'No typed result for found versus not-found',
        'Windows and *nix Java paths differed every deploy',
        'Multiple barcodes in one image were ignored',
      ],
      solution: [
        'Composer package wrapping ZXing core.jar and javase.jar',
        'Shell out to the local JRE with a stable PHP API',
        'Decode a file, a directory, or an array of images',
        'try_harder, crop, and possible_formats configs',
        'Typed results: ZxingImage versus ZxingBarNotFound',
        'Configurable Java path for *nix and Windows',
      ],
      outcome: [
        '277K+ Packagist installs across production PHP apps',
        '133 GitHub stars and ongoing community use',
        'Featured on the primary ZXing GitHub repository',
        'Single Composer require instead of custom Java glue',
        'Multiple barcodes per image supported',
        'MIT licensed and still the default PHP path to ZXing',
      ],
    },
    howItWorks: [
      {
        stage: 'Install',
        detail:
          'Composer pulls the PHP wrapper plus the bundled ZXing jars. A local JRE is the only runtime dependency outside PHP.',
      },
      {
        stage: 'Decode',
        detail:
          'The wrapper shells out to Java with the configured path, passing try_harder, crop, format filters, and multi-barcode flags through to ZXing.',
      },
      {
        stage: 'Result',
        detail:
          'Callers get a typed ZxingImage or ZxingBarNotFound. isFound() makes the success path obvious without parsing raw process output.',
      },
    ],
    decisions: [
      {
        title: 'Wrap Java ZXing instead of rewriting a decoder in PHP',
        detail:
          'Barcode decoding is a solved problem in ZXing. A thin, well-typed wrapper shipped in days; a PHP port would have been years of edge cases.',
      },
      {
        title: 'Typed found / not-found results',
        detail:
          'Shell output is messy. Returning ZxingImage versus ZxingBarNotFound made the API feel like PHP instead of like a process wrapper.',
      },
    ],
    reflections: [
      {
        title: 'A native PHP decoder path for hosts without Java',
        detail:
          'Shared hosting often has no JRE. A pure-PHP fallback — even if slower — would have unlocked a large chunk of the install base.',
      },
      {
        title: 'Better Windows JRE discovery',
        detail:
          'Configurable Java path works, but auto-detecting common Windows install locations would have cut the most frequent support issue.',
      },
    ],
  },
  {
    slug: 'moo-pin',
    title: 'MooPin',
    subtitle: 'Pinterest-style column grid for MooTools',
    tagline: 'Pinterest-style column packing for MooTools, including infinite-scroll galleries.',
    description:
      'Small MooTools plugin that packs tiles into a Pinterest-style column grid — including infinite-scroll galleries. Inspired by Wookmark for jQuery.',
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
    overview: {
      problem: [
        'MooTools had no Pinterest-style masonry plugin',
        'jQuery’s Wookmark did not port to MooTools apps',
        'Infinite-scroll galleries reflowed poorly on load',
        'Window resize left gaps and overlapping tiles',
        'Layout logic was copied into every project',
        'No events to hook custom render after packing',
      ],
      solution: [
        'Small MooTools plugin with a one-line constructor',
        'Column packing from a container of tiles',
        'Designed for infinite-scroll galleries as items arrive',
        'onWindowResize and onRender events for layout hooks',
        'Inspired by Wookmark, built for the MooTools ecosystem',
        'Tested on Chrome and Firefox of that era',
      ],
      outcome: [
        'Drop-in masonry for existing MooTools codebases',
        'Galleries that keep packing as new tiles stream in',
        'Resize no longer required a full page reload',
        'Simple API: new MooPin({ container: "main" })',
        'MIT licensed for production use',
        'Filled a real gap in the MooTools plugin landscape',
      ],
    },
    howItWorks: [
      {
        stage: 'Pack',
        detail:
          'Pass a container of tiles. MooPin measures items and places them into the shortest column, producing a Pinterest-style masonry grid.',
      },
      {
        stage: 'Reflow',
        detail:
          'onWindowResize recomputes column count and positions. Infinite-scroll galleries call render again as new items arrive.',
      },
      {
        stage: 'Hook',
        detail:
          'onRender fires after each pack so the host page can lazy-load images, attach listeners, or measure the new height.',
      },
    ],
    decisions: [
      {
        title: 'MooTools, not another jQuery port sitting unused',
        detail:
          'The sites that needed this were already on MooTools. A native plugin beat asking those teams to pull in jQuery for one layout.',
      },
      {
        title: 'Events instead of a closed black box',
        detail:
          'Infinite scroll and lazy images need to know when packing finished. onRender and onWindowResize made the plugin composable.',
      },
    ],
    reflections: [
      {
        title: 'Today this would be CSS grid and container queries',
        detail:
          'The layout problem is mostly solved in CSS now. The plugin made sense for the MooTools era; I would not rewrite it as JS today.',
      },
      {
        title: 'Image-load reflow should have been built in',
        detail:
          'Tiles with unset heights jumped after images loaded. Observing image load and re-packing automatically would have saved a common integration bug.',
      },
    ],
  },
];

export function getOpenSourceBySlug(slug: string): OpenSourceProject | undefined {
  return openSourceProjects.find((project) => project.slug === slug);
}

export function openSourceSeoDescription(project: OpenSourceProject): string {
  return project.tagline.length > 160
    ? `${project.tagline.slice(0, 157).trimEnd()}...`
    : project.tagline;
}
