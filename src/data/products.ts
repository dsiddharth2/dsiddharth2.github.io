export type ProductIcon =
  | 'graph'
  | 'chat'
  | 'code'
  | 'cloud'
  | 'performance'
  | 'search'
  | 'truck'
  | 'analytics';

export interface Product {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  icon: ProductIcon;
}

export const products: Product[] = [
  {
    title: 'GraphRAG Knowledge Engine',
    subtitle: 'Enterprise knowledge graph pipeline',
    description:
      'Full GraphRAG pipeline — ingests documents, builds knowledge graphs with entities, relationships, topics, and communities via vector similarity. 17 activity classes, 14 prompt templates.',
    tags: ['Python', 'Durable Functions', 'Cosmos DB', 'FAISS'],
    icon: 'graph',
  },
  {
    title: 'Multi-Agent Conversational AI',
    subtitle: 'Supervisor-pattern agent orchestration',
    description:
      'Supervisor pattern routing to 5 specialized agents — Reporting, Admin, System Setup, Knowledge, and Support Tickets. Registry-driven tools, two-tier RAG.',
    tags: ['Python', 'LangChain', 'LangGraph', 'SignalR'],
    icon: 'chat',
  },
  {
    title: 'AI Code Review Pipeline',
    subtitle: 'CI/CD-integrated automated reviews',
    description:
      'Automatically reviews pull requests with inline comments and star ratings. 10+ languages, penalty-based scoring, fix verification mode.',
    tags: ['Python', 'Azure DevOps', 'GPT'],
    icon: 'code',
  },
  {
    title: 'Cloud Cost Intelligence Agent',
    subtitle: 'Automated FinOps analysis',
    description:
      '18 data collectors, 3 phases, 13 anomaly detectors. Identified unused resources and optimization opportunities, reducing cloud costs by 30%.',
    tags: ['TypeScript', 'Azure Cost Mgmt', 'LLM'],
    icon: 'cloud',
  },
  {
    title: 'Infrastructure Performance Agent',
    subtitle: 'Health scoring & regression detection',
    description:
      'Composite health score (0–100) per service. Rolling 30-day baselines for regression detection, surfacing degradation before impact.',
    tags: ['TypeScript', 'Azure Monitor', 'Service Bus'],
    icon: 'performance',
  },
  {
    title: 'Search Index Sync Engine',
    subtitle: 'Real-time & bulk search indexing',
    description:
      'Synchronizing records into Azure Cognitive Search. Bulk indexing via Durable Functions, real-time incremental sync via Service Bus.',
    tags: ['C# / .NET 8', 'Cognitive Search', 'Service Bus'],
    icon: 'search',
  },
  {
    title: 'Secure Logistics ERP',
    subtitle: 'PAN India logistics platform',
    description:
      'End-to-end ERP — Finance, Operations, Booking, Hub Management, CRM, Route Planning. 2,500 daily users, 70K dockets/month.',
    tags: ['PHP', 'AWS', 'React', 'Node.js'],
    icon: 'truck',
  },
  {
    title: 'UXgage — Behavioral Analytics',
    subtitle: 'Enterprise usability platform',
    description:
      'Capturing clicks, mouse movements, text input, navigation and URL transitions to reconstruct actual user workflows. Built the entire stack from scratch.',
    tags: ['PHP', 'Neo4J', 'Cassandra', 'JavaScript'],
    icon: 'analytics',
  },
];
