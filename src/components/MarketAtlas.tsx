"use client";
import { MarketAtlas as Atlas } from "@/lib/types";

interface Props { atlas: Atlas; }

export default function MarketAtlas({ atlas }: Props) {
  const scoreClass = atlas.score >= 70
    ? "from-lime-300 to-emerald-400 text-[#06120A]"
    : atlas.score >= 50
      ? "from-amber-300 to-orange-400 text-[#160B02]"
      : "from-rose-400 to-fuchsia-500 text-white";

  return (
    <div className="overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-white/[0.08] shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.06] px-5 py-4">
        <h2 className="text-xs font-black uppercase tracking-[0.24em] text-cyan-100/80">Market Atlas</h2>
        <span className={`rounded-full bg-gradient-to-r px-4 py-2 font-mono text-sm font-black shadow-lg ${scoreClass}`}>{atlas.score}/100</span>
      </div>

      <div className="space-y-5 px-5 py-5">
        <p className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-lg font-black leading-7 text-white shadow-lg shadow-cyan-950/20">{atlas.one_line_thesis}</p>

        <Section label="Brutal Truth" color="text-rose-200">{atlas.brutal_truth}</Section>
        <Section label="Promising Wedge" color="text-lime-200">{atlas.promising_wedge}</Section>
        <Section label="Target ICP" color="text-cyan-200">{atlas.target_icp}</Section>

        <div>
          <Label color="text-orange-200">Competitors</Label>
          <ul className="space-y-2">
            {atlas.competitors.map((c) => (
              <li key={c.name} className="rounded-2xl border border-white/10 bg-slate-950/35 p-3 text-sm text-slate-300">
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="font-black text-orange-200 hover:text-orange-100 hover:underline">{c.name}</a>
                <span className="text-slate-500"> - {c.notes}</span>
              </li>
            ))}
          </ul>
        </div>

        <ListSection label="Substitutes" color="text-cyan-200" items={atlas.substitutes} />
        <ListSection label="Risks" color="text-rose-200" items={atlas.risks} />
        <Section label="Next Experiment" color="text-violet-200">{atlas.next_experiment}</Section>
      </div>
    </div>
  );
}

function Label({ color, children }: { color: string; children: React.ReactNode }) {
  return <p className={`mb-2 text-[10px] font-black uppercase tracking-[0.22em] ${color}`}>{children}</p>;
}

function Section({ label, color, children }: { label: string; color: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
      <Label color={color}>{label}</Label>
      <p className="text-sm leading-6 text-slate-300">{children}</p>
    </div>
  );
}

function ListSection({ label, color, items }: { label: string; color: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
      <Label color={color}>{label}</Label>
      <ul className="list-none space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm text-slate-300">
            <span className="font-black text-cyan-200">›</span> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
