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
  demoUrl?: string;
  npmUrl?: string;
  vaultUrl?: string;
}

export const openSourceProjects: OpenSourceProject[] = [
  {
    slug: 'plug',
    title: 'Plug',
    subtitle: 'Package manager for Claude Code skills',
    tagline: 'Sharing Claude Code extensions across a team without emailing Markdown files around.',
    description:
      'Discover, install, and manage reusable Skills, Commands, and Agents from GitHub-hosted registries — through an interactive TUI or the CLI.',
    url: 'https://github.com/dsiddharth2/plug',
    vaultUrl: 'https://github.com/dsiddharth2/plugvault',
    npmUrl: 'https://www.npmjs.com/package/plugvault',
    tags: ['TypeScript', 'Node.js', 'Ink', 'Claude Code'],
    icon: 'plug',
    language: 'TypeScript',
    stats: [
      { metric: '14', label: 'official packages' },
      { metric: '2', label: 'clients, one contract' },
      { metric: 'npm', label: 'plugvault' },
      { metric: 'MIT', label: 'open source' },
    ],
    overview: {
      problem: [
        'Claude Code extensions are Markdown files in a .claude/ folder',
        'That works for one person on one repo, not for a team',
        'Good commands spread by Slack paste and then drift',
        'Four projects end up with four slightly different copies',
        'No way to hand out shared security rules to every engineer',
        'No way to update those rules once they change',
      ],
      solution: [
        'Interactive TUI plus a /plug skill inside Claude Code',
        'Any GitHub repo is a package source — public or private',
        'Official vault: 14 packages, 7 always-on skills, 7 commands',
        'Install per project or per machine against a tracked manifest',
        'Vaults resolve in a user-defined order, first match wins',
        'Published on npm as plugvault, CI on every push',
      ],
      outcome: [
        'Teams share extensions without emailing Markdown around',
        'Private company vaults use existing GitHub access controls',
        'A reviewer reads the actual skill text in the pull request',
        'What lands in .claude/ is byte-identical to GitHub',
        'Update and remove operate on the manifest, not a directory scan',
        'MIT licensed and fully public',
      ],
    },
    architectureSvg: 'images/architecture/plug-architecture.svg',
    howItWorks: [
      {
        stage: 'Discover',
        detail:
          'The client pulls the index from every registered vault and caches it for an hour. The terminal UI is a full-screen browser with tabs for what is available, what is installed, and which vaults are configured.',
      },
      {
        stage: 'Resolve',
        detail:
          'A requested name is matched against the merged index in vault order. First match wins, so an internal vault can shadow a public package of the same name. A vault-qualified form exists when you need to be explicit.',
      },
      {
        stage: 'Install',
        detail:
          'Files are fetched and written where Claude actually reads them: a skill at .claude/skills/<name>/SKILL.md, a command at .claude/commands/<name>.md, under the project or ~/.claude/ depending on scope.',
      },
      {
        stage: 'Track',
        detail:
          'The manifest records package name, version, and which vault it came from. Update, remove, and list operate on that record, not the directory listing, so multi-file packages and hand-written files stay distinct.',
      },
      {
        stage: 'Publish',
        detail:
          'Adding a package means creating a folder with meta.json and an entry file, adding one index row, and opening a pull request. Every package in the official vault went in through that path.',
      },
    ],
    decisions: [
      {
        title: 'GitHub repositories are the registry. There is no package server.',
        detail:
          'A registry is a JSON index committed to a repo. A hosted API would have needed its own accounts and something to keep running. Using repos means private distribution comes free from GitHub access controls. What I gave up: no download counts, no central moderation, no way to yank a bad package.',
      },
      {
        title: 'A package is a folder you can read in a pull request',
        detail:
          'Each package is registry/<name>/ holding meta.json and a Markdown entry file. Inlining into one large manifest would have been simpler to fetch and horrible to review. The file that lands in .claude/ is byte-identical to the one on GitHub.',
      },
      {
        title: 'Two clients, one contract',
        detail:
          'The terminal UI is Node and Ink. The Claude Code skill runs inside the conversation with no Node runtime at all. Both perform resolve, fetch, write, record in the same order, which is the only reason it is safe to have two of them.',
      },
      {
        title: 'Vaults resolve in a user-defined order, first match wins',
        detail:
          'An organisation registers its internal vault ahead of the public one, and its version of a package shadows the community version by the same name. Unqualified installs can silently resolve somewhere you did not expect.',
      },
      {
        title: 'The manifest is the source of truth, not the file tree',
        detail:
          'Scanning .claude/ and inferring what is installed falls apart the moment a package spans more than one file, and it cannot tell a Plug-managed file from one you wrote yourself. The trade-off is drift: hand-edit the folder and the manifest is quietly wrong.',
      },
    ],
    evaluation:
      "There's no evaluation harness yet, and that's the honest gap. CI unit tests catch regressions in resolution and path routing, but they don't test whether a package installs correctly from a fresh machine, into both scopes, and whether removing it leaves nothing behind. Dogfooding covers the common path. Private vault authentication, multi-file packages, and removal with dependents are verified by hand. An install matrix in a clean container per case would replace all of that manual checking.",
    reflections: [
      {
        title: 'Version the registry format from the first commit',
        detail:
          'The index schema has changed as the tool grew and there is no version field, so an older client hitting a newer vault fails confusingly. One integer at the top of the file, added on day one, costs nothing.',
      },
      {
        title: 'Pin content to a commit, not a branch',
        detail:
          'Packages are fetched from the default branch. What you installed on Monday and what a colleague installs on Friday can silently differ. Recording the commit SHA in the manifest belonged in the first version of the install path.',
      },
      {
        title: 'Generate the index instead of maintaining it by hand',
        detail:
          'Every package already has meta.json, and then it has to be copied into the root index by hand. Two places, one truth — walking the registry folder in CI and writing the index out would remove the step people forget.',
      },
      {
        title: 'Keep the docs generated from one source',
        detail:
          "The README and the architecture doc drifted apart on how installation handles dependencies, and CLI flags in the vault README don't match the tool's. Anything a reader can check against the code should come from the code.",
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
    tagline: 'A MooTools plugin that packs tiles of different heights into even columns, the way Pinterest does.',
    description:
      'Small MooTools plugin that packs tiles into a Pinterest-style column grid — including infinite-scroll galleries. Inspired by Wookmark for jQuery.',
    url: 'https://github.com/dsiddharth2/moo-pin',
    demoUrl: 'https://github.com/dsiddharth2/moo-pin/tree/master/demos',
    tags: ['JavaScript', 'MooTools', 'Layout', 'Infinite scroll'],
    icon: 'grid',
    language: 'JavaScript',
    stats: [
      { metric: '~120', label: 'lines of source' },
      { metric: '1', label: 'public method' },
      { metric: '2', label: 'events' },
      { metric: '4', label: 'options' },
    ],
    overview: {
      problem: [
        'Every column-grid plugin in 2014 required jQuery',
        'Masonry, Isotope, and Wookmark were all jQuery',
        'MooTools apps had to load a second framework for a layout',
        'Or position tiles by hand and redo the math on resize',
        'Round-robin columns look wrong the moment two tall images land together',
        'Wanted the Pinterest look without pulling in jQuery',
      ],
      solution: [
        '~120 lines on MooTools core, nothing else required',
        'Greedy placement: next tile goes in the shortest column',
        'Idempotent full re-layout via a single render() call',
        'One public method, two events, four options',
        'Infinite scroll is append markup, then render() again',
        'Static grid and infinite-scroll demos shipped with it',
      ],
      outcome: [
        'Column packing without a second JavaScript framework',
        'Bottom edge of the grid comes out roughly level',
        'Infinite-scroll host code is about six lines',
        'Verified in Chrome 37+ and Firefox 32+',
        'MIT licensed for production use',
        'Filled a real gap in the MooTools plugin landscape',
      ],
    },
    architectureSvg: 'images/architecture/moopin-architecture.svg',
    howItWorks: [
      {
        stage: 'Initialise',
        detail:
          'new MooPin({ container }) measures the container, counts columns from the first tile width, and keeps a running height per column.',
      },
      {
        stage: 'Layout pass',
        detail:
          'Each tile is placed in whichever column is currently shortest, then absolutely positioned. That greedy choice is what keeps the bottom edge roughly even.',
      },
      {
        stage: 'Re-entry',
        detail:
          'onWindowResize re-runs the whole pass. Infinite scroll appends markup and calls render() again — no incremental state to keep in sync.',
      },
    ],
    decisions: [
      {
        title: 'Greedy shortest-column, not round-robin',
        detail:
          'Dealing tiles across columns in order is simpler to write and looks wrong the moment two tall images land in the same column. Putting the next tile wherever the total is currently smallest is the whole idea.',
      },
      {
        title: 'Re-run the layout whole, don\'t track incremental state',
        detail:
          'The layout pass is idempotent. That is why the infinite-scroll demo is six lines of host code: append the new markup, call render() again. It costs a full re-layout on every trigger, which was fine at demo sizes.',
      },
      {
        title: 'MooTools native, not a jQuery dependency',
        detail:
          'The sites that needed this were already on MooTools. A native plugin beat asking those teams to pull in jQuery for one layout effect.',
      },
    ],
    evaluation:
      'There is no test suite; correctness was two browsers and my eyes. Reading it now, the resize handler fires on every resize event with no throttle, three loop variables leak to the global scope, column width is read off the first tile and assumed for the rest, and tiles have to carry explicit image dimensions — measure before decode and every height comes back zero.',
    reflections: [
      {
        title: 'Throttle the resize handler',
        detail:
          'Dragging a window corner re-lays out the grid dozens of times a second. A short debounce would have been the obvious fix and never shipped.',
      },
      {
        title: 'Don\'t assume the first tile\'s width',
        detail:
          'Column width is read off the first tile and applied to the rest. Mixed-width tiles would have broken the grid immediately.',
      },
      {
        title: 'Observe image load instead of requiring width and height',
        detail:
          'Tiles have to carry explicit image dimensions because measuring before decode returns zero. A load observer and re-pack would have saved the most common integration bug.',
      },
      {
        title: 'Today this would be CSS grid',
        detail:
          'The layout problem is mostly solved in CSS now. The plugin made sense for the MooTools era; I would not rewrite it as JavaScript today.',
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

/**
 * Contributions to codebases I did not author.
 *
 * Kept separate from `openSourceProjects` on purpose: those are libraries I
 * wrote and maintain, which is a different kind of evidence from going into
 * someone else's repository, understanding it, and landing a change with a
 * maintainer. The section renders only when this array has entries — an empty
 * placeholder would be worse than no section at all.
 */
export interface ExternalContribution {
  repo: string;
  url: string;
  /** What was broken or missing upstream. */
  problem: string;
  /** What I actually changed. */
  contribution: string;
  /** How I approached an unfamiliar codebase. */
  approach: string;
  /** Link to the PR or discussion thread. */
  prUrl?: string;
  /** What happened after — merged, released, adopted. */
  result: string;
}

export const externalContributions: ExternalContribution[] = [];
