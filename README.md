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
| `/` | Landing, **coming-soon** state (no App Store badge yet — decision D4) |
| `/support` | **Live** — contact + account-deletion note (the App Store submission gate) |
| `/privacy` | **Shell** — real policy lands in Phase 2 (B-229) |
| `/terms` | **Shell** — real terms land in Phase 2 (B-230 / B-270 disclaimer) |

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

## Deploy (Cloudflare Workers Static Assets)

Deployed as a Cloudflare **Worker with Static Assets** (Cloudflare's current
recommended path for static sites; equivalent free static hosting to Pages).
Config is `wrangler.jsonc` — it points static assets at `./dist`. Connected to
this repo via Workers Builds; every push to the production branch runs:

- **Build command:** `npm run build` → `./dist`
- **Deploy command:** `npx wrangler deploy`

`_headers` (CSP/security + cache) and `_redirects` (www → apex 301) live in
`public/` and are copied into `./dist`, where Static Assets honours them.
Clean URLs (`/support` → `support.html`) come from `assets.html_handling`.

- **Custom domains** (Worker → Domains tab): `getculprit.app` (apex, canonical)
  and `www.getculprit.app`.
- **www → apex:** `public/_redirects` handles it. For a host-level redirect
  independent of the Worker route, add a **Redirect Rule** (Rules → Redirect
  Rules): match `Hostname equals www.getculprit.app` → dynamic redirect to
  `concat("https://getculprit.app", http.request.uri.path)`, status 301.
- **TLS:** automatic (`.app` is HSTS-preloaded, so HTTPS is forced by design).

> Prefer Cloudflare Pages instead? Delete `wrangler.jsonc`, create a **Pages**
> project (Connect to Git → Pages), and set build command `npm run build` /
> output dir `dist`. The `_headers`/`_redirects` files work there too.
