"use client";
import { Evidence, EvidenceType } from "@/lib/types";

const TYPE_STYLES: Record<EvidenceType, string> = {
  competitor: "border-orange-300/35 bg-orange-300/15 text-orange-200",
  substitute: "border-cyan-300/35 bg-cyan-300/15 text-cyan-200",
  pricing:    "border-lime-300/35 bg-lime-300/15 text-lime-200",
  pain:       "border-rose-300/35 bg-rose-300/15 text-rose-200",
  why_now:    "border-violet-300/35 bg-violet-300/15 text-violet-200",
};

const TYPE_LABELS: Record<EvidenceType, string> = {
  competitor: "Competitor",
  substitute: "Substitute",
  pricing:    "Pricing",
  pain:       "Pain Signal",
  why_now:    "Why Now",
};

interface Props { evidence: Evidence[]; }

export default function EvidenceCard({ evidence }: Props) {
  const byType = evidence.reduce<Partial<Record<EvidenceType, Evidence[]>>>((acc, e) => {
    (acc[e.evidence_type] ??= []).push(e);
    return acc;
  }, {});

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.07] shadow-xl shadow-lime-950/10 backdrop-blur-xl">
      <div className="border-b border-white/10 px-5 py-3">
        <h2 className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Evidence / {evidence.length} Sources</h2>
      </div>
      <div className="space-y-5 px-5 py-5">
        {evidence.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-cyan-300/20 bg-slate-950/35 p-5">
            <p className="text-sm font-bold text-white">Waiting for source evidence...</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              TinyFish results will appear here as competitors, substitutes, pricing anchors, pain signals, and why-now evidence.
            </p>
          </div>
        ) : (Object.keys(byType) as EvidenceType[]).map((type) => (
          <div key={type}>
            <span className={`mb-3 inline-block rounded-full border px-3 py-1 text-xs font-black uppercase ${TYPE_STYLES[type]}`}>
              {TYPE_LABELS[type]}
            </span>
            <ul className="space-y-3">
              {byType[type]!.map((e) => (
                <li key={e.id} className="animate-in fade-in slide-in-from-bottom-2 rounded-2xl border border-white/10 bg-slate-950/45 p-4 duration-300 hover:border-cyan-300/25 hover:bg-white/10">
                  <p className="text-sm font-bold text-white">{e.claim}</p>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-300">{e.snippet}</p>
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block truncate text-xs font-bold text-cyan-200 hover:text-cyan-100 hover:underline"
                  >
                    {e.url}
                  </a>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500">
                    {e.source_tool} / {Math.round(e.confidence * 100)}% confidence
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
