---
description: Start-of-session brief — read STATUS.md + any backlog item blocking the current phase and produce a clean "where we are / what's first" summary. The mirror image of /wrap.
---

# /kickoff — Start-of-session brief

Produce a tight, skimmable orientation so a returning session can start
working immediately without re-reading the whole operating manual. This is
the mirror of `/wrap`: `/wrap` records where we landed; `/kickoff` reads it
back.

## Steps

0. **Branch freshness check — do this before anything else.** Run
   `git fetch origin main && git merge-base --is-ancestor origin/main HEAD`.
   If it fails (branch is stale), rebase onto `origin/main` immediately —
   do not read further or start work on a stale branch. This is
   `CLAUDE.md` → Deploy Safety; a stale push can deploy straight to
   production on this repo. See the 2026-07-12 incident in `STATUS.md` →
   Recent Sessions for why this is non-negotiable.

1. **Read `STATUS.md`** (repo root) — Current Phase, Parallel Track,
   Blocking Open Questions, Open PM Action Items, Runtime in Use, Recent
   Sessions. This is the high-churn state file; `CLAUDE.md` is the stable
   manual and usually doesn't need re-reading at kickoff.

2. **Scan `docs/backlog.md`** for any row whose **Blocks** column matches
   the current Phase, and for anything marked **Now**. Surface those — they
   may pre-empt the obvious next step.

3. **Check for blocking Open Questions** (`CLAUDE.md` § Open Questions →
   Open) that gate the current Phase. If one is blocking and unanswered,
   the recommended first action is "resolve open question X," not "build."

4. **Read the relevant docs for the confirmed step** (the `CLAUDE.md` "Read
   These Before Writing Any Code" table tells you which). Don't write code
   before this.

## Output

Emit, in this order:

- **Where we are** — Phase + in-flight work, in 2–3 lines.
- **Last shipped** — one line, with PR number(s), from `STATUS.md` → Recent
  Sessions.
- **Blocked on / waiting on PM** — any blocking Open Question or PM Action
  Item that gates progress. If none, say "nothing blocking."
- **Recommended first task** — the single concrete next step, naming the
  file/doc to open first. If a PM Action Item is a prerequisite, say so.
- **Alternates** — 1–2 other live tracks the user could pick instead.

$ARGUMENTS
