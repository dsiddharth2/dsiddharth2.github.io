import { getProductBySlug, type Product } from '@/data/products';

/**
 * Customer deployments, framed the way a forward-deployed engagement actually runs:
 * who the customer was, what constrained the work on the ground, what I did there,
 * and what changed as a result.
 *
 * The narrative detail lives in `products.ts` — `customer` and `constraint` are the
 * only fields authored here. Everything else is selected from the product record so
 * the two never drift apart.
 */
export interface Deployment {
  /** Slug of the backing entry in `products.ts`. */
  slug: string;
  /** The kind of FDE work this deployment demonstrates. */
  flavour: string;
  /** Who it was built for and at what scale. */
  customer: string;
  /** The constraint that shaped the build — the part that makes it field work. */
  constraint: string;
}

export const deployments: Deployment[] = [
  {
    slug: 'multi-agent',
    flavour: 'AI systems',
    customer: 'Facility operators across 300+ US buildings, on the customer’s own 4 TB operations database.',
    constraint:
      'Every answer had to respect existing per-tenant permissions, so generated SQL is rewritten before it runs — no bypassing the customer’s access model.',
  },
  {
    slug: 'graphrag',
    flavour: 'Enterprise deployment',
    customer:
      'A confidential enterprise support organisation — employer and product names withheld under NDA.',
    constraint:
      '20K unstructured tickets with no clean schema and terminology that varied by author, inside the client’s environment.',
  },
  {
    slug: 'cloud-cost',
    flavour: 'Infrastructure & FinOps',
    customer: 'Internal platform teams running the Azure estate behind the 300+ facility product.',
    constraint:
      'The billing portal shows that the total moved, never why — the answer had to be assembled from six Azure APIs, SQL DMVs, and the app database.',
  },
];

export interface ResolvedDeployment extends Deployment {
  product: Product;
  /** Leading line of what was built, taken from the product's solution list. */
  whatIDid: string;
  /** Headline result. */
  outcome: { metric: string; label: string };
  href: string;
}

export function resolvedDeployments(): ResolvedDeployment[] {
  return deployments.map((deployment) => {
    const product = getProductBySlug(deployment.slug);
    if (!product) {
      throw new Error(`Unknown product slug in deployments.ts: ${deployment.slug}`);
    }
    return {
      ...deployment,
      product,
      whatIDid: product.overview.solution[0],
      outcome: product.impact[0],
      href: `/projects/${product.slug}`,
    };
  });
}
