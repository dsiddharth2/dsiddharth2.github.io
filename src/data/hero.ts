/**
 * Homepage hero copy. Every string here is already on the live site — the hero
 * H1 and lede, the About role line and lede, and the hero "12+" badge — so the
 * redesign changes how they look, never what they say.
 */

export const heroTitle = {
  before: 'Production AI systems for ',
  emphasis: 'complex, real-world',
  after: ' problems.',
};

export const heroTitleText = `${heroTitle.before}${heroTitle.emphasis}${heroTitle.after}`;

export const heroLede =
  'I work the full path from ambiguous problem to production: understanding the problem, designing the system, building it, deploying it, and iterating once people are using it.';

/** The About role line first, then the shorter labels it is made of. */
export const heroRoles = [
  'Architect · Applied AI · Engineering Leader',
  'Architect · Applied AI',
  'Engineering Leader',
];

export const aboutLede =
  '12 years turning ambiguous business problems into production systems — ERPs, AI platforms, multi-agent pipelines — across startups and enterprise.';

export const ownershipLine = "I don't just write code; I own the outcome end to end.";

export interface IntroTile {
  title: string;
  body: string;
}

export const introTiles: IntroTile[] = [
  { title: 'Hi, I’m Siddharth', body: aboutLede },
  { title: 'From problem to production', body: heroLede },
  { title: 'I own the outcome', body: ownershipLine },
];

/** The badge on the live hero photo. */
export const heroBadge = { value: '12+', label: 'years shipping' };
