# RealityCheck Live

RealityCheck Live is a hackathon-scope voice-first startup reality check agent.

The thesis: the best startup ideas usually do not start in forms, pitch decks, or sterile market research workflows. They start as conversations: explaining the idea to a friend, getting interrupted by a sharp question, defending the user problem out loud, and discovering the real wedge while talking. RealityCheck Live turns that messy early conversation into an agentic market validation loop.

The user talks to a Vapi voice agent as if they were pitching a friend or a potential cofounder. The agent interviews them, identifies unknowns, launches live web research with TinyFish, stores evidence and conversation memory in Redis, and produces a brutally honest market thesis with a focused next experiment.

## Hackathon Positioning

RealityCheck Live is not a pitch deck generator. It is the conversation before the pitch deck, upgraded with voice, live web research, memory, and autonomous agent loops.

Core demo line:

> Everyone says your best startup ideas come from late-night conversations with friends. RealityCheck Live captures that spark, turns it into a live voice debate, researches the market in real time, and gives you a brutally honest startup thesis before the night ends.

## Demo-First Scope

This is a hackathon project, not a full product yet. The whole build should optimize for one excellent 3-minute demo.

Ideal demo path:

1. Founder speaks a startup idea into Vapi.
2. Vapi asks 2-4 sharp cofounder-style follow-up questions.
3. The dashboard creates a live run and shows progress.
4. TinyFish searches and fetches real market evidence.
5. Redis stores the run state, progress events, and evidence.
6. The final market atlas appears with a brutal truth, wedge, risk, and next experiment.
7. Vapi reads the final verdict back in a concise voice response.
8. The repo includes a Shipables skill package so the workflow can be reused by agents.

If a feature does not make this demo stronger, defer it.

## Target Sponsor Tracks

Primary tracks:

- Best Use of Vapi: voice is the main product surface, not a side feature.
- Best Use of TinyFish: live market evidence comes from web search, fetch, and targeted agent runs.
- Best Agent Using Redis: Redis is the real-time memory, evidence store, job state layer, and semantic recall layer.

Required hackathon alignment:

- Use at least 3 sponsor tools.
- Publish the project as a skill on Shipables.
- Submit a public GitHub repo.
- Demo in 3 minutes.

## What We Need To Build

Recommended stack:

- Next.js app for dashboard and API routes, or Vite + Express if speed matters more.
- Vapi assistant with custom tools pointing to public HTTPS backend endpoints.
- Redis Cloud or local Redis Stack for run state, evidence, cache, and memory.
- TinyFish SDK or REST calls for search/fetch/agent research.
- LLM provider for synthesis and structured outputs.
- Shipables skill folder under `skill/` for submission.

Minimum viable UI:

- Header with run status and call state.
- Left column: founder brief and voice transcript highlights.
- Main area: market atlas sections.
- Right rail: live evidence feed with source URLs.
- Bottom: final verdict and next experiment.

## Success Criteria

Demo success means:

- The audience immediately understands why voice matters.
- The agent asks non-obvious follow-up questions.
- The dashboard visibly updates while research runs.
- Evidence includes real URLs from TinyFish.
- Redis is not cosmetic: we can show stored run state, evidence, memory, or semantic cache.
- The final answer is opinionated, not generic.
- The project can be explained in under 30 seconds and demoed in under 3 minutes.

## Repo Inspiration

Use these repos as inspiration only. Devpost says no previous projects, so do not copy a prior project as the hackathon submission.

- `C:\Users\alejo\Documents\Repos\Hackaton-Market`: market atlas UI and startup validation framing.
- `C:\Users\alejo\Documents\Repos\SocietySimOs`: persona/panel simulation and product-reaction workflow.
- `C:\Users\alejo\Documents\Repos\news_bot`: autonomous research loop pattern.
- `C:\Users\alejo\Documents\Repos\Hackaton-News`: multimodal/source-cited agent polish and hackathon packaging.
- `C:\Users\alejo\Documents\Repos\ground-control`: skill/reference packaging pattern.
- `C:\Users\alejo\Documents\Repos\spot2-claude-connector`: tool contract and deployable connector discipline.

## Suggested First Build Order

1. Build dashboard shell with fixture data.
2. Build backend run model and Redis persistence.
3. Add TinyFish research adapter with one reliable search/fetch path.
4. Add synthesis endpoint with structured JSON output.
5. Create Vapi assistant and custom tools.
6. Wire live progress into the dashboard.
7. Add Shipables skill package.
8. Rehearse and trim the 3-minute demo.

## Links

- Devpost: https://ship-to-prod.devpost.com/
- TinyFish docs: https://docs.tinyfish.ai/
- Vapi docs: https://docs.vapi.ai/
- Redis vector search docs: https://redis.io/docs/latest/develop/ai/search-and-query/vectors/
- RedisVL docs: https://redis.io/docs/latest/develop/ai/redisvl/
- Shipables docs: https://shipables.dev/docs/publishing/creating-a-skill
