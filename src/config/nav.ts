import { site } from '@/config/site';

export type NavLabel = 'Home' | 'About' | 'Experience' | 'Work' | 'Open Source';

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  /** Set for internal pages; matched against the `active` header prop. */
  key?: NavLabel;
}

/** Hrefs are SEO URLs and must not change; labels may. */
export const pageNav: (NavItem & { key: NavLabel })[] = [
  { key: 'Home', label: 'Home', href: '/' },
  { key: 'About', label: 'About', href: '/about' },
  { key: 'Experience', label: 'Experience', href: '/experience' },
  { key: 'Work', label: 'Work', href: '/projects' },
  { key: 'Open Source', label: 'Open Source', href: '/opensource' },
];

export const headerNav: NavItem[] = [
  ...pageNav,
  { label: 'Writing ↗', href: site.medium, external: true },
];

export function activeNavFor(pathname: string): NavLabel | undefined {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return 'Home';
  if (path === '/about' || path.startsWith('/about/')) return 'About';
  if (path === '/experience' || path.startsWith('/experience/')) return 'Experience';
  if (path === '/projects' || path.startsWith('/projects/')) return 'Work';
  if (path === '/opensource' || path.startsWith('/opensource/')) return 'Open Source';
  return undefined;
}
