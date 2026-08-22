export const site = {
  name: 'Siddharth Deshpande',
  shortName: 'Siddharth Deshpande',
  title: 'Siddharth Deshpande — Associate Architect · AI & Cloud Systems',
  description:
    'From 0-to-1 products to enterprise platforms serving 300+ facilities — I take ambiguous problems, architect the system, hire the team, and ship.',
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
