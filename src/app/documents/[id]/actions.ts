'use server'

import { createClient } from '@/lib/supabase/server'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateDocument(documentId: string, title: string, content: any) {
  // Validate title
  let finalTitle = (title || '').trim();
  if (!finalTitle) {
    finalTitle = 'Untitled document';
  } else if (finalTitle.length > 255) {
    finalTitle = finalTitle.substring(0, 255);
  }

  // Validate content (minimal Tiptap structure check)
  if (!content || typeof content !== 'object' || content.type !== 'doc' || !Array.isArray(content.content)) {
    throw new Error('Invalid document content payload')
  }

  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  // Check access: either owner or shared editor
  const { data: doc } = await supabase
    .from('documents')
    .select('id, owner_id')
    .eq('id', documentId)
    .single()
    
  if (!doc) {
    throw new Error('Document not found')
  }
  
  if (doc.owner_id !== user.id) {
    // Check if shared editor
    const { data: share } = await supabase
      .from('document_shares')
      .select('permission')
      .eq('document_id', documentId)
      .eq('user_email', user.email?.toLowerCase().trim())
      .single()
      
    if (!share || share.permission !== 'editor') {
      throw new Error('Unauthorized to edit this document')
    }
  }

  const { error } = await supabase
    .from('documents')
    .update({ title: finalTitle, content })
    .eq('id', documentId)

  if (error) {
    console.error('Failed to update document:', error)
    throw new Error('Failed to update document')
  }
}

export async function shareDocument(documentId: string, email: string, permission: 'viewer' | 'editor') {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Check if owner
  const { data: doc } = await supabase
    .from('documents')
    .select('owner_id')
    .eq('id', documentId)
    .single()
    
  if (!doc || doc.owner_id !== user.id) {
    throw new Error('Only the owner can share this document')
  }

  const normalizedEmail = email.trim().toLowerCase()

  if (normalizedEmail === user.email?.toLowerCase().trim()) {
    throw new Error('You cannot share a document with yourself')
  }

  // Check if target user exists
  const { data: userExists } = await supabase
    .rpc('user_exists_by_email', { check_email: normalizedEmail })

  if (!userExists) {
    throw new Error('That user does not have an account.')
  }

  // Check if already shared with this exact permission
  const { data: existingShare } = await supabase
    .from('document_shares')
    .select('permission')
    .eq('document_id', documentId)
    .eq('user_email', normalizedEmail)
    .single()

  if (existingShare && existingShare.permission === permission) {
    return // Already shared, no-op
  }

  const { error } = await supabase
    .from('document_shares')
    .upsert({ 
      document_id: documentId, 
      user_email: normalizedEmail, 
      permission 
    }, { onConflict: 'document_id,user_email' })

  if (error) {
    console.error('Failed to share document:', error)
    throw new Error('Failed to share document')
  }
}

export async function getShares(documentId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data: doc } = await supabase
    .from('documents')
    .select('owner_id')
    .eq('id', documentId)
    .single()
    
  if (!doc || doc.owner_id !== user.id) return []

  const { data, error } = await supabase
    .from('document_shares')
    .select('*')
    .eq('document_id', documentId)
    
  if (error) return []
  return data
}
