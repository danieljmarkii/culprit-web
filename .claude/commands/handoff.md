---
description: Lightweight handoff for a mid-session push — emit just the QA-check commands for what was just pushed, without the full /wrap ceremony.
---

# /handoff — Verify the latest push, no full close-out

Emit **only** what's needed to confirm a mid-session push is good: the
build/preview commands + a short Manual QA script for what changed. This is
the lightweight cousin of `/wrap` — use it when you've pushed mid-session
and just want to confirm it, without running the full DoD / Session Summary
/ Next Session Kickoff.

(If you're closing out the session, use `/wrap` instead.)

## Steps

1. **Confirm something was actually pushed.** Run
   `git log --oneline origin/main..HEAD` (or check the current branch's tip
   vs its upstream). If nothing is pushed yet, say so and stop.

2. **Emit the verification commands**:
   ```
   npm run build && npm run preview
   ```
   Note which page(s) changed and what to check at `http://localhost:4321`
   (or the preview port Astro reports).

3. **Emit the Manual QA script**: start from a known state, check the
   changed page(s) at a mobile width, and call out anything from the DoD
   that's specific to this change (brand tokens, voice, indexability).

## Rules

- Emit only what's needed for this push — do not restate the full DoD.
- This command deliberately does **not** update `STATUS.md` or emit a
  Session Summary. That's `/wrap`'s job.

$ARGUMENTS
