import { site } from '@/config/site';
import { experience, type ExperienceEntry } from '@/data/experience';
import { openSourceProjects, type OpenSourceProject } from '@/data/opensource';
import { aboutSkills, type AboutSkill } from '@/data/about';
import { resolvedCaseStudies, type ResolvedCaseStudy } from '@/data/caseStudies';
import { heroLede } from '@/data/hero';

/**
 * The FAQ is new chrome; every answer is assembled from live data so it can
 * never say something the rest of the site does not.
 */
export interface FaqItem {
  question: string;
  /** Plain text; line breaks separate list items. */
  answer: string;
  links?: { label: string; href: string }[];
}

export interface FaqSources {
  experience: ExperienceEntry[];
  caseStudies: ResolvedCaseStudy[];
  openSource: OpenSourceProject[];
  skills: AboutSkill[];
  email: string;
  lede: string;
}

export function buildFaq(sources: FaqSources): FaqItem[] {
  const roles = sources.experience.filter((entry) => !entry.earlierEntries?.length);
  const earlier = sources.experience.flatMap((entry) => entry.earlierEntries ?? []);
  const current = roles[0];

  const items: FaqItem[] = [
    { question: 'What do you do?', answer: sources.lede },
    {
      question: 'Where have you worked?',
      answer: [
        ...roles.map((entry) => `${entry.company} · ${entry.role} · ${entry.period}`),
        ...earlier.map((item) => `${item.company} · ${item.role}`),
      ].join('\n'),
      links: roles.map((entry) => ({ label: entry.company, href: `/experience/${entry.id}` })),
    },
  ];

  if (current) {
    items.push({
      question: `What are you building at ${current.company}?`,
      answer: current.summary,
      links: [{ label: `${current.company} in detail`, href: `/experience/${current.id}` }],
    });
  }

  items.push(
    {
      question: 'Which systems are you proudest of?',
      answer: sources.caseStudies
        .map((study) => `${study.product.title} — ${study.product.tagline}`)
        .join('\n\n'),
      links: sources.caseStudies.map((study) => ({ label: study.product.title, href: study.href })),
    },
    {
      question: 'Do you build open source?',
      answer: sources.openSource.map((project) => `${project.title} — ${project.subtitle}`).join('\n'),
      links: [{ label: 'All open source', href: '/opensource' }],
    },
    {
      question: 'What is your tech stack?',
      answer: sources.skills.map((group) => `${group.category}: ${group.items.join(', ')}`).join('\n'),
    },
    {
      question: 'How do I get in touch?',
      answer: `Email ${sources.email}. Always open to interesting problems and collaborations.`,
      links: [{ label: sources.email, href: `mailto:${sources.email}` }],
    },
  );

  return items;
}

export const faq: FaqItem[] = buildFaq({
  experience,
  caseStudies: resolvedCaseStudies(),
  openSource: openSourceProjects,
  skills: aboutSkills,
  email: site.email,
  lede: heroLede,
});
