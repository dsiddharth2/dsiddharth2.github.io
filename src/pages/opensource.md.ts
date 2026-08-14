import type { APIRoute } from 'astro';
import { markdownResponse, openSourceIndexMarkdown } from '@/utils/llms';

export const GET: APIRoute = () => markdownResponse(openSourceIndexMarkdown());
