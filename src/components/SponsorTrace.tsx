"use client";
import { RunEvent, Sponsor } from "@/lib/types";

const PIPELINE: { key: Sponsor; label: string; color: string; glow: string }[] = [
  { key: "vapi",     label: "Vapi",     color: "border-violet-400/60 bg-violet-300/15 text-violet-200", glow: "shadow-violet-500/30" },
  { key: "tinyfish", label: "TinyFish", color: "border-cyan-400/60 bg-cyan-300/15 text-cyan-200",       glow: "shadow-cyan-500/30" },
  { key: "redis",    label: "Redis",    color: "border-rose-400/60 bg-rose-300/15 text-rose-200",        glow: "shadow-rose-500/20" },
  { key: "llm",      label: "LLM",      color: "border-amber-400/60 bg-amber-300/15 text-amber-200",    glow: "shadow-amber-500/20" },
  { key: "app",      label: "Done",     color: "border-lime-400/60 bg-lime-300/15 text-lime-200",        glow: "shadow-lime-500/20" },
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
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Pipeline</h2>
        <span className="font-mono text-[10px] text-slate-600">{events.length} events · {evidenceCount} sources</span>
      </div>

      <div className="flex items-center gap-1">
        {PIPELINE.map((stage, i) => {
          const isActive = active.has(stage.key);
          const count = counts[stage.key] ?? 0;
          return (
            <div key={stage.key} className="flex flex-1 items-center">
              <div className={`flex flex-1 flex-col items-center gap-1 rounded-2xl border py-2 px-1 text-center transition-all duration-500
                ${isActive ? `${stage.color} shadow-lg ${stage.glow}` : "border-white/8 bg-white/[0.03] text-slate-600"}`}>
                <span className={`text-[11px] font-black uppercase tracking-wide ${isActive ? "" : "opacity-40"}`}>
                  {stage.label}
                </span>
                {isActive && count > 0 && (
                  <span className="font-mono text-[10px] opacity-70">×{count}</span>
                )}
                {!isActive && (
                  <span className="text-[10px] opacity-30">—</span>
                )}
              </div>
              {i < PIPELINE.length - 1 && (
                <div className={`mx-1 h-px w-3 shrink-0 transition-colors duration-500 ${isActive ? "bg-white/30" : "bg-white/8"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
