create extension if not exists "pgcrypto";

create table if not exists public.waitlist_entries (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text unique not null,
  email text not null,
  full_name text,
  referral_code text unique not null,
  referred_by text references public.waitlist_entries(referral_code),
  referral_count integer not null default 0,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  joined_at timestamptz not null default now(),
  waitlist_position integer not null
);

create index if not exists idx_waitlist_entries_joined_at on public.waitlist_entries (joined_at desc);
create index if not exists idx_waitlist_entries_referred_by on public.waitlist_entries (referred_by);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event text not null,
  section text,
  locale text not null default 'en',
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_analytics_events_event_created
  on public.analytics_events (event, created_at desc);
