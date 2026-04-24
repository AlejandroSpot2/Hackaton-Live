# Contributing

This repo is intentionally starting from planning docs only. The first development pass should pick a stack and add the app skeleton in a focused pull request.

## Local Start

1. Clone the repo.
2. Copy `.env.example` to `.env`.
3. Fill in only the keys needed for the part you are building.
4. Create a feature branch before adding implementation code.

## Branches

Use short branch names:

```text
feat/dashboard-shell
feat/redis-state
feat/vapi-tools
feat/tinyfish-adapter
docs/demo-script
```

## Pull Requests

Keep PRs small enough to review quickly during the hackathon. Include:

- What changed.
- How to run or test it.
- Any env vars needed.
- Screenshots or logs when the change affects the demo flow.

## Do Not Commit

- `.env` files.
- API keys or credentials.
- Build outputs.
- `node_modules`.
