'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function createDocument() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data, error } = await supabase
    .from('documents')
    .insert([
      { 
        title: 'Untitled document',
        owner_id: user.id,
        content: { type: "doc", content: [{ type: "paragraph" }] }
      }
    ])
    .select()
    .single()

  if (error || !data) {
    console.error('Failed to create document:', error)
    redirect('/dashboard?error=failed_to_create')
  }

  redirect(`/documents/${data.id}`)
}
