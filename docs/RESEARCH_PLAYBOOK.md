# Research Playbook

This file defines how RealityCheck Live should turn a spoken startup idea into useful evidence.

## Research Principles

- Prefer current, source-linked evidence over generic advice.
- Search for substitutes, not only direct competitors.
- Look for willingness-to-pay signals.
- Look for pain intensity and workflow urgency.
- Look for distribution channels and communities.
- Treat missing evidence as a signal.
- Keep final claims tied to URLs.

## Research Lanes

### Competitors

Goal: find direct products that already solve the problem.

Example TinyFish Search query:

```text
<idea> startup validation voice agent competitors pricing
```

Evidence to extract:

- product name
- target customer
- positioning
- pricing
- differentiator
- URL

### Substitutes

Goal: find what users do today instead.

Example query:

```text
how do <target_user> validate startup ideas today reddit product hunt indie hackers
```

Evidence to extract:

- workflow
- pain points
- manual tools
- communities
- switching barriers

### Pain And Demand

Goal: find real complaints and urgency.

Example query:

```text
<target_user> wasted months building wrong startup idea problem validation
```

Evidence to extract:

- repeated complaint patterns
- urgency level
- willingness to pay
- relevant quote/snippet

### Pricing And Business Model

Goal: understand existing price anchors.

Example query:

```text
startup idea validation software pricing founder coaching AI market research pricing
```

Evidence to extract:

- free vs paid
- monthly price
- enterprise angle
- service vs software

### Why Now

Goal: find market timing signals.

Example query:

```text
voice AI agents founders market research trend 2026
```

Evidence to extract:

- new technology shifts
- behavior changes
- ecosystem changes
- regulatory or platform tailwinds

## Evidence Scoring

Score each evidence item from 0 to 1.

High relevance:

- Directly mentions the target user or use case.
- Includes pricing or adoption signal.
- Comes from product page, docs, review, community post, or credible article.
- Helps answer competitor, pain, substitute, or why-now question.

Low relevance:

- Generic AI article.
- No connection to target user.
- No source URL.
- Thin snippet without usable claim.

## Synthesis Prompt Shape

```text
You are a brutally honest startup validation analyst.
Given the founder brief and source-linked evidence, produce a concise market atlas.
Do not flatter the founder.
Every major claim must be supported by an evidence id.
If evidence is weak, say so clearly.
Return strict JSON matching the schema.
```

## Final Verdict Rubric

Score 0-100:

- 0-20: no clear user or pain.
- 21-40: real pain but crowded or weak wedge.
- 41-60: plausible niche but needs sharper user or distribution.
- 61-80: strong wedge with evidence and testable demand.
- 81-100: urgent pain, clear buyer, credible wedge, strong timing.

Brutal truth should answer:

- Why might this fail?
- What is generic about the current idea?
- What must be narrowed?

Next experiment should be:

- doable in 7 days
- tied to the highest-risk assumption
- measurable
- not just "talk to users"
