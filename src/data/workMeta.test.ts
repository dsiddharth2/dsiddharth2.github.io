import { describe, expect, it } from 'vitest';
import { products } from '@/data/products';
import { featuredCaseStudies } from '@/data/caseStudies';
import { productCategories, workCards, workCategories, workFilters } from '@/data/workMeta';
import { countForFilter } from '@/utils/workFilter';

describe('workMeta', () => {
  it('has categories for every live product and no stale slugs', () => {
    for (const product of products) {
      expect(productCategories[product.slug]?.length, product.slug).toBeGreaterThan(0);
    }
    expect(Object.keys(productCategories).sort()).toEqual(products.map((p) => p.slug).sort());
  });

  it('uses every category at least once', () => {
    const cards = workCards();
    for (const category of workCategories) expect(countForFilter(cards, category)).toBeGreaterThan(0);
  });

  it('starts filters with All and Case Studies', () => {
    expect(workFilters.slice(0, 2)).toEqual(['All', 'Case Studies']);
  });

  it('builds cards from live product fields in live order', () => {
    const cards = workCards();
    expect(cards.map((card) => card.slug)).toEqual(products.map((p) => p.slug));
    cards.forEach((card, index) => {
      const product = products[index];
      expect(card.headline).toBe(product.tagline);
      expect(card.description).toBe(product.description);
      expect(card.metric).toEqual(product.impact[0]);
      expect(card.href).toBe(`/projects/${product.slug}`);
    });
  });

  it('marks exactly the featured case studies and carries their facts', () => {
    const cases = workCards().filter((card) => card.isCase);
    expect(cases.map((card) => card.slug).sort()).toEqual(featuredCaseStudies.map((c) => c.slug).sort());
    for (const card of cases) {
      const labels = card.points.map((point) => point.label);
      expect(labels).toContain('Problem');
      expect(labels).toContain('Approach');
      expect(labels).toContain('Key decision');
    }
    expect(countForFilter(workCards(), 'Case Studies')).toBe(featuredCaseStudies.length);
  });
});
