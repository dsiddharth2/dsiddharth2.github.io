export interface AboutSkill {
  category: string;
  items: string[];
}

export interface AboutCapability {
  title: string;
  description: string;
  featured?: boolean;
}

export const aboutBio = [
  "I've been building software products for over 12 years, starting as an intern at a college incubation center and growing into an Associate Architect role where I manage multiple clients and lead engineering teams. My career has followed a consistent pattern: find a problem nobody's solving, take full ownership, and ship a production system that people depend on every day.",
  'At <strong>Apra Labs</strong>, I joined as a Senior Software Engineer and now serve as Associate Architect. I\'ve built the AI and data platform layer for a unified facility management product serving 300+ US facilities. This includes a GraphRAG knowledge engine over 150K documents, a multi-agent conversational AI system querying a 4 TB database, an automated code review pipeline, a cloud cost intelligence agent that reduced Azure spend by 30%, and an infrastructure performance agent. I manage 3 clients simultaneously and mentor a team of 4 engineers.',
  'Before that, I spent 3 years at <strong>MildlyClassic</strong>, where I built a mission-critical logistics ERP from scratch — Finance, Operations, Booking, Hub Management, CRM, Route Planning — that grew to 2,500 daily users handling 70,000 dockets per month for secure jewellery logistics across India. I hired 7 engineers and established the engineering process from the ground up.',
  'Earlier, I co-founded <strong>UXgage</strong>, a behavioral analytics startup that won a ₹5L cash prize from Sandbox Startups in 6 months, with office space and Azure infrastructure granted separately. I also founded <strong>Samvit Learning</strong>, a software training institute during my MCA, where I trained 250+ students in web programming.',
];

export const aboutCapabilities: AboutCapability[] = [
  {
    title: 'System Architecture',
    description:
      "End-to-end design of production systems — from database schema to API layer to deployment pipeline. I've architected ERPs, AI platforms, analytics engines, and multi-agent systems that serve thousands of users daily.",
    featured: true,
  },
  {
    title: 'AI & Data Systems',
    description:
      'Building production AI — not prototypes. 7 AI agents shipped, 5 production AI systems. GraphRAG pipelines, multi-agent orchestration, automated code review, cloud cost optimization, infrastructure monitoring.',
  },
  {
    title: 'Team Building & Leadership',
    description:
      "20+ engineers hired and mentored, including campus hires. I've grown with a company from 10 to 55 people, led campus hiring for 4 years, managed 3 clients simultaneously, and run 10 community meetups on Saturdays.",
  },
  {
    title: '0-to-1 Product Development',
    description:
      "Taking ideas from a whiteboard to production. I've co-founded a startup, built an ERP from scratch that became the backbone of an entire company, and shipped products that handle 100K hits per day.",
  },
];

export const aboutSkills: AboutSkill[] = [
  {
    category: 'Languages & Frameworks',
    items: ['Python · TypeScript · C# / .NET 8', 'PHP · React · Node.js', 'LangChain · LangGraph'],
  },
  {
    category: 'AI & Data',
    items: ['GPT / LLM integration', 'FAISS · Vector search', 'GraphRAG · Multi-agent systems'],
  },
  {
    category: 'Infrastructure',
    items: [
      'Azure (Durable Functions, Service Bus, Cosmos DB)',
      'AWS · Azure AI Search',
      'Neo4j · Cassandra',
    ],
  },
  {
    category: 'Practices',
    items: ['System design & architecture', 'CI/CD · DevOps · FinOps', 'Team hiring & mentorship'],
  },
];

export const aboutEducation = {
  degree: 'Master of Computer Applications (MCA)',
  school: 'Gogte Institute of Technology, Belgaum',
};
