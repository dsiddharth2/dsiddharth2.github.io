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

export interface ProductOverview {
  problem: string[];
  solution: string[];
  outcome: string[];
}

export interface ProductStage {
  stage: string;
  detail: string;
}

export interface ProductDecision {
  title: string;
  detail: string;
}

export interface ProductReflection {
  title: string;
  detail: string;
}

export interface Product {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  tags: string[];
  stack: string[];
  icon: ProductIcon;
  company: string;
  confidentialNote?: string;
  impact: ProductImpact[];
  overview: ProductOverview;
  /** Full-width diagram with fullscreen viewer. Omit when there is no architecture image. */
  architectureSvg?: string;
  howItWorks: ProductStage[];
  decisions: ProductDecision[];
  evaluation?: string;
  reflections: ProductReflection[];
}

export const products: Product[] = [
  {
    slug: 'graphrag',
    title: 'GraphRAG Knowledge Engine',
    subtitle: 'Enterprise knowledge graph pipeline',
    tagline: 'Turning 20K unstructured support tickets into an answerable knowledge base.',
    description:
      'Full GraphRAG pipeline — ingests documents, builds knowledge graphs with entities, relationships, topics, and communities via vector similarity. 17 activity classes, 14 prompt templates.',
    tags: ['Python', 'Durable Functions', 'Cosmos DB', 'FAISS'],
    stack: [
      'Python',
      'Azure Functions (Durable)',
      'Azure Service Bus',
      'Cosmos DB',
      'SQL Server',
      'FAISS',
      'gpt-4o-mini',
      'text-embedding-3-small',
    ],
    icon: 'graph',
    company: 'Confidential',
    confidentialNote:
      'Built in a production environment; employer and product names withheld under confidentiality.',
    impact: [
      { metric: '20K', label: 'support documents' },
      { metric: '90K', label: 'entities extracted' },
      { metric: '150K+', label: 'relationships' },
      { metric: '11', label: 'Cosmos collections' },
    ],
    overview: {
      problem: [
        'Recurring tickets solved from scratch every time',
        'Critical knowledge buried across 20K+ documents',
        'Keyword search fails on terminology variants',
        'No cross-ticket pattern discovery possible',
        'Support agents lack contextual answers',
        'Hours wasted searching disconnected sources',
      ],
      solution: [
        'Two-stage ingest pipeline with graph extraction',
        'Graph entities and community detection applied',
        'Three parallel vector search strategies fused',
        'Pre-generated Q&A cache for common queries',
        'FAISS + Cosmos DB hybrid retrieval layer',
        'Durable Functions orchestrate bulk processing',
      ],
      outcome: [
        'Seconds-to-searchable document indexing achieved',
        'Grounded answers with full data citations',
        '90K entities and 150K+ relationships mapped',
        'Support knowledge finally reusable at scale',
        '11 Cosmos collections serving live traffic',
        'Duplicate ticket resolution dramatically reduced',
      ],
    },
    architectureSvg: 'images/architecture/graphrag-architecture.svg',
    howItWorks: [
      {
        stage: 'Ingestion',
        detail:
          'A C# Function App watches the Data Lake. When a new file lands, it drops a Service Bus message — file URL, metadata, RagType. A Python Function App picks it up, pulls the file, and hands it to FileReader, which knows how to read PDF, DOCX, TXT, CSV, JSON, and MD.',
      },
      {
        stage: 'Baseline RAG (seconds)',
        detail:
          'The text goes through SmartChunkingUtil, which splits it into overlapping chunks while keeping URLs intact and respecting sentence boundaries. Chunks land in text_units_collection. Another Service Bus message fires the Deep RAG stage.',
      },
      {
        stage: 'Deep RAG (10–60+ minutes)',
        detail:
          'gpt-4o-mini reads each chunk and pulls out named entities and typed relationships, with strength scores. It also groups chunks into topics. Every entity gets embedded via text-embedding-3-small. FAISS builds a kNN similarity graph, then hierarchical community detection clusters them recursively. For each community the LLM writes a narrative summary and pre-generates Q&A pairs. Everything persists across 11 Cosmos collections.',
      },
      {
        stage: 'Retrieval (query time)',
        detail:
          "The user's question gets embedded, then three Cosmos VectorDistance() searches run in parallel against entities, topics, and questions. Top matches trigger graph expansion. All of that gets formatted into structured tables, injected into the system prompt, and sent to gpt-4o-mini. The model returns a grounded answer with data citations.",
      },
    ],
    decisions: [
      {
        title: 'Two-stage pipeline: seconds-to-searchable, minutes-to-graph-enriched',
        detail:
          "Full graph enrichment takes 10 to 60+ minutes per document. You can't make users wait for that before their doc is even findable. Stage 1 does the cheap work — read, chunk, index — and marks the doc searchable in seconds. Then it fires a Service Bus message that kicks off Stage 2 in the background.",
      },
      {
        title: 'Three parallel vector searches, not one blended index',
        detail:
          "The obvious first cut is to embed everything into a single collection and query it. The reranker couldn't tell why a chunk matched. Splitting into three collections and fanning out preserves that signal, and merging by similarity afterwards is trivial.",
      },
      {
        title: 'A pre-generated Q&A cache that short-circuits the graph',
        detail:
          'During Stage 2 the LLM writes out likely question/answer pairs for each chunk. At query time we hit that collection in parallel with the others, and if a question matches strongly we can often skip the whole graph-traversal step.',
      },
      {
        title: 'Two vector systems doing different jobs',
        detail:
          'Cosmos for online retrieval, FAISS for offline community detection. FAISS runs kNN exactly once to build the entity similarity graph. Cosmos runs the query path where retrieval needs to live right next to the graph data it references.',
      },
      {
        title: 'Service Bus between the C# uploader and the Python pipeline',
        detail:
          "Different services, different failure modes, different scaling needs. Service Bus in the middle makes the whole thing sane and lets either side redeploy without dropping work.",
      },
    ],
    evaluation:
      "This shipped before a formal evaluation harness was in place — a known gap. Quality was validated by spot-checking answers against known cases and iterating on prompts, chunking, and retrieval weights based on user-reported failures. A proper eval loop is the first thing I'd add if I rebuilt this.",
    reflections: [
      {
        title: 'Build the evaluation harness first, not last',
        detail:
          'Without one, every tuning decision becomes a guess dressed up as intuition. Even a small held-out set of 30–50 real queries with reference answers would have caught issues months earlier.',
      },
      {
        title: 'Entity resolution should have been first, not last',
        detail:
          '"Access Panel X200" and "AP-X200" all need to collapse to the same node, otherwise the graph fragments and community detection produces nonsense.',
      },
      {
        title: 'Chunking was tuned once and never revisited',
        detail:
          "A dense PDF manual and a 3-line CSV row almost certainly want different chunking strategies; instead they got the same one.",
      },
      {
        title: 'The Q&A cache stales silently',
        detail:
          'New products ship, new incident patterns emerge, and the cache drifts out of relevance with nothing to flag it. A basic hit-rate metric would surface this immediately.',
      },
    ],
  },
  {
    slug: 'multi-agent',
    title: 'Multi-Agent Conversational AI',
    subtitle: 'Supervisor-pattern agent orchestration',
    tagline: 'Natural language interface to a 4 TB enterprise database, routed by five specialized agents.',
    description:
      'Supervisor pattern routing to 5 specialized agents — Reporting, Admin, System Setup, Knowledge, and Support Tickets. Registry-driven tools, two-tier RAG.',
    tags: ['Python', 'LangChain', 'LangGraph', 'SignalR'],
    stack: ['Python', 'LangChain', 'LangGraph', 'SignalR', 'Azure OpenAI'],
    icon: 'chat',
    company: 'Apra Labs',
    impact: [
      { metric: '5', label: 'specialized agents' },
      { metric: '4 TB', label: 'database queried' },
      { metric: 'Real-time', label: 'streaming via SignalR' },
      { metric: '300+', label: 'facilities served' },
    ],
    overview: {
      problem: [
        '4 TB database with no usable interface',
        "Users can't query without SQL expertise",
        'Multiple disconnected systems to search across',
        'No natural language access layer exists',
        'Data locked behind technical gatekeepers',
        'Manual report generation taking days',
      ],
      solution: [
        'Supervisor agent routes to 5 specialized agents',
        'Registry-driven dynamic tool system built',
        'SignalR real-time response streaming enabled',
        'Two-tier RAG for structured knowledge access',
        'Parallel agent execution for complex queries',
        'Auto-generated SQL with safety validation',
      ],
      outcome: [
        'Natural language queries fully operational',
        '300+ facilities served with daily queries',
        'Real-time streaming responses shipped to users',
        'Five specialized agents running in production',
        'Non-technical staff querying data independently',
        'Report generation reduced from days to seconds',
      ],
    },
    howItWorks: [
      {
        stage: 'Intent Classification',
        detail:
          'User query enters the supervisor agent, which classifies intent and routes to one of 5 specialized agents: Reporting, Admin, System Setup, Knowledge, or Support Tickets.',
      },
      {
        stage: 'Agent Execution',
        detail:
          'The selected agent pulls its tool registry and context window. It plans and executes tool calls against the database, using two-tier RAG when knowledge retrieval is needed.',
      },
      {
        stage: 'Response Streaming',
        detail:
          "Results stream back via SignalR in real-time. Multi-turn conversation state is maintained with context windowing. Fallback chains activate when the primary agent can't resolve.",
      },
    ],
    decisions: [
      {
        title: 'Supervisor pattern, not a single monolithic agent',
        detail:
          "A single agent couldn't handle the breadth — reporting, admin operations, system setup, knowledge retrieval, and ticket management all have different tool sets and context needs.",
      },
      {
        title: 'Registry-driven tool system',
        detail:
          'Each agent declares its capabilities in a registry rather than hardcoding tool access. Adding new tools or agents is straightforward without touching routing logic.',
      },
      {
        title: 'SignalR for real-time streaming',
        detail:
          'LLM responses over a 4 TB database take time. SignalR streaming shows users partial results as they are generated, keeping the experience responsive.',
      },
    ],
    reflections: [
      {
        title: 'Better agent handoff protocol',
        detail:
          'When a query spans two agents, handoff is clunky. A cleaner multi-agent coordination protocol would handle compound requests more naturally.',
      },
      {
        title: 'Adaptive context window management',
        detail:
          'Fixed window sizes per agent type. Adaptive windowing based on query complexity would improve accuracy on longer sessions.',
      },
    ],
  },
  {
    slug: 'code-review',
    title: 'AI Code Review Pipeline',
    subtitle: 'CI/CD-integrated automated reviews',
    tagline: 'Automated code reviews that catch patterns humans miss, across 10+ languages.',
    description:
      'Automatically reviews pull requests with inline comments and star ratings. 10+ languages, penalty-based scoring, fix verification mode.',
    tags: ['Python', 'Azure DevOps', 'GPT'],
    stack: ['Python', 'Azure DevOps', 'GPT', 'REST APIs'],
    icon: 'code',
    company: 'Apra Labs',
    impact: [
      { metric: '10+', label: 'languages supported' },
      { metric: 'Inline', label: 'PR comments' },
      { metric: 'Auto', label: 'fix verification' },
      { metric: '★', label: 'penalty-based scoring' },
    ],
    overview: {
      problem: [
        'Pull requests waiting hours for review',
        'Inconsistent review quality across the team',
        'Recurring patterns missed across pull requests',
        'No automated quality baseline established',
        'Senior engineers bottlenecked on reviews',
        'Style and logic issues caught too late',
      ],
      solution: [
        'CI/CD webhook integration with GitHub built',
        'Penalty-based star rating scoring system',
        'Fix verification mode for follow-up checks',
        '10+ programming languages fully supported',
        'Contextual inline comments on exact lines',
        'Configurable rule severity and thresholds',
      ],
      outcome: [
        'Automated inline PR comments on every push',
        'Consistent quality scoring across all repos',
        'Fix verification closes the feedback loop',
        'Review bottleneck for seniors eliminated',
        'Faster merge cycles with fewer regressions',
        'Quality baseline measurable and tracked',
      ],
    },
    howItWorks: [
      {
        stage: 'Trigger',
        detail:
          'Azure DevOps webhook fires on PR events. The system parses the diff and chunks it by file and language for targeted review.',
      },
      {
        stage: 'Review',
        detail:
          'Language-specific rules combine with GPT analysis to generate inline comments with specific improvement suggestions and a star rating using a penalty-based scoring algorithm.',
      },
      {
        stage: 'Verification',
        detail:
          'Fix verification mode re-reviews after the developer makes changes, confirming addressed feedback and checking for regressions introduced by the fix.',
      },
    ],
    decisions: [
      {
        title: 'Penalty-based scoring, not binary pass/fail',
        detail:
          'Star ratings with a penalty system for each issue type. Developers get a clear sense of severity and teams can set quality thresholds without blocking every pull request.',
      },
      {
        title: 'Fix verification as a separate mode',
        detail:
          'After a developer addresses feedback, the system re-reviews just the changed sections. This closes the feedback loop instead of generating a fresh review that might flag new unrelated issues.',
      },
    ],
    reflections: [
      {
        title: 'Language-specific rules need community input',
        detail:
          'Maintaining review rules for 10+ languages is a lot for one team. Open-sourcing the rule engine or integrating community linting configs would scale better.',
      },
      {
        title: 'False positive tracking from day one',
        detail:
          'No systematic tracking of which review comments developers dismiss. That data would help tune penalty weights and reduce noise over time.',
      },
    ],
  },
  {
    slug: 'cloud-cost',
    title: 'Cloud Cost Intelligence Agent',
    subtitle: 'Automated FinOps analysis',
    tagline: 'Automated cloud cost analysis that found 30% savings across the Azure estate.',
    description:
      '18 data collectors, 3 phases, 13 anomaly detectors. Identified unused resources and optimization opportunities, reducing cloud costs by 30%.',
    tags: ['TypeScript', 'Azure Cost Mgmt', 'LLM'],
    stack: ['TypeScript', 'Azure Cost Mgmt', 'LLM', 'Azure Functions'],
    icon: 'cloud',
    company: 'Apra Labs',
    impact: [
      { metric: '30%', label: 'cost reduction' },
      { metric: '18', label: 'data collectors' },
      { metric: '13', label: 'anomaly detectors' },
      { metric: '3', label: 'analysis phases' },
    ],
    overview: {
      problem: [
        'Cloud spend growing unchecked month over month',
        'No visibility into wasted or idle resources',
        'Quarterly manual audits far too slow',
        'Waste compounding silently for months',
        'Teams unaware of their cost footprint',
        'No automated anomaly detection in place',
      ],
      solution: [
        '18 data collectors spanning all Azure services',
        '13 anomaly detectors deployed and tuned',
        'Three-phase analysis pipeline with scoring',
        'Pattern-based spending analysis across accounts',
        'Automated rightsizing recommendations generated',
        'Cost attribution mapped to teams and projects',
      ],
      outcome: [
        '30% cloud cost reduction achieved in months',
        'Unused resources automatically flagged for cleanup',
        'Prioritized optimization recommendations delivered',
        'Real-time cost anomaly detection operational',
        'Teams now own and track their spend',
        'Millions saved across the organization annually',
      ],
    },
    howItWorks: [
      {
        stage: 'Collection',
        detail:
          '18 data collectors pull metrics from compute, storage, networking, and PaaS services across the Azure estate. Data is normalized into a common cost model.',
      },
      {
        stage: 'Analysis',
        detail:
          '13 anomaly detection algorithms identify unused resources, over-provisioned services, and spending pattern anomalies against historical baselines.',
      },
      {
        stage: 'Recommendations',
        detail:
          'The agent generates prioritized optimization recommendations — right-sizing, scheduling, reservation purchases — with estimated monthly savings per action.',
      },
    ],
    decisions: [
      {
        title: 'Three-phase pipeline, not a single analysis pass',
        detail:
          'Collection, analysis, and recommendation generation as separate phases. Each runs independently at different frequencies — collection daily, deep analysis weekly, recommendations on-demand.',
      },
      {
        title: 'Anomaly detection over static thresholds',
        detail:
          'Static cost thresholds trigger false alarms when the business grows. Anomaly detectors learn spending patterns and flag deviations, catching real waste without crying wolf.',
      },
    ],
    reflections: [
      {
        title: 'Automated remediation for low-risk items',
        detail:
          "Currently generates recommendations but doesn't act. Auto-deleting clearly unused dev resources or auto-scaling idle services would compound savings without human intervention.",
      },
      {
        title: 'Multi-cloud from the start',
        detail:
          "Built specifically for Azure. The collection layer abstractions weren't clean enough to easily add AWS or GCP. The cost model should have been cloud-agnostic from day one.",
      },
    ],
  },
  {
    slug: 'infra-perf',
    title: 'Infrastructure Performance Agent',
    subtitle: 'Health scoring & regression detection',
    tagline: 'Catching service degradation before users notice it.',
    description:
      'Composite health score (0–100) per service. Rolling 30-day baselines for regression detection, surfacing degradation before impact.',
    tags: ['TypeScript', 'Azure Monitor', 'Service Bus'],
    stack: ['TypeScript', 'Azure Monitor', 'Service Bus', 'Statistics'],
    icon: 'performance',
    company: 'Apra Labs',
    impact: [
      { metric: '0–100', label: 'health score per service' },
      { metric: '30-day', label: 'rolling baselines' },
      { metric: 'Pre-impact', label: 'regression detection' },
      { metric: 'Auto', label: 'root-cause analysis' },
    ],
    overview: {
      problem: [
        'Users reporting issues before ops team aware',
        'Slow performance regressions going undetected',
        'Metric-based alerts causing severe alert fatigue',
        'No composite health visibility across services',
        'Root cause analysis done manually each time',
        'SLA breaches discovered only after the fact',
      ],
      solution: [
        'Composite 0-100 health scoring per service',
        '30-day rolling baseline anomaly detection',
        'Four-dimension service evaluation framework',
        'Automated root-cause analysis pipeline built',
        'Trend analysis predicting degradation early',
        'Custom alerting thresholds per service tier',
      ],
      outcome: [
        'Pre-impact regression detection running live',
        'Per-service health scores visible to all teams',
        'Alert fatigue significantly reduced across ops',
        'Degradation caught well before user impact',
        'MTTR reduced with automated root-cause hints',
        'SLA compliance tracking now fully automated',
      ],
    },
    howItWorks: [
      {
        stage: 'Telemetry',
        detail:
          'Azure Monitor data feeds into the scoring engine. Four dimensions — response time, error rate, throughput, resource utilization — are computed per service.',
      },
      {
        stage: 'Scoring',
        detail:
          'A composite health score (0–100) is calculated per service using weighted dimensions. Scores are compared against 30-day rolling baselines with outlier exclusion.',
      },
      {
        stage: 'Detection',
        detail:
          'Statistical deviation beyond configurable thresholds triggers regression alerts. Root-cause analysis pinpoints which metric dimension drove the degradation.',
      },
    ],
    decisions: [
      {
        title: 'Composite health score, not metric-level alerts',
        detail:
          'Individual metrics in isolation cause alert fatigue. A composite 0–100 score per service synthesizes response time, error rate, throughput, and utilization into one number that is actionable.',
      },
      {
        title: 'Rolling baselines over fixed thresholds',
        detail:
          "30-day rolling baselines with outlier exclusion adapt to the service's natural patterns. A service that's always slow on Mondays doesn't fire false alarms every Monday.",
      },
    ],
    reflections: [
      {
        title: 'Cross-service correlation',
        detail:
          "Detects per-service degradation well, but doesn't connect cascading failures. Service A's regression causing Service B's slowdown should surface as one incident, not two.",
      },
      {
        title: 'Predictive scoring',
        detail:
          'The rolling baseline detects regressions after they start. Trend-based prediction could flag services heading toward degradation before they cross the threshold.',
      },
    ],
  },
  {
    slug: 'search-sync',
    title: 'Search Index Sync Engine',
    subtitle: 'Real-time & bulk search indexing',
    tagline: 'Keeping search indices in sync with a live database — in bulk and in real-time.',
    description:
      'Synchronizing records into Azure AI Search. Bulk indexing via Durable Functions, real-time incremental sync via Service Bus.',
    tags: ['C# / .NET 8', 'Azure AI Search', 'Service Bus'],
    stack: ['C# / .NET 8', 'Cognitive Search', 'Service Bus', 'Durable Functions'],
    icon: 'search',
    company: 'Apra Labs',
    impact: [
      { metric: 'Real-time', label: 'incremental sync' },
      { metric: 'Bulk', label: 'full re-indexing' },
      { metric: 'Dual', label: 'sync modes' },
      { metric: 'Zero', label: 'downtime deploys' },
    ],
    overview: {
      problem: [
        'Search results always slightly stale',
        'Full re-indexing painfully slow and manual',
        'Record updates silently not reaching search',
        'Users unable to find recently added records',
        'Schema changes require extended downtime',
        'No retry mechanism for failed sync events',
      ],
      solution: [
        'Dual-mode sync engine built from scratch',
        'Real-time incremental sync via Service Bus',
        'Bulk orchestration via Azure Durable Functions',
        'Index versioning enabling zero-downtime deploys',
        'Dead letter queue for failed event recovery',
        'Automatic schema migration with version control',
      ],
      outcome: [
        'Real-time search sync fully operational',
        'Zero-downtime schema migrations in production',
        'No silently dropped changes ever again',
        'Dual sync modes running for all indexes',
        'Failed events automatically retried and recovered',
        'Search freshness under 5 seconds end-to-end',
      ],
    },
    howItWorks: [
      {
        stage: 'Real-time Sync',
        detail:
          'Service Bus captures database change events. Each event triggers incremental index updates within seconds of the source change.',
      },
      {
        stage: 'Bulk Sync',
        detail:
          'Durable Functions orchestrate full re-indexing with checkpoint and retry logic. Field mapping transformations handle schema differences between source and search index.',
      },
      {
        stage: 'Operations',
        detail:
          'Sync lag and failure monitoring ensures no changes are silently dropped. Index versioning handles schema evolution without downtime.',
      },
    ],
    decisions: [
      {
        title: 'Dual-mode sync, not one or the other',
        detail:
          'Bulk mode handles full re-indexing and schema migrations. Real-time mode handles individual record changes within seconds. Both are necessary — one without the other always leaves gaps.',
      },
      {
        title: 'Index versioning for zero-downtime schema changes',
        detail:
          'Schema updates create a new index version, populate it in the background, then swap aliases atomically. Users never hit a partially-updated or stale index.',
      },
    ],
    reflections: [
      {
        title: 'Dead letter handling needs automation',
        detail:
          'Failed sync events go to a dead letter queue, but recovery is manual. An automated retry-and-reconcile process would reduce operational overhead.',
      },
      {
        title: 'Per-entity sync strategies earlier',
        detail:
          'Initially used one strategy for all entity types. Making this configurable per entity from the start would have simplified later tuning.',
      },
    ],
  },
  {
    slug: 'logistics-erp',
    title: 'Secure Logistics ERP',
    subtitle: 'PAN India logistics platform',
    tagline: 'A logistics ERP built from scratch, handling 70,000 dockets a month for secure jewellery transport.',
    description:
      'End-to-end ERP — Finance, Operations, Booking, Hub Management, CRM, Route Planning. 2,500 daily users, 70K dockets/month.',
    tags: ['PHP', 'AWS', 'React', 'Node.js'],
    stack: ['PHP', 'AWS', 'React', 'Node.js', 'MySQL'],
    icon: 'truck',
    company: 'MildlyClassic',
    impact: [
      { metric: '2.5K', label: 'daily active users' },
      { metric: '70K', label: 'dockets/month' },
      { metric: '100K', label: 'daily hits' },
      { metric: '0', label: 'downtime during scale' },
    ],
    overview: {
      problem: [
        'Everything managed on spreadsheets and calls',
        'Manual coordination across multiple hub locations',
        'Phone-based delivery tracking only available',
        'Nothing connected end to end across operations',
        'Invoice reconciliation done manually in Excel',
        'No visibility into real-time shipment status',
      ],
      solution: [
        'Full ERP system built entirely from scratch',
        'Finance, Ops, and Booking modules integrated',
        'Bulk docket creation via CSV file upload',
        'AWS migration completed in under 3 months',
        'Real-time tracking dashboard for all shipments',
        'Automated invoicing and payment reconciliation',
      ],
      outcome: [
        '2,500 daily active users across all hubs',
        '70K dockets processed monthly without issues',
        'Zero downtime maintained during rapid scaling',
        '100K daily API hits sustained in production',
        'End-to-end shipment visibility for all clients',
        'Manual processes reduced by over 80%',
      ],
    },
    howItWorks: [
      {
        stage: 'Operations',
        detail:
          'Hub management, route planning, and real-time tracking across PAN India. Bulk docket creation via CSV upload handles 70K deliveries per month for secure jewellery logistics.',
      },
      {
        stage: 'Finance',
        detail:
          'Integrated finance module handles invoicing, payment tracking, and reconciliation — replacing the parallel spreadsheets that ran the business before.',
      },
      {
        stage: 'Scale',
        detail:
          'Grew from hundreds to 2,500 daily users with zero downtime. DigitalOcean to AWS migration completed in 3 months. Automated testing pipeline supports monthly releases.',
      },
    ],
    decisions: [
      {
        title: 'Monolith first, not microservices',
        detail:
          'With a team of 7 and a product that needed to ship fast, a well-structured monolith was the right call. Finance, Ops, and Booking shared data models and transactions.',
      },
      {
        title: 'Full AWS migration over incremental hardening',
        detail:
          'After a security incident on DigitalOcean, the call was to migrate entirely to AWS rather than patch. Three months of migration bought VPC isolation, managed databases, and a proper security posture.',
      },
      {
        title: 'Monthly release cycles from day one',
        detail:
          'Established a 4-week build-test-deploy cadence early. This kept the team disciplined and clients expecting regular improvements rather than ad-hoc patches.',
      },
    ],
    reflections: [
      {
        title: 'Automated testing from month two',
        detail:
          'The test suite came relatively late. For a system handling financial transactions and delivery tracking, automated regression tests should have been in place much earlier.',
      },
      {
        title: 'Cleaner multi-tenant architecture',
        detail:
          'Adding new jewellery manufacturers as clients required more customization than it should have. A cleaner multi-tenant design from the start would have made onboarding faster.',
      },
    ],
  },
  {
    slug: 'uxgage',
    title: 'UXgage — Behavioral Analytics',
    subtitle: 'Enterprise usability platform',
    tagline: 'Reconstructing real user workflows from raw behavioral data.',
    description:
      'Capturing clicks, mouse movements, text input, navigation and URL transitions to reconstruct actual user workflows. Built the entire stack from scratch.',
    tags: ['PHP', 'Neo4j', 'Cassandra', 'JavaScript'],
    stack: ['PHP', 'Neo4J', 'Cassandra', 'JavaScript'],
    icon: 'analytics',
    company: 'UXgage (Co-founder)',
    impact: [
      { metric: '₹5L', label: 'seed funding' },
      { metric: '0→1', label: 'from idea to product' },
      { metric: '6 mo', label: 'to funded MVP' },
      { metric: '~3', label: 'engineers hired' },
    ],
    overview: {
      problem: [
        'Usability testing expensive and rarely conducted',
        'No visibility into actual user behavior patterns',
        'Gap between reported usage and real interactions',
        'User struggles and frustrations completely invisible',
        'No data on where users abandon workflows',
        'Qualitative feedback disconnected from quantitative data',
      ],
      solution: [
        'JavaScript instrumentation engine built in-house',
        'Cassandra high-throughput event data pipeline',
        'Neo4j workflow graph reconstruction from events',
        'Session replay with click heatmap overlays',
        'Automatic frustration signal detection algorithms',
        'Funnel analysis with drop-off visualization',
      ],
      outcome: [
        'Idea to funded product in under 6 months',
        '₹5L seed funding secured from investors',
        'Full behavioral capture system operational',
        'Navigation patterns made visible and actionable',
        'User frustration points identified automatically',
        'Product decisions driven by real usage data',
      ],
    },
    howItWorks: [
      {
        stage: 'Capture',
        detail:
          'A lightweight JS engine captures clicks, mouse movements, text input, scroll patterns, and URL transitions. Events batch and send asynchronously with minimal performance overhead.',
      },
      {
        stage: 'Storage',
        detail:
          'Cassandra handles the high write throughput of raw event data. Events are partitioned by session for efficient replay and aggregation.',
      },
      {
        stage: 'Analysis',
        detail:
          'Neo4j reconstructs navigation graphs from raw events. Session replay with interaction heatmaps surfaces behavioral patterns across users and sessions.',
      },
    ],
    decisions: [
      {
        title: 'Graph database for workflow reconstruction',
        detail:
          'User sessions aren\'t flat event logs — they\'re graphs of navigation paths with branches and loops. Neo4j made it natural to query patterns like "users who visited A then went back to B" without complex SQL joins.',
      },
      {
        title: 'Async instrumentation with minimal overhead',
        detail:
          'The JS capture engine runs asynchronously and batches events to avoid impacting the host application\'s performance. A single script tag integration was the hard constraint — anything heavier kills adoption.',
      },
    ],
    reflections: [
      {
        title: 'Privacy framework from day one',
        detail:
          "Built the capture engine before thinking about what shouldn't be captured. PII filtering and consent management should have been part of the initial architecture, not retrofitted.",
      },
      {
        title: 'Fewer, sharper insights',
        detail:
          'Captured everything — clicks, mouse, text, scroll, navigation. In practice, customers wanted two things: where people get stuck and where they drop off.',
      },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function productSeoDescription(product: Product): string {
  return product.tagline.length > 160
    ? `${product.tagline.slice(0, 157).trimEnd()}...`
    : product.tagline;
}
