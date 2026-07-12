# culprit-web — Status

The volatile "where are we?" file. Update this inline at the end of every
session (`/wrap` does it for you) — never let it drift from what's actually
shipped. `CLAUDE.md` is the stable manual; this is the high-churn state.

**Last updated:** 2026-07-12

## Current Phase

**v2 — waitlist live.** The v2 redesign (roundtable → mocks → build) shipped
via #2/#3/#4: hero/nav/trust groundwork plus waitlist email capture backed
by a Cloudflare Worker (`src/worker.ts`) + D1 (`migrations/`) + best-effort
Resend notification. `/` captures emails now; the App Store CTA replaces it
at launch (`PUBLIC_CTA_STATE`). See `README.md` → Status table for the
per-page state.

## Parallel Track

None currently open.

## Blocking Open Questions

- **Cloudflare production-branch scoping** (`CLAUDE.md` → Open Questions) —
  confirm whether Workers Builds deploys are actually restricted to `main`.
  Not build-blocking, but every session must follow `CLAUDE.md` → Deploy
  Safety until this is confirmed.

## Open PM Action Items

- Confirm in the Cloudflare dashboard (Workers & Pages → culprit-web →
  Settings → Builds) whether production deploys are scoped to `main` only.
  See incident note below.

## Runtime in Use

- `npm run dev` — local dev server (`http://localhost:4321`)
- `npm run build` → `npm run preview` — production build check before push
- Deploy: Cloudflare Workers Builds (Git integration) — every push
  potentially deploys to production; see `CLAUDE.md` → Deploy Safety before
  pushing anything, on any branch
- Waitlist data: `npx wrangler d1 execute culprit-subscribers --remote
  --command "SELECT email, created_at, country FROM subscribers ORDER BY
  created_at"`

## Recent Sessions

- 2026-07-12 — **Incident + fix:** a stale docs-only branch
  (`claude/nyx-workflow-migration-h8eu9a`), branched before v2 (#2–#4)
  landed on `main`, was pushed to open a PR. Cloudflare built and deployed
  it straight to production, reverting getculprit.app from the live v2
  waitlist site back to the old Phase-1 shell (no email capture). Caught via
  user report, confirmed via `curl`, restored with an empty commit pushed
  directly to `main` to force a rebuild from `main`'s real HEAD (~30s to
  restore once pushed). The stale branch was then rebuilt on top of current
  `main` and `CLAUDE.md` gained a Deploy Safety section (branch-freshness
  check required at session start and before every push) so this doesn't
  recur silently.
- 2026-07-12 — Set up session-continuity workflow (`CLAUDE.md`, `STATUS.md`,
  `docs/backlog.md`, `/kickoff` `/wrap` `/handoff`, code-reviewer subagent,
  culprit-voice skill, build-check CI) — adapted from `project-nyx`'s
  operating manual, trimmed to what a marketing site actually needs. (This
  is the session whose stale branch caused the incident above.)
