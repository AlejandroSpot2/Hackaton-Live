"use client";

import { useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

type CallStatus = "idle" | "connecting" | "active" | "ended";

interface Props {
  onRunCreated: (runId: string) => void;
}

interface ToolCallResult {
  name?: string;
  result?: {
    run_id?: string;
  };
}

interface VapiMessage {
  toolCallList?: ToolCallResult[];
  results?: ToolCallResult[];
  message?: {
    toolCallList?: ToolCallResult[];
    results?: ToolCallResult[];
  };
}

export default function VapiButton({ onRunCreated }: Props) {
  const [status, setStatus] = useState<CallStatus>("idle");
  const vapiRef = useRef<Vapi | null>(null);

  function handleMessage(message: VapiMessage) {
    const toolCalls = [
      ...(message.toolCallList ?? []),
      ...(message.results ?? []),
      ...(message.message?.toolCallList ?? []),
      ...(message.message?.results ?? []),
    ];

    const runId = toolCalls.find((toolCall) => toolCall.name === "start_reality_check")?.result?.run_id;
    if (runId) onRunCreated(runId);
  }

  async function startCall() {
    const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;

    if (!publicKey || !assistantId) return;

    setStatus("connecting");
    const vapi = new Vapi(publicKey);
    vapiRef.current = vapi;

    vapi.on("call-start", () => setStatus("active"));
    vapi.on("call-end", () => setStatus("ended"));
    vapi.on("message", handleMessage);
    vapi.on("error", () => setStatus("ended"));

    try {
      await vapi.start(assistantId);
    } catch {
      setStatus("ended");
    }
  }

  function endCall() {
    vapiRef.current?.stop();
    setStatus("ended");
  }

  const isActive = status === "active";
  const isConnecting = status === "connecting";
  const label = isActive ? "Stop live call" : isConnecting ? "Connecting..." : status === "ended" ? "Start again" : "Start voice check";
  const buttonClass = isActive
    ? "w-full animate-pulse rounded-2xl border border-rose-300/40 bg-gradient-to-r from-rose-500 to-fuchsia-600 px-6 py-5 text-base font-black uppercase tracking-[0.18em] text-white shadow-2xl shadow-rose-500/30 transition hover:from-rose-400 hover:to-fuchsia-500"
    : isConnecting
      ? "w-full cursor-wait rounded-2xl border border-cyan-300/25 bg-white/10 px-6 py-5 text-base font-black uppercase tracking-[0.18em] text-cyan-100 shadow-xl shadow-cyan-500/10"
      : status === "ended"
        ? "w-full rounded-2xl border border-fuchsia-300/30 bg-white/10 px-6 py-5 text-base font-black uppercase tracking-[0.18em] text-fuchsia-100 shadow-xl shadow-fuchsia-500/10 transition hover:bg-white/15"
        : "w-full rounded-2xl border border-cyan-200/40 bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-lime-300 px-6 py-5 text-base font-black uppercase tracking-[0.18em] text-[#070A18] shadow-2xl shadow-cyan-500/30 transition hover:scale-[1.01] hover:shadow-fuchsia-500/30";

  return (
    <button
      type="button"
      onClick={isActive ? endCall : startCall}
      disabled={isConnecting}
      className={buttonClass}
    >
      {label}
    </button>
  );
}
