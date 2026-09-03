'use client'

import { useState, useRef } from 'react'
import { Upload } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function ImportFile({ userId }: { userId: string }) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith('.txt') && !file.name.endsWith('.md')) {
      alert('Unsupported file type. Please upload a .txt or .md file.')
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
      alert('Failed to import file')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  return (
    <>
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
    </>
  )
}
