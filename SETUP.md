# Environment And Setup Notes

This file tracks the accounts, keys, and local commands we expect to need.

## Required Accounts

- Devpost account joined to the hackathon.
- GitHub account for public repo.
- Shipables account via GitHub.
- TinyFish account with API key and credits.
- Vapi account with API key and phone/web call access.
- Redis Cloud account or local Redis Stack.
- LLM provider key for synthesis.

## Environment Variables

```bash
# App
APP_BASE_URL=http://localhost:3000
NEXT_PUBLIC_APP_BASE_URL=http://localhost:3000
NODE_ENV=development

# Vapi
VAPI_API_KEY=
VAPI_ASSISTANT_ID=
VAPI_PHONE_NUMBER_ID=
VAPI_PUBLIC_KEY=

# TinyFish
TINYFISH_API_KEY=

# Redis
REDIS_URL=redis://localhost:6379

# LLM provider
OPENAI_API_KEY=

# Demo/fallback
DEMO_MODE=false
DEMO_SEEDED_RUN_ID=
```

## Local Redis Option

Recommended for speed:

```bash
docker run -d --name realitycheck-redis -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```

Redis Insight should be available at:

```text
http://localhost:8001
```

If Docker is slow or unavailable, use Redis Cloud.

## Public HTTPS For Vapi Tools

Vapi custom tools need a public server URL. Options:

- Deploy app to Vercel.
- Use ngrok or another tunnel to expose local API.
- Use any hackathon-provided tunnel if available.

Expected tool endpoint:

```text
POST https://<public-url>/api/vapi/tools
```

## Setup Checklist

- [ ] Create GitHub repo.
- [ ] Confirm TinyFish key works.
- [ ] Confirm Vapi dashboard access.
- [ ] Confirm Redis connection path.
- [ ] Confirm Shipables login or install path.
- [ ] Decide deployment/tunnel path for Vapi tools.
- [ ] Pick one LLM provider.

## Useful Smoke Tests

Redis:

```bash
redis-cli ping
```

TinyFish:

```bash
curl -H "X-API-Key: $TINYFISH_API_KEY" "https://api.search.tinyfish.ai?q=voice%20ai%20startup%20validation"
```

Vapi tool endpoint:

```bash
curl -X POST "$APP_BASE_URL/api/vapi/tools" \
  -H "Content-Type: application/json" \
  -d '{"message":{"type":"tool-calls","toolCallList":[{"id":"test","name":"get_reality_check_status","arguments":{"run_id":"demo"}}]}}}'
```
