---
description: End-of-session wrap-up — run the DoD, update STATUS.md inline, and always finish with a paste-ready Next Session Kickoff prompt.
---

# /wrap — End-of-session wrap-up

Run the project's end-of-session ritual **in this exact order**. This is
the canonical close-out — do not improvise a different shape.

`CLAUDE.md` (the stable operating manual) and `STATUS.md` (the volatile
state) are the sources of truth for the formats referenced below — follow
them, don't restate them from memory.

## Steps

1. **Reconstruct what happened this session.** Run
   `git log --oneline origin/main..HEAD` and `git status` plus a scan of the
   conversation. Produce a 2–4 bullet "what shipped / what changed" list.
   Distinguish what *this session* authored from commits inherited on the
   branch; if something was attempted and not finished, say so.

2. **Run the Definition of Done checklist** from `CLAUDE.md`
   (§ "Definition of Done — Before Saying Done") against this session's
   work. Surface each line **pass / fail / N/A** — do not collapse to
   "looks good."

3. **Update `STATUS.md` inline** (update now, not "later"). Refresh
   whatever changed: **Current Phase / Parallel Track / Blocking Open
   Questions / Open PM Action Items / Runtime in Use**, bump **Last
   updated**, and **prepend a Recent Sessions entry** (newest first, one
   scannable line).

   **Commit this update onto the same branch as the session's work — never
   a fresh branch — so it lands in the session's *existing* PR instead of
   spawning a second status-only PR.** Make sure that PR exists first
   (create the draft PR now if it doesn't), then write the Recent Sessions
   entry as **`shipped via #N`** — **not** `merged to main (#N)`. The
   post-merge phrasing is exactly what forces the second PR.

4. **Reconcile the backlog rows for every `B-NNN` this session touched.**
   For each ID referenced in this session's PR/commits, open its row in
   `docs/backlog.md` and bring its **Status** current in the same commit as
   the `STATUS.md` update. Rewrite the Status *head*, don't append to the
   tail — the first token must read true at a glance (`Open` / `In
   progress` / `Partial` / `Blocked` / `Done` + date + PR).

5. **Emit a short Session Summary**: what was built, decisions made, open
   questions surfaced, known issues/tech debt, PM Action Items, recommended
   next steps.

6. **End with the Next Session Kickoff block — this is mandatory and
   always last.** Even if the session was inconclusive, produce a
   copy-pasteable recommended first prompt that names the next step and the
   file/doc to read first. Include 1–2 alternate prompts if other tracks
   are live.

## Rules

- **Before wrapping, verify the live site matches what this session
  intended** (`CLAUDE.md` → Deploy Safety step 2) if anything was pushed —
  a push on this repo can deploy to production regardless of branch or PR
  state. Note the result in the Session Summary.
- If work was pushed but no PR exists yet, create a **draft** PR before
  wrapping, and reference it in the summary. Before merging anything,
  confirm the branch isn't diverged from a freshly-fetched `main`.
- **One PR per session.** The wrap's `STATUS.md` update (and any
  `CLAUDE.md`/doc edits) ride in the session's *existing* work PR —
  committed to its branch before merge. Do **not** open a separate "record
  the merge" status PR afterward. **Exception:** if the session's work PR
  was already merged mid-session, the status update is a small standalone
  follow-up PR.
- If nothing was pushed, say so plainly and still produce the `STATUS.md`
  update + Next Session Kickoff.
- Do not mark work complete unless the DoD passes — if a box is unchecked,
  say "not done" and point the Kickoff prompt at finishing it.

$ARGUMENTS
