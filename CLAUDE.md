# culprit-web — Claude Code Session Guide

The stable operating manual for this repo. `STATUS.md` is the volatile
"where are we?" companion — read that first each session, this file second.
Adapted from `project-nyx`'s CLAUDE.md, trimmed to what a marketing site
actually needs: no clinical/RLS/sync process ported over, because there is
no health data here — but this repo has its **own** highest-severity risk
(see "Deploy Safety" below) that project-nyx doesn't have, because
project-nyx has no equivalent of Cloudflare deploying an arbitrary pushed
branch straight to production.

## What This Is

The web presence for **Culprit** — marketing landing page (v2, with
waitlist email capture) plus the support/privacy/terms pages the App Store
submission requires. Astro site with a small Cloudflare Worker for the
waitlist API, deployed on Cloudflare Workers (Static Assets + Worker) at
**getculprit.app**. Full stack/structure notes live in `README.md` — don't
duplicate them here; this file owns *process*, the README owns
*architecture*.

Spec source of truth: `docs/culprit-website-requirements.md` and
`docs/website-revamp/website-v2-requirements.md` in `project-nyx` (that repo
is available in this session — `add_repo` it if it isn't).

## Deploy Safety — Read This Before Any `git push` — NON-NEGOTIABLE

**A `git push` to this repo can deploy straight to the live site at
getculprit.app, regardless of which branch it is or whether a PR exists.**
This project's Cloudflare Workers Builds integration has no verified
preview-environment isolation — a push on 2026-07-12 to an unrelated,
stale feature branch (`claude/nyx-workflow-migration-h8eu9a`) was built and
deployed straight to production, silently reverting the live site from the
v2 waitlist design back to the old Phase-1 shell and losing email-capture
functionality until it was caught and force-restored. Until someone
confirms in the Cloudflare dashboard (Workers & Pages → culprit-web →
Settings → Builds) that production deploys are scoped to `main` only, or
that preview deployments are enabled for other branches, **treat every push
to this repo, from any branch, as a potential production deploy.**

Concretely, before running `git push` on any branch:

1. **Confirm the branch is current with `main`.** Run
   `git fetch origin main && git merge-base --is-ancestor origin/main HEAD`
   and check it exits `0` (not stale). If the branch predates recent work on
   `main`, **rebase onto `origin/main` first** — do not push a stale branch,
   even for docs-only or unrelated work, even to open a draft PR. A stale
   push can overwrite live functionality (as it did on 2026-07-12) before
   any human reviews the diff.
2. **After any push, verify what's actually live.** `curl -s
   https://getculprit.app/ | grep -c waitlist` (or equivalent — check for
   whatever's currently supposed to be on the homepage per `STATUS.md`)
   should still match what you expect. Do this immediately after pushing,
   not at the next session.
3. **If production breaks:** the fastest recovery is a fresh push to `main`
   (an empty `git commit --allow-empty` is enough) to force Cloudflare to
   rebuild from `main`'s real HEAD. This bypasses the normal PR-required
   rule below — that's acceptable *only* as an active-outage recovery step,
   not as a routine practice, and should be flagged to the PM immediately
   after.
4. **Session start must fetch and compare against `origin/main` before any
   new work begins** — see Session Protocol below. Never assume a
   long-lived local checkout or an old branch name is safe to build on top
   of.

If a Cloudflare dashboard check ever confirms production is properly scoped
to `main`-only deploys, update this section (Tier 1 — immediately) to
reflect that and relax step 1 to "recommended" rather than "required." Until
that confirmation exists, this is load-bearing.

## Read These Before Writing Any Code

| Working on... | Read first |
|---|---|
| Any owner-facing copy (headlines, waitlist form, error/empty states) | `.claude/skills/culprit-voice/SKILL.md` |
| Brand tokens, colors, type | `constants/theme.ts` (source of truth), mirrored in `src/styles/global.css` |
| Page structure / new page | `src/layouts/Base.astro` + relevant `src/components/*.astro` |
| The waitlist form / Worker / D1 | `src/worker.ts`, `src/components/CtaForm.astro`, `migrations/`, README → "Waitlist email capture" |
| Deploy / redirects / headers | `wrangler.jsonc`, `public/_redirects`, `public/_headers`, README → Deploy, and **Deploy Safety above** |
| Brand assets (favicons, OG image) | `scripts/generate-assets.mjs`, `npm run assets` |

## Code Conventions

- **Language:** Astro components (`.astro`) + TypeScript, including the
  Cloudflare Worker (`src/worker.ts`).
- **Styling:** Brand tokens only, from `constants/theme.ts` → mirrored CSS
  custom properties in `src/styles/global.css`. No hardcoded hex/spacing in
  a component. Teal (`colorAccent`) is the **sole** interactive accent —
  never decorative. Midnight indigo (`colorBrandNight`) is a ground color
  (heroes, dark surfaces), never a tappable fill.
- **Client JS:** Ships zero by default — that's the product decision, not
  an accident. The waitlist form is a plain HTML `<form>` posting
  same-origin to the Worker; it needs no client JS. Adding a client-side
  script or island elsewhere is a deliberate choice; justify it in the PR
  description.
- **Imports:** Absolute from project root where Astro's resolver allows it.
- **Comments:** Comment the why (a redirect quirk, a Cloudflare Workers
  gotcha, a decision like D4), not the what.

## Brand Hygiene & Voice — Non-Negotiable

- **No served string, meta tag, email, or filename says "Nyx."** Everything
  user-facing is **Culprit**. This is a hard anti-pattern, not a style
  preference — grep for `[Nn]yx` before any push that touches copy or
  metadata.
- **Voice:** calm, plain language, **no exclamation marks**, **no
  medical/diagnostic claims** (Culprit helps you *track and notice*, it does
  not diagnose or treat). Full rules + canonical/anti-pattern examples in
  the `culprit-voice` skill — load it before writing or reviewing any
  owner-facing string.

## Git Workflow

**Branch naming:** `feat/short-description`, `fix/short-description`.

**Flow:**
1. **Fetch and rebase onto latest `origin/main` before starting work** — see
   Deploy Safety above. Do not branch off an old local checkout.
2. Make changes.
3. `npm run build && npm run preview` — confirm the production build works,
   not just dev mode.
4. **Before pushing:** re-confirm the branch is still current with
   `origin/main` (someone may have merged in the meantime) and re-run the
   Deploy Safety checklist.
5. Push → open a PR with what changed and why, and manual QA steps.
6. **Immediately after pushing, verify the live site** per Deploy Safety
   step 2 — don't wait for the PR to merge to find out something broke.
7. Merge to `main`.

**Rules:**
- PRs required before merging to `main`. No direct commits to `main`
  **except** the active-outage recovery case in Deploy Safety step 3.
- Squash merge to keep history linear.
- **One PR per session.** The end-of-session `STATUS.md` update rides in the
  session's existing work PR, committed before merge — not a separate
  "record the merge" PR afterward. Write the Recent Sessions entry as
  `shipped via #<n>`, never `merged to main (#<n>)` — the post-merge phrasing
  is what forces the second PR. Exception: if the work PR was already merged
  mid-session, the status update is a small standalone follow-up.

## Session Protocol

### Session Start

1. **`git fetch origin main` and confirm the working branch is current**
   (`git merge-base --is-ancestor origin/main HEAD`). If it isn't — whether
   this is a fresh branch, a resumed session, or an old local checkout —
   rebase onto `origin/main` before reading anything else or writing any
   code. This is the single check that would have caught the 2026-07-12
   incident; do not skip it.
2. Surface `STATUS.md` (Current Phase, blocking items, recent sessions) in
   the opening message.
3. Read the relevant "Read These Before Writing Any Code" row for the
   confirmed task before writing code.

**Shortcut:** `/kickoff` runs the freshness check and auto-generates this
orientation.

### Definition of Done — Before Saying "Done"

- [ ] Branch confirmed current with `origin/main` at both start and
      immediately before push (Deploy Safety)
- [ ] `npm run build` succeeds (production build, not just dev)
- [ ] Diff scanned for hardcoded colors/spacing outside `constants/theme.ts`
- [ ] Diff scanned for stray "Nyx" in any served string, meta tag, or filename
- [ ] Any new/changed owner-facing copy checked against `culprit-voice`
      (no exclamation marks, no medical/diagnostic claims, plain language)
- [ ] If a page's indexability changed, `astro.config.mjs`'s sitemap
      `filter` updated to match
- [ ] Manual QA: page loads in dev **and** in `npm run preview` (the built
      output), checked at a mobile width
- [ ] **Live site verified after push** (Deploy Safety step 2) — not
      assumed safe because "it was just a docs/config change"
- [ ] PM Action Items named for anything only the PM can finish (e.g. real
      legal copy, App Store asset decisions, confirming Cloudflare's
      production-branch scoping)

If any box is unchecked, say so explicitly rather than claiming done.

### During the Session

Run `/code-review` (or the `code-reviewer` subagent directly) on the diff
before pushing — it checks correctness plus this repo's house rules
(brand tokens, brand hygiene, voice, branch freshness).

### Session End

Run `/wrap` — updates `STATUS.md` inline, reconciles any touched
`docs/backlog.md` rows, and always ends with a paste-ready Next Session
Kickoff prompt. Use `/handoff` instead for a mid-session "just verify this
page" push without the full close-out.

## Documentation Update Protocol

- A **decision** that changes how the site is built (a new brand rule, a
  new deploy step, a new convention) updates this file immediately, in the
  same PR as the work that prompted it.
- **State** (what's live, what's blocked, what shipped) goes in `STATUS.md`,
  not here — keep this file's churn low.
- New/changed scope for a page or feature gets a `docs/backlog.md` row, not
  a silent addition to this file.

## Open Questions

### Open

- **Cloudflare production-branch scoping.** Confirm in the dashboard
  whether Workers Builds deploys are actually restricted to `main`, or
  whether every pushed branch deploys to production (observed behavior on
  2026-07-12 suggests the latter). Until confirmed, Deploy Safety above is
  mandatory for every push. PM action item.

### Resolved

- **D4 — App Store badge on `/` landing.** Withheld until a real build
  exists to link to. Tracked as B-003 in the backlog.

## What Good Looks Like

A page that loads instantly, ships no unnecessary JS, uses only brand
tokens, never says "Nyx," never uses an exclamation mark, never implies
Culprit diagnoses or treats anything, and was pushed from a branch that was
verified current with `main` both before and after. If a change doesn't
hold all five, it's not done — say so.

## Version History

- 2026-07-12 — Added the Deploy Safety section after a stale branch push
  overwrote the live v2 site (with waitlist capture) back to the old Phase-1
  shell. Also updated the rest of this file to reflect the actual v2
  architecture (waitlist Worker, D1, Resend) instead of the stale Phase-1
  description it originally carried.
- 2026-07-12 — Initial version, adapted from `project-nyx`'s CLAUDE.md for
  a static marketing site (no clinical/RLS/sync process ported).
