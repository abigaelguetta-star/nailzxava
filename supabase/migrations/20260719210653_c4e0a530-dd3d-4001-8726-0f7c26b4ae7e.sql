
-- 1. Restrict slots public read to open slots only
DROP POLICY IF EXISTS "anyone reads open slots" ON public.slots;
CREATE POLICY "anyone reads open slots" ON public.slots
  FOR SELECT TO anon, authenticated
  USING (status = 'open');

-- 2. Scope admin policies to authenticated; revoke has_role EXECUTE from anon/public
DROP POLICY IF EXISTS "admins manage slots" ON public.slots;
CREATE POLICY "admins manage slots" ON public.slots
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "admins manage gallery" ON public.gallery_items;
CREATE POLICY "admins manage gallery" ON public.gallery_items
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "anyone sees published gallery" ON public.gallery_items;
CREATE POLICY "anon sees published gallery" ON public.gallery_items
  FOR SELECT TO anon
  USING (published = true);
CREATE POLICY "authenticated sees gallery" ON public.gallery_items
  FOR SELECT TO authenticated
  USING (published = true OR has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "gallery admin delete" ON storage.objects;
CREATE POLICY "gallery admin delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'gallery' AND has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "gallery admin update" ON storage.objects;
CREATE POLICY "gallery admin update" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'gallery' AND has_role(auth.uid(), 'admin'::app_role));

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

-- 3. Remove broad public listing on gallery bucket (public URLs still work via CDN)
DROP POLICY IF EXISTS "gallery public read individual" ON storage.objects;
