"use client";
import { RunEvent, Sponsor } from "@/lib/types";

const SPONSOR_CONFIG: Record<Sponsor, { dot: string; badge: string; label: string }> = {
  vapi:      { dot: "bg-violet-400 shadow-violet-400/60", badge: "bg-violet-300/15 text-violet-200 ring-violet-300/25", label: "Vapi" },
  tinyfish:  { dot: "bg-cyan-400 shadow-cyan-400/60",    badge: "bg-cyan-300/15 text-cyan-200 ring-cyan-300/25",       label: "TinyFish" },
  redis:     { dot: "bg-rose-400 shadow-rose-400/60",    badge: "bg-rose-300/15 text-rose-200 ring-rose-300/25",       label: "Redis" },
  llm:       { dot: "bg-amber-400 shadow-amber-400/60",  badge: "bg-amber-300/15 text-amber-200 ring-amber-300/25",    label: "LLM" },
  shipables: { dot: "bg-lime-400 shadow-lime-400/60",    badge: "bg-lime-300/15 text-lime-200 ring-lime-300/25",       label: "Shipables" },
  app:       { dot: "bg-slate-400 shadow-slate-400/40",  badge: "bg-slate-300/10 text-slate-300 ring-slate-300/20",    label: "App" },
};

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return new Date(iso).toLocaleTimeString();
}

interface Props { events: RunEvent[]; }

export default function EventFeed({ events }: Props) {
  const reversed = [...events].reverse();

  return (
    <div className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.06] shadow-xl shadow-fuchsia-950/20 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <h2 className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Live Event Log</h2>
        {events.length > 0 && (
          <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
            {events.length} events
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4" style={{ maxHeight: 400 }}>
        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
            <span className="text-3xl opacity-30">◌</span>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Waiting for events...</p>
          </div>
        ) : (
          <ol className="relative space-y-0">
            {reversed.map((e, i) => {
              const cfg = SPONSOR_CONFIG[e.sponsor];
              const isFirst = i === 0;
              return (
                <li key={e.id} className="relative flex gap-4 pb-5">
                  {/* Timeline line */}
                  {i < reversed.length - 1 && (
                    <div className="absolute left-[11px] top-6 bottom-0 w-px bg-white/8" />
                  )}
                  {/* Dot */}
                  <div className={`relative z-10 mt-0.5 h-6 w-6 shrink-0 rounded-full shadow-lg ${cfg.dot} ${isFirst ? "animate-pulse" : "opacity-70"}`} />
                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-semibold leading-5 ${isFirst ? "text-white" : "text-slate-300"}`}>{e.message}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase ring-1 ${cfg.badge}`}>{cfg.label}</span>
                      <span className="font-mono text-[10px] text-slate-600">{timeAgo(e.created_at)}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}
