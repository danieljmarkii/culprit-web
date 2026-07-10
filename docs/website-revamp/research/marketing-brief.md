# Culprit — Site Revamp Marketing Brief

_Research brief by the Marketing Dept. guest lens (web-grounded, repo-grounded), feeding the 2026-07-09 website-revamp roundtable. Citations abbreviated; evidence-strength notes at foot._

## 0. Where the site stands today

The current one-pager is on-voice and structurally sound — hero → problem → how-it-works → free-promise — but has **no conversion mechanism**: the "CTA" is a decorative coming-soon pill; no email capture, no product visual, no FAQ, no trust signal. Constraints that shape recommendations:

- **Zero client JS by design**, self-hosted fonts, strict CSP (`public/_headers`): `default-src 'self'; form-action 'self'; script-src 'self'`. Any form must respect or deliberately amend this.
- Deployed as a **Cloudflare Worker with Static Assets** (`wrangler.jsonc` assets-only today — a `main` worker script can be added without re-platforming).
- The privacy page shell explicitly promises to name any service we add — whatever email vendor we pick becomes a privacy-policy line item, in the same PR.
- Brand rules: no exclamation marks, no medical/diagnostic claims (Guideline 1.4.1 — track and notice, never diagnose).

## 1. What the evidence says

- **Hero formula (2025–26 consensus):** five elements above the fold — value-prop headline, supporting subline, single primary CTA, real product visual, one trust signal. Outcome-first framing beats feature-first; the best-evidenced conversion lever is **clarity of the value proposition** (MECLABS/CXL). For problem-aware owners who don't know tracking apps exist: outcome-first headline, problem named in the subline.
- **Mobile-first fold:** H1 + subline + one CTA + screenshot in the first viewport, CTA in thumb reach, ≥44px targets. Mobile is ~54–64% of traffic. The zero-JS/self-hosted speed discipline is a conversion asset — keep it.
- **Section order:** Hero → Problem → How it works → Proof/trust → Offer/pricing → FAQ → final CTA. The existing order already matches; the revamp is *insertion* (visual proof, trust, FAQ, CTAs), not reordering. Repeat the CTA at hero, mid-page, end.
- **Pre-launch social proof substitutes:** real screenshots beside the form; credibility framing that is *true* ("built around the elimination-trial process vets actually prescribe"); founder story; specific quality signals over vanity counts; waitlist count only once non-embarrassing. **Do not** write "vet-approved/vet-designed" unless a named vet stands behind it.
- **Calibration:** median landing-page conversion 6.6% (Unbounce, 41k pages); focused pre-launch waitlist pages claim 10–20% (vendor ceiling). Plan around 5–15% of warm traffic.
- **FAQ:** 5–8 questions, below main content, objection-handling first (free? diagnose? iPhone-only? data? launch? vet sign-off?). FAQ rich-result schema is largely dead (Google restricted it in 2023) — write for humans, long-tail queries, and AI answer engines.

## 2. Prioritized requirements

**Must have:** (1) one-field waitlist email form above the fold with an honest privacy microline; (2) real product visuals (2–3 app surfaces) in/under the hero; (3) a trust band that's true; (4) mobile-first fold; (5) FAQ; (6) repeated + final CTA; (7) **privacy policy updated in the same PR** that adds the form (vendor named, email-only, double opt-in, deletion path).

**Should have:** (8) diet-trial wedge section (dedicated `/elimination-diet-tracker` page later); (9) SEO-aligned title tags with the brand-voice H1s kept; (10) founder note (3–4 calm sentences); (11) signup confirmation page asking one optional segmentation question (dog or cat? on a trial?); (12) sharpened free-forever band; (13) 2–3 content pages later as the SEO beachhead (one with a printable trial-log PDF as lead magnet).

**Could have:** cookieless analytics (already planned — disclose); referral mechanics (**skip** — off-brand); press kit; `/for-vets` (post-launch); FAQ schema (harmless, no payoff).

## 3. Email capture — recommendation: Buttondown

| Option | Cost at waitlist scale | Double opt-in | Fit with zero-JS + CSP |
|---|---|---|---|
| **Buttondown** ✔ | Free ≤100 subs, $9/mo ≤1,000 | **Default-on** | Plain HTML form POST endpoint, no JS |
| Kit (ConvertKit) | Free to 10k | Configurable | JS-embed-oriented; "Powered by Kit" badge; brand mismatch |
| Loops.so | Free ≤1k contacts, then $49/mo | Yes | Nice API, steep second tier |
| Resend Audiences | Free ≤1k | DIY | Most code to own |
| Tally embed | Free | No (form tool, not ESP) | iframe/JS breaks the zero-JS/CSP posture |
| DIY Worker + KV/D1 | ~$0 | You build everything | Highest effort, least capability |

Integration paths:
- **Path A (ship this week):** plain HTML form POST to Buttondown's embed-subscribe endpoint. Zero JS. One CSP edit: `form-action 'self' https://buttondown.com`.
- **Path B (preferred, ~half a day):** add a `main` Worker to `wrangler.jsonc`, expose same-origin `POST /api/subscribe` calling Buttondown's REST API server-side (API key as a Worker secret + honeypot field). CSP stays fully locked; the browser never talks to a third party; vendor swappable later.

Why Buttondown: double opt-in is the default (cleanest GDPR consent evidence; effectively required for German recipients), privacy posture we can name proudly in the policy, markdown emails suit the voice, $0→$9/mo covers pre-launch. Policy line: "When you join the waitlist, your email address is stored with Buttondown, our email service, and you confirm by clicking a link before you're subscribed. Unsubscribe anytime; we delete the list data on request."

## 4. SEO / demand notes (SERP-composition pass, no volume tool)

- **App-intent queries are winnable:** "dog food allergy tracker app", "pet symptom tracker app" return small app one-pagers, not authority sites. Closest rivals both weak: allergic.pet (web-only, no iOS app, no proof) and HotSpotter (vet-founded but iPhone app still "coming soon"). "Native iOS, free core, vet report" wedges cleanly against every result.
- **Informational head terms are not winnable** ("elimination diet dog how to track" — owned by VCA/PDSA/FirstVet + food brands). Target the long-tail *tracking* variants.
- **Symptom-diary queries are a content gap:** "cat vomiting diary" returns advice articles that all *recommend keeping a log* — no tool ranks.

| Page | Title tag | H1 |
|---|---|---|
| `/` | Culprit — food and symptom tracker for dogs and cats | Find the culprit behind your pet's symptoms. |
| `/elimination-diet-tracker` | Elimination diet tracker for dogs and cats — Culprit | Eight weeks is a long time to keep in your head. |
| `/guides/food-trial-diary` | How to keep a food trial diary for your dog (free printable log) | The food trial diary your vet will thank you for. |
| `/guides/cat-symptom-diary` | Cat symptom diary — what to write down before the vet visit | When your cat keeps throwing up, write this down. |

## 5. Hero copy candidates (all: calm, specific, no exclamation marks, no diagnosis claims)

1. **Name/detective — BET #1 (homepage default).** "Find the culprit behind your pet's symptoms." / "Log meals and symptoms in seconds. Culprit notices what tends to line up, and turns weeks of notes into a report your vet can use."
2. **Memory/record — BET #2 (strongest challenger).** "Stop trying to remember when the itching started." / "Two taps when it happens, and it's kept — meals, symptoms, photos. A record that's there when your vet asks."
3. **Diet-trial wedge — BET #3 (wedge page).** "On an elimination diet? Keep the whole trial straight." / "Every meal, treat, and slip-up, logged in seconds — so the eight weeks actually count."
4. Vet partnership: "Your vet will ask what changed. Have the answer."
5. Vet partnership, outcome-tilted: "Walk into the vet with more than a hunch."
6. Pattern: "You log the days. Culprit finds what lines up."
7. Outcome/relief: "From 'something's off' to 'here's what we noticed.'"
8. Free (closing band, not hero): "A clear record of your pet's health. Free, for every pet."

## 6. Pre-launch vs. launch states

| Element | Pre-approval (now) | Pre-order (optional interim) | Launch |
|---|---|---|---|
| Primary CTA | Waitlist form | Official pre-order badge (form demoted to secondary) | Download badge + QR |
| Status | "Coming soon" demoted to a status line beside the form | "Pre-order on the App Store" | Smart App Banner; retire "coming soon" everywhere |
| Proof | Screenshots + true trust band + founder note | same | Add real ratings/press as they arrive |
| Email | Waitlist ("one email at launch") | Email list → pre-order push | Launch announce, then low-frequency or retire |

Design the hero so each transition is a **component swap, not a redesign**: one CTA slot, one status slot, one proof slot.

## Evidence strength

**Strong:** Unbounce benchmarks; mobile traffic share; FAQ-schema deprecation; Apple pre-order/Smart-Banner mechanics; ESP pricing/opt-in facts; competitor gaps (live pages fetched). **Moderate:** clarity-beats-persuasion, outcome-first copy (MECLABS/CXL). **Thin:** hero five-element checklists; 10–20% waitlist rates (vendor content — A/B test headlines 1 vs 2 once analytics exist). SEO notes are SERP-composition observations, not volume data.
