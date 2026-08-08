export interface ExperienceColumn {
  title: string;
  items: string[];
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  summary: string;
  tags?: string[];
  columns?: ExperienceColumn[];
  extra?: {
    title: string;
    description?: string;
    items?: string[];
  };
  detail?: string;
  compact?: boolean;
  location?: string;
}

export const experience: ExperienceEntry[] = [
  {
    id: 'apra-labs',
    company: 'Apra Labs',
    role: 'Senior Engineer → Associate Architect',
    period: 'Aug 2019 – Present',
    summary:
      'Built the AI and data platform layer for a unified facility management product serving 300+ US facilities. Reduced cloud costs by 30%, deployed GraphRAG over 1.5L documents, and shipped a chat system over 4 TB of data.',
    tags: ['300+ Facilities', '30% Cost Reduced', '1.5L Docs in RAG', '4 TB Database', '10 → 55 People'],
    columns: [
      {
        title: 'Products I Built',
        items: [
          'Virtual Credentials — facility entry/exit across 300+ US buildings',
          'Reporting platform — 1000s of reports per hour across 300+ tenants',
          'Analytics platform from scratch — facility operations monitoring',
          'GraphRAG pipeline — 1.5L support case documents, accurate answers',
          'Interactive chat system over 4 TB database',
          'Cloud Cost Agent — real-time Azure analysis, 30% cost reduction',
        ],
      },
      {
        title: 'Leadership & Impact',
        items: [
          'Managing 3 clients, helping the team build and ship products',
          'Lead a team of 4 as technical mentor across multiple projects',
          'Architected all systems end-to-end',
          'Led 10 community meetups on Saturdays',
          'Campus hiring lead for 4 years — IIIT Dharwad & GIT Belgaum',
          'Grew with the company from 10 engineers to 55 people',
        ],
      },
    ],
  },
  {
    id: 'mildlyclassic',
    company: 'MildlyClassic Technologies',
    role: 'Engineering Team Lead',
    period: 'May 2016 – May 2023',
    summary:
      'Built and scaled a mission-critical logistics ERP from scratch to 2,500 daily users handling 70K dockets/month. Simultaneously helped launch a sister company\'s Wi-Fi product that made it into YC W17.',
    tags: ['70K Dockets/Month', '2.5K Daily Users', '7 Engineers Hired', '4-Week Releases'],
    columns: [
      {
        title: 'Secure Logistics ERP',
        items: [
          'End-to-end ERP — Finance, Ops, Booking App, Hub Management for PAN India secure logistics',
          'Clients: large jewellery manufacturers shipping daily from manufacturing to retail',
          'Bulk Docket creation via upload, 70K deliveries/month',
          'Scaled from 100s to 2,500 daily users with zero downtime',
          'Migrated DigitalOcean → AWS in 3 months after security incident',
        ],
      },
      {
        title: 'Leadership & Process',
        items: [
          'Hired 7 developers, led the team through the full product lifecycle',
          'Direct client interface — requirements to modules',
          'Established 4-week release cycle — build, test, deploy monthly',
          'System served entire company (Ops + Finance) all day, every day',
        ],
      },
    ],
    extra: {
      title: 'Meanwhile — Sister Company · Affordable Wi-Fi → YC W17',
      description:
        'While the ERP was running under my technical guidance, the founders started a sister company selling affordable Wi-Fi at ₹2 per 100 MB at chai shops and bakeries. This was the pre-Jio era — internet was expensive.',
      items: [
        'First engineer — built byte-counting and usage sync software on Wi-Fi hardware',
        'Synced user IDs and data quotas between devices and central server',
        'Built platform for Google\'s "Next Billion Users" (NBU) contract in Hubli',
        'Hired 4-5 members to scale the product after funding',
      ],
    },
  },
  {
    id: 'uxgage',
    company: 'UXgage',
    role: 'Co-Founder & CTO',
    period: 'Oct 2015 – Apr 2016',
    summary:
      'Took an idea from zero to a funded product in 6 months — ₹5L seed from Sandbox Startups, plus office space and Azure infrastructure.',
    tags: ['0 → 1 Product', '₹5L Seed Funding', '3 Engineers Hired', '~6 Months'],
    columns: [
      {
        title: 'What I Built',
        items: [
          'Core product architecture — PHP, Neo4j, Cassandra',
          'JS instrumentation engine capturing user interactions and transmitting behavioral data',
          'Data pipeline for large-volume user interaction storage',
          'URL transition capture to reconstruct actual user workflows',
        ],
      },
      {
        title: 'Leadership',
        items: [
          'Owned the product end-to-end — not a contributor, the builder',
          'Hired ~3 engineers, mentored them, unblocked technical challenges',
          'Led technical execution through product development',
          'Conducted product demos for clients and stakeholders',
        ],
      },
    ],
  },
  {
    id: 'firaame',
    company: 'Firaa.me',
    role: 'Side Project · Team Lead',
    period: 'Built alongside UXgage',
    summary:
      'Built and shipped a travel blogging platform end-to-end. Reached 500+ organic users in 6 months with zero marketing spend.',
    tags: ['500+ Organic Users', '6 Months', '₹0 Marketing'],
    detail:
      'Took the product from development to a publicly accessible release and got it into the hands of real users rather than leaving it as an internal prototype.',
  },
  {
    id: 'samvit',
    company: 'Samvit Learning',
    role: 'Founder',
    period: '2011 – 2016',
    location: 'Belgaum',
    summary:
      'Founded a software training institute during 2nd year of MCA. Trained 500+ students in web technologies over five years, scaling to a sustainable recurring revenue model. Managed 25+ projects.',
    compact: true,
  },
  {
    id: 'dotcord',
    company: 'dotCORD IT Solutions',
    role: 'Web Developer Intern',
    period: '2010 – 2013',
    location: 'Belgaum',
    summary:
      'Interned for nearly 3 years at the Incubation Center of Gogte Institute of Technology — learned software engineering before completing MCA. Built applications on PHP frameworks (CodeIgniter, Yii).',
    compact: true,
  },
];
