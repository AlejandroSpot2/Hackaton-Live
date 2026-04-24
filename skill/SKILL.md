---
name: realitycheck-live
description: Voice-first startup idea validation workflow. Use when an agent needs to interview a founder, start a RealityCheck Live run, gather market evidence, store progress, and return a scored Market Atlas with risks and next experiments.
license: MIT
compatibility: Works with the RealityCheck Live Next.js app. Live mode requires network access, a public HTTPS app URL, Vapi, TinyFish, Redis, and one LLM provider. Demo mode can run without external services.
metadata:
  author: alejandrospot2
  version: "1.0.0"
---

# RealityCheck Live

RealityCheck Live turns a founder's spoken startup idea into a source-cited market thesis. The agent should behave like a sharp cofounder: ask short follow-up questions, start research, track evidence, and return a clear verdict.

## Core Workflow

1. Capture the idea through voice or text.
2. Ask only the missing essentials: target user, current alternative, why now, and biggest risk.
3. Call `start_reality_check` once the idea is clear.
4. Poll `get_reality_check_status` or `GET /api/runs/:runId`.
5. Show progress events grouped by sponsor: Vapi, TinyFish, Redis, LLM, Shipables.
6. Return a Market Atlas with score, brutal truth, wedge, ICP, competitors, substitutes, risks, evidence IDs, and a 7-day next experiment.
7. Keep spoken responses short. During intake, stay under 25 words per response.

## Repository Entry Points

- Frontend dashboard: `src/app/dashboard/page.tsx`
- Run view and recording demo: `src/app/dashboard/[runId]/page.tsx`
- Vapi tool endpoint: `src/app/api/vapi/tools/route.ts`
- Run API: `src/app/api/runs/route.ts` and `src/app/api/runs/[runId]/route.ts`
- Pipeline: `src/lib/research-pipeline.ts`
- Redis store: `src/lib/run-store.ts`
- TinyFish adapter: `src/lib/tinyfish.ts`
- LLM synthesis: `src/lib/synthesis.ts`
- Fixtures and recording data: `src/lib/fixtures.ts`

## Operating Modes

### Live Mode

Use live mode when environment variables are configured:

- `APP_BASE_URL`: public HTTPS URL for Vapi tool calls
- `VAPI_API_KEY` and Vapi assistant/public keys
- `TINYFISH_API_KEY`
- `REDIS_URL`
- one of `OPENAI_API_KEY`, `GROQ_API_KEY`, or `KIMI_API_KEY`

The pipeline should use TinyFish for source discovery, Redis for run state and evidence, and the LLM provider for synthesis.

### Recording Demo Mode

Use recording mode when external services are unavailable or unreliable. Open:

```text
/dashboard/run_demo_001?demo=recording
```

This mode animates the full sponsor story: Vapi intake, TinyFish evidence, Redis storage, LLM synthesis, Shipables packaging, and final verdict. Use it for demo recordings and judging if live APIs fail.

### Fixture Mode

Set `DEMO_MODE=true` to return seeded fixture data from `src/lib/fixtures.ts`.

## API Usage Examples

Create a run:

```bash
curl -X POST "$APP_BASE_URL/api/runs" \
  -H "Content-Type: application/json" \
  -d '{"idea":"voice startup validator","target_user":"first-time founders","current_alternative":"asking friends"}'
```

Check status:

```bash
curl "$APP_BASE_URL/api/runs/run_demo_001"
```

Call the Vapi tool endpoint:

```bash
curl -X POST "$APP_BASE_URL/api/vapi/tools" \
  -H "Content-Type: application/json" \
  -d '{"message":{"type":"tool-calls","toolCallList":[{"id":"tc_1","name":"start_reality_check","arguments":{"idea":"voice startup validator","target_user":"first-time founders"}}]}}'
```

## Agent Rules

- Do not produce a final verdict until the run is complete or a deterministic fallback is used.
- Do not invent source evidence. If live research is unavailable, say demo/fixture evidence is being used.
- Always preserve `toolCallId` in Vapi responses.
- Always return HTTP 200 from `/api/vapi/tools`; put failures inside the result body to prevent Vapi retries.
- Prefer concrete next experiments over generic advice.
- Keep final spoken summaries under 80 words.
- Treat Redis as the source of truth in live mode; use in-memory fallback only for demos.

## References

Load these only when needed:

- `references/api-contracts.md`: endpoint payloads, response shapes, and Vapi tool definitions.
- `references/demo-prompts.md`: assistant prompt, TinyFish query templates, score rubric, and curl checks.
- `references/realitycheck-workflow.md`: full eight-step pipeline and Redis key schema.
