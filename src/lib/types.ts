export type RunStatus = "queued" | "running" | "partial" | "complete" | "failed" | "demo_fallback";
export type EventType = "created" | "research_started" | "evidence_found" | "synthesis_started" | "complete" | "failed";
export type EvidenceType = "competitor" | "substitute" | "pricing" | "pain" | "why_now";
export type Sponsor = "vapi" | "tinyfish" | "redis" | "llm" | "shipables" | "app";

export interface RunEvent {
  id: string;
  run_id: string;
  type: EventType;
  message: string;
  sponsor: Sponsor;
  created_at: string;
}

export interface Evidence {
  id: string;
  run_id: string;
  url: string;
  title: string;
  snippet: string;
  claim: string;
  evidence_type: EvidenceType;
  confidence: number;
  source_tool: "tinyfish_search" | "tinyfish_fetch" | "tinyfish_agent";
}

export interface Competitor {
  name: string;
  url: string;
  notes: string;
}

export interface MarketAtlas {
  one_line_thesis: string;
  score: number;
  brutal_truth: string;
  promising_wedge: string;
  target_icp: string;
  competitors: Competitor[];
  substitutes: string[];
  risks: string[];
  next_experiment: string;
  evidence_ids: string[];
}

export interface FounderBrief {
  idea: string;
  target_user: string;
  current_alternative: string;
  why_now: string;
  biggest_risk: string;
}

export interface Run {
  run_id: string;
  status: RunStatus;
  brief: FounderBrief | null;
  events: RunEvent[];
  evidence: Evidence[];
  atlas: MarketAtlas | null;
}
