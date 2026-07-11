-- Waitlist for the coming-soon page (v2 spec §6, ticket v2-2). Applied with:
--   npx wrangler d1 migrations apply culprit-subscribers --remote
-- (Already created in the remote DB via the dashboard Console.)
CREATE TABLE IF NOT EXISTS subscribers (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  email      TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  source     TEXT,
  country    TEXT
);

CREATE INDEX IF NOT EXISTS idx_subscribers_created_at ON subscribers (created_at);
