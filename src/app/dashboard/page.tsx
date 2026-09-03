import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { logout } from '@/app/login/actions'
import { createDocument } from './actions'
import { FileText, LogOut, Plus } from 'lucide-react'
import Link from 'next/link'
import ImportFile from '@/components/ImportFile'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch documents owned by the user
  const { data: myDocs } = await supabase
    .from('documents')
    .select('*')
    .eq('owner_id', user.id)
    .order('updated_at', { ascending: false })

  // Fetch documents shared with the user
  const { data: sharedDocs } = await supabase
    .from('document_shares')
    .select('*, documents(*)')
    .eq('user_email', user.email)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white">
              <FileText className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-zinc-900">Ajaia Docs</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-zinc-600">{user.user_metadata.name || user.email}</span>
            <form action={logout}>
              <button className="text-zinc-500 hover:text-zinc-900 transition-colors p-2 rounded-md hover:bg-zinc-100">
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Log out</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Documents</h1>
          <div className="flex items-center gap-3">
            <ImportFile userId={user.id} />
            <form action={createDocument}>
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-zinc-800 transition-colors">
                <Plus className="h-4 w-4" />
                New Document
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="mb-4 text-sm font-medium text-zinc-500 uppercase tracking-wider">My Documents</h2>
            
            {!myDocs || myDocs.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white p-12 text-center">
                <FileText className="h-10 w-10 text-zinc-300 mb-4" />
                <h3 className="text-lg font-medium text-zinc-900">No documents yet</h3>
                <p className="mt-1 text-sm text-zinc-500 max-w-sm">Create your first document or import an existing file to get started.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {myDocs.map(doc => (
                  <Link href={`/documents/${doc.id}`} key={doc.id} className="group flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-5 shadow-sm hover:border-zinc-300 hover:shadow-md transition-all">
                    <div>
                      <div className="flex items-center gap-3 mb-3 text-zinc-400 group-hover:text-zinc-900 transition-colors">
                        <FileText className="h-5 w-5" />
                      </div>
                      <h3 className="font-medium text-zinc-900 truncate">{doc.title}</h3>
                    </div>
                    <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                      <span>{new Date(doc.updated_at).toLocaleDateString()}</span>
                      <span className="font-medium">You own this document</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="mb-4 text-sm font-medium text-zinc-500 uppercase tracking-wider">Shared With Me</h2>
            
            {!sharedDocs || sharedDocs.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center">
                <p className="text-sm text-zinc-500">No shared documents. Documents shared with you will appear here.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sharedDocs.map(share => {
                  const doc = share.documents;
                  if (!doc) return null;
                  
                  return (
                    <Link href={`/documents/${doc.id}`} key={share.id} className="group flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-5 shadow-sm hover:border-zinc-300 hover:shadow-md transition-all">
                      <div>
                        <div className="flex items-center gap-3 mb-3 text-zinc-400 group-hover:text-zinc-900 transition-colors">
                          <FileText className="h-5 w-5" />
                        </div>
                        <h3 className="font-medium text-zinc-900 truncate">{doc.title}</h3>
                      </div>
                      <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                        <span>{new Date(doc.updated_at).toLocaleDateString()}</span>
                        <span className="capitalize">{share.permission} access</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
