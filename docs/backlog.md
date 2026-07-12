# culprit-web — Backlog

Every row: sequential `B-NNN` (never reused), Title, one-line _why_, Priority
(`Now`/`Next`/`Later`), `Added` (ISO date), `Blocks` (phase it blocks, or
`—`), Status.

**Status cell must lead with a structured head token** — `Open` / `In
progress` / `Partial` / `Blocked` / `Done` + date + PR — so the row reads
true at a glance. Rewrite the head when reconciling; don't append to the
tail and leave a stale head.

Closing keeps the row — set `Done — <date> (PR #N)`, leave it in the table.

| ID | Title | Why | Priority | Added | Blocks | Status |
|---|---|---|---|---|---|---|
| B-001 | Real privacy policy copy | `/privacy` is a noindex shell; App Store Phase 2 needs real text | Next | 2026-07-12 | Phase 2 | Open |
| B-002 | Real terms copy | `/terms` is a noindex shell; same Phase 2 gate | Next | 2026-07-12 | Phase 2 | Open |
| B-003 | App Store badge on `/` | Withheld by decision D4 until a build exists to link | Later | 2026-07-12 | — | Open |
| B-004 | Confirm Cloudflare production-branch scoping | 2026-07-12 incident: a stray branch push deployed straight to production and reverted the live site; need dashboard confirmation that Workers Builds is (or gets) scoped to `main` only | Now | 2026-07-12 | — | Open |

## Reconciliation note

Run a grooming pass whenever a session claims something shipped that this
table still lists as `Open` — match `Status` against merged PRs, rewrite the
head token, don't invent new scope while doing it. New product scope is a
PM call, routed to `CLAUDE.md` → Open Questions, never a silent backlog edit.
