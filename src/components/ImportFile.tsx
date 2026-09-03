'use client'

import { useState, useRef } from 'react'
import { Upload } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function ImportFile({ userId }: { userId: string }) {
  const [isUploading, setIsUploading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null)
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith('.txt') && !file.name.endsWith('.md')) {
      setErrorMsg('Unsupported file type. Please upload a .txt or .md file.')
      return
    }

    setIsUploading(true)

    try {
      const text = await file.text()
      const title = file.name.replace(/\.[^/.]+$/, "")
      
      // Basic conversion: split by paragraphs
      const paragraphs = text.split('\n\n').filter(p => p.trim() !== '')
      
      const content = {
        type: "doc",
        content: paragraphs.length > 0 ? paragraphs.map(p => ({
          type: "paragraph",
          content: [
            {
              type: "text",
              text: p.trim()
            }
          ]
        })) : [
          { type: "paragraph" }
        ]
      }

      const supabase = createClient()
      const { data, error } = await supabase
        .from('documents')
        .insert([
          { 
            title: title || 'Imported document',
            owner_id: userId,
            content
          }
        ])
        .select()
        .single()

      if (error || !data) throw error

      router.push(`/documents/${data.id}`)
    } catch (e) {
      console.error('Import failed', e)
      setErrorMsg('Unable to import this file. Please try again.')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  return (
    <div className="flex flex-col items-end gap-2 relative">
      <div className="flex items-center gap-3">
        <input 
          type="file" 
          accept=".txt,.md" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-white border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 hover:text-zinc-900 transition-colors disabled:opacity-50"
        >
          <Upload className="h-4 w-4" />
          {isUploading ? 'Importing...' : 'Import File'}
        </button>
      </div>
      {errorMsg && (
        <div className="absolute top-full mt-2 right-0 bg-red-50 text-red-600 text-xs px-3 py-2 rounded-md border border-red-100 whitespace-nowrap shadow-sm z-20">
          {errorMsg}
        </div>
      )}
    </div>
  )
}
