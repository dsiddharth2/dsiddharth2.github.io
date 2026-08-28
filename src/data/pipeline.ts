/**
 * How the work actually runs, start to finish.
 *
 * Every stage carries a concrete instance from a real system — the stage names
 * on their own are a process diagram anyone could draw.
 */
export interface PipelineStage {
  stage: string;
  /** What this step means in practice. */
  meaning: string;
  /** Where it actually happened. */
  instance: string;
}

export const pipeline: PipelineStage[] = [
  {
    stage: 'Problem',
    meaning: 'Start from what is going wrong for someone, not from a ticket.',
    instance:
      'Cloud spend was climbing and the billing portal could only say the total moved, never why.',
  },
  {
    stage: 'Understand',
    meaning: 'Sit with the people doing the work until the real constraint surfaces.',
    instance:
      'Requirements for the logistics ERP came from the operations and finance teams directly — there was no spec.',
  },
  {
    stage: 'Explore',
    meaning: 'Find where the difficulty actually is before committing to a shape.',
    instance:
      'Blending everything into one vector index looked obvious, until the reranker could not tell why a chunk matched.',
  },
  {
    stage: 'Prototype',
    meaning: 'Build the smallest thing that proves the approach survives real data.',
    instance:
      'The GraphRAG evaluation harness went in early, so retrieval quality could be measured before it was tuned.',
  },
  {
    stage: 'Build',
    meaning: 'Take it to production quality — the access model, the failure paths, the seams.',
    instance:
      'Generated SQL gets read-only validation and a post-generation permission rewrite before it touches live data.',
  },
  {
    stage: 'Deploy',
    meaning: 'Ship it into the environment the business already runs on.',
    instance:
      'FinOps findings arrive through the existing platform mail path, so there is no new system to adopt.',
  },
  {
    stage: 'Measure',
    meaning: 'Instrument it so degradation is visible before a user reports it.',
    instance:
      'Composite health scores against rolling 30-day baselines, over telemetry sampled every 15 seconds.',
  },
  {
    stage: 'Iterate',
    meaning: 'Keep a running account of what the design got wrong, and act on it.',
    instance:
      'Entity resolution should have been first, not last. The Q&A cache stales silently. Both are written down.',
  },
];
