export interface Award {
  title: string;
  description: string;
  featured?: boolean;
}

export const awards: Award[] = [
  {
    title: 'Leadership Excellence',
    description:
      'Apra Labs · Nov 2024 — Chosen by team for client management, mentorship, and independent releases',
    featured: true,
  },
  {
    title: 'Customer Appreciation',
    description: 'Apra Labs · Apr 2023 — Made a major trade-show demo a resounding success',
  },
  {
    title: 'Guiding Vision',
    description: 'Pravega X Fest — Exceptional contribution and unwavering dedication',
  },
  {
    title: 'Best Boy Award',
    description: 'Govindram Seksaria College · May 2010',
  },
];
