-- ROLES
create type public.app_role as enum ('admin', 'client');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "users see own roles" on public.user_roles for select using (auth.uid() = user_id);
create policy "admins manage roles" on public.user_roles for all using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- SLOTS
create table public.slots (
  id uuid primary key default gen_random_uuid(),
  starts_at timestamptz not null,
  duration_minutes int not null default 60,
  status text not null default 'open' check (status in ('open','booked','closed')),
  created_at timestamptz not null default now()
);
alter table public.slots enable row level security;
create policy "anyone reads open slots" on public.slots for select using (true);
create policy "admins manage slots" on public.slots for all using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- APPOINTMENTS
create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  slot_id uuid references public.slots(id) on delete set null,
  service_id text not null,
  service_name text not null,
  options jsonb not null default '[]'::jsonb,
  starts_at timestamptz not null,
  duration_minutes int not null,
  total_price numeric(10,2) not null default 0,
  vibe text,
  notes text,
  status text not null default 'pending' check (status in ('pending','confirmed','cancelled','done')),
  deposit_paid boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.appointments enable row level security;
create policy "clients see own appts" on public.appointments for select using (auth.uid() = user_id or public.has_role(auth.uid(),'admin'));
create policy "clients create own appts" on public.appointments for insert with check (auth.uid() = user_id);
create policy "clients update own pending" on public.appointments for update using (auth.uid() = user_id and status = 'pending') with check (auth.uid() = user_id);
create policy "admins manage all appts" on public.appointments for all using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger appointments_touch before update on public.appointments
for each row execute function public.touch_updated_at();

-- When an appointment is created against a slot, mark slot booked
create or replace function public.lock_slot_on_appointment()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.slot_id is not null then
    update public.slots set status = 'booked' where id = new.slot_id and status = 'open';
  end if;
  return new;
end; $$;
create trigger appt_locks_slot after insert on public.appointments
for each row execute function public.lock_slot_on_appointment();

-- GALLERY
create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  vibe text not null,
  image_url text not null,
  description text,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
alter table public.gallery_items enable row level security;
create policy "anyone sees published gallery" on public.gallery_items for select using (published = true or public.has_role(auth.uid(),'admin'));
create policy "admins manage gallery" on public.gallery_items for all using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- STORAGE bucket for gallery
insert into storage.buckets (id, name, public) values ('gallery','gallery', true) on conflict (id) do nothing;
create policy "gallery public read" on storage.objects for select using (bucket_id = 'gallery');
create policy "gallery admin write" on storage.objects for insert with check (bucket_id = 'gallery' and public.has_role(auth.uid(),'admin'));
create policy "gallery admin update" on storage.objects for update using (bucket_id = 'gallery' and public.has_role(auth.uid(),'admin'));
create policy "gallery admin delete" on storage.objects for delete using (bucket_id = 'gallery' and public.has_role(auth.uid(),'admin'));
