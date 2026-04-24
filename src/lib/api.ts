import { Run, FounderBrief } from "./types";

export async function createRun(brief: FounderBrief & { source: string }): Promise<{ run_id: string }> {
  const res = await fetch(`/api/runs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(brief),
  });
  if (!res.ok) throw new Error("Failed to create run");
  return res.json();
}

export async function getRun(runId: string): Promise<Run> {
  const res = await fetch(`/api/runs/${runId}`);
  if (!res.ok) throw new Error("Failed to fetch run");
  return res.json();
}

// Polls every 2s until status is terminal or maxAttempts reached
export function pollRun(
  runId: string,
  onUpdate: (run: Run) => void,
  onError: (err: Error) => void,
  intervalMs = 2000,
  maxAttempts = 60
): () => void {
  let attempts = 0;
  let stopped = false;

  const TERMINAL = new Set(["complete", "failed", "demo_fallback"]);

  const tick = async () => {
    if (stopped) return;
    try {
      const run = await getRun(runId);
      onUpdate(run);
      if (TERMINAL.has(run.status) || ++attempts >= maxAttempts) return;
    } catch (e) {
      onError(e as Error);
    }
    if (!stopped) setTimeout(tick, intervalMs);
  };

  tick();
  return () => { stopped = true; };
}
