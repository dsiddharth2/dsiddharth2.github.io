window.SD = {
 "projects": [
  {
   "n": "01",
   "title": "GraphRAG Knowledge Engine",
   "sub": "Enterprise knowledge graph pipeline",
   "desc": "Full GraphRAG pipeline — ingests documents, builds knowledge graphs with entities, relationships, topics, and communities via vector similarity. 17 activity classes, 14 prompt templates.",
   "medium": "Python, Durable Functions, Cosmos DB, FAISS",
   "mv": "20K",
   "ml": "support documents",
   "href": "Work.dc.html?p=graphrag",
   "isCase": true,
   "slug": "graphrag",
   "builtAt": "Apra Labs",
   "stack": [
    "Python",
    "Azure Functions (Durable)",
    "Azure Service Bus",
    "Cosmos DB",
    "SQL Server",
    "FAISS",
    "gpt-4o-mini",
    "text-embedding-3-small"
   ],
   "cat": "Data & Knowledge Systems",
   "summary": "Turning 20K unstructured support tickets into an answerable knowledge base.",
   "caseData": {
    "title": "GraphRAG Knowledge Engine",
    "cat": "Data & Knowledge Systems",
    "summary": "Turning 20K unstructured support tickets into an answerable knowledge base.",
    "problem": "Recurring tickets solved from scratch every time",
    "constraint": "No usable schema: free-text tickets with author-dependent vocabulary for the same concepts",
    "approach": "Two-stage ingest pipeline with graph extraction",
    "decision": "Two-stage pipeline: seconds-to-searchable, minutes-to-graph-enriched",
    "mv": "20K",
    "ml": "support documents",
    "href": "https://siddharthdeshpande.com/projects/graphrag"
   },
   "detail": {
    "stack": [
     "Python",
     "Azure Functions (Durable)",
     "Azure Service Bus",
     "Cosmos DB",
     "SQL Server",
     "FAISS",
     "gpt-4o-mini",
     "text-embedding-3-small"
    ],
    "hard": "The corpus was 20K support tickets written by different people over years, with no clean schema and terminology that varied by author. Keyword search already existed and already failed, so the same problem was being solved from scratch every time because nobody could find the ticket where it had been solved before. There was no ground truth to evaluate retrieval against, so quality had to be established before it could be improved.",
    "problem": [
     "Recurring tickets solved from scratch every time",
     "Critical knowledge buried across 20K+ documents",
     "Keyword search fails on terminology variants",
     "No cross-ticket pattern discovery possible",
     "Support agents lack contextual answers",
     "Hours wasted searching disconnected sources"
    ],
    "solution": [
     "Two-stage ingest pipeline with graph extraction",
     "Graph entities and community detection applied",
     "Three parallel vector search strategies fused",
     "Pre-generated Q&A cache for common queries",
     "FAISS + Cosmos DB hybrid retrieval layer",
     "Durable Functions orchestrate bulk processing"
    ],
    "outcome": [
     "Seconds-to-searchable document indexing achieved",
     "Grounded answers with full data citations",
     "90K entities and 150K+ relationships mapped",
     "Support knowledge finally reusable at scale",
     "11 Cosmos collections serving live traffic",
     "Duplicate ticket resolution dramatically reduced"
    ],
    "metrics": [
     {
      "v": "20K",
      "l": "support documents"
     },
     {
      "v": "90K",
      "l": "entities extracted"
     },
     {
      "v": "150K+",
      "l": "relationships"
     },
     {
      "v": "11",
      "l": "Cosmos collections"
     }
    ],
    "arch": "https://siddharthdeshpande.com/images/architecture/graphrag-architecture.svg",
    "steps": [
     {
      "t": "Ingestion",
      "d": "A C# Function App watches the Data Lake. When a new file lands, it drops a Service Bus message — file URL, metadata, RagType. A Python Function App picks it up, pulls the file, and hands it to FileReader, which knows how to read PDF, DOCX, TXT, CSV, JSON, and MD."
     },
     {
      "t": "Baseline RAG (seconds)",
      "d": "The text goes through SmartChunkingUtil, which splits it into overlapping chunks while keeping URLs intact and respecting sentence boundaries. Chunks land in text_units_collection. Another Service Bus message fires the Deep RAG stage."
     },
     {
      "t": "Deep RAG (10–60+ minutes)",
      "d": "gpt-4o-mini reads each chunk and pulls out named entities and typed relationships, with strength scores. It also groups chunks into topics. Every entity gets embedded via text-embedding-3-small. FAISS builds a kNN similarity graph, then hierarchical community detection clusters them recursively. For each community the LLM writes a narrative summary and pre-generates Q&A pairs. Everything persists across 11 Cosmos collections."
     },
     {
      "t": "Retrieval (query time)",
      "d": "The user's question gets embedded, then three Cosmos VectorDistance() searches run in parallel against entities, topics, and questions. Top matches trigger graph expansion. All of that gets formatted into structured tables, injected into the system prompt, and sent to gpt-4o-mini. The model returns a grounded answer with data citations."
     }
    ],
    "constraints": [
     "No usable schema: free-text tickets with author-dependent vocabulary for the same concepts",
     "No labelled evaluation set existed; retrieval quality had to be measured before it could be tuned",
     "Graph enrichment is far too slow to sit in the upload path, but documents had to be searchable immediately",
     "LLM cost across 20K documents made a single frontier model per chunk uneconomic",
     "Confidential environment: the pipeline had to run entirely inside the client tenancy"
    ],
    "decisions": [
     {
      "t": "Two-stage pipeline: seconds-to-searchable, minutes-to-graph-enriched",
      "d": "Full graph enrichment takes 10 to 60+ minutes per document. You can't make users wait for that before their doc is even findable. Stage 1 does the cheap work — read, chunk, index — and marks the doc searchable in seconds. Then it fires a Service Bus message that kicks off Stage 2 in the background."
     },
     {
      "t": "Three parallel vector searches, not one blended index",
      "d": "The obvious first cut is to embed everything into a single collection and query it. The reranker couldn't tell why a chunk matched. Splitting into three collections and fanning out preserves that signal, and merging by similarity afterwards is trivial."
     },
     {
      "t": "A pre-generated Q&A cache that short-circuits the graph",
      "d": "During Stage 2 the LLM writes out likely question/answer pairs for each chunk. At query time we hit that collection in parallel with the others, and if a question matches strongly we can often skip the whole graph-traversal step."
     },
     {
      "t": "Two vector systems doing different jobs",
      "d": "Cosmos for online retrieval, FAISS for offline community detection. FAISS runs kNN exactly once to build the entity similarity graph. Cosmos runs the query path where retrieval needs to live right next to the graph data it references."
     },
     {
      "t": "Service Bus between the C# uploader and the Python pipeline",
      "d": "Different services, different failure modes, different scaling needs. Service Bus in the middle makes the whole thing sane and lets either side redeploy without dropping work."
     }
    ],
    "evaluation": "This shipped before a formal evaluation harness was in place — a known gap. Quality was validated by spot-checking answers against known cases and iterating on prompts, chunking, and retrieval weights based on user-reported failures. A proper eval loop is the first thing I'd add if I rebuilt this.",
    "change": [
     "Build the evaluation harness first, not last",
     "Entity resolution should have been first, not last",
     "Chunking was tuned once and never revisited",
     "The Q&A cache stales silently"
    ]
   },
   "builtNote": "Built in a production environment; employer and product names withheld under confidentiality."
  },
  {
   "n": "02",
   "title": "Multi-Agent Conversational AI",
   "sub": "Supervisor-pattern agent orchestration",
   "desc": "Supervisor pattern routing to 5 specialized agents — Reporting, Admin, System Setup, Knowledge, and Support Tickets — across ~30 registry-driven tools. Natural-language SQL with permission rewrite, seven-collection RAG, 100+ report types, SignalR streaming of the reasoning trace.",
   "medium": "Python, LangChain, LangGraph, SignalR",
   "mv": "5",
   "ml": "specialized agents",
   "href": "Work.dc.html?p=multi-agent",
   "isCase": true,
   "slug": "multi-agent",
   "builtAt": "Apra Labs",
   "stack": [
    "Python",
    "LangChain",
    "LangGraph",
    "GPT-4o / GPT-4o-mini / GPT-5",
    "Azure SQL",
    "Cosmos DB",
    "Azure SignalR",
    "React + Redux"
   ],
   "cat": "Enterprise AI",
   "summary": "Ask a building a question in plain English — five specialist agents over a 4 TB operations database, instead of five admin screens.",
   "caseData": {
    "title": "Multi-Agent Conversational AI",
    "cat": "Enterprise AI",
    "summary": "Ask a building a question in plain English — five specialist agents over a 4 TB operations database, instead of five admin screens.",
    "problem": "4 TB database with no usable natural-language interface",
    "constraint": "Generated SQL runs against live production data, so read-only validation and post-generation permission rewrite are non-negotiable",
    "approach": "Supervisor agent routes to 5 specialized agents — never answers itself",
    "decision": "Supervisor pattern, not a single monolithic agent",
    "mv": "5",
    "ml": "specialized agents",
    "href": "https://siddharthdeshpande.com/projects/multi-agent"
   },
   "detail": {
    "stack": [
     "Python",
     "LangChain",
     "LangGraph",
     "GPT-4o / GPT-4o-mini / GPT-5",
     "Azure SQL",
     "Cosmos DB",
     "Azure SignalR",
     "React + Redux"
    ],
    "problem": [
     "4 TB database with no usable natural-language interface",
     "Users can't query without SQL expertise or five admin screens",
     "Answers split across the ops database, a docs archive, and 100+ report types",
     "New operators took weeks to learn where anything lived",
     "Experienced engineers spent the day as a human router between systems",
     "Manual report generation taking days"
    ],
    "solution": [
     "Supervisor agent routes to 5 specialized agents — never answers itself",
     "Registry-driven tool system: ~30 tools, decorator-registered, prompt generated at startup",
     "SignalR streaming of routing, plan, tool calls, observations, and citations",
     "Seven-collection graph and vector retrieval searched concurrently",
     "Auto-generated SQL with read-only validation and post-generation permission rewrite",
     "100+ report types via twenty dedicated tools plus a generic fallback"
    ],
    "outcome": [
     "Natural language queries fully operational across 300+ facilities",
     "Non-technical staff querying data independently",
     "Real-time streaming of the answer, citations, and reasoning trace",
     "Five specialized agents running in production",
     "Report generation reduced from days to seconds",
     "Live reasoning trace made misroutes obvious before the final answer landed"
    ],
    "metrics": [
     {
      "v": "5",
      "l": "specialized agents"
     },
     {
      "v": "4 TB",
      "l": "database queried"
     },
     {
      "v": "~30",
      "l": "registry-driven tools"
     },
     {
      "v": "300+",
      "l": "facilities served"
     }
    ],
    "arch": "https://siddharthdeshpande.com/images/architecture/multi-agent-architecture.svg",
    "steps": [
     {
      "t": "Dispatch",
      "d": "The web tier authenticates the caller, resolves which sites and tenants they can see, writes a cancellation row, then posts the question and that permission set into the agent tier and drops the connection. Dispatch and response are separate transactions — a deep question chaining four or five tool calls runs well past a normal HTTP timeout, and a page refresh should not kill work already in flight. Results stream back over SignalR on two channels: answer text and citations."
     },
     {
      "t": "Context & routing",
      "d": "Prior turns and a rolling conversation summary are fetched in parallel and packed newest-first into a token budget, so a long conversation degrades by dropping the oldest turns rather than by failing. Greetings short-circuit on a keyword check. Everything else goes through three parallel classifiers — depth, cost tier, and owning agent — which resolve to a concrete model (a cheap small model for a device lookup, a frontier model for multi-step troubleshooting) and one of five specialists: Reporting, Admin, System Setup, Knowledge, or Support Tickets. The supervisor never answers anything itself."
     },
     {
      "t": "Agent loop",
      "d": "The chosen agent pulls its tool registry and runs a reason-act loop: call the model, decide whether to continue, run tools, repeat. Query tools generate SQL from a schema description — a validator rejects anything that isn't a read, then a permission service rewrites the query with the WHERE clauses that user's scope allows. Retrieval tools hit all seven collections concurrently (chunks, entities, relationships, topics, community summaries, historical Q&A, document metadata), merge and rank, then synthesise with a source manifest. Report tools parse dates and filters out of the question, call the reporting service, and summarise the returned file."
     },
     {
      "t": "Finalise & stream",
      "d": "History is saved, the conversation summary is regenerated incrementally, and the client commits the message once both streams close. Multi-turn state is maintained with context windowing. Fallback chains activate when the primary agent can't resolve. The streamed reasoning trace — routing choice, plan, tool calls, observations and citations — is visible while the answer is still forming."
     }
    ],
    "decisions": [
     {
      "t": "Supervisor pattern, not a single monolithic agent",
      "d": "A single agent with every tool attached picked the wrong tool constantly — thirty tool descriptions in one prompt give the model almost no signal to separate them. Reporting, admin operations, system setup, knowledge retrieval, and ticket management all have different tool sets and context needs. Narrower agents with about five tools each fixed it. The router classifies depth, cost tier, and owner, then hands off. The cost is one extra model round trip before any real work starts."
     },
     {
      "t": "Dispatch and response are separate transactions",
      "d": "The web tier validates a request, hands it to the agent tier, and returns immediately. Everything after that streams back over a socket channel. A page refresh does not kill work already in flight. The cost is two failure surfaces instead of one, plus a client that has to commit a message it never got a direct HTTP response for."
     },
     {
      "t": "Authorisation is applied after generation, never requested in the prompt",
      "d": "The model drafts SQL from a schema description. Before execution, a validator rejects anything that isn't a read, and a permission service rewrites the query with the WHERE clauses that user's scope allows. Asking the prompt to respect a tenant boundary would work most of the time — and most of the time is how you leak one site's access records into another's answer."
     },
     {
      "t": "Registries instead of a hand-maintained routing prompt",
      "d": "Each agent declares its capabilities in a registry rather than hardcoding tool access. Agents and tools register themselves with a decorator, and the supervisor's routing prompt is generated from that registry at startup. The hand-edited list drifted from reality within two weeks of the first new tool shipping, and the failure was silent: routing just quietly got worse."
     },
     {
      "t": "Answer text and citations stream on separate SignalR channels",
      "d": "LLM responses over a 4 TB database take time. SignalR streaming shows users partial results as they are generated. Sources resolve on a different clock from the prose, and interleaving them into one stream meant a citation could land against a sentence that had already scrolled past. The message commits only when both finish."
     }
    ],
    "evaluation": "This shipped without a formal evaluation harness, and that's the biggest gap in the project. What existed instead: a fixed set of known-answer questions per agent, re-run by hand after any prompt or schema change, and manual review of generated SQL against the tables I expected it to touch. The streamed reasoning trace helped more than I expected — because routing, plan and tool calls are all visible, a misroute is obvious in a way it never is when you only see the final answer. If I rebuilt this I'd measure routing accuracy against a labelled question set first, then query correctness, retrieval relevance, and cost per resolved question broken down by tier.",
    "change": [
     "Build the evaluation harness before the second agent",
     "Generate SQL for the tail, not the head",
     "Better agent handoff protocol",
     "Cancellation deserved a real primitive",
     "Two chat clients was one too many",
     "Adaptive context windows — and versioned rolling summaries"
    ]
   }
  },
  {
   "n": "03",
   "title": "AI Code Review Pipeline",
   "sub": "CI/CD-integrated automated reviews",
   "desc": "Automatically reviews pull requests with inline comments and star ratings. 10+ languages, penalty-based scoring, fix verification mode.",
   "medium": "Python, Azure DevOps, GPT",
   "mv": "10+",
   "ml": "languages",
   "href": "Work.dc.html?p=code-review",
   "isCase": false,
   "slug": "code-review",
   "builtAt": "Apra Labs",
   "stack": [
    "Python",
    "Azure DevOps",
    "GPT"
   ],
   "cat": "",
   "summary": "Automatically reviews pull requests with inline comments and star ratings. 10+ languages, penalty-based scoring, fix verification mode.",
   "caseData": null,
   "detail": null
  },
  {
   "n": "04",
   "title": "Cloud Cost Intelligence Agent",
   "sub": "Automated FinOps analysis",
   "desc": "Nightly FinOps agent: 19 collectors across 3 phases, 13 anomaly detectors, 4-tier breach thresholds. 20+ standing questions answered deterministically; an LLM handles only the reasoning. Unused resources, query cost attribution, and rightsizing — 30% cost reduction.",
   "medium": "TypeScript, Azure Cost Mgmt, LLM",
   "mv": "30%",
   "ml": "cost reduction",
   "href": "Work.dc.html?p=cloud-cost",
   "isCase": true,
   "slug": "cloud-cost",
   "builtAt": "Apra Labs",
   "stack": [
    "TypeScript",
    "Azure Cost Mgmt",
    "LLM"
   ],
   "cat": "Production Systems",
   "summary": "Finding out why the cloud bill moved — every night, before anyone has to ask. Identified 30% savings across the Azure estate.",
   "caseData": {
    "title": "Cloud Cost Intelligence Agent",
    "cat": "Production Systems",
    "summary": "Finding out why the cloud bill moved — every night, before anyone has to ask. Identified 30% savings across the Azure estate.",
    "problem": "Cloud spend growing unchecked month over month",
    "constraint": "Attribution has to be defensible: a wrong cost claim sends an engineer down a multi-day dead end",
    "approach": "19 collectors across 3 dependency phases — six Azure APIs, SQL DMVs, and the app database",
    "decision": "Deterministic answers first, LLM only where reasoning is required",
    "mv": "30%",
    "ml": "cost reduction",
    "href": "https://siddharthdeshpande.com/projects/cloud-cost"
   },
   "detail": null
  },
  {
   "n": "05",
   "title": "Infrastructure Performance Agent",
   "sub": "Health scoring & regression detection",
   "desc": "Composite health score (0–100) per service. Rolling 30-day baselines for regression detection. Nightly collection of Azure Monitor metrics and SQL DMV telemetry sampled at 15-second intervals, 13 anomaly checks, 4-tier breach thresholds — surfacing degradation before impact.",
   "medium": "TypeScript, Azure Monitor, Service Bus",
   "mv": "0–100",
   "ml": "health score",
   "href": "Work.dc.html?p=infra-perf",
   "isCase": false,
   "slug": "infra-perf",
   "builtAt": "Apra Labs",
   "stack": [
    "TypeScript",
    "Azure Monitor",
    "Service Bus"
   ],
   "cat": "",
   "summary": "Composite health score (0–100) per service. Rolling 30-day baselines for regression detection. Nightly collection of Azure Monitor metrics and SQL DMV telemetry sampled at 15-second intervals, 13 anomaly checks, 4-tier breach thresholds — surfacing degradation before impact.",
   "caseData": null,
   "detail": null
  },
  {
   "n": "06",
   "title": "Search Index Sync Engine",
   "sub": "Real-time & bulk search indexing",
   "desc": "Synchronizing records into Azure AI Search. Bulk indexing via Durable Functions, real-time incremental sync via Service Bus.",
   "medium": "C# / .NET 8, Azure AI Search, Service Bus",
   "mv": "Real-time",
   "ml": "incremental sync",
   "href": "Work.dc.html?p=search-sync",
   "isCase": false,
   "slug": "search-sync",
   "builtAt": "Apra Labs",
   "stack": [
    "C# / .NET 8",
    "Azure AI Search",
    "Service Bus"
   ],
   "cat": "",
   "summary": "Synchronizing records into Azure AI Search. Bulk indexing via Durable Functions, real-time incremental sync via Service Bus.",
   "caseData": null,
   "detail": null
  },
  {
   "n": "07",
   "title": "Secure Logistics ERP",
   "sub": "PAN India logistics platform",
   "desc": "End-to-end ERP — Finance, Operations, Booking, Hub Management, CRM, Route Planning. 2,500 daily users, 70K dockets/month.",
   "medium": "PHP, AWS, React, Node.js",
   "mv": "70K",
   "ml": "dockets/month",
   "href": "Work.dc.html?p=logistics-erp",
   "isCase": false,
   "slug": "logistics-erp",
   "builtAt": "MildlyClassic",
   "stack": [
    "PHP",
    "AWS",
    "React",
    "Node.js"
   ],
   "cat": "",
   "summary": "End-to-end ERP — Finance, Operations, Booking, Hub Management, CRM, Route Planning. 2,500 daily users, 70K dockets/month.",
   "caseData": null,
   "detail": null
  },
  {
   "n": "08",
   "title": "UXgage — Behavioral Analytics",
   "sub": "Enterprise usability platform",
   "desc": "Capturing clicks, mouse movements, text input, navigation and URL transitions to reconstruct actual user workflows. Built the entire stack from scratch.",
   "medium": "PHP, Neo4j, Cassandra, JavaScript",
   "mv": "0→1",
   "ml": "built from scratch",
   "href": "Work.dc.html?p=uxgage",
   "isCase": false,
   "slug": "uxgage",
   "builtAt": "UXgage",
   "stack": [
    "PHP",
    "Neo4j",
    "Cassandra",
    "JavaScript"
   ],
   "cat": "",
   "summary": "Capturing clicks, mouse movements, text input, navigation and URL transitions to reconstruct actual user workflows. Built the entire stack from scratch.",
   "caseData": null,
   "detail": null
  }
 ],
 "cases": [
  {
   "title": "Multi-Agent Conversational AI",
   "cat": "Enterprise AI",
   "summary": "Ask a building a question in plain English — five specialist agents over a 4 TB operations database, instead of five admin screens.",
   "problem": "4 TB database with no usable natural-language interface",
   "constraint": "Generated SQL runs against live production data, so read-only validation and post-generation permission rewrite are non-negotiable",
   "approach": "Supervisor agent routes to 5 specialized agents — never answers itself",
   "decision": "Supervisor pattern, not a single monolithic agent",
   "mv": "5",
   "ml": "specialized agents",
   "href": "Work.dc.html?p=multi-agent",
   "slug": "multi-agent"
  },
  {
   "title": "GraphRAG Knowledge Engine",
   "cat": "Data & Knowledge Systems",
   "summary": "Turning 20K unstructured support tickets into an answerable knowledge base.",
   "problem": "Recurring tickets solved from scratch every time",
   "constraint": "No usable schema: free-text tickets with author-dependent vocabulary for the same concepts",
   "approach": "Two-stage ingest pipeline with graph extraction",
   "decision": "Two-stage pipeline: seconds-to-searchable, minutes-to-graph-enriched",
   "mv": "20K",
   "ml": "support documents",
   "href": "Work.dc.html?p=graphrag",
   "slug": "graphrag"
  },
  {
   "title": "Cloud Cost Intelligence Agent",
   "cat": "Production Systems",
   "summary": "Finding out why the cloud bill moved — every night, before anyone has to ask. Identified 30% savings across the Azure estate.",
   "problem": "Cloud spend growing unchecked month over month",
   "constraint": "Attribution has to be defensible: a wrong cost claim sends an engineer down a multi-day dead end",
   "approach": "19 collectors across 3 dependency phases — six Azure APIs, SQL DMVs, and the app database",
   "decision": "Deterministic answers first, LLM only where reasoning is required",
   "mv": "30%",
   "ml": "cost reduction",
   "href": "Work.dc.html?p=cloud-cost",
   "slug": "cloud-cost"
  }
 ],
 "exp": [
  {
   "co": "Apra Labs",
   "role": "Architect · previously Associate Architect",
   "dates": "Aug 2019 – Present",
   "summary": "Built the AI and data platform layer for a unified facility management product serving 300+ US facilities.",
   "bullets": [
    "Virtual Credentials — facility entry/exit across 300+ US buildings",
    "Reporting platform — 1000s of reports per hour across 300+ tenants",
    "Analytics platform from scratch — facility operations monitoring",
    "GraphRAG pipeline — 150K support case documents, accurate answers",
    "Interactive chat system over 4 TB database",
    "Cloud Cost Agent — real-time Azure analysis, 30% cost reduction",
    "Infrastructure Performance Agent — health scoring and regression detection"
   ],
   "leadTitle": "Leadership & Impact",
   "lead": [
    "Managing 3 clients with technical expertise, helping the team build and ship products",
    "Leading a team of 4 as technical mentor across multiple projects",
    "Architected all systems end-to-end",
    "Led 10 community meetups on Saturdays",
    "Campus hiring lead for 4 years — IIIT Dharwad & GIT Belgaum",
    "Grew with the company from 10 engineers to 55 people"
   ],
   "metrics": [
    {
     "v": "300+",
     "l": "facilities served"
    },
    {
     "v": "30%",
     "l": "cloud costs reduced"
    },
    {
     "v": "10→55",
     "l": "team growth"
    }
   ],
   "more": "4 more, and the leadership work",
   "href": "Experience.dc.html#apra-labs",
   "hasNote": false,
   "slug": "apra-labs"
  },
  {
   "co": "MildlyClassic",
   "role": "Engineering Team Lead",
   "dates": "May 2016 – May 2019",
   "summary": "Built and scaled a mission-critical logistics ERP from scratch to 2,500 daily users handling 70K dockets/month.",
   "bullets": [
    "End-to-end ERP — Finance, Ops, Booking, Hub Management, CRM, Route Planning for PAN India secure logistics",
    "Clients: large jewellery manufacturers shipping daily from manufacturing to retail",
    "Bulk docket creation via upload, 70K dockets/month",
    "Scaled from 100s to 2,500 daily users with zero downtime",
    "Migrated DigitalOcean → AWS in 3 months after security incident"
   ],
   "leadTitle": "Leadership & Process",
   "lead": [
    "Hired 7 engineers, led the team through the full product lifecycle",
    "Direct client interface — requirements to modules",
    "Established 4-week release cycle — build, test, deploy monthly",
    "System served entire company (Ops + Finance) all day, every day"
   ],
   "hasNote": true,
   "noteTitle": "Meanwhile — Sister Company · Wifi Dabba → YC W17",
   "note": "Pre-Jio era — built byte-counting and usage sync software on Wi-Fi hardware for Wifi Dabba, selling data at ₹2/100 MB. Built the Google NBU analytics platform for Hubballi. Hired 4-5 members post-funding.",
   "metrics": [
    {
     "v": "70K",
     "l": "dockets/month"
    },
    {
     "v": "2.5K",
     "l": "daily users"
    },
    {
     "v": "7",
     "l": "engineers hired"
    }
   ],
   "more": "2 more, and the leadership work",
   "href": "Experience.dc.html#mildlyclassic",
   "slug": "mildlyclassic"
  },
  {
   "co": "UXgage",
   "role": "Co-Founder & CTO",
   "dates": "Oct 2015 – Apr 2016",
   "summary": "Took an idea from zero to a shipped product in 6 months — won a ₹5L cash prize from Sandbox Startups, with office space and Azure infrastructure granted separately.",
   "bullets": [
    "Core product architecture — PHP, Neo4j, Cassandra",
    "JS instrumentation engine capturing user interactions and behavioral data",
    "Data pipeline for large-volume user interaction storage"
   ],
   "leadTitle": "Leadership",
   "lead": [
    "Owned the product end-to-end — not a contributor, the builder",
    "Hired ~3 engineers, mentored them, unblocked technical challenges",
    "Conducted product demos for clients and stakeholders"
   ],
   "metrics": [
    {
     "v": "0→1",
     "l": "product shipped"
    },
    {
     "v": "₹5L",
     "l": "cash prize won"
    }
   ],
   "more": "View More",
   "href": "Experience.dc.html#uxgage",
   "hasNote": false,
   "slug": "uxgage"
  }
 ],
 "oss": [
  {
   "n": "01",
   "lang": "JavaScript",
   "title": "Apra Agent Kit",
   "sub": "A starting point for a new agent",
   "desc": "",
   "tags": [
    "Node.js",
    "Claude Code",
    "MCP",
    "Python"
   ],
   "href": "Open%20Source.dc.html?p=apra-agent-kit",
   "gh": "https://github.com/Apra-Labs/apra-agent-kit",
   "slug": "apra-agent-kit",
   "medium": "Node.js, Claude Code, MCP, Python",
   "hasReg": true,
   "reg": "npm",
   "pkg": "@apralabs/create-agent-kit",
   "regUrl": "https://www.npmjs.com/package/@apralabs/create-agent-kit",
   "install": "npm create @apralabs/agent-kit my-agent",
   "regStat": "",
   "hasStat": false
  },
  {
   "n": "02",
   "lang": "TypeScript",
   "title": "Plug",
   "sub": "Package manager for Claude Code skills",
   "desc": "Discover, install, and manage reusable Skills, Commands, and Agents from GitHub-hosted registries — through an interactive TUI or the CLI.",
   "tags": [
    "TypeScript",
    "Node.js",
    "Ink",
    "Claude Code"
   ],
   "href": "Open%20Source.dc.html?p=plug",
   "gh": "https://github.com/dsiddharth2/plug",
   "medium": "TypeScript, Node.js, Ink, Claude Code",
   "slug": "plug",
   "hasReg": true,
   "reg": "npm",
   "pkg": "plugvault",
   "regUrl": "https://www.npmjs.com/package/plugvault",
   "install": "npm install -g plugvault",
   "regStat": "",
   "hasStat": false
  },
  {
   "n": "03",
   "lang": "Python",
   "title": "CodeHawk",
   "sub": "AI-powered pull request review pipeline",
   "desc": "Runs in CI, produces structured findings, scores code quality, and posts inline comments to Azure DevOps or GitHub.",
   "tags": [
    "Python",
    "OpenAI Agents",
    "Docker",
    "Azure DevOps",
    "GitHub"
   ],
   "href": "Open%20Source.dc.html?p=codehawk",
   "gh": "https://github.com/dsiddharth2/codehawk",
   "medium": "Python, OpenAI Agents, Docker, Azure DevOps, GitHub",
   "slug": "codehawk",
   "hasReg": false,
   "reg": "",
   "pkg": "",
   "regUrl": "",
   "install": "",
   "regStat": "",
   "hasStat": false
  },
  {
   "n": "04",
   "lang": "PHP",
   "title": "PHP ZXing",
   "sub": "PHP wrapper for the ZXing barcode library",
   "desc": "Composer package for reading barcodes and QR codes. 277K+ Packagist installs, 133 GitHub stars, and featured on the upstream ZXing repo.",
   "tags": [
    "PHP",
    "Composer",
    "ZXing",
    "Java"
   ],
   "href": "Open%20Source.dc.html?p=php-zxing",
   "gh": "https://github.com/dsiddharth2/php-zxing",
   "medium": "PHP, Composer, ZXing, Java",
   "slug": "php-zxing",
   "hasReg": true,
   "reg": "Packagist",
   "pkg": "dsiddharth2/php-zxing",
   "regUrl": "https://packagist.org/packages/dsiddharth2/php-zxing",
   "install": "composer require dsiddharth2/php-zxing",
   "regStat": "282K+ installs",
   "hasStat": true
  },
  {
   "n": "05",
   "lang": "JavaScript",
   "title": "MooPin",
   "sub": "Pinterest-style column grid for MooTools",
   "desc": "Small MooTools plugin that packs tiles into a Pinterest-style column grid — including infinite-scroll galleries. Inspired by Wookmark for jQuery.",
   "tags": [
    "JavaScript",
    "MooTools",
    "Layout",
    "Infinite scroll"
   ],
   "href": "Open%20Source.dc.html?p=moo-pin",
   "gh": "https://github.com/dsiddharth2/moo-pin",
   "medium": "JavaScript, MooTools, Layout, Infinite scroll",
   "slug": "moo-pin",
   "hasReg": false,
   "reg": "",
   "pkg": "",
   "regUrl": "",
   "install": "",
   "regStat": "",
   "hasStat": false
  }
 ],
 "earlier": [
  {
   "name": "Firaa.me",
   "meta": "Side Project · Built at IdeaFlask · Sep 2014 – Sep 2015",
   "desc": "Built and shipped a travel blogging platform end-to-end. Reached 500+ organic users in 6 months with zero marketing spend."
  },
  {
   "name": "Samvit Learning",
   "meta": "Founder · Apr 2011 – Apr 2016",
   "desc": "Founded a software training institute during 2nd year of MCA. Trained 250+ students in web programming technologies. Managed 25+ innovative projects."
  },
  {
   "name": "dotCORD IT Solutions",
   "meta": "Web Developer Intern · 2010–2013",
   "desc": "Interned for 3 years at GIT Incubation Center. Learned software engineering before completing MCA. Built applications on PHP frameworks (CodeIgniter, Yii)."
  }
 ],
 "stats": [
  {
   "v": "12+",
   "l": "years shipping"
  },
  {
   "v": "3",
   "l": "client engagements in parallel"
  },
  {
   "v": "5",
   "l": "production AI systems shipped"
  },
  {
   "v": "300+",
   "l": "US facilities live"
  },
  {
   "v": "30%",
   "l": "cloud spend reduced"
  }
 ],
 "expertise": [
  {
   "title": "Languages & Frameworks",
   "items": [
    "Python · TypeScript · C# / .NET 8",
    "PHP · React · Node.js",
    "LangChain · LangGraph"
   ]
  },
  {
   "title": "AI & Data",
   "items": [
    "GPT / LLM integration",
    "FAISS · Vector search",
    "GraphRAG · Multi-agent systems"
   ]
  },
  {
   "title": "Infrastructure",
   "items": [
    "Azure (Durable Functions, Service Bus, Cosmos DB)",
    "AWS · Azure AI Search",
    "Neo4j · Cassandra"
   ]
  },
  {
   "title": "Practices",
   "items": [
    "System design & architecture",
    "CI/CD · DevOps · FinOps",
    "Team hiring & mentorship"
   ]
  }
 ],
 "recognition": [
  {
   "t": "Leadership Excellence",
   "m": "Apra Labs · Nov 2024"
  },
  {
   "t": "Customer Appreciation",
   "m": "Apra Labs · Apr 2023"
  },
  {
   "t": "Guiding Vision",
   "m": "Pravega X Fest"
  }
 ],
 "whatIDo": [
  {
   "n": "01",
   "title": "System Architecture",
   "text": "End-to-end design of production systems — from database schema to API layer to deployment pipeline. I've architected ERPs, AI platforms, analytics engines, and multi-agent systems that serve thousands of users daily."
  },
  {
   "n": "02",
   "title": "AI & Data Systems",
   "text": "Building production AI — not prototypes. 7 AI agents shipped, 5 production AI systems. GraphRAG pipelines, multi-agent orchestration, automated code review, cloud cost optimization, infrastructure monitoring."
  },
  {
   "n": "03",
   "title": "Team Building & Leadership",
   "text": "20+ engineers hired and mentored, including campus hires. I've grown with a company from 10 to 55 people, led campus hiring for 4 years, managed 3 clients simultaneously, and run 10 community meetups on Saturdays."
  },
  {
   "n": "04",
   "title": "0-to-1 Product Development",
   "text": "Taking ideas from a whiteboard to production. I've co-founded a startup, built an ERP from scratch that became the backbone of an entire company, and shipped products that handle 100K hits per day."
  }
 ],
 "build": [
  {
   "n": "01",
   "title": "Enterprise AI",
   "problem": "People who need an answer cannot get it, because the answer lives behind SQL, five admin screens, or someone else’s calendar.",
   "what": "Production RAG, GraphRAG, agent orchestration, and LLM applications that run against live business data.",
   "link": "Multi-Agent Conversational AI",
   "href": "Work.dc.html?p=multi-agent"
  },
  {
   "n": "02",
   "title": "Data & Knowledge Systems",
   "problem": "The knowledge exists, but it is spread across thousands of unstructured documents with no schema and no shared vocabulary.",
   "what": "Large-scale document processing, entity and relationship extraction, graph-based retrieval, and vector search.",
   "link": "GraphRAG Knowledge Engine",
   "href": "Work.dc.html?p=graphrag"
  },
  {
   "n": "03",
   "title": "Production Systems",
   "problem": "A system the whole company runs on, all day, where an hour of downtime means shipments stop.",
   "what": "Cloud architecture, distributed systems, APIs, data pipelines, and the observability to know when they degrade.",
   "link": "Secure Logistics ERP",
   "href": "Work.dc.html?p=logistics-erp"
  },
  {
   "n": "04",
   "title": "Secure AI",
   "problem": "An AI system that can read the database can read the wrong tenant’s data. The access model has to be part of the design.",
   "what": "Permission-aware generation, post-generation query rewriting, read-only validation, and enterprise access control.",
   "link": "Permission rewrite on generated SQL",
   "href": "Work.dc.html?p=multi-agent"
  }
 ],
 "bio": {
  "lead": "12 years of turning ambiguous problems into production systems — ERPs, AI platforms, multi-agent pipelines — across startups and enterprise.",
  "own": "I don't just write code; I own the outcome end to end.",
  "paras": [
   "I've been building software products for over 12 years, starting as an intern at a college incubation center and growing into an Associate Architect role where I manage multiple clients and lead engineering teams. My career has followed a consistent pattern: find a problem nobody's solving, take full ownership, and ship a production system that people depend on every day.",
   "At Apra Labs, I joined as a Senior Software Engineer and now serve as Associate Architect. I've built the AI and data platform layer for a unified facility management product serving 300+ US facilities. This includes a GraphRAG knowledge engine over 150K documents, a multi-agent conversational AI system querying a 4 TB database, an automated code review pipeline, a cloud cost intelligence agent that reduced Azure spend by 30%, and an infrastructure performance agent. I manage 3 clients simultaneously and mentor a team of 4 engineers.",
   "Before that, I spent 3 years at MildlyClassic, where I built a mission-critical logistics ERP from scratch — Finance, Operations, Booking, Hub Management, CRM, Route Planning — that grew to 2,500 daily users handling 70,000 dockets per month for secure jewellery logistics across India. I hired 7 engineers and established the engineering process from the ground up.",
   "Earlier, I co-founded UXgage, a behavioral analytics startup that won a ₹5L cash prize from Sandbox Startups in 6 months, with office space and Azure infrastructure granted separately. I also founded Samvit Learning, a software training institute during my MCA, where I trained 250+ students in web programming."
  ]
 },
 "education": {
  "t": "Master of Computer Applications (MCA)",
  "m": "Gogte Institute of Technology, Belgaum"
 }
};
