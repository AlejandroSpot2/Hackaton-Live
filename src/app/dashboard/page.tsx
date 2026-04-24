"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DEMO_RUN, RUNNING_RUN } from "@/lib/fixtures";
import VapiButton from "@/components/VapiButton";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    idea: "",
    target_user: "",
    current_alternative: "",
    why_now: "",
    biggest_risk: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/runs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "dashboard" }),
      });
      if (res.ok) {
        const { run_id } = await res.json();
        router.push(`/dashboard/${run_id}`);
      } else {
        router.push(`/dashboard/${DEMO_RUN.run_id}?demo=true`);
      }
    } catch {
      router.push(`/dashboard/${DEMO_RUN.run_id}?demo=true`);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <section className="mb-8">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-cyan-200/70">Voice Intake</p>
        <div className="rounded-[2rem] border border-white/15 bg-white/[0.07] p-6 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
          <div className="mb-5 border-l-4 border-cyan-300 pl-4">
            <h1 className="text-3xl font-black tracking-tight text-white">Validate the idea before it wastes your weekend.</h1>
            <p className="mt-2 text-sm leading-6 text-slate-300">Talk to Vapi. It captures the founder brief, starts research, and sends you straight to the live market readout.</p>
          </div>
          <VapiButton onRunCreated={(runId) => router.push(`/dashboard/${runId}`)} />
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Stat label="Avg research time" value="28s" tone="cyan" />
            <Stat label="Evidence sources" value="5-12" tone="fuchsia" />
            <Stat label="Accuracy score" value="0-100" tone="lime" />
          </div>
        </div>
      </section>

      <div className="mb-7 text-center">
        <button
          type="button"
          onClick={() => setShowForm((value) => !value)}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-300 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-cyan-100"
        >
          {showForm ? "Hide manual form" : "I prefer to type it manually"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 space-y-5 rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-5 shadow-xl shadow-fuchsia-950/20 backdrop-blur">
          <Field
            label="What's the idea?"
            placeholder="A voice agent that validates startup ideas in real time..."
            value={form.idea}
            onChange={(v) => setForm((f) => ({ ...f, idea: v }))}
            required
          />
          <Field
            label="Who's the target user?"
            placeholder="Early-stage founders before they write their first line of code"
            value={form.target_user}
            onChange={(v) => setForm((f) => ({ ...f, target_user: v }))}
            required
          />
          <Field
            label="What do they do today instead?"
            placeholder="Ask friends, post on Twitter, hire consultants"
            value={form.current_alternative}
            onChange={(v) => setForm((f) => ({ ...f, current_alternative: v }))}
          />
          <Field
            label="Why now?"
            placeholder="LLMs make real-time synthesis cheap; founders waste months on bad ideas"
            value={form.why_now}
            onChange={(v) => setForm((f) => ({ ...f, why_now: v }))}
          />
          <Field
            label="Biggest risk?"
            placeholder="Founders ignore brutal feedback and build anyway"
            value={form.biggest_risk}
            onChange={(v) => setForm((f) => ({ ...f, biggest_risk: v }))}
          />

          <button
            type="submit"
            disabled={!form.idea || loading}
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-lime-300 px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-[#070A18] shadow-xl shadow-cyan-500/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Starting analysis..." : "Run Reality Check"}
          </button>
        </form>
      )}

      <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-slate-400">Demo Shortcuts</p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => router.push(`/dashboard/${DEMO_RUN.run_id}?demo=true`)}
            className="rounded-full border border-cyan-300/35 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100 transition hover:bg-cyan-300/20"
          >
            View completed run
          </button>
          <button
            onClick={() => router.push(`/dashboard/${RUNNING_RUN.run_id}?demo=running`)}
            className="rounded-full border border-fuchsia-300/35 bg-fuchsia-300/10 px-4 py-2 text-sm font-bold text-fuchsia-100 transition hover:bg-fuchsia-300/20"
          >
            View running run
          </button>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "cyan" | "fuchsia" | "lime" }) {
  const toneClass = {
    cyan: "border-cyan-300/25 bg-cyan-300/10 text-cyan-200",
    fuchsia: "border-fuchsia-300/25 bg-fuchsia-300/10 text-fuchsia-200",
    lime: "border-lime-300/25 bg-lime-300/10 text-lime-200",
  }[tone];

  return (
    <div className={`rounded-2xl border p-4 ${toneClass}`}>
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-70">{label}</p>
      <p className="mt-1 text-2xl font-black">{value}</p>
    </div>
  );
}

function Field({
  label, placeholder, value, onChange, required,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-cyan-100/70">{label}</label>
      <textarea
        rows={2}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full resize-none rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20"
      />
    </div>
  );
}
