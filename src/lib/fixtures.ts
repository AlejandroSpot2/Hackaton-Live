import { Run } from "./types";

export const DEMO_SEEDED_RUN_ID = "run_demo_001";

export const DEMO_RUN: Run = {
  run_id: DEMO_SEEDED_RUN_ID,
  status: "complete",
  brief: {
    idea: "Voice agent that validates startup ideas in real time during a conversation",
    target_user: "Early-stage founders before they write their first line of code",
    current_alternative: "Asking friends, posting on Twitter, paying consultants",
    why_now: "LLMs make real-time synthesis cheap; founders waste months on bad ideas",
    biggest_risk: "Founders ignore brutal feedback and build anyway",
  },
  events: [
    { id: "evt_001", run_id: DEMO_SEEDED_RUN_ID, type: "created", message: "Run created from voice intake", sponsor: "vapi", created_at: "2026-04-24T10:00:00Z" },
    { id: "evt_002", run_id: DEMO_SEEDED_RUN_ID, type: "research_started", message: "Starting market research across 5 lanes", sponsor: "tinyfish", created_at: "2026-04-24T10:00:02Z" },
    { id: "evt_003", run_id: DEMO_SEEDED_RUN_ID, type: "evidence_found", message: "Found 3 direct competitors in startup validation space", sponsor: "tinyfish", created_at: "2026-04-24T10:00:08Z" },
    { id: "evt_004", run_id: DEMO_SEEDED_RUN_ID, type: "evidence_found", message: "Pricing anchors identified: $49-$299/mo range", sponsor: "tinyfish", created_at: "2026-04-24T10:00:14Z" },
    { id: "evt_005", run_id: DEMO_SEEDED_RUN_ID, type: "evidence_found", message: "Pain signals found: 847 Reddit threads on 'wasted 6 months building wrong thing'", sponsor: "tinyfish", created_at: "2026-04-24T10:00:19Z" },
    { id: "evt_006", run_id: DEMO_SEEDED_RUN_ID, type: "synthesis_started", message: "Evidence stored. Generating market atlas.", sponsor: "redis", created_at: "2026-04-24T10:00:21Z" },
    { id: "evt_007", run_id: DEMO_SEEDED_RUN_ID, type: "complete", message: "Market atlas ready. Score: 72/100.", sponsor: "llm", created_at: "2026-04-24T10:00:28Z" },
  ],
  evidence: [
    {
      id: "ev_001", run_id: DEMO_SEEDED_RUN_ID,
      url: "https://validation.agency",
      title: "Validation Agency - Startup Idea Validation Service",
      snippet: "We charge $299 per validated idea report, delivered in 48 hours.",
      claim: "Human-powered competitor charging $299 with 48h turnaround",
      evidence_type: "competitor", confidence: 0.92,
      source_tool: "tinyfish_search",
    },
    {
      id: "ev_002", run_id: DEMO_SEEDED_RUN_ID,
      url: "https://ideacheck.io",
      title: "IdeaCheck - AI Startup Validator",
      snippet: "Answer 20 questions and get an instant score.",
      claim: "Form-based AI validator - no voice, no live research",
      evidence_type: "competitor", confidence: 0.87,
      source_tool: "tinyfish_search",
    },
    {
      id: "ev_003", run_id: DEMO_SEEDED_RUN_ID,
      url: "https://reddit.com/r/startups/comments/abc123",
      title: "I spent 6 months building something nobody wanted",
      snippet: "Talked to 3 friends who said 'cool idea' and started coding. Big mistake.",
      claim: "Founders over-trust friends as validation - the core pain",
      evidence_type: "pain", confidence: 0.95,
      source_tool: "tinyfish_fetch",
    },
    {
      id: "ev_004", run_id: DEMO_SEEDED_RUN_ID,
      url: "https://producthunt.com/posts/founder-insights",
      title: "Founder Insights - $49/mo for market reports",
      snippet: "Weekly curated market intelligence for early founders.",
      claim: "Substitute: async market reports at $49/mo",
      evidence_type: "substitute", confidence: 0.78,
      source_tool: "tinyfish_search",
    },
    {
      id: "ev_005", run_id: DEMO_SEEDED_RUN_ID,
      url: "https://techcrunch.com/2025/ai-voice-tools",
      title: "The voice AI wave is hitting enterprise - startups next",
      snippet: "Voice-first tools saw 340% YoY growth in developer adoption in 2025.",
      claim: "Voice AI adoption exploding - strong why-now signal",
      evidence_type: "why_now", confidence: 0.88,
      source_tool: "tinyfish_fetch",
    },
  ],
  atlas: {
    one_line_thesis: "The fastest way to kill a bad startup idea is a 3-minute voice conversation with an agent that already knows your market.",
    score: 72,
    brutal_truth: "Two well-funded competitors exist. Your edge is voice + real-time research, but neither alone is defensible. You need both working flawlessly in demo.",
    promising_wedge: "Pre-accelerator founders in the 48h before applying to YC/Techstars - highest willingness to pay, clearest use case.",
    target_icp: "Solo technical founder, 25-35, has a job, side-project idea, scared of wasting weekends on the wrong thing.",
    competitors: [
      { name: "Validation Agency", url: "https://validation.agency", notes: "Human-powered, $299, slow - ripe for disruption" },
      { name: "IdeaCheck", url: "https://ideacheck.io", notes: "Form-based, no live research, no voice" },
    ],
    substitutes: ["Asking Twitter/LinkedIn followers", "Paying a consultant", "Just building and seeing what happens", "YC startup school forums"],
    risks: [
      "Founders ignore brutal feedback - product works but doesn't change behavior",
      "TinyFish rate limits during live demo",
      "Voice latency breaks the conversational feel",
    ],
    next_experiment: "Run 5 live sessions with real founders before the hackathon ends. Measure if the score changes their next action.",
    evidence_ids: ["ev_001", "ev_002", "ev_003", "ev_004", "ev_005"],
  },
};

export const RUNNING_RUN: Run = {
  run_id: "run_live_002",
  status: "running",
  brief: {
    idea: "AI tool that writes cold emails personalized from LinkedIn profiles",
    target_user: "B2B sales reps at SMBs",
    current_alternative: "Copy-pasting from LinkedIn manually",
    why_now: "GPT-4 made personalization cheap; Apollo and Clay are too complex",
    biggest_risk: "Gmail spam filters block AI-written emails",
  },
  events: [
    { id: "evt_101", run_id: "run_live_002", type: "created", message: "Run created from voice intake", sponsor: "vapi", created_at: "2026-04-24T10:05:00Z" },
    { id: "evt_102", run_id: "run_live_002", type: "research_started", message: "Searching for competitors in AI cold email space", sponsor: "tinyfish", created_at: "2026-04-24T10:05:03Z" },
    { id: "evt_103", run_id: "run_live_002", type: "evidence_found", message: "Found Apollo.io, Clay, Instantly - crowded space", sponsor: "tinyfish", created_at: "2026-04-24T10:05:11Z" },
  ],
  evidence: [
    {
      id: "ev_101", run_id: "run_live_002",
      url: "https://apollo.io",
      title: "Apollo.io - Sales Intelligence Platform",
      snippet: "Trusted by 500,000+ companies for outbound sales.",
      claim: "Apollo has massive market share and LinkedIn integration already",
      evidence_type: "competitor", confidence: 0.96,
      source_tool: "tinyfish_search",
    },
  ],
  atlas: null,
};

export const DEMO_EVIDENCE_LIST = DEMO_RUN.evidence.map((evidence) => ({
  ...evidence,
  source_tool: evidence.source_tool === "tinyfish_agent" ? "tinyfish_search" : evidence.source_tool,
}));
