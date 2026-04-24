# Hackathon Notes

Source: https://ship-to-prod.devpost.com/

## Event

Name: Ship to Prod - Agentic Engineering Hackathon

Date: April 24, 2026

Location: AWS Builder Loft

Team size: max 4

## Schedule

- 9:30 AM: Doors open
- 10:00 AM: Keynote and opening remarks
- 11:00 AM: Start coding
- 1:30 PM: Lunch
- 4:30 PM: Project submission deadline
- 5:00 PM: Finalist presentations and judging
- 7:00 PM: Awards ceremony

Important: hacking starts at 11:00 AM PT and ends at 4:30 PM PT on April 24, 2026. Late submissions are cut off.

## Submission Requirements

- 3-minute demo recording plus Devpost details.
- Public GitHub repo.
- Publish the project as a skill to Shipables.dev.
- Use at least 3 sponsor tools to build the agent.

## Rules To Keep In Mind

- No previous projects allowed.
- GitHub repo must be submitted.
- Bring government-issued photo ID.
- Register on AWS with full name.
- Participants must be 18+.

## Judging Criteria

Each category is 20%.

### Autonomy

Question: How well does the agent act on real-time data without manual intervention?

RealityCheck Live answer:

- The agent decides what follow-up questions are needed.
- The backend decomposes the idea into research tasks.
- TinyFish pulls live evidence without manual browsing.
- The agent loops if evidence is thin or conflicting.
- The final thesis is generated from the conversation plus evidence.

### Idea

Question: Does the solution have the potential to solve a meaningful problem or demonstrate real-world value?

RealityCheck Live answer:

- Founders waste time building ideas that fail basic market checks.
- Forms lose the messy insight that comes from talking through an idea.
- Voice lowers friction and captures the founder spark early.
- The product gives a fast, honest thesis and next experiment.

### Technical Implementation

Question: How well was the solution implemented?

RealityCheck Live answer:

- Clear architecture: Vapi voice interface, API orchestrator, TinyFish research, Redis memory/state, dashboard, skill package.
- Structured data contracts for runs, evidence, and final atlas.
- Real-time progress updates.
- Graceful fallbacks for API slowness.
- Repo is clean enough for judges to inspect.

### Tool Use

Question: Did the solution effectively use at least 3 sponsor tools?

RealityCheck Live answer:

- Vapi is the main voice interface and tool-calling surface.
- TinyFish performs live web research and page extraction.
- Redis stores state, evidence, memory, semantic cache, and/or vector recall.
- Shipables packages the workflow as an agent skill.

### Presentation

Question: Can the solution be demonstrated in 3 minutes?

RealityCheck Live answer:

- Start with the bar/cofounder conversation story.
- Call the agent live.
- Speak one concise startup idea.
- Show the dashboard updating.
- Show evidence URLs.
- End with the brutal truth and next experiment.

## Prize Tracks We Care About

### Best Use of TinyFish

Prize details from Devpost:

- 2 winners
- 1st prize: MacMini to each member of the team plus $300 TinyFish credits
- 2nd prize: $1000 cash plus $300 TinyFish credits

How to optimize:

- Show TinyFish doing real live research, not a toy request.
- Use Search for discovery, Fetch for clean page content, and Agent API for harder targeted workflows if time permits.
- Surface run URLs, source URLs, and evidence quality in the UI.

### Best Agent Using Redis

Prize details from Devpost:

- 1 winner
- AirPods Pros, 10k Redis Cloud credits, Redis hoodies

How to optimize:

- Redis should be visible in architecture and demo.
- Store run state and progress in Redis.
- Store evidence objects keyed by run.
- Use semantic cache or vector recall for similar ideas/evidence if feasible.
- Show Redis Insight or a small debug panel with Redis-backed data.

### Best Use of Vapi

Prize details from Devpost:

- 2 winners
- Best voice AI agent built with Vapi: $500 Vapi credits and AirPods for each team member
- Most commercially viable voice agent built on Vapi: $1,500 Vapi credits

How to optimize:

- Make the voice conversation the product, not a demo gimmick.
- Configure custom tools so the assistant can start and check reality checks.
- Keep assistant responses short and conversational.
- Let the agent interrupt with useful founder questions.

## Optional Tracks

Consider only after the core path works:

- Ghost: publish final market memo as a Ghost draft/post.
- Senso: verified knowledge ingestion if quick.
- WunderGraph: typed API composition if useful.
- InsForge: backend/auth/database if fast to integrate.
- Nexla: data pipeline if demo leans into market datasets.

## Demo Constraints

Demo time: 3 minutes.

Do not spend demo time on:

- Account setup.
- Explaining every API call.
- Long screenshots of docs.
- Generic market research claims.
- Waiting silently for slow web calls.

Must show:

- Voice intake.
- Autonomous research progress.
- Real sources.
- Final verdict.
- Sponsor tools working together.
