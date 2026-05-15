ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS last_name text,
  ADD COLUMN IF NOT EXISTS vibe text,
  ADD COLUMN IF NOT EXISTS nail_shape text,
  ADD COLUMN IF NOT EXISTS nail_length text,
  ADD COLUMN IF NOT EXISTS allergies text,
  ADD COLUMN IF NOT EXISTS instagram text,
  ADD COLUMN IF NOT EXISTS onboarded boolean NOT NULL DEFAULT false;