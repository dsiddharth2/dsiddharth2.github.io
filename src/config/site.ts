export const site = {
  name: 'Siddharth Deshpande',
  shortName: 'Siddharth',
  title: 'Siddharth Deshpande — Associate Architect · AI & Cloud Systems',
  description:
    'From 0-to-1 products to enterprise platforms serving 300+ facilities — I take ambiguous problems, architect the system, hire the team, and ship.',
  email: 'dsiddharth2@gmail.com',
  github: 'https://github.com/dsiddharth2',
  linkedin: 'https://www.linkedin.com/in/dsiddharth2/',
  medium: 'https://medium.com/@siddharthanantdeshpande',
  /** Fallback GitHub Pages user site URL */
  baseUrl: 'https://dsiddharth2.github.io',
  customDomain: 'https://siddharthd.dev',
};

export function getSiteUrl(path = ''): string {
  const base = site.customDomain ?? site.baseUrl;
  const normalizedPath = path.startsWith('/') ? path : path ? `/${path}` : '';
  return `${base}${normalizedPath}`;
}
