export interface Product {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

export const products: Product[] = [
  {
    title: 'GraphRAG Knowledge Engine',
    subtitle: 'Enterprise knowledge graph pipeline',
    description:
      'Full GraphRAG pipeline that ingests documents and builds knowledge graphs with entities, relationships, topics, and communities via vector similarity. 17 activity classes orchestrated through Azure Durable Functions, 14 prompt templates driving entity extraction and community summarization.',
    tags: ['Python', 'Durable Functions', 'Cosmos DB', 'FAISS'],
  },
  {
    title: 'Multi-Agent Conversational AI',
    subtitle: 'Supervisor-pattern agent orchestration',
    description:
      'Multi-agent assistant using a supervisor pattern to route conversations to 5 specialized agents — Reporting, Admin, System Setup, Knowledge & Documentation, and Support Tickets. Registry-driven tool system with two-tier RAG for context retrieval.',
    tags: ['Python', 'LangChain', 'LangGraph', 'SignalR'],
  },
  {
    title: 'AI Code Review Pipeline',
    subtitle: 'CI/CD-integrated automated reviews',
    description:
      'Pipeline that automatically reviews pull requests in Azure DevOps with inline comments and star ratings. Supports 10+ languages with penalty-based scoring, a model-aware client that switches between GPT models, and a fix verification mode that re-reviews after corrections.',
    tags: ['Python', 'Azure DevOps', 'GPT'],
  },
  {
    title: 'Cloud Cost Intelligence Agent',
    subtitle: 'Automated FinOps analysis & reporting',
    description:
      'FinOps agent that collects, analyzes, and reports on cloud spending across Azure. 18 data collectors running in 3 phases, 13 deterministic anomaly detectors. Identified unused resources and optimization opportunities, reducing overall cloud costs by 30%.',
    tags: ['TypeScript', 'Azure Cost Mgmt', 'LLM'],
  },
  {
    title: 'Infrastructure Performance Agent',
    subtitle: 'Health scoring & regression detection',
    description:
      'Daily performance monitoring system that computes a composite health score (0–100) for each service. Uses rolling 30-day baselines for regression detection, surfacing degradation before it impacts users. Reports delivered via Service Bus.',
    tags: ['TypeScript', 'Azure Monitor', 'Service Bus'],
  },
  {
    title: 'Search Index Sync Engine',
    subtitle: 'Real-time & bulk search indexing',
    description:
      'Search indexing engine synchronizing records into Azure Cognitive Search. Handles bulk indexing of large datasets via Durable Functions orchestrations, with real-time incremental sync for live updates through Service Bus triggers.',
    tags: ['C# / .NET 8', 'Cognitive Search', 'Service Bus'],
  },
  {
    title: 'Secure Logistics ERP',
    subtitle: 'PAN India logistics platform',
    description:
      'End-to-end ERP for a secure logistics company — Finance, Operations, Booking App, Hub Management, CRM, Route Planning, and Last-Mile/First-Mile tracking. Serving 2,500 daily users across the company, processing 70K dockets/month for jewellery manufacturers shipping to retail stores.',
    tags: ['PHP', 'AWS', 'React', 'Node.js'],
  },
  {
    title: 'UXgage — Behavioral Analytics',
    subtitle: 'Enterprise usability analytics platform',
    description:
      'Enterprise usability tool capturing clicks, dropdowns, mouse movements, text input, navigation and URL transitions to reconstruct actual user workflows. Built the JS instrumentation engine, data pipeline, and workflow analysis system from scratch.',
    tags: ['PHP', 'Neo4J', 'Cassandra', 'JavaScript'],
  },
];
