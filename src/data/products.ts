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
  /** What made this hard — the conditions around the work, not the requirements. */
  context?: string;
  /** Scale, latency, cost, security and data-quality limits the design had to live inside. */
  constraints?: string[];
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
    context:
      'The corpus was 20K support tickets written by different people over years, with no clean schema and terminology that varied by author. Keyword search already existed and already failed — the same problem was being solved from scratch every time because nobody could find the ticket where it had been solved before. There was no ground truth to evaluate retrieval against, so quality had to be established before it could be improved.',
    constraints: [
      'No usable schema — free-text tickets with author-dependent vocabulary for the same concepts',
      'No labelled evaluation set existed; retrieval quality had to be measured before it could be tuned',
      'Graph enrichment is far too slow to sit in the upload path, but documents had to be searchable immediately',
      'LLM cost across 20K documents made a single frontier model per chunk uneconomic',
      'Confidential environment — the pipeline had to run entirely inside the client tenancy',
    ],
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
    tagline:
      'Ask a building a question in plain English — five specialist agents over a 4 TB operations database, instead of five admin screens.',
    description:
      'Supervisor pattern routing to 5 specialized agents — Reporting, Admin, System Setup, Knowledge, and Support Tickets — across ~30 registry-driven tools. Natural-language SQL with permission rewrite, seven-collection RAG, 100+ report types, SignalR streaming of the reasoning trace.',
    tags: ['Python', 'LangChain', 'LangGraph', 'SignalR'],
    stack: [
      'Python',
      'LangChain',
      'LangGraph',
      'GPT-4o / GPT-4o-mini / GPT-5',
      'Azure SQL',
      'Cosmos DB',
      'Azure SignalR',
      'React + Redux',
    ],
    icon: 'chat',
    company: 'Apra Labs',
    context:
      'A 4 TB operations database behind a product serving 300+ facilities, with answers split across that database, a documents archive, and 100+ report types. Non-technical operators could not query any of it without SQL or five separate admin screens, so experienced engineers were spending the day as a human router between systems. The hard part was never generating SQL — it was doing so without letting a generated query read across a tenant boundary.',
    constraints: [
      'Generated SQL runs against live production data — read-only validation and post-generation permission rewrite are non-negotiable',
      'Per-tenant access rules already existed and could not be bypassed or re-implemented in the agent layer',
      '4 TB across the operations database means query shape decides whether an answer takes seconds or never returns',
      'Answers must carry citations — an unsourced answer about a building is worse than no answer',
      'Users need to see progress before the final answer lands, or a multi-agent route feels broken',
      'Model cost across ~30 tools required routing cheap models to most calls and reserving the expensive one for reasoning',
    ],
    impact: [
      { metric: '5', label: 'specialized agents' },
      { metric: '4 TB', label: 'database queried' },
      { metric: '~30', label: 'registry-driven tools' },
      { metric: '300+', label: 'facilities served' },
    ],
    overview: {
      problem: [
        '4 TB database with no usable natural-language interface',
        "Users can't query without SQL expertise or five admin screens",
        'Answers split across the ops database, a docs archive, and 100+ report types',
        'New operators took weeks to learn where anything lived',
        'Experienced engineers spent the day as a human router between systems',
        'Manual report generation taking days',
      ],
      solution: [
        'Supervisor agent routes to 5 specialized agents — never answers itself',
        'Registry-driven tool system: ~30 tools, decorator-registered, prompt generated at startup',
        'SignalR streaming of routing, plan, tool calls, observations, and citations',
        'Seven-collection graph and vector retrieval searched concurrently',
        'Auto-generated SQL with read-only validation and post-generation permission rewrite',
        '100+ report types via twenty dedicated tools plus a generic fallback',
      ],
      outcome: [
        'Natural language queries fully operational across 300+ facilities',
        'Non-technical staff querying data independently',
        'Real-time streaming of the answer, citations, and reasoning trace',
        'Five specialized agents running in production',
        'Report generation reduced from days to seconds',
        'Live reasoning trace made misroutes obvious before the final answer landed',
      ],
    },
    architectureSvg: 'images/architecture/multi-agent-architecture.svg',
    howItWorks: [
      {
        stage: 'Dispatch',
        detail:
          'The web tier authenticates the caller, resolves which sites and tenants they can see, writes a cancellation row, then posts the question and that permission set into the agent tier and drops the connection. Dispatch and response are separate transactions — a deep question chaining four or five tool calls runs well past a normal HTTP timeout, and a page refresh should not kill work already in flight. Results stream back over SignalR on two channels: answer text and citations.',
      },
      {
        stage: 'Context & routing',
        detail:
          'Prior turns and a rolling conversation summary are fetched in parallel and packed newest-first into a token budget, so a long conversation degrades by dropping the oldest turns rather than by failing. Greetings short-circuit on a keyword check. Everything else goes through three parallel classifiers — depth, cost tier, and owning agent — which resolve to a concrete model (a cheap small model for a device lookup, a frontier model for multi-step troubleshooting) and one of five specialists: Reporting, Admin, System Setup, Knowledge, or Support Tickets. The supervisor never answers anything itself.',
      },
      {
        stage: 'Agent loop',
        detail:
          "The chosen agent pulls its tool registry and runs a reason-act loop: call the model, decide whether to continue, run tools, repeat. Query tools generate SQL from a schema description — a validator rejects anything that isn't a read, then a permission service rewrites the query with the WHERE clauses that user's scope allows. Retrieval tools hit all seven collections concurrently (chunks, entities, relationships, topics, community summaries, historical Q&A, document metadata), merge and rank, then synthesise with a source manifest. Report tools parse dates and filters out of the question, call the reporting service, and summarise the returned file.",
      },
      {
        stage: 'Finalise & stream',
        detail:
          "History is saved, the conversation summary is regenerated incrementally, and the client commits the message once both streams close. Multi-turn state is maintained with context windowing. Fallback chains activate when the primary agent can't resolve. The streamed reasoning trace — routing choice, plan, tool calls, observations and citations — is visible while the answer is still forming.",
      },
    ],
    decisions: [
      {
        title: 'Supervisor pattern, not a single monolithic agent',
        detail:
          "A single agent with every tool attached picked the wrong tool constantly — thirty tool descriptions in one prompt give the model almost no signal to separate them. Reporting, admin operations, system setup, knowledge retrieval, and ticket management all have different tool sets and context needs. Narrower agents with about five tools each fixed it. The router classifies depth, cost tier, and owner, then hands off. The cost is one extra model round trip before any real work starts.",
      },
      {
        title: 'Dispatch and response are separate transactions',
        detail:
          'The web tier validates a request, hands it to the agent tier, and returns immediately. Everything after that streams back over a socket channel. A page refresh does not kill work already in flight. The cost is two failure surfaces instead of one, plus a client that has to commit a message it never got a direct HTTP response for.',
      },
      {
        title: 'Authorisation is applied after generation, never requested in the prompt',
        detail:
          "The model drafts SQL from a schema description. Before execution, a validator rejects anything that isn't a read, and a permission service rewrites the query with the WHERE clauses that user's scope allows. Asking the prompt to respect a tenant boundary would work most of the time — and most of the time is how you leak one site's access records into another's answer.",
      },
      {
        title: 'Registries instead of a hand-maintained routing prompt',
        detail:
          "Each agent declares its capabilities in a registry rather than hardcoding tool access. Agents and tools register themselves with a decorator, and the supervisor's routing prompt is generated from that registry at startup. The hand-edited list drifted from reality within two weeks of the first new tool shipping, and the failure was silent: routing just quietly got worse.",
      },
      {
        title: 'Answer text and citations stream on separate SignalR channels',
        detail:
          'LLM responses over a 4 TB database take time. SignalR streaming shows users partial results as they are generated. Sources resolve on a different clock from the prose, and interleaving them into one stream meant a citation could land against a sentence that had already scrolled past. The message commits only when both finish.',
      },
    ],
    evaluation:
      "This shipped without a formal evaluation harness, and that's the biggest gap in the project. What existed instead: a fixed set of known-answer questions per agent, re-run by hand after any prompt or schema change, and manual review of generated SQL against the tables I expected it to touch. The streamed reasoning trace helped more than I expected — because routing, plan and tool calls are all visible, a misroute is obvious in a way it never is when you only see the final answer. If I rebuilt this I'd measure routing accuracy against a labelled question set first, then query correctness, retrieval relevance, and cost per resolved question broken down by tier.",
    reflections: [
      {
        title: 'Build the evaluation harness before the second agent',
        detail:
          'Every other item below is downstream of not measuring. A labelled set of a few hundred real questions with expected agent, expected tables and expected answer would have taken a week and paid for itself immediately.',
      },
      {
        title: 'Generate SQL for the tail, not the head',
        detail:
          'The same twenty questions account for most traffic, and free-form generation over a wide schema is a fragile way to answer them. Parameterised query templates the model selects between would be faster, cheaper and verifiable. Keep generation for the genuinely open-ended remainder.',
      },
      {
        title: 'Better agent handoff protocol',
        detail:
          'When a query spans two agents, handoff is clunky. A cleaner multi-agent coordination protocol would handle compound requests more naturally.',
      },
      {
        title: 'Cancellation deserved a real primitive',
        detail:
          'A flag row polled at checkpoints works, but a request can only die where I remembered to check, and I did not always remember. Long tool calls could run several seconds past a user hitting stop.',
      },
      {
        title: 'Two chat clients was one too many',
        detail:
          'An embedded widget and a full-page experience shipped separately and duplicated the streaming logic. Every protocol change then needed doing twice, and the second copy was usually the one with the bug.',
      },
      {
        title: 'Adaptive context windows — and versioned rolling summaries',
        detail:
          'Fixed window sizes per agent type. Adaptive windowing based on query complexity would improve accuracy on longer sessions. Rolling summaries were one file per conversation, rewritten every turn, with last write winning — cheap until two tabs were open on the same conversation.',
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
    tagline:
      'Finding out why the cloud bill moved — every night, before anyone has to ask. Identified 30% savings across the Azure estate.',
    description:
      'Nightly FinOps agent: 19 collectors across 3 phases, 13 anomaly detectors, 4-tier breach thresholds. 20+ standing questions answered deterministically; an LLM handles only the reasoning. Unused resources, query cost attribution, and rightsizing — 30% cost reduction.',
    tags: ['TypeScript', 'Azure Cost Mgmt', 'LLM'],
    stack: [
      'TypeScript',
      'Node 22 / tsx',
      'Azure Cost Management',
      'Azure Resource Graph',
      'Azure Advisor',
      'Azure Monitor',
      'Azure SQL',
      'Claude Sonnet',
      'Azure Service Bus',
    ],
    icon: 'cloud',
    company: 'Apra Labs',
    context:
      'Cloud spend was growing month over month and the billing portal could only say that the total had moved, never why. Answering "why" meant stitching cost data, telemetry and resource inventory together by hand, so it happened quarterly at best — far too slow while waste compounded silently. A schema change could hand a third of database CPU to one query and nobody would notice for a quarter.',
    constraints: [
      'Attribution has to be defensible — a wrong cost claim sends an engineer down a multi-day dead end',
      'Six Azure APIs, SQL DMVs and the app database all had to agree before a number could be reported',
      'The analysis itself runs nightly and cannot cost a meaningful fraction of what it saves',
      'An LLM cannot be trusted to compute the numbers, only to reason about them once computed',
      'Findings land in engineers inboxes via the existing platform mail path — no new system to adopt',
    ],
    impact: [
      { metric: '30%', label: 'cost reduction' },
      { metric: '19', label: 'data collectors' },
      { metric: '13', label: 'anomaly detectors' },
      { metric: '3', label: 'analysis phases' },
    ],
    overview: {
      problem: [
        'Cloud spend growing unchecked month over month',
        'The billing portal shows the total went up, not why',
        'A schema change can make one query eat a third of database CPU',
        'Detached disks and idle resources still being paid for months later',
        'Answering "why" meant stitching cost, telemetry, and inventory by hand',
        'Quarterly manual audits far too slow — waste compounding silently',
      ],
      solution: [
        '19 collectors across 3 dependency phases — six Azure APIs, SQL DMVs, and the app database',
        '13 deterministic anomaly checks and 4-tier breach thresholds',
        '20+ standing questions answered from collected data; LLM only for reasoning',
        'Doer–reviewer loop: an analyst writes, a second agent checks claims against raw files',
        'Query cost attribution splits the database bill across top queries by CPU share',
        'Rightsizing, reservation, and unused-resource recommendations, emailed through the existing platform mail path',
      ],
      outcome: [
        '30% cloud cost reduction achieved in months',
        'Unused resources automatically flagged for cleanup',
        'Prioritized optimization recommendations delivered nightly',
        'Teams now own and track their spend',
        'Anomaly detection over 15-second telemetry samples, reported every night',
        'Millions saved across the organization annually',
      ],
    },
    architectureSvg: 'images/architecture/cloud-cost-architecture.svg',
    howItWorks: [
      {
        stage: 'Collect',
        detail:
          'Twelve independent collectors pull cost breakdowns, 30-day trends, resource inventory, orphaned disks and NICs, reservation utilization, Advisor recommendations, seven-day peak metrics, and database telemetry sampled at 15-second intervals. No cross-dependencies, so they parallelize freely. Data is normalized into a common cost model and written as JSON into a per-run directory.',
      },
      {
        stage: 'Cross-reference',
        detail:
          'Five more collectors read that output back off disk and join it. Query cost attribution splits the database bill across the top queries by CPU share. Breach detection compares each resource against 4-tier configured thresholds. The anomaly detector runs 13 checks: cost spikes above the 30-day average, sustained CPU saturation, a table gaining 500MB overnight, a single query dominating database cost, a reservation about to expire.',
      },
      {
        stage: 'Persist',
        detail:
          'Breach results and telemetry history land in eight SQL tables. A retention pass trims everything past 365 days on each run.',
      },
      {
        stage: 'Analyze',
        detail:
          'The deterministic report writer and the LLM loop run in parallel. Arithmetic — day-over-day deltas, threshold breaches, cost per building, which query burned the most CPU — is computed straight from the collected JSON. The LLM gets only the open-ended questions: optimization suggestions, risk assessment, the executive summary. A reviewer agent re-reads the raw files and checks the claims, capped at two rounds. Where both produce an answer, the deterministic one wins.',
      },
      {
        stage: 'Deliver',
        detail:
          "The merged report goes out by email through the existing platform delivery path — an attachment record and a Service Bus message the platform's mail worker already listens on. Recommendations are prioritized: right-sizing, scheduling, reservation purchases, unused-resource cleanup — with estimated monthly savings per action. Cost attribution is mapped back to teams and projects.",
      },
    ],
    decisions: [
      {
        title: 'Deterministic answers first, LLM only where reasoning is required',
        detail:
          'Most of what the report needs is arithmetic: day-over-day deltas, threshold breaches, cost per building, which query burned the most CPU. Handing those to a model buys nothing and introduces a way to be quietly wrong. The report writer computes them straight from the collected JSON. The LLM gets only the open-ended questions — optimization suggestions, risk assessment, the executive summary. Where both produce an answer, the deterministic one wins.',
      },
      {
        title: 'Three-phase pipeline, communicating through files on disk',
        detail:
          "Collection, cross-reference, and persist as separate phases — collection nightly, deep analysis on the same run, recommendations in the merged report. Each phase writes JSON into a per-run directory, and the next phase reads those files. Any collector can be run standalone against yesterday's data, a failed run can be inspected after the fact, and the parallel execution mode reuses the exact same CLIs without a separate code path.",
      },
      {
        title: 'A doer–reviewer loop instead of one LLM pass',
        detail:
          'An analyst agent writes the report; a second agent re-reads the raw data files and checks the claims against them, returning approved, revision-needed, or filtered. Capped at two rounds. This was the cheapest thing I found that caught confident numeric claims the data did not support — which is the failure mode that would have killed trust in the report fastest.',
      },
      {
        title: 'Anomaly detection against 30-day patterns, not a static bill alert',
        detail:
          'Static cost thresholds trigger false alarms when the business grows. Thirteen anomaly checks learn spending patterns — spikes above the 30-day average, a query dominating database cost, sustained CPU saturation — and flag deviations, catching real waste without crying wolf. Configured 4-tier breach thresholds sit alongside that for resources that do have a known ceiling.',
      },
      {
        title: "Reused the platform's existing email path rather than sending directly",
        detail:
          "The report is inserted as an attachment record and a message is published to the topic the platform's existing mail worker already listens on. That meant matching an older .NET binary serialization format on the wire, which is ugly. The alternative was a second delivery mechanism with its own credentials, retry behaviour, and failure modes to operate.",
      },
      {
        title: 'Two execution modes over one set of collectors',
        detail:
          'The sequential orchestrator is the simple path. A multi-agent runner layers batched parallelism and a live progress dashboard on top, and dispatches each LLM question as its own agent call instead of a sequential subprocess. It calls the same collector, analysis, and alert CLIs, so it is a scheduling layer, not a fork.',
      },
    ],
    evaluation:
      'There is no formal evaluation harness, and that is the real gap. What exists instead is a correctness guard rather than a measurement: the reviewer agent validates the analyst\'s claims against the raw data files, and any question that can be computed exactly is computed exactly rather than generated. That bounds how wrong the report can be. It does not tell me how useful it is. The 30% cost reduction came from acting on unused-resource flags, query improvements, and rightsizing — validated by the bill moving, not by an eval set.',
    reflections: [
      {
        title: 'Automated remediation for low-risk items',
        detail:
          'Currently generates recommendations but does not act. Auto-deleting clearly unused dev resources or auto-scaling idle services would compound savings without human intervention.',
      },
      {
        title: 'Multi-cloud from the start',
        detail:
          'Built specifically for Azure. The collection layer abstractions were not clean enough to easily add AWS or GCP. The cost model should have been cloud-agnostic from day one.',
      },
      {
        title: 'Thresholds should have been learned, not configured',
        detail:
          "Breach detection reads per-resource thresholds from a seeded table, which means someone has to know the right number in advance and remember to update it. A rolling baseline computed from the resource's own history would have needed no seeding and would have adapted as the platform grew.",
      },
      {
        title: 'Anomaly checks needed a feedback path from day one',
        detail:
          'Thirteen checks fire into a report and nothing captures whether a given alert was worth reading. Without that signal there is no principled way to tune the thresholds, so tuning stayed guesswork.',
      },
      {
        title: 'Per-run output directories made trend queries harder than they should be',
        detail:
          "Writing each run's JSON into its own timestamped directory was right for debuggability and wrong for anything that spans runs. Comparisons that should have been a SQL query became file walks.",
      },
      {
        title: 'The two execution modes drifted',
        detail:
          'Sharing the CLIs kept the logic in one place, but the sequential and parallel paths still ended up with different failure and retry behaviour. One mode with a parallelism flag would have been less to keep in sync.',
      },
    ],
  },
  {
    slug: 'infra-perf',
    title: 'Infrastructure Performance Agent',
    subtitle: 'Health scoring & regression detection',
    tagline: 'Catching service degradation before users notice it — nightly analysis of Azure Monitor metrics and SQL telemetry.',
    description:
      'Composite health score (0–100) per service. Rolling 30-day baselines for regression detection. Nightly collection of Azure Monitor metrics and SQL DMV telemetry sampled at 15-second intervals, 13 anomaly checks, 4-tier breach thresholds — surfacing degradation before impact.',
    tags: ['TypeScript', 'Azure Monitor', 'Service Bus'],
    stack: [
      'TypeScript',
      'Node 22 / tsx',
      'Azure Monitor',
      'Azure SQL DMVs',
      'Query Store',
      'Azure Service Bus',
      'Statistics',
    ],
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
        'A schema change can make one query eat a third of database CPU',
        'Metric-based alerts causing severe alert fatigue',
        'No composite health visibility across services',
        'Root cause analysis done manually each time — SLA breaches discovered after the fact',
      ],
      solution: [
        'Composite 0–100 health scoring per service across four dimensions',
        '30-day rolling baseline anomaly detection with outlier exclusion',
        'Database telemetry sampled at 15-second intervals from SQL DMVs and Query Store',
        '13 anomaly checks: CPU saturation, table growth, query cost dominance, peak metrics',
        '4-tier breach thresholds plus automated root-cause analysis',
        'Nightly report through the existing platform mail path, with live progress in parallel mode',
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
    architectureSvg: 'images/architecture/infra-perf-architecture.svg',
    howItWorks: [
      {
        stage: 'Telemetry',
        detail:
          'Azure Monitor data and SQL dynamic management views feed the scoring engine every night. Database telemetry is sampled at 15-second intervals from sys.dm_db_resource_stats, sys.dm_db_partition_stats, and Query Store. Four dimensions — response time, error rate, throughput, resource utilization — are computed per service, alongside seven-day peak metrics and Advisor recommendations.',
      },
      {
        stage: 'Scoring',
        detail:
          'A composite health score (0–100) is calculated per service using weighted dimensions. Scores are compared against 30-day rolling baselines with outlier exclusion, so a service that is always slow on Mondays does not fire false alarms every Monday. Query cost attribution splits database CPU across the top queries, making a single runaway statement visible in the score rather than buried in a total.',
      },
      {
        stage: 'Detection',
        detail:
          'Statistical deviation beyond configurable 4-tier thresholds triggers regression alerts. Thirteen anomaly checks run on the same pass: sustained CPU saturation, a table gaining 500MB overnight, a single query dominating database cost, cost and utilization spikes above the 30-day average. Root-cause analysis pinpoints which metric dimension drove the degradation. Breach results persist to SQL with 365-day retention, and the merged report goes out by email through the existing platform delivery path.',
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
          "30-day rolling baselines with outlier exclusion adapt to the service's natural patterns. A service that's always slow on Mondays doesn't fire false alarms every Monday. Configured 4-tier breach thresholds sit alongside that for resources that do have a known ceiling.",
      },
      {
        title: 'SQL telemetry in the same pipeline as Monitor metrics',
        detail:
          'Azure Monitor tells you a database is hot. sys.dm_db_resource_stats and Query Store tell you which query made it hot, sampled every 15 seconds. Stitching those in the same nightly run is what turns "CPU is high" into "this schema change three weeks ago is eating a third of the bill."',
      },
      {
        title: 'Deterministic checks first, LLM only for the write-up',
        detail:
          'The 13 anomaly checks and 4-tier breaches are arithmetic over collected JSON. Handing those to a model buys nothing and introduces a way to be quietly wrong. The LLM is reserved for the reasoning layer of the report — what to do about a regression, not whether one occurred.',
      },
    ],
    evaluation:
      'There is no formal evaluation harness. What exists instead is a correctness guard: anomaly checks and health scores are computed from collected telemetry rather than generated, and a reviewer pass checks any LLM write-up against the raw files. That bounds how wrong a finding can be. It does not tell me how often a flagged regression was the one operators actually cared about — there is no feedback path from "was this alert worth reading."',
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
      {
        title: 'Anomaly checks needed a feedback path from day one',
        detail:
          'Thirteen checks fire into a report and nothing captures whether a given alert was worth reading. Without that signal there is no principled way to tune weights and thresholds, so tuning stayed guesswork.',
      },
      {
        title: 'Breach thresholds should have been learned, not seeded',
        detail:
          "Where a resource does not have a known ceiling, a seeded threshold table means someone has to know the right number in advance. The 30-day rolling baseline already does this for health scores; extending that to every breach check would have needed no seeding and would have adapted as the platform grew.",
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
    context:
      'A secure jewellery logistics business running PAN India on spreadsheets and phone calls, with nothing connected end to end. Requirements came from sitting with the operations and finance teams rather than from a spec, and the system had to be adopted by hub staff who had never used software for this. Partway through, a security incident forced a full platform migration off DigitalOcean while the business kept running on it.',
    constraints: [
      'The system served the entire company — Operations and Finance — all day, every day; downtime meant shipments stopped',
      'Hub staff with no prior software workflow had to adopt it, so bulk CSV entry mattered more than elegant UX',
      'Scaling from hundreds to 2,500 daily users happened on live infrastructure with no maintenance window',
      'A security incident forced a DigitalOcean to AWS migration inside 3 months, mid-operation',
      'High-value cargo means shipment state has to be auditable, not just visible',
    ],
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
