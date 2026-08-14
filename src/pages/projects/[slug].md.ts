import type { APIRoute } from 'astro';
import { products, getProductBySlug } from '@/data/products';
import { markdownResponse, productMarkdown } from '@/utils/llms';

export function getStaticPaths() {
  return products.map((product) => ({
    params: { slug: product.slug },
  }));
}

export const GET: APIRoute = ({ params }) => {
  const product = getProductBySlug(params.slug!);
  if (!product) {
    return new Response('Not found', { status: 404 });
  }
  return markdownResponse(productMarkdown(product));
};
