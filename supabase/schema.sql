-- Ajaia Docs Supabase Schema

-- 1. Documents Table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT 'Untitled document',
  content JSONB DEFAULT '{"type":"doc","content":[{"type":"paragraph"}]}',
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Document Shares Table
CREATE TABLE document_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  permission TEXT NOT NULL CHECK (permission IN ('viewer', 'editor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(document_id, user_email)
);

-- Enable Row Level Security
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_shares ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies for Documents

-- Owners can read their own documents
CREATE POLICY "Owners can view own documents" 
  ON documents FOR SELECT 
  USING (auth.uid() = owner_id);

-- Owners can update their own documents
CREATE POLICY "Owners can update own documents" 
  ON documents FOR UPDATE 
  USING (auth.uid() = owner_id);

-- Owners can delete their own documents
CREATE POLICY "Owners can delete own documents" 
  ON documents FOR DELETE 
  USING (auth.uid() = owner_id);

-- Owners can insert documents
CREATE POLICY "Owners can insert documents" 
  ON documents FOR INSERT 
  WITH CHECK (auth.uid() = owner_id);

-- Function to check if user is shared on a document (bypasses RLS to prevent recursion)
CREATE OR REPLACE FUNCTION is_shared_user(doc_id UUID)
RETURNS BOOLEAN
LANGUAGE sql SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM document_shares 
    WHERE document_id = doc_id 
    AND user_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );
$$;

-- Shared users can read documents
CREATE POLICY "Shared users can view documents" 
  ON documents FOR SELECT 
  USING (is_shared_user(id));

-- Function to check if user is editor on a document (bypasses RLS to prevent recursion)
CREATE OR REPLACE FUNCTION is_shared_editor(doc_id UUID)
RETURNS BOOLEAN
LANGUAGE sql SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM document_shares 
    WHERE document_id = doc_id 
    AND permission = 'editor'
    AND user_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );
$$;

-- Shared editors can update documents
CREATE POLICY "Shared editors can update documents" 
  ON documents FOR UPDATE 
  USING (is_shared_editor(id));


-- Function to check if user owns a document (bypasses RLS to prevent recursion)
CREATE OR REPLACE FUNCTION is_document_owner(doc_id UUID)
RETURNS BOOLEAN
LANGUAGE sql SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM documents 
    WHERE id = doc_id 
    AND owner_id = auth.uid()
  );
$$;

-- Owners can view shares for their documents
CREATE POLICY "Owners can view shares" 
  ON document_shares FOR SELECT 
  USING (is_document_owner(document_id));

-- Shared users can view their own shares
CREATE POLICY "Users can view their own shares" 
  ON document_shares FOR SELECT 
  USING (user_email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Owners can insert shares for their documents
CREATE POLICY "Owners can insert shares" 
  ON document_shares FOR INSERT 
  WITH CHECK (is_document_owner(document_id));

-- Owners can update shares for their documents
CREATE POLICY "Owners can update shares" 
  ON document_shares FOR UPDATE 
  USING (is_document_owner(document_id));

-- Owners can delete shares for their documents
CREATE POLICY "Owners can delete shares" 
  ON document_shares FOR DELETE 
  USING (is_document_owner(document_id));

-- Function to automatically update the 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_documents_updated_at
BEFORE UPDATE ON documents
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();
