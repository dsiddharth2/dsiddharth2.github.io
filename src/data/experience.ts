export interface ExperienceMetric {
  value: string;
  label: string;
}

export interface ExperienceColumn {
  title: string;
  items: string[];
}

export interface EarlierEntry {
  company: string;
  role: string;
  summary: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  summary: string;
  metrics?: ExperienceMetric[];
  items?: string[];
  columns?: ExperienceColumn[];
  extra?: {
    title: string;
    description: string;
  };
  earlierEntries?: EarlierEntry[];
}

export const experience: ExperienceEntry[] = [
  {
    id: 'apra-labs',
    company: 'Apra Labs',
    role: 'Associate Architect',
    period: 'Aug 2019 – Present',
    summary:
      'Built the AI and data platform layer for a unified facility management product serving 300+ US facilities.',
    metrics: [
      { value: '300+', label: 'facilities served' },
      { value: '30%', label: 'cloud costs reduced' },
      { value: '10→55', label: 'team growth' },
    ],
    items: [
      'Virtual Credentials — facility entry/exit across 300+ US buildings',
      'Reporting platform — 1000s of reports per hour across 300+ tenants',
      'Analytics platform from scratch — facility operations monitoring',
      'GraphRAG pipeline — 1.5L support case documents, accurate answers',
      'Interactive chat system over 4 TB database',
      'Cloud Cost Agent — real-time Azure analysis, 30% cost reduction',
    ],
    columns: [
      {
        title: 'Leadership & Impact',
        items: [
          'Managing 3 clients with technical expertise, helping the team build and ship products',
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
    company: 'MildlyClassic',
    role: 'Engineering Team Lead',
    period: 'May 2016 – May 2023',
    summary:
      'Built and scaled a mission-critical logistics ERP from scratch to 2,500 daily users handling 70K dockets/month.',
    metrics: [
      { value: '70K', label: 'dockets/month' },
      { value: '2.5K', label: 'daily users' },
      { value: '7', label: 'engineers hired' },
    ],
    items: [
      'End-to-end ERP — Finance, Ops, Booking App, Hub Management for PAN India secure logistics',
      'Clients: large jewellery manufacturers shipping daily from manufacturing to retail',
      'Bulk Docket creation via upload, 70K deliveries/month',
      'Scaled from 100s to 2,500 daily users with zero downtime',
      'Migrated DigitalOcean → AWS in 3 months after security incident',
    ],
    columns: [
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
        'Pre-Jio era — built byte-counting and usage sync software on Wi-Fi hardware for a sister company selling data at ₹2/100 MB. Built the Google NBU analytics platform for Hubli. Hired 4-5 members post-funding.',
    },
  },
  {
    id: 'uxgage',
    company: 'UXgage',
    role: 'Co-Founder & CTO',
    period: 'Oct 2015 – Apr 2016',
    summary:
      'Took an idea from zero to a funded product in 6 months — ₹5L seed from Sandbox Startups, plus office space and Azure infrastructure.',
    metrics: [
      { value: '0→1', label: 'product shipped' },
      { value: '₹5L', label: 'seed funding' },
    ],
    items: [
      'Core product architecture — PHP, Neo4j, Cassandra',
      'JS instrumentation engine capturing user interactions and behavioral data',
      'Data pipeline for large-volume user interaction storage',
    ],
    columns: [
      {
        title: 'Leadership',
        items: [
          'Owned the product end-to-end — not a contributor, the builder',
          'Hired ~3 engineers, mentored them, unblocked technical challenges',
          'Conducted product demos for clients and stakeholders',
        ],
      },
    ],
  },
  {
    id: 'earlier',
    company: 'Earlier',
    role: '',
    period: '2010 – 2015',
    summary: '',
    earlierEntries: [
      {
        company: 'Firaa.me',
        role: 'Side Project · Built at IdeaFlask · Sep 2014 – Sep 2015',
        summary:
          'Built and shipped a travel blogging platform end-to-end. Reached 500+ organic users in 6 months with zero marketing spend.',
      },
      {
        company: 'Samvit Learning',
        role: 'Founder · Apr 2011 – Apr 2016',
        summary:
          'Founded a software training institute during 2nd year of MCA. Trained 250+ students in web programming technologies. Managed 25+ innovative projects.',
      },
      {
        company: 'dotCORD IT Solutions',
        role: 'Web Developer Intern · 2010–2013',
        summary:
          'Interned for 3 years at GIT Incubation Center. Learned software engineering before completing MCA. Built applications on PHP frameworks (CodeIgniter, Yii).',
      },
    ],
  },
];
