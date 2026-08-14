import type { APIRoute } from 'astro';
import { llmsTxt, markdownResponse } from '@/utils/llms';

export const GET: APIRoute = () => markdownResponse(llmsTxt());
