'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { useState, useCallback, useRef } from 'react'
import { Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, Undo, Redo } from 'lucide-react'
import { updateDocument } from '@/app/documents/[id]/actions'
import { useRouter } from 'next/navigation'
import ShareModal from './ShareModal'

export default function Editor({ 
  documentId, 
  initialTitle, 
  initialContent, 
  role 
}: { 
  documentId: string
  initialTitle: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialContent: any
  role: 'owner' | 'editor' | 'viewer'
}) {
  const isOwner = role === 'owner'
  const isViewer = role === 'viewer'
  const [title, setTitle] = useState(initialTitle)
  const [saveState, setSaveState] = useState<'saved' | 'saving' | 'error'>('saved')
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveDocument = useCallback(async (newTitle: string, newContent: any) => {
    setSaveState('saving')
    try {
      await updateDocument(documentId, newTitle, newContent)
      setSaveState('saved')
      router.refresh()
    } catch (err) {
      console.error(err)
      setSaveState('error')
    }
  }, [documentId, router])

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: initialContent,
    editable: !isViewer,
    onUpdate: ({ editor }) => {
      if (isViewer) return
      
      setSaveState('saving')
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
      
      saveTimeoutRef.current = setTimeout(() => {
        saveDocument(title, editor.getJSON())
      }, 1000)
    },
  })

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isViewer) return
    const newTitle = e.target.value
    setTitle(newTitle)
    
    setSaveState('saving')
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    
    saveTimeoutRef.current = setTimeout(() => {
      saveDocument(newTitle, editor?.getJSON())
    }, 1000)
  }

  const handleTitleBlur = () => {
    if (isViewer) return
    if (!title.trim()) {
      setTitle('Untitled document')
      saveDocument('Untitled document', editor?.getJSON())
    }
  }

  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => router.push('/dashboard')}
              className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              &larr; Ajaia Docs
            </button>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              disabled={isViewer}
              readOnly={isViewer}
              className="px-2 py-1 text-lg font-medium bg-transparent border-transparent focus:border-zinc-300 focus:bg-white focus:ring-0 rounded-md transition-all flex-1 max-w-md truncate disabled:opacity-100 disabled:bg-transparent"
              placeholder="Untitled document"
            />
            {isViewer && (
              <span className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10">
                View only
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            {!isViewer && (
              <span className="text-xs text-zinc-500 font-medium">
                {saveState === 'saved' && 'Saved'}
                {saveState === 'saving' && 'Saving...'}
                {saveState === 'error' && 'Couldn\'t save'}
              </span>
            )}
            {isOwner && (
              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-zinc-800 transition-colors"
              >
                Share
              </button>
            )}
          </div>
        </div>
        
        {/* Toolbar */}
        {!isViewer && (
          <div className="border-t border-zinc-200 bg-white px-4 py-2 sm:px-6 overflow-x-auto">
          <div className="mx-auto max-w-4xl flex items-center gap-1">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 rounded-md hover:bg-zinc-100 transition-colors ${editor.isActive('bold') ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500'}`}
              title="Bold"
            >
              <Bold className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 rounded-md hover:bg-zinc-100 transition-colors ${editor.isActive('italic') ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500'}`}
              title="Italic"
            >
              <Italic className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-2 rounded-md hover:bg-zinc-100 transition-colors ${editor.isActive('underline') ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500'}`}
              title="Underline"
            >
              <UnderlineIcon className="h-4 w-4" />
            </button>
            
            <div className="w-px h-6 bg-zinc-200 mx-2" />
            
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`p-2 rounded-md hover:bg-zinc-100 transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500'} text-sm font-semibold`}
              title="Heading 1"
            >
              H1
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`p-2 rounded-md hover:bg-zinc-100 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500'} text-sm font-semibold`}
              title="Heading 2"
            >
              H2
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`p-2 rounded-md hover:bg-zinc-100 transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500'} text-sm font-semibold`}
              title="Heading 3"
            >
              H3
            </button>
            
            <div className="w-px h-6 bg-zinc-200 mx-2" />
            
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-2 rounded-md hover:bg-zinc-100 transition-colors ${editor.isActive('bulletList') ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500'}`}
              title="Bullet List"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-2 rounded-md hover:bg-zinc-100 transition-colors ${editor.isActive('orderedList') ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500'}`}
              title="Ordered List"
            >
              <ListOrdered className="h-4 w-4" />
            </button>

            <div className="w-px h-6 bg-zinc-200 mx-2" />
            
            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className="p-2 rounded-md hover:bg-zinc-100 transition-colors text-zinc-500 disabled:opacity-50"
              title="Undo"
            >
              <Undo className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className="p-2 rounded-md hover:bg-zinc-100 transition-colors text-zinc-500 disabled:opacity-50"
              title="Redo"
            >
              <Redo className="h-4 w-4" />
            </button>
          </div>
        </div>
        )}
      </header>

      <main className="flex-1 mx-auto max-w-4xl w-full p-4 sm:p-8 md:py-12">
        <div className="bg-white border border-zinc-200 rounded-lg shadow-sm min-h-[500px] p-8 sm:p-12 prose prose-zinc max-w-none focus:outline-none">
          <EditorContent editor={editor} className="outline-none" />
        </div>
      </main>

      {isOwner && (
        <ShareModal 
          documentId={documentId} 
          isOpen={isShareModalOpen} 
          onClose={() => setIsShareModalOpen(false)} 
        />
      )}
    </div>
  )
}
