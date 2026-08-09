export interface OpenSourceProject {
  title: string;
  subtitle: string;
  description: string;
  url: string;
}

export const openSourceProjects: OpenSourceProject[] = [
  {
    title: 'PlugVault',
    subtitle: 'Reusable AI coding skills registry',
    description:
      'Ecosystem for packaging, sharing, and distributing reusable AI coding skills for Claude Code.',
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
    subtitle: '4K+ downloads · 50+ stars',
    description:
      'Wrapper for ZXing barcode library. Featured on the primary ZXing GitHub repository page.',
    url: 'https://github.com/dsiddharth2/php-zxing',
  },
];
