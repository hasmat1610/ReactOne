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

-- Posts table for blog system
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content text not null,
  excerpt text,
  category text,
  author_id uuid references profiles(id) on delete cascade,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table posts
  enable row level security;

-- Everyone can read published posts
create policy "posts_select_published" on posts
  for select
  using (published = true);

-- Authors can manage their own posts
create policy "posts_manage_own" on posts
  for all
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);
