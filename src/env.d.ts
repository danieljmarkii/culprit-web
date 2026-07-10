/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  /**
   * CTA swap-slot state (v2 spec §5), set at build time. Unset renders the
   * "announce" pill; v2-2 flips the default to "waitlist" once /api/subscribe
   * exists. "preorder"/"download" land with the launch PRs.
   */
  readonly PUBLIC_CTA_STATE?: 'announce' | 'waitlist' | 'preorder' | 'download';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
