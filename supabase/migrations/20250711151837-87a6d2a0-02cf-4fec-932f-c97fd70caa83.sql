-- Disable Row Level Security on materials table
ALTER TABLE public.materials DISABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Teachers can view all materials" ON public.materials;
DROP POLICY IF EXISTS "Teachers can insert their own materials" ON public.materials;
DROP POLICY IF EXISTS "Teachers can update their own materials" ON public.materials;
DROP POLICY IF EXISTS "Teachers can delete their own materials" ON public.materials;