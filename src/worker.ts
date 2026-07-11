/// <reference types="@cloudflare/workers-types" />
//
// Culprit web — waitlist capture Worker (v2 spec §6, ticket v2-2).
//
// Runs alongside the static Astro site (Cloudflare Workers Static Assets):
// static assets are matched first, so only unmatched paths (POST /api/subscribe)
// reach this handler. The v2 CtaForm posts a plain HTML form (zero client JS),
// so the primary path is a 303 redirect → /thanks (success) or /oops (failure).
// A JSON path is kept for programmatic callers.
//
// Backend: Cloudflare D1 is the source of truth for the list; a best-effort
// Resend email notifies the founder per signup. The two are independent — a
// signup is only rejected (→ /oops) if BOTH fail, so it's never silently lost.

interface Env {
  /** D1 database holding the waitlist. Bound in wrangler.jsonc. */
  DB?: D1Database;
  /** Resend API key (secret). If unset, the notification email is skipped. */
  RESEND_API_KEY?: string;
  /** Where signup notifications go (secret — keep the personal address out of git). */
  NOTIFY_TO?: string;
  /** From address for the notification. Must be a Resend-verified sender. */
  NOTIFY_FROM?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LEN = 254;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname !== '/api/subscribe') {
      return new Response('Not found', { status: 404 });
    }
    if (request.method !== 'POST') {
      return new Response('Method not allowed', {
        status: 405,
        headers: { Allow: 'POST' },
      });
    }

    const wantsJson =
      (request.headers.get('accept') || '').includes('application/json');

    const { email, honeypot } = await readSubmission(request);

    // Bots love hidden fields. Silently accept and drop.
    if (honeypot) return respond(wantsJson, true);

    const clean = email.trim().toLowerCase();
    if (!clean || clean.length > MAX_EMAIL_LEN || !EMAIL_RE.test(clean)) {
      return respond(wantsJson, false, 'Enter a valid email address.', 400);
    }

    const country = request.headers.get('cf-ipcountry') || null;

    // Store + notify are independent and best-effort. Capturing the lead only
    // fails if BOTH fail.
    const [stored, notified] = await Promise.all([
      store(env, clean, country),
      notify(env, clean, country),
    ]);

    if (!stored && !notified) {
      return respond(
        wantsJson,
        false,
        'Something went wrong on our end. Please try again.',
        502,
      );
    }

    return respond(wantsJson, true);
  },
} satisfies ExportedHandler<Env>;

/** Accept both JSON and form-encoded (the v2 CtaForm posts form-encoded). */
async function readSubmission(
  request: Request,
): Promise<{ email: string; honeypot: string }> {
  const type = request.headers.get('content-type') || '';
  try {
    if (type.includes('application/json')) {
      const body = (await request.json()) as Record<string, unknown>;
      return {
        email: typeof body.email === 'string' ? body.email : '',
        honeypot: typeof body.website === 'string' ? body.website : '',
      };
    }
    const form = await request.formData();
    return {
      email: String(form.get('email') ?? ''),
      honeypot: String(form.get('website') ?? ''),
    };
  } catch {
    return { email: '', honeypot: '' };
  }
}

/** Insert into D1, ignoring duplicates. Returns false (not throws) on any error. */
async function store(
  env: Env,
  email: string,
  country: string | null,
): Promise<boolean> {
  if (!env.DB) return false;
  try {
    await env.DB.prepare(
      'INSERT OR IGNORE INTO subscribers (email, source, country) VALUES (?, ?, ?)',
    )
      .bind(email, 'waitlist', country)
      .run();
    return true;
  } catch {
    return false;
  }
}

/** Fire a notification email via Resend. Returns false (not throws) on any error. */
async function notify(
  env: Env,
  email: string,
  country: string | null,
): Promise<boolean> {
  if (!env.RESEND_API_KEY || !env.NOTIFY_TO) return false;
  try {
    const from = env.NOTIFY_FROM || 'Culprit <noreply@getculprit.app>';
    const where = country ? ` (${country})` : '';
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [env.NOTIFY_TO],
        reply_to: email,
        subject: `New Culprit waitlist signup: ${email}`,
        text: `${email}${where} just joined the Culprit waitlist.`,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** JSON for programmatic callers; a 303 redirect for the plain HTML form flow. */
function respond(
  wantsJson: boolean,
  ok: boolean,
  message?: string,
  status = 200,
): Response {
  if (wantsJson) {
    return new Response(
      JSON.stringify(ok ? { ok: true } : { ok: false, error: message }),
      { status, headers: { 'content-type': 'application/json' } },
    );
  }
  // No-JS form flow: success → /thanks, failure → /oops (v2 spec §6).
  return new Response(null, {
    status: 303,
    headers: { Location: ok ? '/thanks' : '/oops' },
  });
}
