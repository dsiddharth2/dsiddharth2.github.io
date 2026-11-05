import { describe, expect, it } from 'vitest';
import { buildFaq, faq } from '@/data/faq';
import { experience } from '@/data/experience';
import { openSourceProjects } from '@/data/opensource';
import { aboutSkills } from '@/data/about';
import { resolvedCaseStudies } from '@/data/caseStudies';
import { heroLede } from '@/data/hero';
import { site } from '@/config/site';

const answer = (question: RegExp) => {
  const item = faq.find((entry) => question.test(entry.question));
  if (!item) throw new Error(`no FAQ question matching ${question}`);
  return item;
};

describe('faq', () => {
  it('answers "what do you do" with the live hero lede', () => {
    expect(answer(/what do you do/i).answer).toBe(heroLede);
  });

  it('lists every live role and earlier entry', () => {
    const text = answer(/where have you worked/i).answer;
    for (const entry of experience) {
      if (entry.earlierEntries) {
        for (const item of entry.earlierEntries) expect(text).toContain(item.company);
      } else {
        expect(text).toContain(`${entry.company} · ${entry.role} · ${entry.period}`);
      }
    }
  });

  it('uses the live current role summary', () => {
    expect(answer(/building at Apra Labs/).answer).toBe(experience[0].summary);
  });

  it('lists the featured case studies with live taglines', () => {
    const text = answer(/proudest/i).answer;
    for (const study of resolvedCaseStudies()) expect(text).toContain(study.product.tagline);
  });

  it('lists every open-source project', () => {
    const text = answer(/open source/i).answer;
    for (const project of openSourceProjects) expect(text).toContain(project.title);
  });

  it('lists the live skills', () => {
    const text = answer(/stack/i).answer;
    for (const group of aboutSkills) expect(text).toContain(group.category);
  });

  it('gives the live email', () => {
    expect(answer(/get in touch/i).answer).toContain(site.email);
  });

  it('never repeats the outdated canvas title', () => {
    const text = JSON.stringify(faq);
    expect(text).not.toContain('Associate Architect · previously Senior Software Engineer');
    expect(text).not.toContain('now serve as Associate Architect');
  });

  it('links only to live SEO URLs or mailto', () => {
    const allowed = /^(\/experience\/[a-z-]+|\/projects\/[a-z-]+|\/opensource|mailto:.+)$/;
    for (const item of faq) for (const link of item.links ?? []) expect(link.href).toMatch(allowed);
  });

  it('skips the current-role question when there are no roles', () => {
    const items = buildFaq({
      experience: [],
      caseStudies: [],
      openSource: [],
      skills: [],
      email: 'a@b.c',
      lede: 'x',
    });
    expect(items.some((item) => /building at/.test(item.question))).toBe(false);
  });
});
