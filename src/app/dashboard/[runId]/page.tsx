"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Run, RunStatus } from "@/lib/types";
import { pollRun } from "@/lib/api";
import { DEMO_RUN, RUNNING_RUN } from "@/lib/fixtures";
import EventFeed from "@/components/EventFeed";
import EvidenceCard from "@/components/EvidenceCard";
import SponsorTrace from "@/components/SponsorTrace";
import MarketAtlas from "@/components/MarketAtlas";

const STATUS_STYLES: Record<RunStatus, string> = {
  queued: "border-slate-300/30 bg-slate-300/10 text-slate-300",
  running: "border-cyan-300/40 bg-cyan-300/15 text-cyan-200 animate-pulse shadow-cyan-500/20",
  partial: "border-amber-300/40 bg-amber-300/15 text-amber-200",
  complete: "border-lime-300/40 bg-lime-300/15 text-lime-200",
  failed: "border-rose-300/40 bg-rose-300/15 text-rose-200",
  demo_fallback: "border-violet-300/40 bg-violet-300/15 text-violet-200",
};

export default function RunPage() {
  const { runId } = useParams<{ runId: string }>();
  const searchParams = useSearchParams();
  const demoParam = searchParams.get("demo");

  const [run, setRun] = useState<Run | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    if (demoParam === "true") { setRun(DEMO_RUN); return; }
    if (demoParam === "running") { setRun(RUNNING_RUN); return; }
    if (demoParam === "recording") { setRun(makeRecordingRun()); return; }

    const stop = pollRun(runId, setRun, (e) => setError(e.message));
    return stop;
  }, [runId, demoParam]);

  useEffect(() => {
    if (error && !run) {
      setRun({ ...DEMO_RUN, status: "demo_fallback" });
    }
  }, [error, run]);

  useEffect(() => {
    if (demoParam !== "running") return;

    let tick = 0;
    const interval = window.setInterval(() => {
      tick += 1;
      setRun((current) => simulateRunningRun(current ?? RUNNING_RUN, tick));
      if (tick >= 4) window.clearInterval(interval);
    }, 1800);

    return () => window.clearInterval(interval);
  }, [demoParam]);

  useEffect(() => {
    if (demoParam !== "recording") return;

    let tick = 0;
    const interval = window.setInterval(() => {
      tick += 1;
      setRun((current) => simulateRecordingRun(current ?? makeRecordingRun(), tick));
      if (tick >= 8) window.clearInterval(interval);
    }, 1550);

    return () => window.clearInterval(interval);
  }, [demoParam]);

  if (!run) {
    return (
      <main className="mx-auto max-w-3xl space-y-4 px-6 py-10">
        <div className="h-10 animate-pulse rounded-2xl border border-white/10 bg-white/10" />
        <div className="h-28 animate-pulse rounded-3xl border border-cyan-300/20 bg-cyan-300/10" />
        <div className="h-44 animate-pulse rounded-3xl border border-fuchsia-300/20 bg-fuchsia-300/10" />
        <div className="h-64 animate-pulse rounded-3xl border border-lime-300/20 bg-lime-300/10" />
      </main>
    );
  }

  const isTerminal = ["complete", "failed", "demo_fallback"].includes(run.status);

  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/[0.07] px-5 py-4 shadow-xl shadow-cyan-950/20 backdrop-blur-xl">
        <Link href="/dashboard" className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200 hover:text-cyan-100 hover:underline">&lt;- New Run</Link>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-slate-500">{run.run_id}</span>
          <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase shadow-lg ${STATUS_STYLES[run.status]}`}>
            {run.status}
          </span>
        </div>
      </div>

      {run.brief && (
        <div className="mb-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] shadow-2xl shadow-fuchsia-950/20 backdrop-blur-xl">
          <div className="border-b border-white/10 px-5 py-3">
            <h2 className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Founder Brief</h2>
          </div>
          <div className="px-5 py-5">
            <p className="text-xl font-black leading-8 text-white">{run.brief.idea}</p>
            <div className="mt-4 grid gap-3 text-xs text-slate-300 md:grid-cols-2">
              <BriefItem label="User" value={run.brief.target_user} />
              <BriefItem label="Alternative" value={run.brief.current_alternative} />
              <BriefItem label="Why now" value={run.brief.why_now} />
              <BriefItem label="Risk" value={run.brief.biggest_risk} />
            </div>
          </div>
        </div>
      )}

      <div className="mb-4">
        <SponsorTrace events={run.events} evidenceCount={run.evidence.length} />
      </div>

      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <EventFeed events={run.events} />
        <EvidenceCard evidence={run.evidence} />
      </div>

      {run.atlas && (
        <div className="mb-4">
          <MarketAtlas atlas={run.atlas} />
        </div>
      )}

      {!isTerminal && (
        <p className="animate-pulse text-center font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-200/70">
          {demoParam === "recording" ? "Recorded sponsor demo playing" : demoParam === "running" ? "Demo stream advancing" : "Polling every 2s"}
        </p>
      )}
    </main>
  );
}

function makeRecordingRun(): Run {
  const now = new Date().toISOString();

  return {
    ...DEMO_RUN,
    run_id: "run_recorded_voice_demo",
    status: "running",
    events: [
      {
        id: "rec_evt_001",
        run_id: "run_recorded_voice_demo",
        type: "created",
        message: "Vapi captured the founder's spoken idea",
        sponsor: "vapi",
        created_at: now,
      },
      {
        id: "rec_evt_002",
        run_id: "run_recorded_voice_demo",
        type: "created",
        message: "Vapi asked: who exactly is the first user?",
        sponsor: "vapi",
        created_at: now,
      },
    ],
    evidence: [],
    atlas: null,
  };
}

function addRecordingEvent(run: Run, id: string, message: string, sponsor: Run["events"][number]["sponsor"], type: Run["events"][number]["type"]): Run {
  if (run.events.some((event) => event.id === id)) return run;

  return {
    ...run,
    events: [
      ...run.events,
      {
        id,
        run_id: run.run_id,
        type,
        message,
        sponsor,
        created_at: new Date().toISOString(),
      },
    ],
  };
}

function addRecordingEvidence(run: Run, ids: string[]): Run {
  const existing = new Set(run.evidence.map((item) => item.id));
  const nextEvidence = DEMO_RUN.evidence
    .filter((item) => ids.includes(item.id) && !existing.has(item.id))
    .map((item) => ({ ...item, run_id: run.run_id }));

  if (nextEvidence.length === 0) return run;
  return { ...run, evidence: [...run.evidence, ...nextEvidence] };
}

function simulateRecordingRun(current: Run, tick: number): Run {
  if (tick === 1) {
    return addRecordingEvent(
      current,
      "rec_evt_003",
      "Founder brief created from voice transcript",
      "vapi",
      "created"
    );
  }

  if (tick === 2) {
    return addRecordingEvent(
      current,
      "rec_evt_004",
      "TinyFish launched 5 live research lanes",
      "tinyfish",
      "research_started"
    );
  }

  if (tick === 3) {
    const withEvidence = addRecordingEvidence(current, ["ev_001", "ev_002"]);
    return addRecordingEvent(
      withEvidence,
      "rec_evt_005",
      "TinyFish found direct competitors with pricing and positioning",
      "tinyfish",
      "evidence_found"
    );
  }

  if (tick === 4) {
    const withEvidence = addRecordingEvidence(current, ["ev_003"]);
    return addRecordingEvent(
      withEvidence,
      "rec_evt_006",
      "Redis stored run state, events, and source memory",
      "redis",
      "evidence_found"
    );
  }

  if (tick === 5) {
    const withEvidence = addRecordingEvidence(current, ["ev_004", "ev_005"]);
    return addRecordingEvent(
      withEvidence,
      "rec_evt_007",
      "TinyFish added substitutes and why-now evidence",
      "tinyfish",
      "evidence_found"
    );
  }

  if (tick === 6) {
    return addRecordingEvent(
      current,
      "rec_evt_008",
      "LLM synthesis started from source-linked evidence",
      "llm",
      "synthesis_started"
    );
  }

  if (tick === 7) {
    return addRecordingEvent(
      current,
      "rec_evt_009",
      "Shipables package ready for reusable agent workflow",
      "shipables",
      "complete"
    );
  }

  if (tick >= 8) {
    const withEvent = addRecordingEvent(
      current,
      "rec_evt_010",
      "Vapi speaks the final verdict back to the founder",
      "vapi",
      "complete"
    );

    return {
      ...withEvent,
      status: "complete",
      evidence: DEMO_RUN.evidence.map((item) => ({ ...item, run_id: withEvent.run_id })),
      atlas: DEMO_RUN.atlas,
    };
  }

  return current;
}

function simulateRunningRun(current: Run, tick: number): Run {
  if (tick === 1) {
    return {
      ...current,
      events: [
        ...current.events,
        { id: "evt_104", run_id: current.run_id, type: "evidence_found", message: "TinyFish fetched pricing pages from outbound tools", sponsor: "tinyfish", created_at: new Date().toISOString() },
      ],
      evidence: [
        ...current.evidence,
        {
          id: "ev_102",
          run_id: current.run_id,
          url: "https://instantly.ai",
          title: "Instantly - Cold email software",
          snippet: "Cold email automation and deliverability tooling for sales teams.",
          claim: "Crowded substitute with automation and deliverability already bundled",
          evidence_type: "substitute",
          confidence: 0.84,
          source_tool: "tinyfish_fetch",
        },
      ],
    };
  }

  if (tick === 2) {
    return {
      ...current,
      events: [
        ...current.events,
        { id: "evt_105", run_id: current.run_id, type: "evidence_found", message: "Redis stored 3 events and 2 evidence records", sponsor: "redis", created_at: new Date().toISOString() },
      ],
    };
  }

  if (tick === 3) {
    return {
      ...current,
      events: [
        ...current.events,
        { id: "evt_106", run_id: current.run_id, type: "synthesis_started", message: "Synthesis started from stored evidence", sponsor: "llm", created_at: new Date().toISOString() },
      ],
    };
  }

  if (tick >= 4) {
    const evidenceIds = current.evidence.map((item) => item.id);

    return {
      ...current,
      status: "complete",
      events: [
        ...current.events,
        { id: "evt_107", run_id: current.run_id, type: "complete", message: "Market atlas ready. Score: 41/100.", sponsor: "llm", created_at: new Date().toISOString() },
      ],
      atlas: {
        one_line_thesis: "Cold email personalization is real pain, but the market is brutally crowded and deliverability is the actual wedge.",
        score: 41,
        brutal_truth: "The idea sounds useful, but Apollo, Clay, and Instantly already own much of the workflow. Personalization alone is not enough.",
        promising_wedge: "Niche down to one vertical where deliverability and compliance matter more than generic personalization.",
        target_icp: "Small B2B sales teams sending under 2,000 outbound emails per month without a dedicated RevOps person.",
        competitors: [
          { name: "Apollo", url: "https://apollo.io", notes: "Large installed base and broad sales intelligence platform" },
          { name: "Instantly", url: "https://instantly.ai", notes: "Strong cold email automation and deliverability positioning" },
        ],
        substitutes: ["Manual LinkedIn research", "Clay tables", "Apollo sequences", "Freelance SDR research"],
        risks: ["Spam filters punish generic AI copy", "Sales teams already have crowded tooling", "LinkedIn scraping rules can break workflows"],
        next_experiment: "Pick one vertical and run 20 manually researched emails. Measure reply quality before building the product.",
        evidence_ids: evidenceIds,
      },
    };
  }

  return current;
}

function BriefItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-3">
      <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200/60">{label}</span>
      <span className="mt-1 block text-sm text-slate-200">{value}</span>
    </div>
  );
}
