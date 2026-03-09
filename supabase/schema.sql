-- Core auth-linked profile table
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table profiles
  enable row level security;

-- Users can see and update only their own profile
create policy "profiles_select_own" on profiles
  for select
  using (auth.uid() = id);

create policy "profiles_update_own" on profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "profiles_insert_own" on profiles
  for insert
  with check (auth.uid() = id);

