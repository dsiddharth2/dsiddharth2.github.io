export const ALL_FILTER = 'All';
export const CASE_STUDIES_FILTER = 'Case Studies';

export interface FilterableWork {
  slug: string;
  categories: string[];
  isCase: boolean;
}

export function matchesWorkFilter(product: FilterableWork, filter: string): boolean {
  if (filter === ALL_FILTER) return true;
  if (filter === CASE_STUDIES_FILTER) return product.isCase;
  return product.categories.includes(filter);
}

export function countForFilter(products: FilterableWork[], filter: string): number {
  return products.filter((product) => matchesWorkFilter(product, filter)).length;
}

/** Unknown or empty filter names fall back to showing everything. */
export function normalizeWorkFilter(filter: string | null | undefined, known: string[]): string {
  return filter && known.includes(filter) ? filter : ALL_FILTER;
}
