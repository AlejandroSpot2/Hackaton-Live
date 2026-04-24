# Shipables Skill Plan

RealityCheck Live should include a Shipables-ready skill package before submission.

## Goal

Create a reusable agent skill that teaches coding agents how to run a voice-first startup reality check using Vapi, TinyFish, Redis, and the RealityCheck Live API.

## Folder Structure

```text
skill/
  SKILL.md
  shipables.json
  .shipablesignore
  references/
    workflow.md
    api-contracts.md
    prompt-patterns.md
```

## Skill Name

Recommended: `realitycheck-live`

## SKILL.md Frontmatter Draft

```yaml
---
name: realitycheck-live
description: Run a voice-first startup idea reality check with live web research, Redis memory, and Vapi tool calls.
license: MIT
compatibility: Requires network access, TinyFish API key, Vapi API key, Redis, and a public HTTPS endpoint for Vapi tools.
metadata:
  author: alejandrospot2
  version: "1.0.0"
---
```

## Skill Body Outline

```markdown
# RealityCheck Live

## When To Use
Use this skill when a founder wants to turn a spoken startup idea into a source-cited market thesis.

## Workflow
1. Interview the founder.
2. Create a founder brief.
3. Launch TinyFish research.
4. Store run state and evidence in Redis.
5. Synthesize a market atlas.
6. Return a brutal truth and next experiment.

## Required Tools
- Vapi assistant and custom tools.
- TinyFish Search/Fetch/Agent APIs.
- Redis state and memory.

## Common Mistakes
- Do not generate generic advice without sources.
- Do not skip substitutes.
- Do not let voice responses become long.
```

## shipables.json Draft

```json
{
  "version": "1.0.0",
  "keywords": ["startup", "market-research", "voice-agent", "vapi", "tinyfish", "redis"],
  "categories": ["agents", "market-research", "product"],
  "author": {
    "name": "Alejandro",
    "github": "alejandrospot2"
  },
  "config": {
    "env": [
      {
        "name": "TINYFISH_API_KEY",
        "description": "TinyFish API key for live web research.",
        "required": true,
        "secret": true
      },
      {
        "name": "VAPI_API_KEY",
        "description": "Vapi API key for voice assistant setup and calls.",
        "required": true,
        "secret": true
      },
      {
        "name": "REDIS_URL",
        "description": "Redis connection URL for run state and memory.",
        "required": true,
        "secret": true
      }
    ]
  }
}
```

## Publishing Checklist

- [ ] `skill/SKILL.md` exists.
- [ ] `skill/shipables.json` exists.
- [ ] `.shipablesignore` excludes `.env`, `node_modules`, build artifacts, logs.
- [ ] References include API contracts and prompt patterns.
- [ ] `shipables publish --dry-run` passes.
- [ ] `shipables publish` completed or ready for submission.
