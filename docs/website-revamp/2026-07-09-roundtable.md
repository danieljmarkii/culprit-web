# getculprit.app Revamp — Product-Team Roundtable

**Date:** 2026-07-09 · **Convened by:** PM · **Facilitated by:** Claude
**Attendees (personas, per `project-nyx docs/personas.md`):** Sr. Product Designer (chair for this work), Dir. of Engineering, Sr. Data Scientist, Dr. Alex Chen (veterinarian), Jordan (dog owner), Sam (cat owner), Sr. QA, Product Owner, Trust & Safety / Privacy.
**Invited guests (PM's ask):** **Marketing Dept.** (growth/brand) and the **App Store Expert** (the lens used in the B-275 icon session, proposed there for formalization).

**Inputs on the table:**
1. The live Phase-1 site (deliberately "shell + gate": text-only, coming-soon pill, no funnel) + before-screenshots.
2. Design research brief — 17 reference sites captured & torn down (Flighty, Copilot, Retro, Halide, Things, Linear, Raycast, Vercel, Stripe, Oura, Headspace, Fi, Farmer's Dog, Sundays, Amie, (Not Boring); Calm blocked automation).
3. App Store Expert memo — TestFlight / pre-order / badge rules, verdicts + citations.
4. Marketing brief — conversion patterns, email-capture options, SEO scan, hero copy candidates.
5. Brand system (B-275 "Moon & Signal"), `nyx-voice` invariants, `clinical-guardrails`, the in-app onboarding `ValuePreview` precedent (recreated app UI as marketing surfaces; descriptive-never-causal Signal copy).

---

## 1. What the site is *for* (agreed framing)

Two jobs, in priority order once the app is approved:

- **Job 1 — the funnel.** Convert visitor intent into an owned or bankable asset: today an email; at approval a pre-order; at launch an install. The current page converts nothing by design (Phase 1 was the gate, not the funnel) — that phase is over.
- **Job 2 — the brand's first impression.** The site is the only place a worried owner (or a curious vet, or an App Review reviewer) meets Culprit before the app. It must *show* calm competence, not claim it.

**Marketing:** "Every visitor today evaporates. The single change that matters most is a real CTA; everything else is amplification."
**App Store Expert:** "And the CTA architecture must be a swap slot, because it changes twice on a fixed schedule: waitlist → pre-order badge (at approval) → download badge (at release). Design the slot once."

## 2. Brainstorm — what could be on the site (inventory)

Collected across the table, roughly ordered hero → footer. ✅ = consensus must-have for v2 · ◐ = should-have / direction-dependent · ○ = later/optional.

| # | Element | Champion(s) | Notes |
|---|---|---|---|
| 1 | ✅ Hero with **real product UI** | Designer, Marketing, Jordan | The #1 gap. Every credible app site leads with product evidence. Recreated UI (the `ValuePreview` discipline) until real store screenshots exist. |
| 2 | ✅ **Waitlist email form** as primary CTA | Marketing, App Store Expert | One field + one honest privacy line. Reverses the B-282 deferral (PM to ratify). Buttondown via same-origin Worker proxy keeps CSP locked and zero third-party JS. |
| 3 | ✅ CTA **swap-slot architecture** | App Store Expert, Dir. of Eng | One hero slot: form (now) → pre-order badge (approval) → App Store badge + Smart App Banner + QR (launch). No official badge before it's true — current no-badge state is the only compliant one. |
| 4 | ✅ **Signal chapter** — the differentiator, shown | Data Scientist, Designer | The Signal card at display scale: one teal moment on the night ground. Copy stays descriptive ("tends to follow"), never causal — same rule as the product. |
| 5 | ✅ **Vet-report artifact** at scale | Dr. Chen, Designer | "Proof by artifact" (Halide's move): show the actual clinical summary, beautifully. Must match what the product actually renders — no decorated fiction. Dr. Chen: "If the report on the site would embarrass me in clinic, the site is lying." |
| 6 | ✅ **How it works** (3 steps, kept) with UI per step | Jordan, Designer | Keep the existing 01/02/03 — extend into the "figure numbering" motif (Fig. 01 — the week's log…). |
| 7 | ✅ **Honesty chips / free-forever band** (kept, sharpened) | Marketing, Jordan | "Free core, forever · No trial countdown · No diagnosis, ever" — guarantee-chips reborn in our register; doubles as objection handling. |
| 8 | ✅ **FAQ (5–8 items)** | Marketing, QA, Trust & Privacy | Objection handling + long-tail search + the public home of our 1.4.1 honesty ("Does it diagnose? No —…"). |
| 9 | ✅ **Mobile fold** = complete pitch in screen one | Jordan, Marketing | Wordmark → H1 → one-line sub → one thumb CTA (form) → one proof line. Jordan's 10-second test applies to the page: "Can I tell what this is and act, one-handed, while Mochi is being weird?" |
| 10 | ◐ **Trust band** — only what's true today | Marketing, Dr. Chen | Pre-launch we have no laurels/ratings/press. True today: built around the elimination-trial process vets prescribe; privacy-first (no ads, no data sale); free core. A founder line is honest proof. **Do not** write "vet-approved/vet-designed" unless a named vet stands behind it. Slot upgrades at launch (rating → press → laurels, in that order of likelihood). |
| 11 | ◐ **Chip orbit** around hero UI (Flighty, sedated) | Designer | Static matte log chips ("Salmon bowl · 6:10 pm", "Itching · mild") + exactly one teal chip ("Signal: itching tends to follow chicken"). The brand promise drawn as a diagram. Data Scientist signs off on the copy pattern. |
| 12 | ◐ **Cats and dogs both visible** | Sam | Current site is species-silent (fine) but v2's UI shots must not be dog-only. Sam: "If every screen says Mochi the Frenchie, I assume it's a dog app." Show a cat surface (Pixel) somewhere load-bearing. |
| 13 | ◐ **Founder note** | Marketing | 3–4 calm sentences, why this exists. Pre-launch trust without fabricating proof. |
| 14 | ◐ **Email-gated, capped TestFlight beta** as secondary CTA | App Store Expert | Legal & sanctioned (Guideline 2.2; Beta App Review; no compensation). Email-invite (never naked public link — anonymous testers), cap 50–200. **PM decision** — it's a real support/re-ship commitment (90-day build expiry treadmill). |
| 15 | ◐ Diet-trial **wedge section** | Marketing, Jordan | Speaks to the highest-motivation visitor ("the eight weeks actually count"). Homepage section now; dedicated `/elimination-diet-tracker` page later. |
| 16 | ○ Content/SEO pages (`/guides/...`) + printable trial-log PDF | Marketing | Winnable SERPs (app-intent + diary queries). Phase 3+, not the revamp. |
| 17 | ○ `/for-vets` one-pager | Dr. Chen | Post-launch. The report IS the vet pitch. |
| 18 | ○ Press kit, love-wall (Things-style), laurels row | Marketing | Slots designed now, filled when real. |

**Cut on sight** (register violations, unanimous): urgency bars, discount mechanics, email-capture modals, inflated counts, referral gimmicks, star-shouting, cutesy pet iconography near clinical surfaces, any second accent color.

## 3. Conflicts surfaced (Persona Conflict Protocol)

1. **Device frames vs. bezel-less UI.**
   > **Designer:** Bezel-less UI dissolving into the night ground (Linear's move) is the calmest, most brand-owned presentation.
   > **App Store Expert:** For any *hardware* depiction Apple's marketing rules require unmodified Apple-provided bezels; and store screenshots (B-269) will need framed shots anyway — build assets once.
   > **Resolution (no PM needed):** Both, by surface. Bezel-less UI cards on brand-night sections (no hardware depicted → no bezel rule in play); Apple-official bezels for any literal device shot and for everything destined to be reused on the store listing. Never a generic/fake frame in production. *(Mocks use an illustrative frame placeholder, swapped at execution.)*
2. **Motion ambition vs. zero-JS discipline.**
   > **Designer:** The era's pages breathe — scroll-revealed sections, UI that assembles.
   > **Dir. of Eng:** The site ships zero client JS by design; no Framer/Rive/Lenis; CSP stays `script-src 'self'`.
   > **Resolution (no PM needed):** CSS-only ambience (grain, gradients, transitions) + one tiny self-hosted IntersectionObserver for reveals (~15 lines), `prefers-reduced-motion` honored throughout. Nothing external. Cap page weight: fonts already self-hosted; images optimized; LCP element is text or an inline-SVG composition, never a hero video. |
3. **Beta CTA vs. founder capacity.**
   > **App Store Expert:** Email-gated capped beta converts the most motivated visitors into feedback + launch-day advocates.
   > **Dir. of Eng / QA:** It's a standing commitment — re-ship inside every 90-day expiry, triage feedback, keep schema migration-safe so beta data survives to launch.
   > **PM decision needed:** include the beta checkbox in v0.1, and if so, what cap? *(Recommend-and-proceed default: include, cap ~100, invite in small waves.)*
4. **How loud may the detective concept get?**
   > **Marketing:** The name is the un-owned asset; lean in — it's what makes us memorable.
   > **Dr. Chen / Sam:** Noir-crime aesthetics near a sick pet are a category error (the icon session already rejected "chalk outline" for exactly this). No victims, no crime-scene furniture.
   > **Resolution (no PM needed):** The detective register is **forensic-calm, not crime-noir**: evidence, figures, the Whorl-as-fingerprint, "the pattern shows itself." The culprit is always a *food or a pattern*, never framed around the pet's suffering. Direction C (below) pressure-tests exactly this line; the PM's mock reaction is the real ratification. |

## 4. The three directions to mock (divergent by intent)

All three share the agreed spine (§2 ✅ rows: real UI, waitlist slot, Signal chapter, report artifact, steps, honesty chips, FAQ, mobile fold) and the brand system (night `#13112E` / moonlight `#F2EEE4` / one teal `#00C2A8` / Newsreader + Geist). They diverge on *how the brand meets the visitor*:

| | **A — "Moonlit Signal"** | **B — "Clear Evidence"** | **C — "The Case File"** |
|---|---|---|---|
| One-liner | The night, inhabited. Oura's register on our indigo: editorial serif at display scale, the Whorl as ambient hero texture, bezel-less UI dissolving into night. | Daylight clarity. Light-first, product-forward: phone in hand at the top, figure-numbered steps, trust band, the report at scale. The honest catalog. | The name, told. A scrolling case file — exhibits, figures, mono annotations — that walks one real-shaped case from "something's off" to "found it." |
| Register benchmark | Oura / Raycast (warmed) | Things / Copilot / Farmer's Dog | Linear's spec-numbering + editorial serif; forensic-calm |
| Hero | Night; giant faint Whorl; Newsreader light ~96px with italic flourish; bezel-less Home UI + sedated chip orbit | Cream/light; tilted oversized UI card (Things move) or in-frame phone; proof microline | Night→cream narrative scroll; "Case №1" file furniture; the Whorl as the fingerprint it is |
| Emotional bet | Premium calm — "this app won't stress me" | Competence + evidence — "this will actually work" | Memorability + meaning — "this brand gets my situation" |
| Main risk | Mood over evidence; somber | Category-normal; least distinctive | Cleverness creep toward noir; longest build |

**Why these three:** they pull maximally apart on the axis the PM must actually choose (brand-immersive vs evidence-clear vs concept-led) while every *component* (chips, report artifact, trust band, FAQ, CTA slot) stays interchangeable after the pick — convergence can mix-and-match without rework.

## 5. Decisions queued for PM (with recommend-and-proceed defaults)

| # | Decision | Default |
|---|---|---|
| D-1 | Direction pick (A / B / C / blend) | React to mocks first |
| D-2 | Ratify waitlist-primary CTA (reverses B-282); Buttondown via Worker proxy | **Yes** |
| D-3 | Email-gated capped TestFlight beta as secondary CTA? | **Yes, cap ~100** (waves) |
| D-4 | Hero copy angle | Keep "Find the culprit…" (Bet #1); "Stop trying to remember…" held as challenger |
| D-5 | Execute in this session vs. execution-plan handoff | Plan ratified first, then build |

## Persona sign-off (on this roundtable's outputs, not the final design)

Designer ✓ (three directions honor the system; type scale finally at benchmark) — Marketing ✓ (funnel-first; proof honest) — App Store Expert ✓ (CTA slot architecture; no premature badges; beta done the compliant way) — Dir. of Eng ✓ (zero-JS posture survives all three; Worker proxy fits `wrangler.jsonc`) — Data Scientist ✓ (descriptive-only Signal copy everywhere) — Dr. Chen ✓ (report shown must equal report shipped; no diagnosis claims) — Jordan ✓ (mobile fold = 10-second test) — Sam ✓ (a cat in a load-bearing screen; no cutesy) — QA ✓ (three CTA states are designed states; reduced-motion; 44px targets) — Trust & Privacy ✓ (form ⇒ same-PR privacy-policy update; double opt-in; nothing third-party in the browser) — Product Owner ✓ (B-273 elevated; B-282 reversal flagged for ratification; follow-ups filed in the execution plan).
