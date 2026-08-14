import type { APIRoute } from 'astro';
import { llmsFullTxt, markdownResponse } from '@/utils/llms';

export const GET: APIRoute = () => markdownResponse(llmsFullTxt());
