# Ideal Hackathon Demo

This file is the north star. RealityCheck Live is being built for a hackathon demo first. If a feature does not make this demo clearer, more reliable, or more impressive, it should wait.

## The Perfect 3-Minute Demo

### 0:00-0:20 - Hook

Say:

> Some of the best startup ideas start as conversations. You are at a bar, walking through SF, or talking with friends, and the idea gets better because someone asks the uncomfortable question. RealityCheck Live captures that moment and gives it an agent with voice, live research, and memory.

Show:

- Dashboard already open.
- Sponsor trace visible: Vapi, TinyFish, Redis, Shipables.
- Empty or ready run state.

### 0:20-0:55 - Voice Intake

Call or web-call the Vapi assistant.

Founder says:

> I want to build a voice-first app that helps first-time founders reality check startup ideas before they waste months building the wrong thing.

The Vapi agent should ask 2-4 sharp questions:

- Who exactly is the first user?
- What do they use today instead?
- Why would they trust this over asking friends or ChatGPT?
- What would make this a bad idea?

The agent should not overtalk. One question at a time. No long speeches.

### 0:55-1:30 - Agent Starts Working

Vapi calls `start_reality_check`.

Dashboard changes from idle to running.

Show progress events:

- Founder brief created.
- Research plan generated.
- TinyFish searching competitors.
- TinyFish fetching source pages.
- Redis storing evidence.
- Synthesis started.

Narration:

> Vapi is the interface, but the backend is doing the work. It turns the conversation into research tasks, TinyFish pulls live market evidence, and Redis stores the run state and source memory.

### 1:30-2:10 - Evidence Appears

Show the evidence feed filling with real source URLs.

Evidence should be grouped by:

- direct competitors
- substitutes
- pricing anchors
- user pain
- why-now signals

The UI should make it obvious that these are not generic LLM guesses.

Ideal visual:

- A source card slides or appears with title, URL, evidence type, and extracted claim.
- The market atlas updates section by section.
- Redis sponsor panel shows counts: events stored, evidence stored, cache hits, memory records.

### 2:10-2:45 - Brutal Truth

The final market atlas appears.

Vapi reads a concise answer:

> Brutal truth: founders do want faster validation, but they do not want another generic pitch deck generator. The wedge is a voice-first cofounder simulation that asks hard questions, researches live evidence, and ends with one next experiment.

Show:

- score
- brutal truth
- strongest wedge
- biggest risk
- next 7-day experiment
- top 3 evidence sources

### 2:45-3:00 - Close

Say:

> This is designed to ship as a skill too. The same workflow can be installed by an agent through Shipables, so RealityCheck Live is both an app and a reusable startup validation capability.

Final sentence:

> It is not a pitch deck generator. It is the conversation before the pitch deck, upgraded with agents.

## What The Demo Must Prove

- Voice is essential, not decorative.
- The agent does real autonomous work after the conversation.
- TinyFish gathers live evidence.
- Redis stores useful state/memory/evidence.
- The final output is specific and opinionated.
- The workflow can become a Shipables skill.

## What The Demo Does Not Need

- Full user auth.
- Payments.
- Multi-tenant data model.
- Perfect mobile responsiveness.
- Long-term memory across many users.
- Full production deployment hardening.
- 20 research sources.
- A landing page.

## Primary Demo Idea

Use this exact idea unless a better one appears:

> A voice-first app that helps first-time founders reality check startup ideas before they waste months building the wrong thing.

Why this seed works:

- It is self-referential in a good way.
- It lets the judges understand the pain quickly.
- It makes Vapi obviously relevant.
- It produces good competitor/substitute research.
- It naturally leads to the "not another pitch deck generator" insight.

## Backup Demo Ideas

### CRE Voice Broker

> A tool that lets commercial real estate brokers describe a client need by voice and instantly get a researched shortlist of matching spaces.

Why it works:

- Connects to existing local repo experience.
- Commercially concrete.
- Good for voice and live web research.

Risk:

- Could feel too domain-specific for broad judges.

### Restaurant Ops Agent

> An AI agent that watches local restaurant reviews, calls suppliers, and suggests menu/pricing changes for small restaurant owners.

Why it works:

- Easy to understand.
- Vapi could be used for calls.

Risk:

- More operational complexity than startup validation.

## Demo Fallback Plan

Always prepare one saved run from the same pipeline.

Fallback assets:

- seeded founder brief
- saved TinyFish evidence
- saved Redis run JSON
- saved final atlas
- Vapi can call `get_reality_check_status` on the seeded run

Fallback wording:

> The live research is still running, but to keep the 3-minute demo tight I am showing a saved run from the same pipeline.

## Vapi Assistant Prompt Draft

You are RealityCheck Live, a sharp but supportive startup reality-check agent. Your job is to help founders think out loud, then trigger live market research and return a concise thesis.

Style:

- Speak like a smart cofounder at a bar, not a consultant.
- Keep responses under 25 words during intake.
- Ask one question at a time.
- Push for clarity on user, pain, alternative, why now, and risk.
- Do not flatter the idea.
- Do not produce a final verdict until backend research returns.

Flow:

1. Ask the founder to explain the idea casually.
2. Ask up to 4 follow-up questions.
3. Call `start_reality_check` when enough context exists.
4. Give short status updates while research runs.
5. Call `get_reality_check_status` until complete.
6. Speak the final verdict in this order: brutal truth, strongest wedge, biggest risk, next experiment.

## Things Not To Say

Avoid:

- "We built a wrapper around APIs."
- "This is like ChatGPT but..."
- "The UI is not done."
- "Imagine if this worked at scale."
- "We would add voice later."

Say instead:

- "Voice is the capture layer for founder intuition."
- "TinyFish gives the agent live web evidence."
- "Redis makes the run state and memory real."
- "The final output is an opinionated next experiment."
