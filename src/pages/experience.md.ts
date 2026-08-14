import type { APIRoute } from 'astro';
import { experienceIndexMarkdown, markdownResponse } from '@/utils/llms';

export const GET: APIRoute = () => markdownResponse(experienceIndexMarkdown());
