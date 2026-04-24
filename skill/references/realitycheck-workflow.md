# RealityCheck Live Agent Workflow

## Overview

RealityCheck Live turns a spoken startup pitch into a source-cited market thesis using a five-lane research pipeline.

## Eight-Step Agent Loop

### Step 1: Voice Intake With Vapi

- Founder calls or uses the web call interface.
- Vapi asks for idea, target user, current alternative, why now, and biggest risk.
- Keep each response under 25 words.
- Vapi calls `start_reality_check` once enough context is gathered.

### Step 2: Normalize To FounderBrief

- `POST /api/vapi/tools` receives the tool call.
- Parse args with `FounderBriefSchema.partial()`.
- Only `idea` is required.
- Create a structured FounderBrief object.

### Step 3: Create Run And Store State

- Generate `run_${nanoid(10)}`.
- `createRun()` writes run metadata with status `queued`.
- Append a `created` event.
- Return `run_id` to Vapi immediately.

### Step 4: Background Research With TinyFish

- Trigger via `after()` after the HTTP response is sent.
- Run five lanes concurrently:
  1. Competitors
  2. Substitutes
  3. Pain signals
  4. Pricing
  5. Why-now signals
- Per lane: TinyFish Search, then TinyFish Fetch for high-value URLs.

### Step 5: Store Evidence

- Store each Evidence object.
- Append `evidence_found` events with sponsor `tinyfish`.
- In live mode, persist to Redis with 24h TTL.
- In demo mode, use in-memory fallback and fixture evidence.

### Step 6: LLM Synthesis

- Load run and evidence.
- Call the configured LLM provider.
- Parse output with `MarketAtlasSchema.safeParse()`.
- On failure, build deterministic fallback atlas.

### Step 7: Store Atlas

- Store final MarketAtlas.
- Set run status to `complete`.
- Append a `complete` event.

### Step 8: Dashboard And Voice Response

- Frontend polls `GET /api/runs/:runId`.
- Dashboard shows event timeline, evidence feed, sponsor trace, and Market Atlas.
- Vapi reads an 80-word spoken summary.

## Redis Key Schema

```text
rcl:run:{runId}              -> JSON { run_id, status, brief }
rcl:run:{runId}:events       -> list of JSON RunEvent strings
rcl:run:{runId}:evidence     -> list of evidence ID strings
rcl:evidence:{evidenceId}    -> JSON Evidence object
rcl:run:{runId}:atlas        -> JSON MarketAtlas
rcl:cache:search:{hash}      -> cached TinyFish search result
```

## Failure Modes

| Failure | Behavior |
|---------|----------|
| TinyFish unavailable | Return fixture evidence and continue |
| TinyFish timeout | Abort after timeout, continue other lanes |
| LLM synthesis fails | Retry if possible, then use deterministic fallback atlas |
| Redis unavailable | Use in-memory fallback for demo and health reports `simulated` |
| Vapi format mismatch | Support both `toolCallList[]` and `toolCalls[].function` formats |
| Vapi non-200 response risk | Always return HTTP 200 and include errors in `result` |

## Recording Demo Sequence

The `?demo=recording` route animates this sequence:

1. Vapi captures spoken idea.
2. Vapi asks a hard follow-up question.
3. Founder brief is created.
4. TinyFish launches five research lanes.
5. Competitor evidence appears.
6. Redis storage event appears.
7. Substitute and why-now evidence appear.
8. LLM synthesis starts.
9. Shipables package event appears.
10. Vapi speaks final verdict.
