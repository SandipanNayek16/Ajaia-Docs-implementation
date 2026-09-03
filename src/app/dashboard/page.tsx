import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { logout } from '@/app/login/actions'
import { createDocument } from './actions'
import { FileText, LogOut, Plus } from 'lucide-react'
import Link from 'next/link'
import ImportFile from '@/components/ImportFile'

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const months = Math.round(days / 30);
  const years = Math.round(days / 365);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hr ago`;
  if (days < 30) return `${days} days ago`;
  if (months < 12) return `${months} mo ago`;
  return `${years} yr ago`;
}

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

  const totalDocs = (myDocs?.length || 0) + (sharedDocs?.length || 0);
  const sharedCountText = sharedDocs?.length ? ` · ${sharedDocs.length} shared` : '';

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 text-white shadow-sm">
              <FileText className="h-3.5 w-3.5" />
            </div>
            <span className="text-base font-semibold tracking-tight text-zinc-900 font-serif">Ajaia Docs</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-zinc-600 truncate max-w-[120px] sm:max-w-[200px]">{user.user_metadata.name || user.email}</span>
            <form action={logout}>
              <button className="text-zinc-500 hover:text-zinc-900 transition-colors p-1.5 rounded-md hover:bg-zinc-100 flex items-center justify-center">
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Log out</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 font-serif mb-1">Documents</h1>
            <p className="text-sm text-zinc-500">Your workspace for creating, editing, and sharing.</p>
            {totalDocs > 0 && (
              <p className="text-xs font-medium text-zinc-400 mt-2">{totalDocs} document{totalDocs !== 1 ? 's' : ''}{sharedCountText}</p>
            )}
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <ImportFile userId={user.id} />
            <form action={createDocument} className="flex-1 sm:flex-none">
              <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-zinc-800 hover:shadow transition-all duration-200">
                <Plus className="h-4 w-4" />
                New Document
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="mb-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">My Documents</h2>
            
            {!myDocs || myDocs.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-200 bg-white py-10 px-4 text-center shadow-sm">
                <FileText className="h-8 w-8 text-zinc-300 mb-3" />
                <h3 className="text-base font-medium text-zinc-900 font-serif">No documents yet</h3>
                <p className="mt-1 text-sm text-zinc-500 max-w-sm mb-6">Create your first document or import an existing file to get started.</p>
                <div className="flex items-center gap-3 flex-wrap justify-center">
                  <ImportFile userId={user.id} />
                  <form action={createDocument}>
                    <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-zinc-800 transition-colors">
                      <Plus className="h-4 w-4" />
                      New Document
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {myDocs.map(doc => (
                  <Link href={`/documents/${doc.id}`} key={doc.id} className="group flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-5 shadow-sm hover:border-zinc-300 hover:shadow-md transition-all duration-200 ease-in-out cursor-pointer">
                    <div>
                      <div className="flex items-center gap-3 mb-3 text-zinc-400 group-hover:text-zinc-700 transition-colors">
                        <FileText className="h-4 w-4" />
                      </div>
                      <h3 className="font-medium text-lg text-zinc-900 truncate font-serif leading-tight">{doc.title}</h3>
                    </div>
                    <div className="mt-5 flex items-center text-xs text-zinc-500">
                      <span className="font-medium bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-md mr-2">Owned</span>
                      <span>&middot; Updated {timeAgo(doc.updated_at)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="mb-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Shared With Me</h2>
            
            {!sharedDocs || sharedDocs.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50/50 py-8 px-4 text-center">
                <p className="text-sm text-zinc-500 font-medium">No shared documents yet</p>
                <p className="text-xs text-zinc-400 mt-1">Documents shared with you will appear here.</p>
              </div>
            ) : (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {sharedDocs.map(share => {
                  const doc = share.documents;
                  if (!doc) return null;
                  
                  return (
                    <Link href={`/documents/${doc.id}`} key={share.id} className="group flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-5 shadow-sm hover:border-zinc-300 hover:shadow-md transition-all duration-200 ease-in-out cursor-pointer">
                      <div>
                        <div className="flex items-center gap-3 mb-3 text-zinc-400 group-hover:text-zinc-700 transition-colors">
                          <FileText className="h-4 w-4" />
                        </div>
                        <h3 className="font-medium text-lg text-zinc-900 truncate font-serif leading-tight">{doc.title}</h3>
                      </div>
                      <div className="mt-5 flex items-center text-xs text-zinc-500">
                        <span className={`font-medium px-2 py-0.5 rounded-md mr-2 ${share.permission === 'editor' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                          {share.permission === 'editor' ? 'Editor' : 'Viewer'}
                        </span>
                        <span>&middot; Updated {timeAgo(doc.updated_at)}</span>
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
