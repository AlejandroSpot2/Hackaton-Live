import { NextResponse } from "next/server";
import { DEMO_RUN } from "@/lib/fixtures";

export async function GET() {
  return NextResponse.json(DEMO_RUN);
}
