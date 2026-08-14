import type { APIRoute } from 'astro';
import { markdownResponse, productsIndexMarkdown } from '@/utils/llms';

export const GET: APIRoute = () => markdownResponse(productsIndexMarkdown());
