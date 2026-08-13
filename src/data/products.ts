export type ProductIcon =
  | 'graph'
  | 'chat'
  | 'code'
  | 'cloud'
  | 'performance'
  | 'search'
  | 'truck'
  | 'analytics';

export interface ProductImpact {
  metric: string;
  label: string;
}

export interface Product {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  tags: string[];
  icon: ProductIcon;
  company: string;
  impact: ProductImpact[];
  architecture: string[];
}

export const products: Product[] = [
  {
    slug: 'graphrag',
    title: 'GraphRAG Knowledge Engine',
    subtitle: 'Enterprise knowledge graph pipeline',
    description:
      'Full GraphRAG pipeline — ingests documents, builds knowledge graphs with entities, relationships, topics, and communities via vector similarity. 17 activity classes, 14 prompt templates.',
    fullDescription:
      'Built a production-grade GraphRAG pipeline that ingests 150K support case documents and constructs a knowledge graph with entities, relationships, topics, and community structures. The system uses vector similarity (FAISS) to connect related concepts and surfaces accurate answers through a two-tier retrieval strategy — combining graph traversal with dense vector search for context-rich responses.',
    tags: ['Python', 'Durable Functions', 'Cosmos DB', 'FAISS'],
    icon: 'graph',
    company: 'Apra Labs',
    impact: [
      { metric: '150K', label: 'documents ingested' },
      { metric: '17', label: 'activity classes' },
      { metric: '14', label: 'prompt templates' },
      { metric: '2-tier', label: 'RAG retrieval' },
    ],
    architecture: [
      'Document ingestion and chunking pipeline with configurable strategies',
      'Entity and relationship extraction via LLM with structured output',
      'Community detection using graph algorithms for topic clustering',
      'FAISS vector index for similarity-based retrieval',
      'Azure Durable Functions for orchestrating long-running ingestion jobs',
      'Cosmos DB for graph storage with cross-partition queries',
    ],
  },
  {
    slug: 'multi-agent',
    title: 'Multi-Agent Conversational AI',
    subtitle: 'Supervisor-pattern agent orchestration',
    description:
      'Supervisor pattern routing to 5 specialized agents — Reporting, Admin, System Setup, Knowledge, and Support Tickets. Registry-driven tools, two-tier RAG.',
    fullDescription:
      'Designed and built a multi-agent conversational system using a supervisor pattern that routes user queries to 5 specialized agents: Reporting, Admin, System Setup, Knowledge, and Support Tickets. Each agent has its own tool registry, context window management, and fallback strategies. The system handles complex multi-turn conversations over a 4 TB database with real-time streaming responses via SignalR.',
    tags: ['Python', 'LangChain', 'LangGraph', 'SignalR'],
    icon: 'chat',
    company: 'Apra Labs',
    impact: [
      { metric: '5', label: 'specialized agents' },
      { metric: '4 TB', label: 'database queried' },
      { metric: 'Real-time', label: 'streaming via SignalR' },
      { metric: '300+', label: 'facilities served' },
    ],
    architecture: [
      'Supervisor agent with intent classification and routing logic',
      'Registry-driven tool system — each agent declares its capabilities',
      'Two-tier RAG: graph-based retrieval + dense vector search',
      'Multi-turn conversation management with context windowing',
      'SignalR integration for real-time streaming responses',
      'Fallback chains when primary agent cannot resolve',
    ],
  },
  {
    slug: 'code-review',
    title: 'AI Code Review Pipeline',
    subtitle: 'CI/CD-integrated automated reviews',
    description:
      'Automatically reviews pull requests with inline comments and star ratings. 10+ languages, penalty-based scoring, fix verification mode.',
    fullDescription:
      'Built an automated code review system that integrates directly into the CI/CD pipeline. When a pull request is opened, the system analyzes the diff, generates inline comments with specific improvement suggestions, and assigns a star rating using a penalty-based scoring algorithm. Supports 10+ programming languages with language-specific review rules. Includes a fix verification mode that re-reviews after the developer addresses feedback.',
    tags: ['Python', 'Azure DevOps', 'GPT'],
    icon: 'code',
    company: 'Apra Labs',
    impact: [
      { metric: '10+', label: 'languages supported' },
      { metric: 'Inline', label: 'PR comments' },
      { metric: 'Auto', label: 'fix verification' },
      { metric: '★', label: 'penalty-based scoring' },
    ],
    architecture: [
      'Azure DevOps webhook integration for PR events',
      'Diff parsing and chunking for targeted review',
      'Language-specific rule engine with configurable severity',
      'Penalty-based scoring algorithm for star ratings',
      'Fix verification mode — re-reviews after developer changes',
      'Inline comment threading on specific code lines',
    ],
  },
  {
    slug: 'cloud-cost',
    title: 'Cloud Cost Intelligence Agent',
    subtitle: 'Automated FinOps analysis',
    description:
      '18 data collectors, 3 phases, 13 anomaly detectors. Identified unused resources and optimization opportunities, reducing cloud costs by 30%.',
    fullDescription:
      'Designed a multi-phase cloud cost analysis agent that collects data from 18 Azure services, runs 13 anomaly detection algorithms, and generates actionable cost optimization recommendations. The agent operates in 3 phases: data collection, analysis, and recommendation generation. It identified unused resources, over-provisioned services, and scheduling opportunities that resulted in a 30% reduction in cloud spend.',
    tags: ['TypeScript', 'Azure Cost Mgmt', 'LLM'],
    icon: 'cloud',
    company: 'Apra Labs',
    impact: [
      { metric: '30%', label: 'cost reduction' },
      { metric: '18', label: 'data collectors' },
      { metric: '13', label: 'anomaly detectors' },
      { metric: '3', label: 'analysis phases' },
    ],
    architecture: [
      '18 data collectors spanning compute, storage, networking, and PaaS',
      '3-phase pipeline: collection → analysis → recommendations',
      '13 anomaly detection algorithms for spend patterns',
      'Resource utilization scoring and right-sizing suggestions',
      'Scheduling recommendations for non-production workloads',
      'Cost allocation and tagging compliance checks',
    ],
  },
  {
    slug: 'infra-perf',
    title: 'Infrastructure Performance Agent',
    subtitle: 'Health scoring & regression detection',
    description:
      'Composite health score (0–100) per service. Rolling 30-day baselines for regression detection, surfacing degradation before impact.',
    fullDescription:
      'Built an infrastructure monitoring agent that computes a composite health score (0–100) for each service based on response times, error rates, throughput, and resource utilization. Uses rolling 30-day baselines to detect performance regressions before they cause user-visible impact. Alerts are generated when scores deviate beyond configurable thresholds, with root-cause analysis pointing to the degraded metric.',
    tags: ['TypeScript', 'Azure Monitor', 'Service Bus'],
    icon: 'performance',
    company: 'Apra Labs',
    impact: [
      { metric: '0–100', label: 'health score per service' },
      { metric: '30-day', label: 'rolling baselines' },
      { metric: 'Pre-impact', label: 'regression detection' },
      { metric: 'Auto', label: 'root-cause analysis' },
    ],
    architecture: [
      'Composite health scoring across 4 dimensions per service',
      'Rolling 30-day baseline computation with outlier exclusion',
      'Regression detection using statistical deviation thresholds',
      'Root-cause analysis pinpointing degraded metrics',
      'Azure Monitor integration for telemetry ingestion',
      'Service Bus for event-driven alert distribution',
    ],
  },
  {
    slug: 'search-sync',
    title: 'Search Index Sync Engine',
    subtitle: 'Real-time & bulk search indexing',
    description:
      'Synchronizing records into Azure AI Search. Bulk indexing via Durable Functions, real-time incremental sync via Service Bus.',
    fullDescription:
      'Built a dual-mode search synchronization engine that keeps Azure AI Search indices in sync with the primary database. Bulk mode uses Durable Functions to orchestrate full re-indexing of large datasets with retry and checkpoint logic. Real-time mode uses Service Bus to process incremental changes within seconds of the source update. The system handles schema evolution, field mapping transformations, and index versioning.',
    tags: ['C# / .NET 8', 'Azure AI Search', 'Service Bus'],
    icon: 'search',
    company: 'Apra Labs',
    impact: [
      { metric: 'Real-time', label: 'incremental sync' },
      { metric: 'Bulk', label: 'full re-indexing' },
      { metric: 'Dual', label: 'sync modes' },
      { metric: 'Auto', label: 'schema evolution' },
    ],
    architecture: [
      'Dual-mode sync: bulk via Durable Functions, real-time via Service Bus',
      'Checkpoint and retry logic for large-scale re-indexing',
      'Field mapping transformations between source and search schemas',
      'Index versioning for zero-downtime schema updates',
      'Configurable sync strategies per entity type',
      'Monitoring and alerting for sync lag and failures',
    ],
  },
  {
    slug: 'logistics-erp',
    title: 'Secure Logistics ERP',
    subtitle: 'PAN India logistics platform',
    description:
      'End-to-end ERP — Finance, Operations, Booking, Hub Management, CRM, Route Planning. 2,500 daily users, 70K dockets/month.',
    fullDescription:
      'Architected and built a comprehensive logistics ERP from scratch, covering Finance, Operations, Booking, Hub Management, CRM, and Route Planning modules. The system handles 70,000 dockets per month for secure jewellery logistics across PAN India. Scaled from a handful of users to 2,500 daily active users with zero downtime. Led the migration from DigitalOcean to AWS in 3 months after a security incident.',
    tags: ['PHP', 'AWS', 'React', 'Node.js'],
    icon: 'truck',
    company: 'MildlyClassic',
    impact: [
      { metric: '2.5K', label: 'daily active users' },
      { metric: '70K', label: 'dockets/month' },
      { metric: '100K', label: 'daily hits' },
      { metric: '0', label: 'downtime during scale' },
    ],
    architecture: [
      'Modular ERP: Finance, Ops, Booking, Hub Mgmt, CRM, Route Planning',
      'Bulk docket creation via CSV upload with validation',
      'Multi-tenant architecture serving multiple jewellery manufacturers',
      'Real-time tracking and status updates across hubs',
      'DigitalOcean → AWS migration in 3 months post-security incident',
      'Monthly release cycle with automated testing pipeline',
    ],
  },
  {
    slug: 'uxgage',
    title: 'UXgage — Behavioral Analytics',
    subtitle: 'Enterprise usability platform',
    description:
      'Capturing clicks, mouse movements, text input, navigation and URL transitions to reconstruct actual user workflows. Built the entire stack from scratch.',
    fullDescription:
      'Co-founded and built a behavioral analytics platform that captures granular user interactions — clicks, mouse movements, text input, scroll patterns, navigation transitions — and reconstructs complete user workflows. The JS instrumentation engine runs asynchronously with minimal performance overhead. Data is stored in Cassandra for high write throughput and queried through Neo4j for workflow graph analysis. Won a ₹5L cash prize from Sandbox Startups within 6 months, with office space and Azure infrastructure granted separately.',
    tags: ['PHP', 'Neo4j', 'Cassandra', 'JavaScript'],
    icon: 'analytics',
    company: 'UXgage (Co-founder)',
    impact: [
      { metric: '₹5L', label: 'cash prize won' },
      { metric: '0→1', label: 'from idea to product' },
      { metric: '6 mo', label: 'to shipped MVP' },
      { metric: '~3', label: 'engineers hired' },
    ],
    architecture: [
      'JS instrumentation engine with async event capture',
      'High-throughput event storage on Cassandra',
      'Workflow graph reconstruction using Neo4j',
      'Session replay with interaction heatmaps',
      'URL transition tracking for navigation flow analysis',
      'Minimal-overhead integration via single script tag',
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
