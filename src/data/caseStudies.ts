import { getProductBySlug, type Product } from '@/data/products';

/**
 * The case studies featured on the homepage, in order.
 *
 * Only `domain` is authored here — everything else is selected from the product
 * record in `products.ts` so the summary and the full write-up can never drift.
 */
export interface FeaturedCaseStudy {
  slug: string;
  /** Which class of problem this is evidence for — matches a domain in `domains.ts`. */
  domain: string;
}

export const featuredCaseStudies: FeaturedCaseStudy[] = [
  { slug: 'multi-agent', domain: 'Enterprise AI' },
  { slug: 'graphrag', domain: 'Data & Knowledge Systems' },
  { slug: 'cloud-cost', domain: 'Production Systems' },
];

export interface ResolvedCaseStudy extends FeaturedCaseStudy {
  product: Product;
  /** Opening line of the problem. */
  problem: string;
  /** The hardest limit the design had to live inside, when one is recorded. */
  constraint?: string;
  /** Leading line of what was built. */
  approach: string;
  /** Headline result. */
  outcome: { metric: string; label: string };
  /** One technical decision, stated as a claim — the "shows their reasoning" signal. */
  decision?: string;
  href: string;
}

export function resolvedCaseStudies(): ResolvedCaseStudy[] {
  return featuredCaseStudies.map((entry) => {
    const product = getProductBySlug(entry.slug);
    if (!product) {
      throw new Error(`Unknown product slug in caseStudies.ts: ${entry.slug}`);
    }
    return {
      ...entry,
      product,
      problem: product.overview.problem[0],
      constraint: product.constraints?.[0],
      approach: product.overview.solution[0],
      outcome: product.impact[0],
      decision: product.decisions[0]?.title,
      href: `/projects/${product.slug}`,
    };
  });
}
