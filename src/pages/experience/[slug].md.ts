import type { APIRoute } from 'astro';
import { experience, getExperienceById } from '@/data/experience';
import { experienceMarkdown, markdownResponse } from '@/utils/llms';

export function getStaticPaths() {
  return experience.map((entry) => ({
    params: { slug: entry.id },
  }));
}

export const GET: APIRoute = ({ params }) => {
  const entry = getExperienceById(params.slug!);
  if (!entry) {
    return new Response('Not found', { status: 404 });
  }
  return markdownResponse(experienceMarkdown(entry));
};
