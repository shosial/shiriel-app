-- ============================================================================================
-- Security lockdown (this file runs LAST (999-), so it also covers every table created by the files before it).
-- The site reads and writes the database only from the server, over the direct Postgres connection
-- (DATABASE_URL) as the table owner, which is not limited by Row Level Security. Nothing uses
-- Supabase's public REST API (the "anon" / "authenticated" keys), so we close it completely:
--   1. Row Level Security on every table in "public", with no policies = the API sees no rows.
--   2. No permissions at all for anon / authenticated on tables, views and sequences.
--   3. Tables created later get no permissions for them either.
--   4. No one but the owner may run functions in "public" (Supabase would expose them as /rpc/...).
-- Not FORCE: the owner (our server) must keep full access. Every step is wrapped so a deploy never
-- fails because of it. It can also be pasted by hand into the Supabase SQL Editor.
-- ============================================================================================
do $$
declare t record;
begin
  for t in
    select c.oid::regclass as tbl
    from pg_class c join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public' and c.relkind in ('r', 'p') and not c.relrowsecurity
  loop
    begin
      execute format('alter table %s enable row level security', t.tbl);
    exception when others then
      raise notice 'RLS not enabled on %: %', t.tbl, sqlerrm;
    end;
  end loop;
end $$;

do $$
declare r text;
begin
  foreach r in array array['anon', 'authenticated'] loop
    if exists (select 1 from pg_roles where rolname = r) then
      begin
        execute format('revoke all on all tables in schema public from %I', r);
        execute format('revoke all on all sequences in schema public from %I', r);
        execute format('alter default privileges in schema public revoke all on tables from %I', r);
        execute format('alter default privileges in schema public revoke all on sequences from %I', r);
      exception when others then
        raise notice 'Could not revoke API access for %: %', r, sqlerrm;
      end;
    end if;
  end loop;
end $$;

-- 4. Functions: PostgREST exposes every function in "public" as /rest/v1/rpc/<name>, and Postgres lets
-- everyone (PUBLIC) run a new function by default. The site defines no functions; this keeps it that way
-- for anything added later. Built-in functions live in pg_catalog and are not touched.
do $$
declare r text;
begin
  begin
    execute 'revoke execute on all functions in schema public from public';
    execute 'alter default privileges in schema public revoke execute on functions from public';
  exception when others then
    raise notice 'Could not revoke function access from public: %', sqlerrm;
  end;
  foreach r in array array['anon', 'authenticated'] loop
    if exists (select 1 from pg_roles where rolname = r) then
      begin
        execute format('revoke all on all functions in schema public from %I', r);
        execute format('alter default privileges in schema public revoke all on functions from %I', r);
      exception when others then
        raise notice 'Could not revoke function access for %: %', r, sqlerrm;
      end;
    end if;
  end loop;
end $$;
