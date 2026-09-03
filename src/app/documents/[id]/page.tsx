import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Editor from '@/components/Editor'

export default async function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch document
  const { data: doc, error } = await supabase
    .from('documents')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !doc) {
    // Check if user has access via share
    const { data: share } = await supabase
      .from('document_shares')
      .select('*, documents(*)')
      .eq('document_id', id)
      .eq('user_email', user.email)
      .single()
      
    if (!share || !share.documents) {
       // Return 404 state
       return (
         <div className="flex min-h-screen items-center justify-center bg-zinc-50">
           <div className="text-center">
             <h1 className="text-2xl font-semibold text-zinc-900 mb-2">Document not found</h1>
             <p className="text-zinc-500 mb-6">You either don&apos;t have access or it doesn&apos;t exist.</p>
             <a href="/dashboard" className="text-sm font-medium text-zinc-900 bg-white border border-zinc-200 rounded-md px-4 py-2 hover:bg-zinc-50">Back to Dashboard</a>
           </div>
         </div>
       )
    }
    
    return (
      <Editor 
        documentId={share.documents.id} 
        initialTitle={share.documents.title} 
        initialContent={share.documents.content} 
        role={share.permission}
      />
    )
  }

  return (
    <Editor 
      documentId={doc.id} 
      initialTitle={doc.title} 
      initialContent={doc.content} 
      role="owner"
    />
  )
}
