import { NextResponse } from 'next/server'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require('pdf-parse/lib/pdf-parse.js')

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    
    // pdf-parse extracts the text
    const data = await pdfParse(buffer)

    return NextResponse.json({ text: data.text })
  } catch (error: unknown) {
    const err = error as { message?: string }
    console.error('Error parsing PDF:', err)
    return NextResponse.json({ error: err?.message || 'Failed to parse PDF' }, { status: 500 })
  }
}
