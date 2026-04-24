"use client";
import { Evidence, EvidenceType } from "@/lib/types";

const TYPE_CONFIG: Record<EvidenceType, { icon: string; badge: string; bar: string; label: string }> = {
  competitor: { icon: "⚔", badge: "border-orange-300/35 bg-orange-300/10 text-orange-200", bar: "bg-orange-400", label: "Competitor" },
  substitute: { icon: "🔄", badge: "border-cyan-300/35 bg-cyan-300/10 text-cyan-200",     bar: "bg-cyan-400",   label: "Substitute" },
  pricing:    { icon: "💰", badge: "border-lime-300/35 bg-lime-300/10 text-lime-200",      bar: "bg-lime-400",   label: "Pricing" },
  pain:       { icon: "🩹", badge: "border-rose-300/35 bg-rose-300/10 text-rose-200",      bar: "bg-rose-400",   label: "Pain Signal" },
  why_now:    { icon: "⚡", badge: "border-violet-300/35 bg-violet-300/10 text-violet-200", bar: "bg-violet-400", label: "Why Now" },
};

const TYPE_ORDER: EvidenceType[] = ["competitor", "substitute", "pricing", "pain", "why_now"];

interface Props { evidence: Evidence[]; }

export default function EvidenceCard({ evidence }: Props) {
  const byType = evidence.reduce<Partial<Record<EvidenceType, Evidence[]>>>((acc, e) => {
    (acc[e.evidence_type] ??= []).push(e);
    return acc;
  }, {});

  const orderedTypes = TYPE_ORDER.filter((t) => byType[t]?.length);

  return (
    <div className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.06] shadow-xl shadow-lime-950/10 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <h2 className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Evidence</h2>
        {evidence.length > 0 && (
          <span className="rounded-full border border-lime-300/30 bg-lime-300/10 px-2 py-0.5 text-[10px] font-black text-lime-300">
            {evidence.length} sources
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4" style={{ maxHeight: 400 }}>
        {evidence.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
            <span className="text-3xl opacity-30">◌</span>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Researching sources...</p>
            <p className="text-xs text-slate-600">TinyFish is scanning competitors, substitutes, pricing, pain signals, and timing</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orderedTypes.map((type) => {
              const cfg = TYPE_CONFIG[type];
              const items = byType[type]!;
              return (
                <div key={type}>
                  <div className="mb-3 flex items-center gap-2">
                    <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase ${cfg.badge}`}>
                      {cfg.icon} {cfg.label}
                    </span>
                    <span className="text-[10px] font-bold text-slate-600">{items.length}</span>
                  </div>
                  <ul className="space-y-2">
                    {items.map((e) => (
                      <li key={e.id} className="group overflow-hidden rounded-2xl border border-white/8 bg-slate-950/50 transition hover:border-white/15 hover:bg-white/[0.08]">
                        <div className="p-3">
                          <p className="text-sm font-bold leading-5 text-white">{e.claim}</p>
                          <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-slate-400">{e.snippet}</p>
                          <a href={e.url} target="_blank" rel="noopener noreferrer"
                            className="mt-2 block truncate text-[11px] font-bold text-cyan-400 hover:text-cyan-300 hover:underline">
                            {e.url}
                          </a>
                        </div>
                        {/* Confidence bar */}
                        <div className="h-0.5 w-full bg-white/5">
                          <div className={`h-full ${cfg.bar} opacity-70`} style={{ width: `${Math.round(e.confidence * 100)}%` }} />
                        </div>
                        <div className="px-3 py-1.5">
                          <span className="font-mono text-[10px] text-slate-600">{Math.round(e.confidence * 100)}% confidence · {e.source_tool}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
