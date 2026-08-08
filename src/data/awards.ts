export interface Award {
  date: string;
  title: string;
  organization: string;
  description: string;
}

export const awards: Award[] = [
  {
    date: 'November 2024',
    title: 'Leadership Excellence',
    organization: 'Apra Labs — Chosen by Team',
    description:
      'Recognized for managing new client relationships, smooth communication, mentorship, and independent release execution.',
  },
  {
    date: 'April 2023',
    title: 'Customer Appreciation',
    organization: 'Apra Labs — Chosen by Team',
    description:
      'Recognized for making a major trade-show demonstration a resounding success and active participation in technical activities.',
  },
  {
    date: 'Pravega X Fest',
    title: 'Guiding Vision',
    organization: 'Apra Labs',
    description:
      'Acknowledged for exceptional contribution and unwavering dedication, reflecting exemplary teamwork and commitment.',
  },
  {
    date: 'May 2010',
    title: 'Best Boy Award',
    organization: 'Govindram Seksaria College',
    description: 'Awarded for outstanding performance in academics and curricular activities.',
  },
];
