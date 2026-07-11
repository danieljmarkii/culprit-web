# culprit-web

The web presence for **Culprit** — the marketing landing page plus the
support / privacy / terms pages the App Store submission requires. Served at
**[getculprit.app](https://getculprit.app)**.

Static [Astro](https://astro.build) site, deployed on **Cloudflare Pages**.
Ships zero client JS by default — fast, calm, and on-brand.

Spec: `docs/culprit-website-requirements.md` in `project-nyx`. This repo is
**Phase 1 — "Shell + gate"**.

## Status

| Page | State |
|---|---|
| `/` | Landing, **coming-soon** state with **waitlist email capture** (v2-2; App Store CTA replaces it at launch) |
| `/support` | **Live** — contact + account-deletion note (the App Store submission gate) |
| `/privacy` | **Shell** + waitlist data note — real policy lands in Phase 2 (B-229) |
| `/terms` | **Shell** — real terms land in Phase 2 (B-230 / B-270 disclaimer) |
| `/thanks` `/oops` | **Live** — noindex waitlist success / error pages (no-JS form lands here) |

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview  # serve the build locally
```

## Stack & structure

- **Astro** static output, **@astrojs/sitemap** for `sitemap-index.xml`.
- Brand tokens in `constants/theme.ts`, mirrored to CSS custom properties in
  `src/styles/global.css`. Inherited from the app's design system
  (`project-nyx constants/theme.ts` + the B-275 "Moon & Signal" palette):
  teal `#00C2A8` (the one interactive accent), midnight indigo `#13112E`
  (the brand/night ground), **Geist** body / **Newsreader** display.
- Fonts self-hosted via Fontsource (no third-party requests).
- Brand assets vendored under `src/assets/brand/` from
  `project-nyx docs/brand/culprit-icon/`.
- Pages in `src/pages/`, layouts in `src/layouts/`, components in
  `src/components/`.

## Brand & voice

- **Brand hygiene (§6.4):** no served string, meta tag, email, or filename
  says "Nyx" — everything is **Culprit**.
- **Voice:** calm, plain language, **no exclamation marks**, and **no
  medical/diagnostic claims** (Guideline 1.4.1 — Culprit helps you *track and
  notice*, it does not diagnose or treat).

## Regenerating brand assets

Favicons and the 1200×630 OG card are generated from the brand kit:

```bash
npm run assets   # -> public/favicon.svg, favicon-32.png, apple-touch-icon.png, og-image.png
```

The OG card renders the wordmark in Newsreader via `sharp`, which resolves
fonts through fontconfig — so the Geist/Newsreader faces must be registered
(convert the Fontsource `.woff2` to `.ttf` and drop them in a fontconfig dir).
The committed `public/*.png` outputs mean you only need this when the brand
changes.

## Waitlist email capture (v2-2)

The hero `CtaForm` (in its `waitlist` state) captures emails before the app
ships. First-party throughout — the page still makes zero third-party requests
and the locked CSP is untouched (`form-action 'self'` covers the same-origin
POST; the form needs no client JS).

- **Form → Worker.** The plain HTML form posts to a same-origin `POST
  /api/subscribe` handled by `src/worker.ts`, which runs alongside the static
  assets (assets are matched first; only `/api/subscribe` reaches the Worker).
- **Storage (source of truth).** Signups land in **Cloudflare D1**
  (`subscribers`, see `migrations/`) — normalized, de-duped (`INSERT OR
  IGNORE`), with `created_at`, `source`, `country`.
- **Notification.** Best-effort **Resend** email to the founder per signup.
  Storage and notification are independent — a signup only fails (→ `/oops`) if
  both fail.
- **Flow.** Success → `303 /thanks`; bad email / total failure → `303 /oops`. A
  honeypot field drops obvious bots.

### Setup (Cloudflare + Resend)

```bash
# D1 database (already created; id is in wrangler.jsonc). To recreate:
npx wrangler d1 create culprit-subscribers      # paste id into wrangler.jsonc
npm run db:migrate                              # apply migrations/ to the remote DB

# Founder notification (optional — storage works without it):
npx wrangler secret put RESEND_API_KEY          # Resend API key (verify getculprit.app first)
npx wrangler secret put NOTIFY_TO               # recipient (kept out of git)
```

Export the list:

```bash
npx wrangler d1 execute culprit-subscribers --remote \
  --command "SELECT email, created_at, country FROM subscribers ORDER BY created_at"
```

`PUBLIC_CTA_STATE` (build-time) flips the CTA: `waitlist` (default now) →
`preorder`/`download` at launch. Buttondown (v2 spec §6) is an easy later swap
if double opt-in / one-click unsubscribe become worth it.

## Deploy (Cloudflare Workers Static Assets)

Deployed as a Cloudflare **Worker with Static Assets** (Cloudflare's current
recommended path for static sites; equivalent free static hosting to Pages).
Config is `wrangler.jsonc` — it points static assets at `./dist`. Connected to
this repo via Workers Builds; every push to the production branch runs:

- **Build command:** `npm run build` → `./dist`
- **Deploy command:** `npx wrangler deploy`

`_headers` (CSP/security + cache) and `_redirects` (relative redirects only)
live in `public/` and are copied into `./dist`, where Static Assets honours
them. Clean URLs (`/support` → `support.html`) come from `assets.html_handling`.

- **Custom domains** (Worker → Domains tab): `getculprit.app` (apex, canonical)
  and `www.getculprit.app`.
- **www → apex:** must be a zone-level **Redirect Rule** — Workers Static
  Assets `_redirects` allows same-host (relative) URLs only, so the cross-host
  www → apex redirect can't live there. Dashboard → **Rules → Redirect Rules →
  Create**: if `Hostname equals www.getculprit.app` → dynamic redirect to
  `concat("https://getculprit.app", http.request.uri.path)`, status 301.
- **TLS:** automatic (`.app` is HSTS-preloaded, so HTTPS is forced by design).

> Prefer Cloudflare Pages instead? Delete `wrangler.jsonc`, create a **Pages**
> project (Connect to Git → Pages), and set build command `npm run build` /
> output dir `dist`. The `_headers`/`_redirects` files work there too.
