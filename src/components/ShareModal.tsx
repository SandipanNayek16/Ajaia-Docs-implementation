'use client'

import { useState, useEffect, useCallback } from 'react'
import { shareDocument, getShares } from '@/app/documents/[id]/actions'
import { X, Users, Check } from 'lucide-react'

export default function ShareModal({ 
  documentId, 
  isOpen, 
  onClose 
}: { 
  documentId: string
  isOpen: boolean
  onClose: () => void 
}) {
  const [email, setEmail] = useState('')
  const [permission, setPermission] = useState<'viewer' | 'editor'>('editor')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [shares, setShares] = useState<any[]>([])
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const loadShares = useCallback(async () => {
    try {
      const data = await getShares(documentId)
      setShares(data)
    } catch (e) {
      console.error(e)
    }
  }, [documentId])

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadShares()
    }
  }, [isOpen, loadShares])

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setStatus(null)
    
    try {
      await shareDocument(documentId, email, permission)
      setStatus({ type: 'success', message: 'Document shared successfully' })
      setEmail('')
      loadShares()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setStatus({ type: 'error', message: e.message || 'Failed to share document' })
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-100 p-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-zinc-500" />
            <h2 className="text-lg font-semibold text-zinc-900">Share document</h2>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <form onSubmit={handleShare} className="mb-6">
            <div className="flex gap-2">
              <div className="flex-1">
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="bob@ajaia-demo.com"
                  className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                  required
                />
              </div>
              <div>
                <select
                  value={permission}
                  onChange={(e) => setPermission(e.target.value as 'viewer' | 'editor')}
                  className="rounded-md border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                >
                  <option value="viewer">Viewer</option>
                  <option value="editor">Editor</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm">
                {status && (
                  <span className={`flex items-center gap-1 ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {status.type === 'success' && <Check className="h-4 w-4" />}
                    {status.message}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
                >
                  {loading ? 'Sharing...' : 'Share'}
                </button>
              </div>
            </div>
          </form>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">People with access</h3>
            <ul className="space-y-3">
              {shares.length === 0 ? (
                <li className="text-sm text-zinc-500">Only you have access</li>
              ) : (
                shares.map(share => (
                  <li key={share.id} className="flex items-center justify-between text-sm">
                    <span className="font-medium text-zinc-900">{share.user_email}</span>
                    <span className="text-zinc-500 capitalize">{share.permission} access</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
