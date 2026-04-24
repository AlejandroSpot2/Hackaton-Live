"use client";
import { MarketAtlas as Atlas } from "@/lib/types";

interface Props { atlas: Atlas; }

export default function MarketAtlas({ atlas }: Props) {
  const { score } = atlas;
  const tier =
    score >= 70 ? { label: "STRONG SIGNAL", bar: "from-lime-400 to-emerald-400", text: "text-lime-300", glow: "shadow-lime-500/30" } :
    score >= 50 ? { label: "MODERATE RISK", bar: "from-amber-400 to-orange-400", text: "text-amber-300", glow: "shadow-amber-500/20" } :
                  { label: "RED FLAGS", bar: "from-rose-500 to-fuchsia-500", text: "text-rose-300", glow: "shadow-rose-500/30" };

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">

      {/* Score hero */}
      <div className="relative flex flex-col items-center gap-2 border-b border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/80 px-6 py-8 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Reality Score</p>
        <div className={`font-mono text-8xl font-black leading-none ${tier.text} drop-shadow-2xl`}>{score}</div>
        <div className="relative mt-1 h-2 w-48 overflow-hidden rounded-full bg-white/10">
          <div
            className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r shadow-lg transition-all duration-1000 ${tier.bar} ${tier.glow}`}
            style={{ width: `${score}%` }}
          />
        </div>
        <span className={`mt-1 rounded-full border px-4 py-1 text-[10px] font-black uppercase tracking-[0.24em] ${tier.text} border-current/30`}>{tier.label}</span>
        <p className="mt-3 max-w-xl text-base font-black leading-7 text-white">{atlas.one_line_thesis}</p>
      </div>

      <div className="grid gap-4 p-5 md:grid-cols-2">

        {/* Brutal Truth */}
        <div className="col-span-2 rounded-2xl border border-rose-300/20 bg-rose-300/5 p-4">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-rose-400">Brutal Truth</p>
          <p className="text-sm leading-6 text-slate-200">{atlas.brutal_truth}</p>
        </div>

        {/* Promising Wedge */}
        <div className="rounded-2xl border border-lime-300/20 bg-lime-300/5 p-4">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-lime-400">Promising Wedge</p>
          <p className="text-sm leading-6 text-slate-200">{atlas.promising_wedge}</p>
        </div>

        {/* Target ICP */}
        <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/5 p-4">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-cyan-400">Target ICP</p>
          <p className="text-sm leading-6 text-slate-200">{atlas.target_icp}</p>
        </div>

        {/* Competitors */}
        <div className="rounded-2xl border border-orange-300/20 bg-orange-300/5 p-4">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-orange-400">Competitors</p>
          <ul className="space-y-2">
            {atlas.competitors.map((c) => (
              <li key={c.name} className="flex flex-col gap-1 rounded-xl border border-white/10 bg-slate-950/40 p-3">
                <a href={c.url} target="_blank" rel="noopener noreferrer"
                  className="text-sm font-black text-orange-200 hover:underline">{c.name}</a>
                <span className="text-xs text-slate-400">{c.notes}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Risks */}
        <div className="rounded-2xl border border-rose-300/20 bg-rose-300/5 p-4">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-rose-400">Risks</p>
          <ul className="space-y-2">
            {atlas.risks.map((r) => (
              <li key={r} className="flex items-start gap-2 text-xs leading-5 text-slate-300">
                <span className="mt-px shrink-0 text-rose-400">▲</span>{r}
              </li>
            ))}
          </ul>
        </div>

        {/* Substitutes */}
        <div className="col-span-2 rounded-2xl border border-violet-300/20 bg-violet-300/5 p-4">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-violet-400">Substitutes Today</p>
          <div className="flex flex-wrap gap-2">
            {atlas.substitutes.map((s) => (
              <span key={s} className="rounded-full border border-violet-300/25 bg-violet-300/10 px-3 py-1 text-xs font-bold text-violet-200">{s}</span>
            ))}
          </div>
        </div>

        {/* Next Experiment */}
        <div className="col-span-2 rounded-2xl border border-cyan-300/25 bg-gradient-to-r from-cyan-300/10 to-fuchsia-300/10 p-4">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-cyan-400">Next Experiment — 7 Days</p>
          <p className="text-sm font-bold leading-6 text-white">{atlas.next_experiment}</p>
        </div>
      </div>
    </div>
  );
}
