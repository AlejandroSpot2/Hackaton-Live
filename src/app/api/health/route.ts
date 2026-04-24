import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function GET() {
  try {
    await getRedis().ping();
    return NextResponse.json({ status: "ok", redis: "ok", ts: Date.now() });
  } catch {
    return NextResponse.json({
      status: "ok",
      redis: "simulated",
      tinyfish: process.env.TINYFISH_API_KEY ? "ok" : "simulated",
      llm: process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY || process.env.KIMI_API_KEY ? "ok" : "simulated",
      mode: "recording-demo",
      ts: Date.now(),
    });
  }
}
