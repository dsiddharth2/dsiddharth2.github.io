/**
 * The classes of problem I get handed — framed as problems, not stacks.
 *
 * Each domain names one system that proves it, so the claim is always one
 * click from its evidence.
 */
export interface Domain {
  title: string;
  /** The kind of problem, in one sentence. */
  problem: string;
  /** What that concretely involves building. */
  work: string;
  evidence: { label: string; href: string };
}

export const domains: Domain[] = [
  {
    title: 'Enterprise AI',
    problem:
      'People who need an answer cannot get it, because the answer lives behind SQL, five admin screens, or someone else’s calendar.',
    work: 'Production RAG, GraphRAG, agent orchestration, and LLM applications that run against live business data.',
    evidence: { label: 'Multi-Agent Conversational AI', href: '/projects/multi-agent' },
  },
  {
    title: 'Data & Knowledge Systems',
    problem:
      'The knowledge exists, but it is spread across thousands of unstructured documents with no schema and no shared vocabulary.',
    work: 'Large-scale document processing, entity and relationship extraction, graph-based retrieval, and vector search.',
    evidence: { label: 'GraphRAG Knowledge Engine', href: '/projects/graphrag' },
  },
  {
    title: 'Production Systems',
    problem:
      'Something has to work every day for people whose job depends on it — and keep working while it scales underneath them.',
    work: 'Cloud architecture, distributed systems, APIs, data pipelines, and the observability to know when they degrade.',
    evidence: { label: 'Secure Logistics ERP', href: '/projects/logistics-erp' },
  },
  {
    title: 'Secure AI',
    problem:
      'An AI system that can read the database can read the wrong tenant’s data — unless the access model is designed in, not bolted on.',
    work: 'Permission-aware generation, post-generation query rewriting, read-only validation, and enterprise access control.',
    evidence: { label: 'Permission rewrite on generated SQL', href: '/projects/multi-agent' },
  },
];
