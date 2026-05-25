-- ============================================
-- IELTS AI Coach — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================

create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  target_band numeric(2,1),
  created_at timestamptz default now()
);

create table public.attempts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  mode text not null check (mode in ('writing', 'speaking')),
  task_type text not null,
  input_text text,
  audio_url text,
  prompt_text text,
  result jsonb not null,
  overall_band numeric(2,1),
  created_at timestamptz default now()
);

create index attempts_user_id_created_at on public.attempts(user_id, created_at desc);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.attempts enable row level security;

create policy "users read own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "users update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "users read own attempts" on public.attempts
  for select using (auth.uid() = user_id);
create policy "users insert own attempts" on public.attempts
  for insert with check (auth.uid() = user_id);

-- Auto-create profile on signup
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

-- NOTE: Also create a Storage bucket named 'speaking-audio' (private) via the Supabase dashboard
-- Dashboard → Storage → New bucket → Name: speaking-audio → Uncheck "Public"
