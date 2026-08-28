export const site = {
  name: 'Siddharth Deshpande',
  shortName: 'Siddharth Deshpande',
  title: 'Siddharth Deshpande — AI Architect · Production Systems',
  description:
    'Associate Architect building production AI systems — from ambiguous problem through design, build, deployment, and iteration against real users and real constraints.',
  email: 'dsiddharth2@gmail.com',
  github: 'https://github.com/dsiddharth2',
  linkedin: 'https://www.linkedin.com/in/dsiddharth2/',
  medium: 'https://medium.com/@siddharthanantdeshpande',
  resumePath: 'Siddharth_Deshpande.pdf',
  resumeFileName: 'Siddharth_Deshpande.pdf',
  resumeViewPath: 'resume-print',
  /** Google Analytics measurement ID */
  gtagId: 'G-NZ7CSERJHB',
  /** Fallback GitHub Pages user site URL */
  baseUrl: 'https://dsiddharth2.github.io',
  customDomain: 'https://siddharthdeshpande.com',
};

export function getSiteUrl(path = ''): string {
  const base = site.customDomain ?? site.baseUrl;
  const normalizedPath = path.startsWith('/') ? path : path ? `/${path}` : '';
  return `${base}${normalizedPath}`;
}
