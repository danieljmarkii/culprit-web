# Session Wrap — Website v2 Execution 1: v2-1 + v2-3 (shipped via #3)

**Date:** 2026-07-10 · **Repo:** culprit-web · **Branch:** `claude/website-v2-design-hero-i3lxz3` → PR **#3** (merged on wrap).
_The canonical STATUS.md / backlog live in `project-nyx`; §"project-nyx sync block" below is the paste-ready update for the next nyx session._

## What shipped (all authored this session)

1. **v2-1 — design-system groundwork** (`4c496a2`): §4 tokens (`--accent-deep`, `--paper`, `--night-deep`, `--btn-ink`, `--font-mono`); `.disp` / `.mono` / `.btn` (R1 contrast fix enforced) / `.reveal` utilities; `Whorl.astro` (size/opacity props), `Starfield.astro` (seeded PRNG, deterministic builds), `Reveal.astro` (IO-adds-hidden, Astro-bundled — CSP-safe); Geist Mono 400 (+12.8 KB) and Newsreader italic (+64.5 KB) self-hosted. No page-visible change on its own.
2. **v2-3 — hero + nav + trust line** (`509710d`): the D-mock hero on night (centered Whorl .13/60s drift, ~12-star field, grain, mono kicker, 90/44px Newsreader H1 with italic *culprit*, evidence sub, app-card stage with Mochi recreation + three orbit chips), new nav (lockup / tagline / teal CTA with dark ink), quiet trust line. Phase-1 sections remain below until v2-4/5; night neutrals aligned to D (`#b9b6ce`, `#2e2b4e`).
3. **`CtaForm.astro` — the §5 swap slot, gated**: `waitlist` state fully built (plain-HTML POST to `/api/subscribe`, honeypot per the v2-2 contract, microline) but **defaults to an `announce` pill** because v2-2 is unmerged (see PM action 1) — a form that dead-ends would break §9's "prod stays coherent at every merge". `PUBLIC_CTA_STATE=waitlist` (or v2-2 flipping the default) opens the funnel; `preorder`/`download` throw until the launch badge PRs.
4. **§8-gate fallout fixes**: Astro was inlining the reveal script → blocked by `script-src 'self'` in prod; `assetsInlineLimit: 0` keeps scripts as same-origin files. `inlineStylesheets: 'always'` + four above-the-fold font preloads took Lighthouse perf 92 → 97. Pre-existing `.prose a` vs `.link-accent` specificity bug painted the night-band mailto near-black (1.08:1) — fixed to accent (8.1:1). Nav brand named via hidden text (dotless-ı wordmark stays decorative).

## Definition of Done (site build session — run honestly)

- Acceptance criteria: **PASS** — v2-1 and v2-3 scope per `website-v2-requirements.md` §9; screenshot-verified against `mockups/direction-d.html` at 1440 and 390×844 (Playwright/Chromium, both CTA states). Two recorded deltas: the starfield (spec adds F-element over D) and the Signal chip staying centered — the mock's rendered offset/mobile cut-off is its own `.reveal.in{transform:none}` clobbering `translateX(-50%)`, not authored intent.
- §8 QA gates: **PASS** — mobile fold complete at 390×844 (both states); tap targets ≥44px (btn 46, input 44); reduced-motion serves a complete, motionless page; no-JS shows all content and the form still posts (pure HTML); AA on all new button/label pairs (btn ink ~8.5:1); Lighthouse 97/96/100/100, CLS 0; page ~267 KB transfer (≤350 KB); CSP untouched, zero inline scripts in `dist`.
- Anti-pattern scan: **PASS** — no exclamation marks; Signal copy descriptive-never-causal with sample sizes ("tends to follow", "4 of 5 times"-class phrasing in chips/cards); no diagnosis claims; no fabricated proof; no badge assets.
- Types/lint: **PASS** — `astro build` green in `announce` and `waitlist`; `preorder` fails loudly by design (documented).
- Automated tests: **N/A — no store/Edge/lib logic in diff** (worker lands in v2-2).
- Secrets: **PASS** — none introduced; `BUTTONDOWN_API_KEY` still pending provisioning (PM action, blocks v2-2).
- Persona sign-off: **PASS** — Designer (D treatment, motion gated), Dir. of Eng (zero-JS posture, CSP fix, additive config), Data Scientist/Dr. Chen (recreated UI copy in named constants, subset-of-product rule), Jordan/Sam (one-thumb fold verified), QA (§8 ledger above), Trust & Privacy (no form live → no policy change needed yet; honeypot contract staged).
- Future-self review (new pattern: `announce` CTA state + `PUBLIC_CTA_STATE` flag): **PASS** — state machine documented in `CtaForm.astro`, `env.d.ts`, and PR #3. Named risk: if v2-2 lands without flipping the default, the funnel stays dark — v2-2's checklist must include the flip.
- Dev handoff: **emitted** (below). PM action items: **consolidated** (below).

## PM action items

1. **Provision Buttondown** (account + API key via `wrangler secret put BUTTONDOWN_API_KEY`) — still the blocker for v2-2; add the Secrets Register row in project-nyx when done. v2-2 then flips the CTA default to `waitlist` and updates the privacy policy in the same PR.
2. **Founder-note copy** (spec §10.1) — unchanged: pick/edit Light / Medium / Fuller before v2-5; Medium ships by default if silent.
3. Defaults applied this session per §10: **Geist Mono added** (§10.4). Still open for later PRs: beta checkbox (skip), Cloudflare Web Analytics (yes, v2-7).
4. Contrast debt for v2-4: `--accent-deep` (#009B86) is ~3.2:1 on cream — size/weight the `mono--teal` exhibit kickers to the large-text threshold or darken the token.

## project-nyx sync block (paste-ready)

**STATUS.md → Recent Sessions (prepend):**
> **2026-07-10 — getculprit.app v2 execution 1 (culprit-web):** v2-1 design-system groundwork + v2-3 hero/nav/trust shipped via culprit-web **#3** — D-mock hero live on night ground, screenshot-verified at 1440/390, Lighthouse 97/96/100/100. CTA swap slot built with `waitlist` complete but **defaulted to `announce`** pending Buttondown provisioning (B-284) — funnel flips on with v2-2. Also fixed: CSP-blocked inline script (Astro inlining), night-band link contrast. Next: v2-2 (worker + policy) once key exists; v2-4 (exhibits) is unblocked regardless.

**docs/backlog.md status-head rewrites:**
- **B-273**: `In progress — 2026-07-10 · Phase 1 live (#1); v2 spec (#2); v2-1+v2-3 shipped (#3, hero live, announce CTA); v2-2 blocked on B-284; v2-4 next`
- **B-283**: `In progress — 2026-07-10 (culprit-web #3) · v2-1 ✓ v2-3 ✓ (funnel dark until v2-2); v2-4/5/6/7 remain`
- **B-284**: unchanged (`Buttondown provisioning + Secrets Register entry`) — **now the sole blocker for the live funnel.**

## Dev handoff (site QA)

```bash
git pull origin main && npm install && npm run build && npx astro preview
```
`npm install` picks up two new font packages (Geist Mono, Newsreader italic). Verify `/` renders the v2 hero (night, whorl, starfield, app-card, trust line) with the **"Coming soon" pill** — that's the intended default until v2-2. To preview the funnel state: `PUBLIC_CTA_STATE=waitlist npm run build` (form posts to `/api/subscribe`, which 404s until v2-2 — expected). Manual QA: fold at 390×844 ends with pill/form + microline; disable JS → everything still visible; OS reduced-motion → no drift/twinkle/reveals; `dist/index.html` contains no inline `<script>`. Legal pages unchanged.
