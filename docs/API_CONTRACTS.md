# API Contracts

This file defines contracts before implementation so the voice agent, dashboard, and backend can be built in parallel.

## Vapi Tool Endpoint

```text
POST /api/vapi/tools
```

Accepts Vapi tool-call payloads. Must support at least:

```json
{
  "message": {
    "type": "tool-calls",
    "toolCallList": [
      {
        "id": "tool_call_id",
        "name": "start_reality_check",
        "arguments": {
          "idea": "string",
          "target_user": "string",
          "current_alternative": "string",
          "why_now": "string",
          "biggest_risk": "string"
        }
      }
    ]
  }
}
```

Responds:

```json
{
  "results": [
    {
      "toolCallId": "tool_call_id",
      "result": {
        "run_id": "run_123",
        "status": "running",
        "spoken_summary": "I am checking competitors, substitutes, pricing, and user pain now."
      }
    }
  ]
}
```

## Create Run

```text
POST /api/runs
```

Request:

```json
{
  "idea": "string",
  "target_user": "string",
  "current_alternative": "string",
  "why_now": "string",
  "biggest_risk": "string",
  "source": "dashboard | vapi | demo"
}
```

Response:

```json
{
  "run_id": "run_123",
  "status": "queued"
}
```

## Get Run

```text
GET /api/runs/:runId
```

Response:

```json
{
  "run_id": "run_123",
  "status": "queued | running | partial | complete | failed | demo_fallback",
  "brief": {},
  "events": [],
  "evidence": [],
  "atlas": null
}
```

## Run Event

```json
{
  "id": "evt_123",
  "run_id": "run_123",
  "type": "created | research_started | evidence_found | synthesis_started | complete | failed",
  "message": "string",
  "sponsor": "vapi | tinyfish | redis | llm | shipables | app",
  "created_at": "iso8601"
}
```

## Evidence

```json
{
  "id": "ev_123",
  "run_id": "run_123",
  "url": "https://example.com",
  "title": "string",
  "snippet": "string",
  "claim": "string",
  "evidence_type": "competitor | substitute | pricing | pain | why_now",
  "confidence": 0.8,
  "source_tool": "tinyfish_search | tinyfish_fetch | tinyfish_agent"
}
```

## Final Atlas Output

```json
{
  "one_line_thesis": "string",
  "score": 72,
  "brutal_truth": "string",
  "promising_wedge": "string",
  "target_icp": "string",
  "competitors": [
    {"name": "string", "url": "string", "notes": "string"}
  ],
  "substitutes": ["string"],
  "risks": ["string"],
  "next_experiment": "string",
  "evidence_ids": ["ev_123"]
}
```

## Error Shape

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "retryable": true
  }
}
```
