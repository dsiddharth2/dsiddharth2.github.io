import { describe, expect, it } from 'vitest';
import { countForFilter, matchesWorkFilter, normalizeWorkFilter } from '@/utils/workFilter';

const caseStudy = { slug: 'graphrag', categories: ['Knowledge & Search'], isCase: true };
const plain = { slug: 'search-sync', categories: ['Knowledge & Search', 'Cloud & Infra'], isCase: false };
const other = { slug: 'uxgage', categories: ['0→1 Products'], isCase: false };

describe('matchesWorkFilter', () => {
  it('matches everything for All', () => {
    expect([caseStudy, plain, other].every((item) => matchesWorkFilter(item, 'All'))).toBe(true);
  });

  it('matches only case studies for Case Studies', () => {
    expect(matchesWorkFilter(caseStudy, 'Case Studies')).toBe(true);
    expect(matchesWorkFilter(plain, 'Case Studies')).toBe(false);
  });

  it('matches by category otherwise', () => {
    expect(matchesWorkFilter(plain, 'Cloud & Infra')).toBe(true);
    expect(matchesWorkFilter(caseStudy, 'Cloud & Infra')).toBe(false);
    expect(matchesWorkFilter(other, '0→1 Products')).toBe(true);
  });

  it('does not match an unknown category', () => {
    expect(matchesWorkFilter(plain, 'Nope')).toBe(false);
  });
});

describe('countForFilter', () => {
  it('counts matches', () => {
    const items = [caseStudy, plain, other];
    expect(countForFilter(items, 'All')).toBe(3);
    expect(countForFilter(items, 'Case Studies')).toBe(1);
    expect(countForFilter(items, 'Knowledge & Search')).toBe(2);
  });
});

describe('normalizeWorkFilter', () => {
  it('keeps known filters and falls back to All', () => {
    const known = ['All', 'Case Studies', 'AI Agents'];
    expect(normalizeWorkFilter('AI Agents', known)).toBe('AI Agents');
    expect(normalizeWorkFilter('Bogus', known)).toBe('All');
    expect(normalizeWorkFilter(null, known)).toBe('All');
    expect(normalizeWorkFilter('', known)).toBe('All');
  });
});
