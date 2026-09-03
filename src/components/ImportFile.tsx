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

    // All data types allowed

    setIsUploading(true)

    try {
      const title = file.name.replace(/\.[^/.]+$/, "")
      let content;

      // Check if it's a text-based file
      if (file.type.startsWith('text/') || file.type === 'application/json' || file.name.endsWith('.md') || file.name.endsWith('.csv')) {
        const text = await file.text()
        const paragraphs = text.split('\n\n').filter(p => p.trim() !== '')
        
        content = {
          type: "doc",
          content: paragraphs.length > 0 ? paragraphs.map(p => ({
            type: "paragraph",
            content: [{ type: "text", text: p.trim() }]
          })) : [{ type: "paragraph" }]
        }
      } else if (file.type === 'application/pdf') {
        // Guard against very large PDFs – limit to 5 MB to avoid serverless memory blow‑outs
        if (file.size > 5 * 1024 * 1024) {
          throw new Error('PDF file too large (max 5 MB). Please reduce the file size before uploading.')
        }
        const formData = new FormData()
        formData.append('file', file)
        
        const res = await fetch('/api/parse-pdf', {
          method: 'POST',
          body: formData
        })
        
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}))
          throw new Error(`PDF API Error: ${errorData.error || 'Failed to parse PDF file'}`)
        }
        
        const { text } = await res.json()
        const paragraphs = text.split('\n\n').filter((p: string) => p.trim() !== '')
        
        content = {
          type: "doc",
          content: paragraphs.length > 0 ? paragraphs.map((p: string) => ({
            type: "paragraph",
            content: [{ type: "text", text: p.trim() }]
          })) : [{ type: "paragraph" }]
        }
      } else {
        // For binary files, images, etc., create a placeholder document
        content = {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: `[Imported ${file.type || 'binary'} file: ${file.name}]` }]
            }
          ]
        }
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

      if (error) throw new Error(`Supabase error: ${error.message} - ${error.details || ''}`)
      if (!data) throw new Error('No data returned from insert')

      router.push(`/documents/${data.id}`)
    } catch (e: any) {
      console.error('Import failed', e?.message || e)
      console.error('Full error object:', JSON.stringify(e, Object.getOwnPropertyNames(e)))
      setErrorMsg(`Unable to import this file: ${e?.message || 'Unknown error'}`)
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
