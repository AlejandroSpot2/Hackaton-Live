# Build Plan

This is the practical day-of-hackathon execution plan.

## North Star

By 4:30 PM PT, we need a working end-to-end demo:

Voice idea -> agent follow-ups -> live research -> Redis-backed state -> dashboard -> spoken verdict -> Shipables skill.

## Time Budget

Assume hacking time is 11:00 AM to 4:30 PM PT.

### 11:00-11:30 - Repo And Skeleton

- Create app scaffold.
- Add `.env.example`.
- Add dashboard route with fixture data.
- Add API healthcheck.
- Add Redis client wrapper.

Definition of done:

- Local app runs.
- Dashboard shows fixture market atlas.
- API returns `ok`.

### 11:30-12:15 - Redis State

- Define run model.
- Implement create/get/update run.
- Implement event append/list.
- Show event feed in dashboard.

Definition of done:

- `POST /api/runs` creates a Redis-backed run.
- Dashboard can load a run id.
- Events update without page refresh or with polling.

### 12:15-1:15 - TinyFish Research

- Add TinyFish env var and adapter.
- Implement search for competitors/substitutes.
- Implement fetch for top URLs.
- Store evidence in Redis.
- Add dashboard evidence feed.

Definition of done:

- One idea produces at least 5 evidence objects with URLs.
- UI shows source title, URL, and claim.

### 1:15-1:45 - Lunch Buffer / Synthesis

- Add LLM synthesis endpoint.
- Validate market atlas JSON.
- Add fixture fallback.

Definition of done:

- A run can move from idea to final atlas.

### 1:45-2:45 - Vapi Integration

- Create Vapi assistant.
- Configure custom tool endpoint.
- Implement `start_reality_check` and `get_reality_check_status`.
- Test web call or phone call.
- Tune voice prompt for short responses.

Definition of done:

- Vapi can start a run by voice.
- Vapi can speak status and final result.

### 2:45-3:20 - Polish Demo UI

- Add sponsor trace panel: Vapi, TinyFish, Redis, Shipables.
- Add loading/progress states.
- Add final verdict view.
- Add one-click demo idea seed for safety.

Definition of done:

- Judges can visually understand the system in 10 seconds.

### 3:20-3:50 - Shipables Skill

- Create `skill/SKILL.md`.
- Create `skill/shipables.json`.
- Include references and API contract.
- Run dry-run publish if CLI is available.

Definition of done:

- Skill directory exists and is submission-ready.

### 3:50-4:20 - Demo Rehearsal

- Record or rehearse 3-minute demo.
- Confirm public repo is ready.
- Confirm Devpost fields.
- Confirm fallback path.

Definition of done:

- Demo script fits under 3 minutes.
- At least one full run is saved and reproducible.

### 4:20-4:30 - Submission

- Submit public GitHub repo.
- Submit demo recording.
- Publish or submit Shipables skill.
- Do not be late.

## MVP Checklist

- [ ] App runs locally.
- [ ] Redis connected.
- [ ] Create run works.
- [ ] Run events persist.
- [ ] Dashboard shows progress.
- [ ] TinyFish search works.
- [ ] TinyFish fetch works.
- [ ] Evidence saved in Redis.
- [ ] Atlas synthesis works.
- [ ] Vapi assistant created.
- [ ] Vapi custom tool calls backend.
- [ ] Vapi speaks final answer.
- [ ] Shipables skill files exist.
- [ ] Demo script rehearsed.
- [ ] Public repo ready.

## Stretch Checklist

- [ ] Redis vector/semantic cache for similar idea recall.
- [ ] TinyFish `/run-sse` live browser automation visible in UI.
- [ ] Persona mini-panel inspired by SocietySimOs.
- [ ] Ghost draft export.
- [ ] Public deployed URL.
- [ ] Redis Insight screenshot or debug panel.

## Build Discipline

- Do not build a landing page first.
- Do not over-engineer auth.
- Do not spend more than 20 minutes fighting any one sponsor API before creating a fallback adapter.
- Do not make Redis invisible.
- Do not let Vapi give long generic speeches.
- Keep every final output source-cited.
