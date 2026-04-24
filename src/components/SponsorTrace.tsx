"use client";
import { RunEvent, Sponsor } from "@/lib/types";

const SPONSOR_COLORS: Record<Sponsor, string> = {
  vapi:      "border-violet-300/35 bg-violet-300/15 text-violet-200",
  tinyfish:  "border-cyan-300/35 bg-cyan-300/15 text-cyan-200",
  redis:     "border-rose-300/35 bg-rose-300/15 text-rose-200",
  llm:       "border-amber-300/35 bg-amber-300/15 text-amber-200",
  shipables: "border-lime-300/35 bg-lime-300/15 text-lime-200",
  app:       "border-slate-300/25 bg-slate-300/10 text-slate-200",
};

const SPONSOR_LABELS: Record<Sponsor, string> = {
  vapi:      "Vapi",
  tinyfish:  "TinyFish",
  redis:     "Redis",
  llm:       "LLM",
  shipables: "Shipables",
  app:       "App",
};

interface Props { events: RunEvent[]; evidenceCount: number; }

export default function SponsorTrace({ events, evidenceCount }: Props) {
  const counts = events.reduce<Partial<Record<Sponsor, number>>>((acc, e) => {
    acc[e.sponsor] = (acc[e.sponsor] ?? 0) + 1;
    return acc;
  }, {});

  const sponsors = Object.keys(counts) as Sponsor[];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.07] shadow-xl shadow-cyan-950/20 backdrop-blur-xl">
      <div className="border-b border-white/10 px-5 py-3">
        <h2 className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Sponsor Tools</h2>
      </div>
      <div className="px-5 py-4">
        <div className="flex flex-wrap gap-2">
          {sponsors.map((s) => (
            <span key={s} className={`rounded-full border px-3 py-1 text-xs font-black uppercase ${SPONSOR_COLORS[s]}`}>
              {SPONSOR_LABELS[s]} x{counts[s]}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{events.length} events / {evidenceCount} sources</p>
      </div>
    </div>
  );
}
