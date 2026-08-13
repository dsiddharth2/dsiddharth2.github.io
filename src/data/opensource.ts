export interface OpenSourceProject {
  title: string;
  subtitle: string;
  description: string;
  url: string;
}

export const openSourceProjects: OpenSourceProject[] = [
  {
    title: 'Plug',
    subtitle: 'Package manager for Claude Code skills',
    description:
      'Package manager for Claude Code — install reusable skills, commands, and agents from GitHub-hosted registries.',
    url: 'https://github.com/dsiddharth2/plug',
  },
  {
    title: 'CodeHawk',
    subtitle: 'AI-powered code analysis',
    description:
      'Intelligent code analysis platform for reviewing code quality through AI-assisted workflows and LLM integration.',
    url: 'https://github.com/dsiddharth2/codehawk',
  },
  {
    title: 'PHP ZXing',
    subtitle: '277K+ installs · 133 stars',
    description:
      'Wrapper for ZXing barcode library. Featured on the primary ZXing GitHub repository page.',
    url: 'https://github.com/dsiddharth2/php-zxing',
  },
];
