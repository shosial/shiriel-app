-- Base: settings shared by the whole app (goals, templates, and so on, added by later stages).
create table if not exists settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
