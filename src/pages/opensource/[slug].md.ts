import type { APIRoute } from 'astro';
import { openSourceProjects, getOpenSourceBySlug } from '@/data/opensource';
import { markdownResponse, openSourceMarkdown } from '@/utils/llms';

export function getStaticPaths() {
  return openSourceProjects.map((project) => ({
    params: { slug: project.slug },
  }));
}

export const GET: APIRoute = ({ params }) => {
  const project = getOpenSourceBySlug(params.slug!);
  if (!project) {
    return new Response('Not found', { status: 404 });
  }
  return markdownResponse(openSourceMarkdown(project));
};
