// Generates the favicon set + the 1200x630 Open Graph card from the Culprit
// "Moon & Signal" brand. Run with `npm run assets` (outputs into public/).
//
// sharp rasterizes SVG via librsvg, which resolves fonts through fontconfig.
// The Newsreader/Geist faces must be registered there for the OG wordmark to
// render on-brand (see README → "Regenerating brand assets").
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { writeFile } from 'node:fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const pub = join(root, 'public');
const brandPng = join(root, 'src/assets/brand/png');

const NIGHT = '#13112E';
const MOONLIGHT = '#F2EEE4';
const TEAL = '#00C2A8';

// The moon crescent + signal dot (pure paths — renders identically everywhere).
const MARK = (fill) => `
  <path d="M 744.3 241.7 A 330 330 0 1 0 744.3 782.3 A 268 268 0 0 1 744.3 241.7 Z" fill="${fill}"/>
  <circle cx="695" cy="512" r="70" fill="${TEAL}"/>`;

// ── favicon.svg (rounded night tile) ───────────────────────────────────────
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <rect width="1024" height="1024" rx="224" fill="${NIGHT}"/>${MARK(MOONLIGHT)}
</svg>`;
await writeFile(join(pub, 'favicon.svg'), faviconSvg.trim() + '\n');

// ── OG card 1200x630 ────────────────────────────────────────────────────────
// Mark visual bbox is ~x[84..744] y[182..842]; center it at (600,170), ~120px.
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="50%" cy="0%" r="70%">
      <stop offset="0%" stop-color="${TEAL}" stop-opacity="0.16"/>
      <stop offset="70%" stop-color="${TEAL}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${NIGHT}"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g transform="translate(524.7,76.9) scale(0.1818)">${MARK(MOONLIGHT)}</g>
  <text x="600" y="372" text-anchor="middle" font-family="Newsreader" font-weight="500"
        font-size="96" letter-spacing="-2" fill="${MOONLIGHT}">Culprit</text>
  <text x="600" y="440" text-anchor="middle" font-family="Geist Sans" font-weight="400"
        font-size="30" fill="#B4B8B4">Find the culprit behind your pet&#8217;s symptoms</text>
  <text x="600" y="536" text-anchor="middle" font-family="Geist Sans" font-weight="500"
        font-size="21" letter-spacing="2" fill="${TEAL}">COMING SOON TO THE APP STORE</text>
</svg>`;
await sharp(Buffer.from(ogSvg)).png().toFile(join(pub, 'og-image.png'));

// ── Raster favicons from the (font-free) icon SVG ──────────────────────────
const faviconBuf = Buffer.from(faviconSvg);
await sharp(faviconBuf).resize(32, 32).png().toFile(join(pub, 'favicon-32.png'));

// ── apple-touch-icon: full-bleed night master (no alpha, iOS masks corners) ─
await sharp(join(brandPng, 'appstore-1024-night.png'))
  .resize(180, 180)
  .png()
  .toFile(join(pub, 'apple-touch-icon.png'));

console.log('Generated: favicon.svg, favicon-32.png, apple-touch-icon.png, og-image.png');
