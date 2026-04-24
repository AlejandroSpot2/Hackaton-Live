# Product Decisions

This file captures early decisions so the next thread can move straight into implementation.

## Decision 1: Voice Is The Primary Interface

Status: accepted

Reason:

The product thesis depends on the idea that startup insight comes from conversation. Vapi should be the front door, not a bolted-on demo step.

## Decision 2: Optimize For The Ideal Demo

Status: accepted

Reason:

This is a hackathon project. The goal is a memorable 3-minute working demo, not a complete SaaS product. Build the shortest path to the demo in `DEMO.md`.

## Decision 3: TinyFish Search + Fetch First

Status: accepted

Reason:

Search and Fetch are the most reliable path to source-linked evidence within a short sprint. TinyFish Agent API with SSE is valuable as stretch, especially for visual progress, but should not block MVP.

## Decision 4: Redis Must Be Visible

Status: accepted

Reason:

The Redis track requires meaningful use. Redis should hold run state, progress, evidence, final atlas, and maybe semantic recall. The dashboard should expose this in a sponsor trace or debug panel.

## Decision 5: Dashboard Is A Work Surface, Not A Landing Page

Status: accepted

Reason:

Judges need to see the agent working. Build the run dashboard first: status, evidence, atlas, verdict.

## Decision 6: Build With Fixture Fallbacks

Status: accepted

Reason:

Live APIs can be slow during a demo. The app should always be able to show a saved run from the same schema.

## Decision 7: Shipables Skill Is Part Of The Product

Status: accepted

Reason:

Devpost requires publishing the project as a skill. Treat the skill as a reusable agent capability: run a startup reality check from voice intake to source-cited market thesis.
