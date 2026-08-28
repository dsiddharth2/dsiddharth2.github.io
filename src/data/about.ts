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
  "I've spent 12 years building software <em>with</em> the people who use it. I've been the direct client interface since 2016 — gathering requirements, running demos, and shipping the system that came out of those conversations. Today I run three client engagements simultaneously as an Associate Architect. The pattern hasn't changed since I was an intern at a college incubation center: find the problem nobody's solving, take full ownership, and ship a production system people depend on every day.",
  'At <strong>Apra Labs</strong>, I joined as a Senior Software Engineer and now serve as Associate Architect. I\'ve built the AI and data platform layer for a unified facility management product serving 300+ US facilities. This includes a GraphRAG knowledge engine over 20K support documents, a multi-agent conversational AI system querying a 4 TB database, an automated code review pipeline, a cloud cost intelligence agent that reduced Azure spend by 30%, and an infrastructure performance agent. I manage 3 clients simultaneously and mentor a team of 4 engineers.',
  'Before that, I spent 3 years at <strong>MildlyClassic</strong>, where I built a mission-critical logistics ERP from scratch — Finance, Operations, Booking, Hub Management, CRM, Route Planning — that grew to 2,500 daily users handling 70,000 dockets per month for secure jewellery logistics across India. I hired 7 engineers and established the engineering process from the ground up.',
  'Earlier, I co-founded <strong>UXgage</strong>, a behavioral analytics startup that won a ₹5L cash prize from Sandbox Startups in 6 months, with office space and Azure infrastructure granted separately. I also founded <strong>Samvit Learning</strong>, a software training institute during my MCA, where I trained 250+ students in web programming.',
];

export const aboutCapabilities: AboutCapability[] = [
  {
    title: 'Work the problem, not the ticket',
    description:
      "Requirements come from the people doing the work, not a spec handed down. I've been the direct client interface since 2016 — gathering requirements, running demos for stakeholders, and shipping the system that came out of those conversations. Three client engagements run in parallel today, and my team put me up for a Leadership Excellence award for how that work gets done.",
    featured: true,
  },
  {
    title: 'Architect and build',
    description:
      "End-to-end design of production systems — database schema through API layer to deployment pipeline. I've architected ERPs, AI platforms, analytics engines, and multi-agent systems serving thousands of users daily, within the access model and infrastructure the business already runs on.",
  },
  {
    title: 'Ship and operate',
    description:
      'Production AI, not prototypes. 7 AI agents and 5 production AI systems shipped, then watched in production — health scoring, regression baselines, and nightly anomaly detection. A 4-week release cadence run monthly, a DigitalOcean-to-AWS migration completed in 3 months after a security incident, and zero-downtime scaling from hundreds to 2,500 daily users.',
  },
  {
    title: 'Hire and enable',
    description:
      "20+ engineers hired and mentored, including campus hires. I've grown with a company from 10 to 55 people, led campus hiring for 4 years, run 10 community meetups on Saturdays, and left non-technical staff querying a 4 TB database on their own.",
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
