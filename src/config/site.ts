export const site = {
  name: 'Siddharth Deshpande',
  shortName: 'Siddharth',
  title: 'Siddharth Deshpande — Associate Architect · AI & Cloud Systems',
  description:
    'I build AI systems and platforms that run businesses — from 0-to-1 products to enterprise platforms serving 300+ facilities.',
  email: 'siddharthanantdeshpande@gmail.com',
  github: 'https://github.com/dsiddharth2',
  linkedin: 'https://www.linkedin.com/in/dsiddharth2/',
  medium: 'https://medium.com/@siddharthanantdeshpande',
  /** GitHub Pages project site URL */
  baseUrl: 'https://dsiddharth2.github.io/siddharthd.dev',
  /**
   * Custom domain — set when ready, e.g. 'https://siddharthd.dev'
   * Then update astro.config.mjs: site + base: '/'
   * Add public/CNAME with your domain and configure DNS.
   */
  customDomain: undefined as string | undefined,
};

export function getSiteUrl(path = ''): string {
  const base = site.customDomain ?? site.baseUrl;
  const normalizedPath = path.startsWith('/') ? path : path ? `/${path}` : '';
  return `${base}${normalizedPath}`;
}
