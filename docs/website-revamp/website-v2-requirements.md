# Culprit Web v2 — "The Case, by Moonlight" · Requirements & Execution Plan

**Created:** 2026-07-10 · **Status:** Build-ready — direction ratified by PM (Round-2 review); §10 open items have recommend-and-proceed defaults.
**Supersedes:** the Phase-1 "shell + gate" landing (`src/pages/index.astro`) — legal/support pages unchanged.
**Companions:** `2026-07-09-roundtable.md` (team + directions) · `2026-07-10-round2-notes.md` (feedback log) · `research/*` (design study, funnel memo, marketing brief) · `mockups/direction-d.html` (**the reference mock**) + `direction-e.html`, `direction-f.html` (donor elements).

---

## 1. The decision record (how we converged)

- **Round 1 (A/B/C):** PM leaned **C** (The Case File) — image-heavy, narrative, "a picture is worth a thousand words." Locked: the Whorl on night, scroll-reactive app visuals, dark-forward palette. Corrected: positioning is **logging + finding signals**, not elimination-trial-centric. Killed: FAQ. Fixed: nav CTA contrast bug. Promoted: "Your vet gets evidence, not anecdotes" (the core problem: *"my cat's vomiting a lot… what does that even mean"*).
- **Round 2 (D/E/F):** PM ratified **D (Convergence)** — "genuinely love the large whorl and in-app screenshot/value-prop style hero"; Exhibit 01 framing ("what does *a lot* mean?") called out as "genius pet-owner branding." From **E**: keep the **brevity** discipline (and its sticky mobile CTA); whorl stays **centered** (D's treatment) rather than E's offset. From **F**: "don't want to go this far, but let's work elements in" → **night-sky ambience only** (starfield + constellation micro-motifs), no scrollytelling.
- **CTA:** the page's one goal is **enter email** now → **download** at launch (PM framing). Waitlist is primary (reverses B-282); TestFlight-beta checkbox is **deferred to its own optional PR** pending PM capacity call (§10).

**One-line brief:** D's case-narrative page, told at E's pace, under F's stars.

## 2. Jobs & success criteria

1. **Funnel** — a visitor can act in one tap/field on every screen-height of the page. Measure: waitlist signups (post-analytics), then pre-orders, then installs.
2. **Brand first impression** — the page *shows* calm competence: real (recreated) product UI, editorial type at display scale, one teal accent, zero hype furniture.
3. **Honesty invariants** — descriptive-never-causal Signal copy, "does not diagnose" plainly stated, no fabricated proof, no dark patterns, no official Apple badges pre-approval.

## 3. Page specification (desktop → mobile; reference: `mockups/direction-d.html`)

Section order and copy are **locked from the D mock** except where noted. All type/color from existing tokens (`src/styles/global.css`) plus §4 additions.

| # | Section | Spec (deltas from D mock in bold) |
|---|---|---|
| 0 | **Nav** | Mark + wordmark left; right: tagline ("Log the days. Find what lines up.") + teal `Get early access` button (dark-ink text — contrast fix is a hard requirement). Non-sticky on desktop; **mobile gets E's sticky bottom CTA bar instead** (appears only while no form is in view; `env(safe-area-inset-bottom)` padded). |
| 1 | **Hero** | Night ground; **centered** Whorl behind (opacity ~.13, slow 60s drift, off under reduced-motion); grain overlay; **F-element: sparse starfield (~12 stars, CSS twinkle, off under reduced-motion)**. Mono kicker "A case, from first sign to found culprit"; H1 `Find the *culprit* behind your pet's symptoms.` (Newsreader ~90px desktop / 44px mobile, italic *culprit*); sub carries the "a lot isn't something a vet can work with" line; **CTA slot** (§5); then the **app-card stage**: bezel-less Home recreation (Mochi; Signal card + Today rows) with bottom fade mask + three orbit chips (chicken/itching/Signal — the salmon story), scroll-revealed. Mobile fold = wordmark→H1→sub→form→microline (complete pitch, verified in mock). |
| 2 | **Trust line** | Three quiet cells on night: "**Built on honest logging** — and the signals found in it" · "**Private by design** — no ads, no data sale" · "**The core is free** — and stays free." |
| 3 | **Exhibit 01 — the first sign** (cream) | Copy per D ("Pixel's throwing up a lot." / "Okay — what does *a lot* mean?"; two taps, no severity sliders). File-card with tab `LOGGED IN 4 SECONDS · TUE JUN 16`, vomit entry (LOGGED stamp) + treats entry (salmon bites, new Jun 14). |
| 4 | **Exhibit 02 — the record builds** (white) | "Memory blurs. The record doesn't." Week-strip file card (`16 MEALS · 2 SYMPTOMS · 0 GAPS / KEPT WITHOUT TRYING`); copy covers cats-by-design (grazing, offered-vs-eaten) + confirmation-over-entry. |
| 5 | **Exhibit 03 — the pattern** (night) | "You log the days. Culprit notices *what lines up*." Signal card at display scale (Pixel: "Vomiting tends to follow days with the new salmon treats." · Worth discussing · 4 of 5 times · 4 weeks · 96 events · "Why we're showing this"); teal glow; **F-element: faint star scatter on this band; the sparkline endpoint dot echoes the culprit star**. Verdict line: `FOUND: A PATTERN — NOT A DIAGNOSIS. THAT'S YOUR VET'S CALL.` Mid-page CTA button. |
| 6 | **Exhibit 04 — the handoff** (cream) | "Your vet gets *evidence*, not anecdotes." Report artifact (Pixel clinical summary, `READS IN ~60 SECONDS` stamp), 12-minute-appointment copy, "read in an exam room, not admired on a fridge" marginalia. Report contents must remain a subset of what the product actually renders (Dr. Chen rule). |
| 7 | **Case notes** (white) | "Sometimes the culprit is a food. Sometimes it's just *a clearer picture*." Honest-coda copy; **founder note card** (placeholder copy shipped behind PM sign-off — §10.1); honesty chips: `Free core, forever · No trial countdown · No diagnosis, ever · Your data stays yours`. |
| 8 | **Final CTA** (night) | Mono `Case file №2` / H2 "Yours. Opened *tonight*." / CTA slot / status pill `Coming soon to the App Store`. |
| 9 | **Footer** | Existing footer + disclaimer line (unchanged pages: /support /privacy /terms). |

**Brevity budget (E's discipline):** total ≤ ~6,300px @1440; every section earns its scroll; no FAQ; no section without either evidence or a CTA.

## 4. Design-system additions (tokens + components)

**Tokens** (add to `global.css`; mirror into `constants/theme.ts` only if the app later wants them): `--accent-deep:#009B86` (accent text on light), `--paper:#FBFAF6`, `--night-deep:#0E0D24`, `--btn-ink:#04241F` (text on teal — AA on `#00C2A8` at ~8.5:1), `--mono` stack (ui-monospace fallback; **Geist Mono via @fontsource is a nice-to-have** — §10.4).

**New components** (`src/components/`): `Whorl.astro` (inline SVG, size/opacity props) · `Starfield.astro` (n stars, seeded positions — deterministic, no runtime random) · `CtaForm.astro` (**the swap-slot**, §5) · `AppCard.astro` + `SignalCard.astro` + `TodayRows.astro` (recreated UI; copy as named constants for `nyx-voice` review) · `FileCard.astro` (tab prop) · `WeekStrip.astro` · `ReportPaper.astro` · `HonestyChips.astro` · `StickyCtaBar.astro` · `Reveal` pattern (one ~12-line IntersectionObserver in an Astro `<script>` — **bundled by Astro to a same-origin file; CSP `script-src 'self'` already permits this; inline `<script>` attributes are forbidden**).

**Motion rules:** reveal-on-scroll (opacity/translate only), whorl drift, star twinkle — all gated behind `prefers-reduced-motion`. Nothing scroll-scrubbed (F's scrollytelling explicitly out).

## 5. The CTA slot (three states, one component)

`CtaForm.astro` renders by build-time flag (`PUBLIC_CTA_STATE`):

| State | Renders | Trigger to flip |
|---|---|---|
| `waitlist` (now) | email input + `Get early access` → `POST /api/subscribe`; microline "One email when Culprit reaches the App Store. No newsletter, unsubscribe in a tap." | — |
| `preorder` | official **Pre-order on the App Store** badge (Apple artwork, clear-space rules) + real product-page URL + toolbox QR (desktop); waitlist demoted to a text link | App Review approval → pre-order published |
| `download` | official **Download** badge + QR; Smart App Banner meta added in `BaseHead` | Release day |

No Apple badge assets enter the repo until the `preorder` flip (compliance).

## 6. Waitlist backend (Buttondown, Path B — same-origin proxy)

- `wrangler.jsonc` gains `"main": "src/worker.ts"` (assets config unchanged; static requests keep being served by assets via `assets.not_found_handling` defaults — Worker only handles `/api/*`).
- `POST /api/subscribe`: honeypot field check → email syntax check → Buttondown REST (`BUTTONDOWN_API_KEY` via `wrangler secret`) → **303 redirect to `/thanks`** (success) or `/oops` (failure). Pure HTML form flow — works with zero client JS.
- `/thanks.astro`: confirmation + double-opt-in explainer ("check your inbox to confirm") + one optional segmentation ask (dog/cat · on a trial?) as a mailto or plain links (no extra storage v1). `/oops.astro`: calm retry.
- Basic abuse guard: same-IP rate limit via Workers rate-limiting binding or a 24h KV counter (cheap), plus the honeypot.
- **Privacy policy updated in the same PR** the form goes live: Buttondown named, email-only scope, double opt-in, unsubscribe/deletion path. (`nyx` Trust & Privacy lens requirement.)
- CSP: **unchanged** (`form-action 'self'` already covers same-origin POST).

## 7. SEO / meta / assets

- Title: `Culprit — food and symptom tracker for dogs and cats` (H1 stays the brand line); meta description updated to the evidence framing.
- New **OG image** (1200×630): night ground + Whorl + wordmark + one-line prop — export from the hero composition (asset PR).
- Favicon/sitemap/robots: already correct. `/elimination-diet-tracker` + guide pages: **post-v2 backlog**, not this plan.

## 8. QA gates (every PR + final)

Mobile fold complete at 390×844 · tap targets ≥44px · `prefers-reduced-motion` serves a complete page · no-JS path: form submits, page reads fully (reveals must not hide content without JS — set initial visible state when `script` absent via `noscript` class or IO-adds-hidden pattern) · AA contrast on all button/label pairs (the R1 grey-on-teal bug class) · Lighthouse ≥95 across categories · page weight ≤ ~350KB transfer (fonts already self-hosted/subset) · CSP intact (no inline scripts) · copy passes `nyx-voice` invariants (no exclamation marks, descriptive-never-causal, no diagnosis claims).

## 9. Execution plan — PR by PR (one concern per PR; prod stays coherent at every merge)

| PR | Title | Scope | Size |
|---|---|---|---|
| **v2-1** | Design-system groundwork | Tokens; `Whorl`, `Starfield`, `Reveal` pattern, btn/contrast fixes; no page-visible change beyond button ink. | S |
| **v2-2** | Waitlist backend + legal | Worker (`/api/subscribe`), secrets, `/thanks` `/oops` pages, privacy-policy Buttondown section. Form not yet on the page — endpoint verified with curl + a hidden test page. | M |
| **v2-3** | Hero + nav + trust line | New hero (whorl, starfield, H1/sub, `CtaForm` in `waitlist` state, app-card + chips), nav, trust band. Old sections below remain (same palette — page stays coherent). **The funnel goes live here.** | L |
| **v2-4** | The case (Exhibits 01–04) | Four exhibit sections + components (`FileCard`, `WeekStrip`, `SignalCard@scale`, `ReportPaper`); removes the old problem/how-it-works sections. | L |
| **v2-5** | Case notes + final CTA + footer | Coda, founder note (behind PM copy sign-off), honesty chips, final CTA band; removes the old pricing band. **Old page fully retired.** | M |
| **v2-6** | Mobile sticky CTA + motion polish | `StickyCtaBar`, reveal wiring, reduced-motion + no-JS passes, cross-device QA sweep. | S/M |
| **v2-7** | SEO/OG + analytics (optional) | OG image asset, meta/description, (if PM ratifies) Cloudflare Web Analytics + privacy-policy line. | S |
| *later* | **launch-1**: `preorder` flip | Badge assets + QR + state flip, the day approval lands. | S |
| *later* | **launch-2**: `download` flip | Badge swap + Smart App Banner + QR refresh on release day. | S |
| *optional* | **beta-1**: TestFlight checkbox | Adds the beta opt-in to `CtaForm` + Buttondown tag + invite-wave runbook — **only after PM capacity decision** (§10.2). | S |

Sequencing: v2-1 → v2-2 → v2-3 unlock the funnel fastest; v2-4/5 complete the story; v2-6/7 polish. Each merge deploys via the existing Cloudflare Git integration; verify preview before merge.

## 10. Open items for PM (recommend-and-proceed defaults)

1. **Founder-note copy** — placeholder ships hidden until signed off. Three depth options drafted for your edit (pick/rewrite one):
   - *Light:* "Built by a pet owner tired of guessing. The core is free because care shouldn't sit behind a paywall."
   - *Medium (mock default):* "It started the way most cases do: a pet owner at 2 am, trying to remember when the vomiting started. I'm building Culprit for myself and for owners like me — and the core is free because care shouldn't sit behind a paywall."
   - *Fuller:* medium + one sentence on the vet-partnership intent ("The goal was never to replace the vet — it was to walk in with better answers.")
   *Default if silent: ship Medium in v2-5.*
2. **TestFlight beta checkbox** — include (cap ~100, email-invited waves) or skip until post-launch? *Default: skip for v2; revisit at first waitlist review.*
3. **Cloudflare Web Analytics** — enable in v2-7 (cookieless, disclosed)? *Default: yes.*
4. **Geist Mono** — add the real mono face (~30KB) or keep system mono? *Default: add in v2-1 (the mono layer is load-bearing in this design).*
5. **Pre-order runway** at approval — 2–4 weeks (launch push) vs. immediate release. *Decision needed only at approval; funnel memo has the tradeoffs.*

## Persona sign-off

**Designer** ✓ (D treatment locked; whorl centered; brevity budget; motion gated) — **Marketing** ✓ (funnel on every screen; honest proof only) — **App Store Expert** ✓ (no badges pre-approval; swap-slot states; screenshots-to-store synergy preserved) — **Dir. of Eng** ✓ (zero-JS posture survives — Astro-bundled scripts only; Worker addition is additive; CSP untouched; one-concern PRs) — **Data Scientist** ✓ (all Signal copy descriptive with sample sizes) — **Dr. Chen** ✓ (report shown ⊆ report shipped; verdict line names the vet as decision-maker) — **Jordan/Sam** ✓ (mobile fold: act in one thumb; cat case is load-bearing) — **QA** ✓ (§8 gates; three CTA states are designed states) — **Trust & Privacy** ✓ (form ⇒ same-PR policy update; double opt-in; honeypot over CAPTCHAs) — **Product Owner** ✓ (B-282 reversal recorded; follow-ups for the `project-nyx` backlog: beta runbook, guide pages, OG asset, analytics disclosure — to be filed by PM alongside B-273 close-out).
