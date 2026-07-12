---
name: culprit-voice
description: Use this skill when writing or reviewing any owner-facing copy on culprit-web — headlines, support text, error/empty states, meta descriptions, OG copy, or any string a visitor or App Store reviewer will read. Loads Culprit's voice rules — calm, plain language, no exclamation marks, no medical/diagnostic claims — and the brand-hygiene rule that no served string ever says "Nyx."
---

# Culprit Voice — Site Copy

## Origin and Scope

The canonical rules live in `CLAUDE.md` → "Brand Hygiene & Voice —
Non-Negotiable." This skill is the worked-example version: patterns with a
canonical line and an anti-pattern, so the next edit matches the register by
example instead of re-deriving it from adjectives.

Culprit (the product this site markets) helps an owner **track and notice**
patterns in a pet's food and symptoms. It does not diagnose, treat, or
replace a vet. Every string on this site has to hold that line, because it's
also read by App Store reviewers evaluating a health-adjacent app's public
face.

---

## PATTERN 1: No Exclamation Marks, No Manufactured Enthusiasm

**RULE:** Calm and quietly confident throughout, including success and
confirmation copy. No exclamation marks anywhere in served copy.

**ANTI-PATTERN:** `"Welcome to Culprit!"`, `"You're all set!"`,
`"Thanks for reaching out!"` — enthusiasm-by-punctuation is off-brand.

**CANONICAL SHAPE:** `"Thanks for reaching out. We'll get back to you within
2 business days."` — warm without shouting.

---

## PATTERN 2: No Medical or Diagnostic Claims

**RULE:** Culprit helps an owner *track and notice* patterns — it does not
diagnose, treat, cure, or replace veterinary care. Any copy implying
clinical authority is a hard stop, not a style nit, because it's also
App-Store-review-facing.

**ANTI-PATTERN:** `"Culprit diagnoses food sensitivities."`,
`"Treat your pet's allergies with Culprit."`, `"Culprit tells you what's
making your pet sick."`

**CANONICAL SHAPE:** `"Culprit helps you track meals and symptoms side by
side, so patterns are easier to spot — and easier to bring to your vet."`
Track and notice; the vet still makes the call.

---

## PATTERN 3: Plain Language Over Jargon

**RULE:** Support and legal-shell copy should read like a person wrote it,
not a compliance template. Say what will actually happen ("email us at
support@getculprit.app and we'll delete your account within 30 days"), not
vague process language.

**ANTI-PATTERN:** `"Users may submit a request for data erasure via the
designated support channel."`

**CANONICAL SHAPE:** `"Want your account deleted? Email
support@getculprit.app and we'll take care of it."`

---

## PATTERN 4: No "Nyx" Anywhere — Ever

**RULE:** The product was developed under the working name "Nyx"
(`project-nyx`). Every served string, meta tag, email address, OG image,
filename, and alt text on this site says **Culprit**. This is the single
highest-cost mistake this repo can ship — a stray "Nyx" in a meta tag or a
committed asset filename is a brand-hygiene failure, not a typo.

**Before any push that touches copy or metadata:** grep the diff for
`[Nn]yx`. If it matches anything other than a comment referencing the
`project-nyx` source repo (fine — that's this codebase's own doc trail, not
served content), fix it before pushing.

---

## PATTERN 5: Empty/Shell States Are Honest, Not Placeholder-Blank

**RULE:** `/privacy` and `/terms` are currently noindex shells (real legal
copy lands in Phase 2 — see `docs/backlog.md` B-001/B-002). A shell page
still gets calm, honest copy about what it is and isn't — never
`"Lorem ipsum"`, never a bare `"Coming soon"` with nothing else.

**ANTI-PATTERN:** An empty `<body>` or a raw `"TODO"` string shipped to
production.

**CANONICAL SHAPE:** Say plainly that the full policy is coming, and give
the visitor something true to do meanwhile (e.g. a support contact).

---

## Ambiguities Flagged

1. **No copy-lint test yet.** These rules are enforced by review, not by an
   automated scan (unlike `project-nyx`'s `analyze-vomit` test that asserts
   `!t.includes('!')`). If copy drift becomes a real recurring problem,
   worth a lightweight build-time grep for `!` and `[Nn]yx` across
   `src/pages/**/*.astro` — not obviously worth the maintenance cost yet at
   this site's size (4 pages).
