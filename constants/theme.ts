// Culprit web — brand tokens.
//
// Inherited from the app's design system (project-nyx `constants/theme.ts`,
// v1.2 "Linear Clean" + the B-275 "Moon & Signal" brand palette) so the site
// feels like the app. This is the web-facing subset the marketing/support site
// consumes; the app's full token set is the source of truth.
//
// The rule that carries over: teal (`colorAccent`) is the SOLE interactive
// accent — never decorative. Midnight indigo (`colorBrandNight`) is a world /
// ground colour (heroes, dark surfaces), never a tappable fill.
//
// These values are mirrored into CSS custom properties in
// `src/styles/global.css`; keep the two in sync.
export const theme = {
  // ── Type families ─────────────────────────────────────────────────────────
  fontBody: "'Geist Sans', system-ui, -apple-system, 'Segoe UI', sans-serif",
  fontDisplay: "'Newsreader Variable', Newsreader, Georgia, 'Times New Roman', serif",

  // ── Brand palette (B-275 "Moon & Signal", locked) ─────────────────────────
  colorBrandNight: '#13112E', // midnight-indigo brand / night ground
  colorBrandNightElevated: '#251F57', // cards / depth on the brand night
  colorMoonlight: '#F2EEE4', // moonlight crescent — light mark/type on night
  colorAccent: '#00C2A8', // Signal teal — the one interactive accent
  colorAccentSoft: '#86D9CC', // mid teal — a calm on-brand fill, not a verdict
  colorAccentLight: '#E0FBF7', // tinted surface behind accent elements
  colorLightGround: '#F7F6F2', // brand light ground

  // ── Neutrals & text (Linear Clean) ────────────────────────────────────────
  colorSurface: '#FFFFFF',
  colorSurfaceSubtle: '#F5F5F5',
  colorTextPrimary: '#0A0A0A',
  colorTextSecondary: '#525252',
  colorTextTertiary: '#737373',
  colorTextOnDark: '#FFFFFF',
  colorTextOnDarkSecondary: '#B4B8B4',
  colorBorder: '#EAEAEA',
  colorBorderStrong: '#D4D4D4',
  colorBorderOnDark: '#33383A',

  // ── Type scale (px, web) ──────────────────────────────────────────────────
  textSM: '0.8125rem', // 13
  textMD: '0.9375rem', // 15
  textLG: '1.0625rem', // 17
  textXL: '1.375rem', // 22
  text2XL: '1.75rem', // 28
  trackingTight: '-0.02em',
  trackingWidest: '0.08em',

  // ── Spacing — 8pt grid ────────────────────────────────────────────────────
  space1: '0.5rem', // 8
  space2: '1rem', // 16
  space3: '1.5rem', // 24
  space4: '2rem', // 32
  space5: '3rem', // 48
  space6: '4rem', // 64

  // ── Radius ────────────────────────────────────────────────────────────────
  radiusSmall: '8px',
  radiusMedium: '16px',
  radiusLarge: '24px',
  radiusFull: '999px',
} as const;

export type Theme = typeof theme;
