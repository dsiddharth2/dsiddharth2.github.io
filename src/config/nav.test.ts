import { describe, expect, it } from 'vitest';
import { activeNavFor, headerNav, pageNav } from '@/config/nav';
import { site } from '@/config/site';

describe('nav', () => {
  it('keeps the live SEO hrefs', () => {
    expect(pageNav.map((item) => item.href)).toEqual(['/', '/about', '/experience', '/projects', '/opensource']);
  });

  it('labels /projects as Work and never links /work or /open-source', () => {
    expect(pageNav.find((item) => item.href === '/projects')?.label).toBe('Work');
    const hrefs = headerNav.map((item) => item.href);
    expect(hrefs).not.toContain('/work');
    expect(hrefs).not.toContain('/open-source');
  });

  it('sends Writing to Medium in a new tab', () => {
    const writing = headerNav.find((item) => item.label.startsWith('Writing'));
    expect(writing).toMatchObject({ href: site.medium, external: true });
  });

  it('keeps resume pages out of the header', () => {
    expect(headerNav.some((item) => item.href.includes('resume'))).toBe(false);
  });

  it('derives the active item from the path', () => {
    expect(activeNavFor('/')).toBe('Home');
    expect(activeNavFor('/about/')).toBe('About');
    expect(activeNavFor('/experience/apra-labs')).toBe('Experience');
    expect(activeNavFor('/projects')).toBe('Work');
    expect(activeNavFor('/projects/graphrag/')).toBe('Work');
    expect(activeNavFor('/opensource/plug')).toBe('Open Source');
    expect(activeNavFor('/resume')).toBeUndefined();
    expect(activeNavFor('/aboutx')).toBeUndefined();
  });
});
