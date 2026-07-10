# Session Wrap — Website Revamp Design Phase (shipped via #2)

**Date:** 2026-07-10 · **Repo:** culprit-web · **Branch:** `claude/website-revamp-design-18kib9` → PR **#2** (merged on wrap).
_The canonical STATUS.md / backlog live in `project-nyx`; this session had no push access there — §"project-nyx sync block" below is the paste-ready update for the next nyx session._

## What shipped (all authored this session)

1. **Roundtable + research** (`2026-07-09-roundtable.md`, `research/*`): full persona team + Marketing & App Store guest lenses; 17-site design study with live captures; Apple-cited funnel memo (waitlist → pre-order → download; TestFlight = email-gated secondary); marketing brief (Buttondown via same-origin Worker; SEO scan; copy bets).
2. **Six direction mocks** (`mockups/direction-{a..f}.html`): Round 1 divergent (A Moonlit Signal / B Clear Evidence / C Case File) → PM feedback → Round 2 (D Convergence / E One Job / F Night Sky), all self-contained HTML with inlined brand fonts and recreated app UI per the app's ValuePreview discipline.
3. **Converged spec** (`website-v2-requirements.md`): D ratified ("The Case, by Moonlight") at E's brevity with F's night-sky ambience; locked 9-section page spec; 3-state CTA swap slot; Buttondown Worker proxy plan; QA gates; **PR-by-PR execution plan v2-1 → v2-7** + launch flips.
4. **Feedback log** (`2026-07-10-round2-notes.md`): both PM reaction rounds, item by item, with dispositions.

Branch hygiene note: rebased onto the squash-merged main (`b2c143d`) mid-session so the PR diff stayed docs-only.

## Definition of Done (docs/design session — run honestly)

- Acceptance criteria (technical-spec): **N/A** — no app build step touched; the session's acceptance was PM ratification of a direction, which occurred (Round 2).
- Anti-pattern scan: **PASS** — no app code; mock copy holds voice invariants (no exclamation marks, descriptive-never-causal Signal, no diagnosis claims); one contrast bug (grey-on-teal nav CTA) found by PM in R1, fixed in R2 + encoded in the spec as a hard requirement.
- Types/lint: **N/A** — diff is Markdown + standalone HTML; `npm run build` verified green (site source untouched).
- Automated tests: **N/A — no store/Edge/lib logic in diff.**
- Secrets: **PASS** — none introduced; `BUTTONDOWN_API_KEY` is *planned* (v2-2) via `wrangler secret` + needs a Secrets Register row when provisioned (PM action).
- Persona sign-off: **PASS** — roundtable §sign-off + spec §sign-off (all lenses named, N/A where honest).
- Adversarial review: **N/A** — no clinically/statistically load-bearing logic changed; marketing surfaces were held to `clinical-guardrails` copy invariants in-context (Data Scientist / Dr. Chen lenses).
- Future-self review (new patterns: CTA swap-slot; `docs/website-revamp/` structure): **PASS** — states are explicit build flags, docs self-contained. Named risk: mock HTML files are heavy (~330 KB each, fonts inlined) — accepted as durable design records, not shipped assets.
- Dev handoff: **emitted** (chat + below). PM action items: **consolidated** (below). Kickoff prompts: **emitted** (chat, end).

## PM action items

1. **Founder note** — pick/edit Light / Medium / Fuller (spec §10.1). Default: Medium ships in v2-5.
2. **Provision Buttondown** (account + API key) before v2-2; add a Secrets Register row in project-nyx when done.
3. Ratify defaults (spec §10): beta checkbox **skip for v2**; Cloudflare Web Analytics **yes**; Geist Mono **add**.
4. Carry the project-nyx sync block below into the nyx repo (or hand it to the next nyx session).

## project-nyx sync block (paste-ready)

**STATUS.md → Recent Sessions (prepend):**
> **2026-07-10 — getculprit.app v2 design phase (culprit-web):** persona roundtable + 3 research briefs + 6 mocks across 2 PM feedback rounds → direction converged (**D "The Case, by Moonlight"** at E's brevity with F's night-sky ambience) → build-ready `website-v2-requirements.md` with PR-by-PR plan (v2-1→v2-7 + launch badge flips). Shipped via culprit-web **#2**. Waitlist-primary CTA ratified (B-282 reversed); TestFlight beta = optional deferred PR.

**docs/backlog.md status-head rewrites:**
- **B-273**: `In progress — 2026-07-10 · Phase 1 live (culprit-web #1); v2 direction + spec merged (culprit-web #2); execution v2-1→v2-7 next` (was: Phase-1-scoped).
- **B-282**: `Reversed — 2026-07-10 (culprit-web #2) · waitlist is now the v2 primary CTA (Buttondown, same-origin Worker proxy, double opt-in); ships v2-2/v2-3` (was: deferred).
- **New row suggestion — B-283**: `culprit-web v2 execution (v2-1→v2-7 per website-v2-requirements.md)` · why: converged revamp to prod; priority Now; Blocks: launch marketing; Status: Open.
- **New row suggestion — B-284**: `Buttondown provisioning + Secrets Register entry (BUTTONDOWN_API_KEY)` · PM action; blocks v2-2.

## Dev handoff (site QA — no app runtime touched)

```bash
git pull origin main && npm install && npm run build && npx astro preview
```
Pull the merged docs, build, and preview locally — the live site is UNCHANGED by this PR (docs only; verify `/` still renders the Phase-1 page). Design records: open `docs/website-revamp/mockups/direction-d.html` in a browser — that file is the v2 reference. Manual QA script for this PR: (1) `npm run build` exits 0; (2) preview serves `/`, `/support`, `/privacy`, `/terms` unchanged; (3) `direction-d.html` opens standalone with correct fonts (serif display + Geist) and the mobile fold intact at 390 px.
