export interface AboutSkill {
  category: string;
  items: string[];
}

export interface AboutCapabilityArea {
  area: string;
  /** One clause of real evidence — never a bare technology list. */
  evidence: string;
}

export interface AboutCapability {
  title: string;
  description: string;
  featured?: boolean;
}

export const aboutBio = [
  "I've spent 12 years building software <em>with</em> the people who use it. I've been the direct client interface since 2016, gathering requirements, running demos, and shipping the system that came out of those conversations. Today I run three client engagements simultaneously as an Associate Architect. The pattern hasn't changed since I was an intern at a college incubation center: find the problem nobody's solving, take full ownership, and ship a production system people depend on every day.",
  'At <strong>Apra Labs</strong>, I joined as a Senior Software Engineer and now serve as Associate Architect. I\'ve built the AI and data platform layer for a unified facility management product serving 300+ US facilities. This includes a GraphRAG knowledge engine over 20K support documents, a multi-agent conversational AI system querying a 4 TB database, an automated code review pipeline, a cloud cost intelligence agent that reduced Azure spend by 30%, and an infrastructure performance agent. I manage 3 clients simultaneously and mentor a team of 4 engineers.',
  'Before that, I spent 3 years at <strong>MildlyClassic</strong>, where I built a mission-critical logistics ERP from scratch — Finance, Operations, Booking, Hub Management, CRM, Route Planning — that grew to 2,500 daily users handling 70,000 dockets per month for secure jewellery logistics across India. I hired 7 engineers and established the engineering process from the ground up.',
  'Earlier, I co-founded <strong>UXgage</strong>, a behavioral analytics startup that won a ₹5L cash prize from Sandbox Startups in 6 months, with office space and Azure infrastructure granted separately. I also founded <strong>Samvit Learning</strong>, a software training institute during my MCA, where I trained 250+ students in web programming.',
  'The title on my contract says Architect, and the architecture work is the part I would not want to give up. But the shape of the job has been drifting for years, further from diagrams and further into sitting with the people who have the problem, prototyping something rough enough to argue with, and then owning it through deployment and whatever it does in production afterwards. That is close enough to the definition of <strong>forward deployed engineering</strong>, and it is the work I want more of.',
];

export const aboutCapabilities: AboutCapability[] = [
  {
    title: 'Start from the problem',
    description:
      "Requirements come from the people doing the work. I've been the direct client interface since 2016, gathering requirements, running demos for stakeholders, and shipping the system that came out of those conversations. Three client engagements run in parallel today, and my team put me up for a Leadership Excellence award for how that work gets done.",
    featured: true,
  },
  {
    title: 'Architect and build',
    description:
      "End-to-end design of production systems, from database schema through API layer to deployment pipeline. I've architected ERPs, AI platforms, analytics engines, and multi-agent systems serving thousands of users daily, within the access model and infrastructure the business already runs on.",
  },
  {
    title: 'Ship and operate',
    description:
      '7 AI agents and 5 production AI systems shipped, then watched in production: health scoring, regression baselines, and nightly anomaly detection. A 4-week release cadence run monthly, a DigitalOcean-to-AWS migration completed in 3 months after a security incident, and zero-downtime scaling from hundreds to 2,500 daily users.',
  },
  {
    title: 'Hire and enable',
    description:
      "20+ engineers hired and mentored, including campus hires. I've grown with a company from 10 to 55 people, led campus hiring for 4 years, run 10 community meetups on Saturdays, and left non-technical staff querying a 4 TB database on their own.",
  },
];

export const aboutDepth: AboutCapabilityArea[] = [
  {
    area: 'Distributed systems',
    evidence:
      'Durable Functions orchestrating bulk pipelines, Service Bus decoupling a C# uploader from a Python processor, and collectors fanned out across dependency phases.',
  },
  {
    area: 'Cloud architecture',
    evidence:
      'Azure end to end: Functions, Service Bus, Cosmos DB, AI Search, Monitor. Plus a DigitalOcean to AWS migration completed in 3 months, mid-operation.',
  },
  {
    area: 'Data platforms',
    evidence:
      'A 4 TB operations database queried in natural language, 20K documents ingested into 11 Cosmos collections, and an analytics platform built from scratch.',
  },
  {
    area: 'APIs & integration',
    evidence:
      'A registry-driven tool system where ~30 tools are decorator-registered and the prompt is generated from them at startup. 100K daily API hits sustained on the ERP.',
  },
  {
    area: 'AI & LLM systems',
    evidence:
      'Supervisor-pattern routing across 5 specialist agents, a doer–reviewer loop that checks claims against raw files, and models tiered by cost against task.',
  },
  {
    area: 'RAG & graph systems',
    evidence:
      'Two-stage ingest with entity, relationship, topic and community extraction, producing 90K entities and 150K+ relationships with hierarchical community detection.',
  },
  {
    area: 'Vector search',
    evidence:
      'Three parallel vector searches fused rather than one blended index, so the reranker keeps the signal for why a chunk matched. FAISS and Cosmos doing different jobs.',
  },
  {
    area: 'Security & access control',
    evidence:
      'Post-generation permission rewriting on generated SQL and read-only validation, so a natural-language question cannot read across a tenant boundary.',
  },
  {
    area: 'Observability',
    evidence:
      'Composite 0–100 health scores per service against rolling 30-day baselines, over Azure Monitor metrics and SQL DMV telemetry sampled every 15 seconds.',
  },
  {
    area: 'Performance & cost',
    evidence:
      'Query cost attribution splitting a database bill across top queries by CPU share, 13 anomaly detectors, and 4-tier breach thresholds run nightly.',
  },
  {
    area: 'Infrastructure & delivery',
    evidence:
      'A 4-week release cycle run monthly, zero-downtime scaling from hundreds to 2,500 daily users, and CI-integrated automated code review across 10+ languages.',
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
