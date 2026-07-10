# Culprit — Website CTA Strategy Memo (v0.1, Pre-Approval)

_Research memo by the App Store Expert lens (web-verified against Apple's official docs), feeding the 2026-07-09 website-revamp roundtable. Citations at foot._

## TL;DR / Recommendation

**v0.1 primary CTA: an email waitlist ("Get early access").** Reverse the B-282 deferral — email is the only funnel asset we own; everything else (TestFlight roster, pre-order pipeline) lives inside Apple's systems and cannot be exported or re-targeted. **Optional secondary CTA: a capped TestFlight beta, gated behind that same email form** — the founder's idea (c) is fully legal and is Apple's designed channel, but run it email-gated rather than as a naked public link, because public-link testers are *anonymous to us*. **At approval, the bridge is App Store pre-order** (not possible today — requires an approved build): a real `apps.apple.com` URL, the official "Pre-order on the App Store" badge, and every conversion becomes a guaranteed auto-downloaded day-one install. **At release, swap to the "Download on the App Store" badge + Smart App Banner + QR code.** No official badge of any kind may be used on the site today — the current no-badge state is the only compliant one.

### What works today vs. what requires approval

| Capability | Available now (pre-approval)? |
|---|---|
| Email waitlist | Yes — nothing Apple-dependent |
| TestFlight public link / email invites | Yes, after **Beta App Review** of the first external build (~24–48h; not full App Review) |
| Pre-order + real App Store URL | **No — requires the version approved by App Review** (sitting at "Pending Developer Release") |
| Any official Apple badge | No. Pre-order badge only once pre-order is live; Download badge only once released |
| Smart App Banner, QR to product page | No — require a published product page (pre-order or release) |

## 1) TestFlight external testing — verdict on the founder's idea (c)

- External testers: up to **10,000**, invited **by email or public link**; internal testing capped at 100 team members; up to 100 active builds.
- **Beta App Review** required for the first external build (subsequent builds often skip full review). Community-tracked turnaround ~24–48h first build.
- **Policy:** Guideline 2.2 — betas must be intended for public distribution, comply with the guidelines, and **cannot be distributed in exchange for compensation of any kind**. Publicly marketing the link is explicitly sanctioned (Apple: "include a public link in your marketing communications").
- **The anonymity catch (load-bearing):** public-link joiners show as **anonymous** in App Store Connect (no name/email — install/session/crash data only). Email-invited testers remain identified. A naked public link acquires users we can never contact again.
- **Build expiry:** 90 days — a re-shipping treadmill; the beta goes dark if we stop shipping.
- **What accrues to launch: nothing.** TestFlight installs are not App Store downloads (no chart credit) and beta testers **cannot leave ratings/reviews**. At launch the store build installs over TestFlight and local data carries over if schemas stay migration-safe — important for a tracker whose value is accumulated logs.
- Normal practice: WhatsApp, Chrome, Edge, Bluesky all run public TestFlights; public directories of links exist.

**Verdict:** Legal — yes, unambiguously. Possible today — yes. Wise — **only as a secondary, capped CTA** (email-gated invites, cap 50–200, invite in waves). As the primary CTA it's wrong: two-app install friction, anonymous signups, 90-day treadmill on a solo founder, and none of it banks toward launch.

## 2) App Store pre-order — the real bridge (post-approval only)

- **Gate:** publishable only after App Review approves the version ("Pending Developer Release" → "Release This Version" → pre-order).
- **Window:** release 2–180 days after publishing pre-order (new app).
- **Real public URL:** yes — a limited product page goes live on the App Store, discoverable in search; custom product pages / PPO work during pre-order.
- **Fulfillment:** auto-download on release day + notification to everyone who pre-ordered.
- **Official badge:** "Pre-order on the App Store" exists and is swapped for the Download badge at release (a guidelines requirement).
- **Launch ranking:** pre-orders convert to downloads on day one (Appfigures), concentrating demand; indie case studies report top-chart appearances and ~80% pre-order→install conversion. Apple documents the mechanics but does not promise chart placement — industry-observed, not guaranteed.

**Verdict:** viable and better than TestFlight as the public-facing bridge — but only after approval. Publish with a 2–4 week runway if a coordinated launch push is wanted; skip if we'd rather release the moment we're approved.

## 3) Badges & marketing rules (bake into the design system now)

- No "coming soon" badge exists. Only "Download on the App Store" and "Pre-order on the App Store," each usable only when true.
- Artwork only from Apple's marketing guidelines page / App Store Marketing Tools (now at toolbox.marketingtools.apple.com — generates badges, short links, and QR codes once a product page exists).
- Clear space = ¼ badge height (1/10 in constrained layouts); min height 40 px onscreen; never modify/angle/animate; one badge per layout; never translate "App Store."
- **Device imagery:** show app UI inside **Apple-provided product bezels**, unmodified — or no bezel at all. Never a fake/generic frame in production. Framed shots built to store-screenshot constraints (Guideline 2.3.3: app in use) serve site and store both.

## 4) Funnel mechanics

- **Smart App Banner** (`<meta name="apple-itunes-app" content="app-id=...">`): native Safari banner; inert until the app is published (won't render for unavailable apps), so add at pre-order/launch and verify.
- **Desktop visitors:** the web App Store (Nov 2025) is browsable but still can't install — so the desktop pattern stays: badge/link + **QR code** from Apple's toolbox for the phone handoff.
- **Conversion calibration:** median waitlist landing pages convert ~11% of visitors; waitlist→activation averages ~50% if launch lands within a month of signup, under 20% past three months — keep the waitlist window short. Pre-orders convert near-perfectly by construction (~80% observed after cancellations).

## 5) Listing synergy

- Build screenshot assets once, in Apple bezels, to Guideline 2.3.3 constraints (app in use, not splash/title art); reuse on site and store (B-269).
- App Review checks: **support URL must work with an easy contact path** (Guideline 1.5); **privacy policy link mandatory** in metadata and in-app (5.1.1) — the legal drafting is on the critical path for both Beta App Review and submission.
- Marketing URL is optional; site copy must never claim more than the app does (2.3 Accurate Metadata): "track, spot patterns, share vet reports" — never "diagnoses."

## The phased plan

- **Phase 0 (now):** waitlist primary; optional "Want to test the beta?" checkbox → email-invited, capped external TestFlight group once the first external build clears Beta App Review. Keep builds inside the 90-day window; keep schemas migration-safe.
- **Phase 1 (at approval):** publish pre-order (2–4 week runway) → swap hero slot to the official pre-order badge + toolbox QR; add Smart App Banner and verify; email the waitlist to pre-order.
- **Phase 2 (release day):** swap to the Download badge everywhere; email the list; prompt TestFlight testers to install the store build and *then* ask for ratings (beta usage generates none).

## Verdicts

| Option | Legal? | Feasible pre-approval? | Wise? |
|---|---|---|---|
| (a) Passive "coming soon" | Yes | Yes | **No** — visitor intent evaporates; no owned asset |
| (b) Email waitlist | Yes | Yes | **Yes — primary CTA** |
| (c) Signup → TestFlight distribution | **Yes — Apple-sanctioned** (Guideline 2.2) | Yes (~24–48h Beta App Review) | **Secondary only** — email-gated, capped |
| Pre-order | Yes | **No — needs App Review approval** | **Yes — the designated bridge at approval** |

## Key citations

Apple: developer.apple.com/testflight/ · TestFlight overview + Invite external testers (App Store Connect Help) · App Review Guidelines (2.2, 1.5, 2.3.3, 5.1.1) · developer.apple.com/app-store/pre-orders/ · Publish for pre-order (ASC Help) · WWDC23 "What's new in App Store pre-orders" · App Store Marketing Guidelines · toolbox.marketingtools.apple.com/app-store/ · Smart App Banners (WebKit docs). Practice/data: WhatsApp/Chrome/Edge/Bluesky public TestFlights · runway.team/appreviewtimes · Appfigures sales-metrics KB · Apptamin pre-order case studies · GetWaitlist benchmarks · Waitlister launch statistics · Lenny's Newsletter on waitlist conversion · 9to5Mac on the web App Store.
