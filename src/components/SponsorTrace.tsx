"use client";
import { RunEvent, Sponsor } from "@/lib/types";

const PIPELINE: { key: Sponsor; label: string; active: string; inactive: string }[] = [
  { key: "vapi",     label: "Vapi",     active: "border-violet-400/50 bg-violet-400/10 text-violet-200 shadow-violet-500/20", inactive: "border-white/8 text-slate-600" },
  { key: "tinyfish", label: "TinyFish", active: "border-cyan-400/50 bg-cyan-400/10 text-cyan-200 shadow-cyan-500/20",         inactive: "border-white/8 text-slate-600" },
  { key: "redis",    label: "Redis",    active: "border-rose-400/50 bg-rose-400/10 text-rose-200 shadow-rose-500/20",          inactive: "border-white/8 text-slate-600" },
  { key: "llm",      label: "LLM",      active: "border-amber-400/50 bg-amber-400/10 text-amber-200 shadow-amber-500/20",      inactive: "border-white/8 text-slate-600" },
  { key: "app",      label: "Done",     active: "border-lime-400/50 bg-lime-400/10 text-lime-200 shadow-lime-500/20",          inactive: "border-white/8 text-slate-600" },
];

interface Props { events: RunEvent[]; evidenceCount: number; }

export default function SponsorTrace({ events, evidenceCount }: Props) {
  const active = new Set(events.map((e) => e.sponsor));
  const counts = events.reduce<Partial<Record<Sponsor, number>>>((acc, e) => {
    acc[e.sponsor] = (acc[e.sponsor] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] px-5 py-4 shadow-xl shadow-cyan-950/20 backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Pipeline</h2>
        <span className="font-mono text-[10px] text-slate-600">{events.length} events · {evidenceCount} sources</span>
      </div>

      <div className="flex items-center">
        {PIPELINE.map((stage, i) => {
          const isActive = active.has(stage.key);
          const count = counts[stage.key];
          return (
            <div key={stage.key} className="flex flex-1 items-center">
              <div className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl border px-2 py-2.5 text-center shadow-lg transition-all duration-500 ${isActive ? stage.active : stage.inactive}`}>
                <span className="text-[11px] font-black uppercase tracking-wide">{stage.label}</span>
                <span className="font-mono text-[10px] opacity-60">{isActive && count ? `×${count}` : "·"}</span>
              </div>
              {i < PIPELINE.length - 1 && (
                <div className={`mx-1 shrink-0 text-base leading-none transition-colors duration-500 ${isActive ? "text-white/30" : "text-white/8"}`}>›</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
