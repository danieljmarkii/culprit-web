# culprit-web — working notes for Claude

The public web presence for **Culprit** (the pet health app developed in the
`project-nyx` repo), served at **getculprit.app**. Astro static site + one
Cloudflare Worker (`src/worker.ts`) for the waitlist. Full architecture and
setup live in `README.md` — read it first; this file only covers what makes
work here go smoothly.

## Deploys are live — treat EVERY push as production

- **Pushes to any branch deploy the live site** — verified 2026-07-16: a
  push to a PR branch went straight to production. Workers Builds runs
  `npm run build` → `npx wrangler deploy` on every push, and `wrangler
  deploy` targets production regardless of branch. There is no staging and
  no preview. Until the PM fixes the config (dashboard → Workers Builds →
  restrict builds to `main`, or switch non-production branches to
  `npx wrangler versions upload`), a branch + PR is **not** a safety gate
  for the live site — only for code review.
- **The site that is up is the site we want.** Work on a branch and open a
  PR anyway (review + history), but treat the push itself as the deploy
  moment: always run `npm run build` locally and finish the pre-push
  checklist below before pushing anything — a broken build or half-done
  page must never be pushed on any branch.
- The stack is deliberately boring: static output, zero client JS, no
  third-party runtime requests (fonts self-hosted, CSP locked in
  `public/_headers`). Don't add scripts, analytics, CDNs, or trackers without
  an explicit PM decision — and if anything third-party is ever added, the
  privacy policy's "Our website" section must change in the same PR.

## Pre-push checklist

1. `npm run build` passes (this also runs `astro check`-level template errors
   out; the site must build clean).
2. Grep the built `dist/` for regressions: no `Nyx` (brand hygiene §6.4 —
   public surfaces say **Culprit** only), no stray `[` placeholders in page
   text, no `privacy@` (contact is unified on `support@getculprit.app`).
3. Voice: calm, plain language, **no exclamation marks**, no
   medical/diagnostic claims (App Store Guideline 1.4.1 — Culprit tracks and
   notices; it never diagnoses, treats, or reassures).

## Legal pages (/privacy, /terms, /disclaimer)

- **Source of truth:** `project-nyx docs/legal/*.md` (merged via its PR #302).
  The site pages are hand-converted HTML of those docs. If a legal doc
  changes in either place, the other must be updated to match — flag the
  cross-repo sync in the PR description if it can't happen in-session.
- Site-only deltas vs the repo docs (intentional):
  - Privacy has an extra **"11. Our website"** section (waitlist email →
    Cloudflare D1, country only, removal via support@, Resend notification,
    no cookies/analytics). Pending flow-back to `project-nyx`
    `docs/legal/privacy-policy.md` (follow-up on the guide step-3/step-7
    wiring PR).
  - Repo-internal DRAFT banners and the disclaimer's in-app-copy appendix are
    stripped; `.md` cross-links become site links (`/privacy`, `/terms`,
    `/disclaimer`).
  - Filled values: operator **Dan Mark, an individual**; mailing address in
    terms §12 (Apple minimum terms); provider **Resend**; effective dates
    **July 16, 2026**.
- Internal cross-references use section numbers (privacy §3/§7 are referenced
  from the terms) — renumbering a section means checking every reference in
  all three docs.
- `/disclaimer` is deep-linked by the app (terms incorporate it by
  reference) — don't rename or remove the route.

## Cross-repo context

- `project-nyx` is the app repo: requirements
  (`docs/culprit-website-requirements.md`), the App Store submission guide +
  progress tracker (`docs/app-store-submission-guide.md`), backlog, and the
  legal doc sources. Site work usually ends with a tracker/backlog update
  over there — if that repo isn't in the session, list the exact updates in
  the PR body instead.
- Waitlist data: Cloudflare D1 `subscribers` (source of truth) + best-effort
  Resend founder notification. Anything that changes what the waitlist
  collects must update privacy §11 in the same PR.
