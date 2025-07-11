-- Create storage bucket for teacher materials
INSERT INTO storage.buckets (id, name, public) 
VALUES ('teacher-materials', 'teacher-materials', true);

-- Create storage policies for teacher materials
CREATE POLICY "Teachers can view all materials" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'teacher-materials');

CREATE POLICY "Teachers can upload materials" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'teacher-materials' AND auth.uid() IS NOT NULL);

CREATE POLICY "Teachers can update their own materials" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'teacher-materials' AND auth.uid() IS NOT NULL);

CREATE POLICY "Teachers can delete their own materials" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'teacher-materials' AND auth.uid() IS NOT NULL);

-- Create materials table
CREATE TABLE public.materials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  teacher_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  subject TEXT,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for materials
CREATE POLICY "Teachers can view all materials" 
ON public.materials 
FOR SELECT 
USING (true);

CREATE POLICY "Teachers can insert their own materials" 
ON public.materials 
FOR INSERT 
WITH CHECK (auth.uid() = teacher_id);

CREATE POLICY "Teachers can update their own materials" 
ON public.materials 
FOR UPDATE 
USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers can delete their own materials" 
ON public.materials 
FOR DELETE 
USING (auth.uid() = teacher_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_materials_updated_at
BEFORE UPDATE ON public.materials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();