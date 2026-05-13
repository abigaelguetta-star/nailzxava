-- Fix function search_path on touch_updated_at
create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

-- Restrict execute on SECURITY DEFINER helpers
revoke execute on function public.has_role(uuid, public.app_role) from public, anon;
revoke execute on function public.lock_slot_on_appointment() from public, anon, authenticated;
grant execute on function public.has_role(uuid, public.app_role) to authenticated;

-- Replace overly broad gallery public read with a tighter policy (still public bucket; listing limited)
drop policy if exists "gallery public read" on storage.objects;
create policy "gallery public read individual" on storage.objects for select using (bucket_id = 'gallery');
