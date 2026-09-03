'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function updateDocument(documentId: string, title: string, content: any) {
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
      .eq('user_email', user.email)
      .single()
      
    if (!share || share.permission !== 'editor') {
      throw new Error('Unauthorized to edit this document')
    }
  }

  const { error } = await supabase
    .from('documents')
    .update({ title, content })
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

  const { error } = await supabase
    .from('document_shares')
    .upsert({ 
      document_id: documentId, 
      user_email: email, 
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
