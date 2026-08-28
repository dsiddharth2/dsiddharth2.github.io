/**
 * One system, told end to end.
 *
 * Every paragraph here traces to the multi-agent record in `products.ts` —
 * its context, decisions, evaluation and reflections. Nothing is invented, and
 * the blunt lines are kept as written rather than smoothed.
 */
export interface WalkthroughSection {
  heading: string;
  paragraphs: string[];
}

export const walkthroughIntro =
  'Most of the work looks like this one: a vague ask, a system already running underneath it, and a constraint that only shows up once you start building. This is the multi-agent system at Apra Labs, from the first conversation through to what it costs to run.';

export const walkthrough: WalkthroughSection[] = [
  {
    heading: 'The ask, and the actual problem',
    paragraphs: [
      'The ask was a chatbot for the facility management product. The problem underneath it was that answers lived in three places: a 4 TB operations database, a documents archive, and more than a hundred report types. Non-technical operators could not reach any of it without SQL or five separate admin screens, so the experienced engineers were spending their days as human routers between systems.',
      'Generating SQL was never the hard part. Doing it without letting a generated query read across a tenant boundary was.',
    ],
  },
  {
    heading: 'The first version did not work',
    paragraphs: [
      'I started with a single agent and attached every tool to it. It picked the wrong tool constantly. Thirty tool descriptions in one prompt give the model almost no signal to separate them, and reporting, admin operations, system setup, knowledge retrieval and ticket management all need different tools and different context.',
      'Five narrower agents with about five tools each fixed it. A supervisor classifies depth, cost tier and owner, then hands off, and never answers anything itself. That costs one extra model round trip before any real work starts, which was worth paying.',
    ],
  },
  {
    heading: 'Where the security decision was',
    paragraphs: [
      "The model drafts SQL from a schema description. Before anything executes, a validator rejects anything that is not a read, and a permission service rewrites the query with the WHERE clauses that user's scope allows.",
      "The alternative was asking the prompt to respect the tenant boundary. That would work most of the time, and most of the time is how you leak one site's access records into another's answer.",
    ],
  },
  {
    heading: 'What drifted',
    paragraphs: [
      'The routing prompt started as a hand-edited list of which agent owns what. It drifted from reality within two weeks of the first new tool shipping, and the failure was silent: routing just quietly got worse.',
      'Agents and tools now register themselves with a decorator, and the supervisor’s routing prompt is generated from that registry at startup. There is no list left to forget to update.',
    ],
  },
  {
    heading: 'Shipping it into a product that already existed',
    paragraphs: [
      'Dispatch and response are separate transactions. The web tier validates the request, hands it to the agent tier and returns immediately, and everything after that streams back over SignalR. A deep question chaining four or five tool calls runs well past a normal HTTP timeout, and a page refresh should not kill work already in flight. The cost is two failure surfaces instead of one, plus a client that has to commit a message it never got a direct HTTP response for.',
      'Answer text and citations stream on separate channels, because sources resolve on a different clock from the prose. Interleaving them meant a citation could land against a sentence that had already scrolled past.',
    ],
  },
  {
    heading: 'What I did not do',
    paragraphs: [
      'It shipped without a formal evaluation harness, and that is the biggest gap in the project. What existed instead was a fixed set of known-answer questions per agent, re-run by hand after any prompt or schema change, and manual review of generated SQL against the tables I expected it to touch.',
      'The streamed reasoning trace helped more than I expected. Because routing, plan and tool calls are all visible, a misroute is obvious in a way it never is when you only see the final answer.',
    ],
  },
];

export const walkthroughChanges = [
  {
    title: 'Build the evaluation harness before the second agent',
    detail:
      'Everything else here is downstream of not measuring. A labelled set of a few hundred real questions with expected agent, expected tables and expected answer would have taken a week and paid for itself immediately.',
  },
  {
    title: 'Generate SQL for the tail, not the head',
    detail:
      'The same twenty questions account for most traffic, and free-form generation over a wide schema is a fragile way to answer them. Parameterised templates the model chooses between would be faster, cheaper and verifiable.',
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
];
