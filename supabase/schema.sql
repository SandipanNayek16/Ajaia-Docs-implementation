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

-- Shared users can read documents
CREATE POLICY "Shared users can view documents" 
  ON documents FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM document_shares 
      WHERE document_id = documents.id 
      AND user_email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Shared editors can update documents
CREATE POLICY "Shared editors can update documents" 
  ON documents FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM document_shares 
      WHERE document_id = documents.id 
      AND permission = 'editor'
      AND user_email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );


-- 4. RLS Policies for Document Shares

-- Owners can view shares for their documents
CREATE POLICY "Owners can view shares" 
  ON document_shares FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM documents 
      WHERE id = document_shares.document_id 
      AND owner_id = auth.uid()
    )
  );

-- Shared users can view their own shares
CREATE POLICY "Users can view their own shares" 
  ON document_shares FOR SELECT 
  USING (user_email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Owners can insert shares for their documents
CREATE POLICY "Owners can insert shares" 
  ON document_shares FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM documents 
      WHERE id = document_shares.document_id 
      AND owner_id = auth.uid()
    )
  );

-- Owners can update shares for their documents
CREATE POLICY "Owners can update shares" 
  ON document_shares FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM documents 
      WHERE id = document_shares.document_id 
      AND owner_id = auth.uid()
    )
  );

-- Owners can delete shares for their documents
CREATE POLICY "Owners can delete shares" 
  ON document_shares FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM documents 
      WHERE id = document_shares.document_id 
      AND owner_id = auth.uid()
    )
  );

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
