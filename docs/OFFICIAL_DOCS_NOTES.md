# Official Docs Notes

This file is a hackathon-focused reading of the official docs for the products most likely to matter. It should be treated as implementation guidance, not a replacement for the linked docs.

## Sources Checked

- Devpost: https://ship-to-prod.devpost.com/
- TinyFish overview: https://docs.tinyfish.ai/
- TinyFish quickstart: https://docs.tinyfish.ai/quick-start
- TinyFish authentication: https://docs.tinyfish.ai/authentication
- TinyFish agent endpoints: https://docs.tinyfish.ai/key-concepts/endpoints
- TinyFish runs: https://docs.tinyfish.ai/key-concepts/runs
- TinyFish Search API: https://docs.tinyfish.ai/search-api
- TinyFish Fetch API: https://docs.tinyfish.ai/fetch-api
- Vapi assistant quickstart: https://docs.vapi.ai/assistants/quickstart
- Vapi custom tools: https://docs.vapi.ai/tools/custom-tools
- Vapi squads: https://docs.vapi.ai/squads
- Redis vector search: https://redis.io/docs/latest/develop/ai/search-and-query/vectors/
- Redis vector sets: https://redis.io/docs/latest/develop/data-types/vector-sets/
- RedisVL: https://redis.io/docs/latest/develop/ai/redisvl/
- Shipables creating a skill: https://shipables.dev/docs/publishing/creating-a-skill

## TinyFish

TinyFish has four public API surfaces:

- Agent API: natural-language goals to automate workflows on real sites.
- Search API: structured ranked search results.
- Fetch API: render URLs in a real browser and extract clean page content.
- Browser API: remote browser sessions for direct Playwright/CDP control.

Canonical endpoints:

- Agent: `https://agent.tinyfish.ai/v1/automation/...`
- Search: `GET https://api.search.tinyfish.ai`
- Fetch: `POST https://api.fetch.tinyfish.ai`
- Browser: `POST https://api.browser.tinyfish.ai`

Authentication:

- REST API uses `X-API-Key`.
- SDKs read `TINYFISH_API_KEY` from environment.
- API keys are shown once and should never be committed.

Agent endpoints:

- `/run`: synchronous, simple tasks, can block and cannot be cancelled.
- `/run-async`: returns run id, good for long tasks and polling.
- `/run-sse`: live updates, good for user-facing progress.

Run statuses:

- `PENDING`
- `RUNNING`
- `COMPLETED`
- `FAILED`
- `CANCELLED`

MVP usage:

1. Use Search API for competitor and substitute discovery.
2. Use Fetch API for top 3-5 URLs to extract clean source text.
3. Use Agent API `/run-sse` for one high-impact live automation if time permits.
4. Store every TinyFish result in Redis with source URL and task type.

## Vapi

Vapi assistant quickstart flow:

- Create an assistant in the Vapi dashboard or SDK.
- Add a system prompt.
- Publish and test.
- Attach a phone number for inbound calls or create outbound calls via SDK.

For RealityCheck Live, use Assistants first. Vapi docs note that Workflows are no longer recommended for new builds; use Assistants for most cases or Squads for multi-assistant setups.

Custom tools:

- Dashboard-created tools are recommended for reusable custom API integrations.
- Tool type should be `Function`.
- Tool configuration includes function name, parameters, and server URL.
- Tools can be added to Assistants through the dashboard or API.

Vapi tool request shape:

- Server receives a `message` with type `tool-calls`.
- The message includes `toolCallList` with each tool call id, name, and arguments.

Required server response shape:

```json
{
  "results": [
    {
      "toolCallId": "call_id_from_vapi",
      "result": "tool result or object"
    }
  ]
}
```

MVP Vapi tools:

```json
{
  "name": "start_reality_check",
  "description": "Start a live market reality check for a founder idea.",
  "parameters": {
    "type": "object",
    "properties": {
      "idea": {"type": "string"},
      "target_user": {"type": "string"},
      "current_alternative": {"type": "string"},
      "why_now": {"type": "string"},
      "biggest_risk": {"type": "string"}
    },
    "required": ["idea"]
  }
}
```

```json
{
  "name": "get_reality_check_status",
  "description": "Get progress and final verdict for a RealityCheck Live run.",
  "parameters": {
    "type": "object",
    "properties": {
      "run_id": {"type": "string"}
    },
    "required": ["run_id"]
  }
}
```

Voice guidance:

- Keep intake replies under 25 words.
- Ask one question at a time.
- Use short progress messages during tools.
- Make final output crisp enough to fit the demo.

## Redis

Redis vector search docs say Redis can be used as a high-performance vector database for semantic search over embeddings, with filtering over text, numeric, geospatial, and tag metadata.

Redis vector search supports:

- `FLAT` vector index for smaller datasets or perfect accuracy.
- `HNSW` approximate nearest neighbor index for larger datasets/performance.
- Vectors and metadata stored in hashes or JSON.
- KNN search through `FT.SEARCH` with vector query parameters.

Redis vector sets docs show a newer data type for vector similarity search with commands such as:

- `VADD` to add vectors.
- `VCARD` to count elements.
- `VDIM` to check vector dimension.
- `VEMB` to retrieve embeddings.
- `VSIM` to search similar vectors.
- `VSETATTR` / `VGETATTR` for attributes.
- `FILTER` with `VSIM` for metadata-aware similarity.

RedisVL docs describe RedisVL as a Python client library for Redis vector workflows. It supports vector similarity search, AI framework integration, and low-latency access to vector data.

MVP Redis usage:

1. Run state and status.
2. Event timeline.
3. Evidence store.
4. Final atlas store.
5. Search/fetch cache.

Stretch Redis usage:

1. Semantic cache for repeated TinyFish or LLM questions.
2. Vector search over evidence.
3. Vector sets for similar idea/evidence recall.
4. Redis Insight as demo proof.

## Shipables

Shipables is a registry for Agent Skills. The docs describe a good skill as focused on one domain, actionable, example-driven, and able to declare MCP tools where relevant.

Minimum required files:

- `SKILL.md`
- `shipables.json`

Recommended structure:

```text
my-skill/
  SKILL.md
  shipables.json
  .shipablesignore
  scripts/
  references/
  assets/
```

`SKILL.md` needs YAML frontmatter. Required fields include:

- `name`
- `description`

Publishing flow:

```bash
shipables login
shipables publish --dry-run
shipables publish
```

## Decisions From Docs

- Use Vapi Assistants, not Workflows, for the main build.
- Use Vapi custom tools with a single backend endpoint for simplicity.
- Use TinyFish Search + Fetch as the reliable MVP; Agent API SSE is stretch.
- Use Redis for plain state first; vector/semantic memory is stretch if time remains.
- Create the Shipables skill directory early enough to avoid submission panic.
