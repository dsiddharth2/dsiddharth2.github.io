import { products, type Product, type ProductImpact } from '@/data/products';
import { resolvedCaseStudies } from '@/data/caseStudies';
import { ALL_FILTER, CASE_STUDIES_FILTER } from '@/utils/workFilter';

/**
 * Filter categories for the Work cards. This is interaction chrome only — the
 * card copy comes straight from `products.ts` and `caseStudies.ts`.
 */
export const workCategories = [
  'AI Agents',
  'Knowledge & Search',
  'Cloud & Infra',
  'Developer Tools',
  '0→1 Products',
] as const;

export type WorkCategory = (typeof workCategories)[number];

export const workFilters: string[] = [ALL_FILTER, CASE_STUDIES_FILTER, ...workCategories];

export const productCategories: Record<string, WorkCategory[]> = {
  graphrag: ['Knowledge & Search'],
  'multi-agent': ['AI Agents'],
  'code-review': ['AI Agents', 'Developer Tools'],
  'cloud-cost': ['AI Agents', 'Cloud & Infra'],
  'infra-perf': ['Cloud & Infra'],
  'search-sync': ['Knowledge & Search'],
  'logistics-erp': ['0→1 Products'],
  uxgage: ['0→1 Products'],
};

export interface CasePoint {
  label: string;
  value: string;
  accent?: boolean;
}

export interface WorkCardData {
  slug: string;
  href: string;
  title: string;
  /** Live `product.tagline`. */
  headline: string;
  /** Live `product.description`. */
  description: string;
  subtitle: string;
  company: string;
  /** Live `product.impact[0]`. */
  metric: ProductImpact;
  stack: string[];
  categories: WorkCategory[];
  isCase: boolean;
  /** Live case-study domain from `caseStudies.ts`, e.g. "Enterprise AI". */
  domain?: string;
  /** Featured case-study facts, only when the product is a case study. */
  points: CasePoint[];
}

export function workCardFor(product: Product): WorkCardData {
  const study = resolvedCaseStudies().find((item) => item.slug === product.slug);
  const points: CasePoint[] = study
    ? [
        { label: 'Problem', value: study.problem },
        ...(study.constraint ? [{ label: 'Hardest constraint', value: study.constraint }] : []),
        { label: 'Approach', value: study.approach },
        ...(study.decision ? [{ label: 'Key decision', value: study.decision, accent: true }] : []),
      ]
    : [];

  return {
    slug: product.slug,
    href: `/projects/${product.slug}`,
    title: product.title,
    headline: product.tagline,
    description: product.description,
    subtitle: product.subtitle,
    company: product.company,
    metric: product.impact[0],
    stack: product.tags,
    categories: productCategories[product.slug] ?? [],
    isCase: Boolean(study),
    domain: study?.domain,
    points,
  };
}

/** All products in live `products.ts` order. */
export function workCards(): WorkCardData[] {
  return products.map(workCardFor);
}
