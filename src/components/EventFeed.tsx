"use client";
import { RunEvent, Sponsor } from "@/lib/types";

const SPONSOR_BADGE: Record<Sponsor, string> = {
  vapi:      "bg-violet-300/20 text-violet-200 ring-violet-300/30",
  tinyfish:  "bg-cyan-300/20 text-cyan-200 ring-cyan-300/30",
  redis:     "bg-rose-300/20 text-rose-200 ring-rose-300/30",
  llm:       "bg-amber-300/20 text-amber-200 ring-amber-300/30",
  shipables: "bg-lime-300/20 text-lime-200 ring-lime-300/30",
  app:       "bg-slate-300/10 text-slate-200 ring-slate-300/20",
};

const SPONSOR_ABBR: Record<Sponsor, string> = {
  vapi: "VA",
  tinyfish: "TF",
  redis: "RD",
  llm: "LM",
  shipables: "SH",
  app: "AP",
};

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return new Date(iso).toLocaleTimeString();
}

interface Props { events: RunEvent[]; }

export default function EventFeed({ events }: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.07] shadow-xl shadow-fuchsia-950/20 backdrop-blur-xl">
      <div className="border-b border-white/10 px-5 py-3">
        <h2 className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Live Event Log</h2>
      </div>
      <div className="px-5 py-5">
        {events.length === 0 ? (
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Waiting for events...</p>
        ) : (
          <ol className="space-y-4">
            {[...events].reverse().map((e) => (
              <li key={e.id} className="flex items-start gap-3">
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-mono text-[10px] font-black ring-1 ${SPONSOR_BADGE[e.sponsor]}`}>
                  {SPONSOR_ABBR[e.sponsor]}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">{e.message}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500">{e.sponsor} / {timeAgo(e.created_at)}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
