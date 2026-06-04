-- ============================================================
-- IELTS Sensei — Full Supabase Schema (up to date with live DB)
-- Run in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ── Core tables ───────────────────────────────────────────────────────────

create table public.profiles (
  id          uuid references auth.users on delete cascade primary key,
  full_name   text,
  target_band numeric(2,1),
  role        text default 'student' check (role in ('student','editor','admin')),
  created_at  timestamptz default now()
);

create table public.attempts (
  id           uuid default gen_random_uuid() primary key,
  user_id      uuid references auth.users not null,
  mode         text not null check (mode in ('writing','speaking','listening','reading')),
  task_type    text not null,
  input_text   text,
  audio_url    text,
  prompt_text  text,
  result       jsonb not null default '{}',
  overall_band numeric(2,1),
  created_at   timestamptz default now()
);

create index attempts_user_id_created_at on public.attempts(user_id, created_at desc);

create table public.test_materials (
  id         uuid default gen_random_uuid() primary key,
  title      text not null,
  type       text not null,
  content    jsonb not null default '{}',
  created_at timestamptz default now()
);

create table public.admin_logs (
  id             uuid default gen_random_uuid() primary key,
  admin_email    text,
  action         text check (action in ('added','deleted','edited')),
  question_id    uuid,
  question_title text,
  created_at     timestamptz default now()
);

-- ── Storage buckets (create via Dashboard → Storage) ─────────────────────
-- speaking-audio  (private)
-- listening-audio (public)
-- question-images (public)

-- ── Row Level Security ────────────────────────────────────────────────────

alter table public.profiles      enable row level security;
alter table public.attempts      enable row level security;
alter table public.test_materials enable row level security;
alter table public.admin_logs    enable row level security;

-- profiles
create policy "users read own profile"   on public.profiles for select using (auth.uid() = id);
create policy "users update own profile" on public.profiles for update using (auth.uid() = id);

-- attempts
create policy "users read own attempts"   on public.attempts for select using (auth.uid() = user_id);
create policy "users insert own attempts" on public.attempts for insert with check (auth.uid() = user_id);

-- test_materials: authenticated users can read published content
create policy "authenticated read published" on public.test_materials
  for select to authenticated
  using ((content->>'status') = 'published');

-- admin_logs: admins only
create policy "admins read logs" on public.admin_logs
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- ── Auto-create profile on signup ─────────────────────────────────────────

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── Band score helper function ────────────────────────────────────────────
-- Add this if you want server-side band calculation:
-- (The app currently computes this in TypeScript, but having it in SQL
--  lets you use it in database queries and analytics)

create or replace function public.calc_band_score(module text, raw int)
returns numeric as $$
declare band numeric;
begin
  if module = 'listening' then
    band := case
      when raw >= 39 then 9.0  when raw >= 37 then 8.5
      when raw >= 35 then 8.0  when raw >= 33 then 7.5
      when raw >= 30 then 7.0  when raw >= 27 then 6.5
      when raw >= 23 then 6.0  when raw >= 18 then 5.5
      when raw >= 16 then 5.0  when raw >= 13 then 4.5
      else 4.0
    end;
  elsif module = 'reading' then
    band := case
      when raw >= 39 then 9.0  when raw >= 37 then 8.5
      when raw >= 35 then 8.0  when raw >= 33 then 7.5
      when raw >= 30 then 7.0  when raw >= 27 then 6.5
      when raw >= 23 then 6.0  when raw >= 19 then 5.5
      when raw >= 15 then 5.0  when raw >= 12 then 4.5
      when raw >= 8  then 4.0  else 3.5
    end;
  else
    band := null;
  end if;
  return band;
end;
$$ language plpgsql;
