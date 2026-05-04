-- profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  email text,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);

-- trigger pour créer un profil auto
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, first_name, email)
  values (new.id, new.raw_user_meta_data->>'first_name', new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- moodboard
create table public.moodboard_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  pose_id text not null,
  pose_name text,
  vibe text,
  image_url text,
  created_at timestamptz not null default now(),
  unique (user_id, pose_id)
);
alter table public.moodboard_items enable row level security;

create policy "mb_select_own" on public.moodboard_items for select using (auth.uid() = user_id);
create policy "mb_insert_own" on public.moodboard_items for insert with check (auth.uid() = user_id);
create policy "mb_delete_own" on public.moodboard_items for delete using (auth.uid() = user_id);