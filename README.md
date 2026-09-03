# Ajaia Docs

Ajaia Docs is a lightweight, collaborative document editor designed to be a simple workspace where users can create, edit, import, save, and share documents. This is a robust slice of a production-ready application, focusing heavily on core document workflows, rich text editing, sharing capabilities, and UX polish.

## Live Demo

*Since I do not have access to the production Supabase project yet, please deploy this repository to Vercel and link your Supabase project.*
**Production URL**: [To be deployed]

## Demo Accounts

You can test the application sharing flow using the following seeded accounts:

- **Alice (Owner)**
  - Email: `alice@ajaia-demo.com`
  - Password: `demo-password-123`
- **Bob (Collaborator)**
  - Email: `bob@ajaia-demo.com`
  - Password: `demo-password-123`

## Features

- **Document Creation**: Instantly create new documents with a clean interface.
- **Rich Text Editing**: Powered by Tiptap (bold, italic, underline, headings, lists, undo/redo).
- **Renaming**: Seamless inline document renaming.
- **Persistence**: Debounced autosaving (1000ms) persisting Tiptap JSON to the database.
- **File Import**: Import `.txt` and `.md` files directly into the editor.
- **Sharing**: Granular access control (viewer/editor permissions) with a polished sharing modal.
- **Access Control**: Robust server-side authorization and Row Level Security (RLS).
- **Automated Testing**: Test suites ensuring proper document authorization logic.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui.
- **Editor**: Tiptap (persists structured JSON).
- **Backend**: Next.js Server Actions & Route Handlers.
- **Database & Auth**: Supabase (PostgreSQL, Supabase Auth, Row Level Security).
- **Testing**: Vitest.

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env.local` file based on `.env.example`:

```env
# Your Supabase Project URL
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"

# Your Supabase Anon Key
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

## Database Setup

To set up the database, run the provided SQL scripts in your Supabase project's SQL Editor:

1. **`supabase/schema.sql`**: Creates the `documents` and `document_shares` tables, and enforces Row Level Security policies.
2. **`supabase/seed.sql`**: Seeds the database with the two demo accounts (Alice and Bob) in `auth.users`.

## Testing

Run the automated test suite for document authorization logic:
```bash
npm test
```

## Supported File Types

The file import feature supports the following file types:
- `.txt` (Text documents)
- `.md` (Markdown files)

## Architecture & AI Workflow

For a deep dive into the engineering decisions, tradeoffs, and AI usage, please review:
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [AI_WORKFLOW.md](./AI_WORKFLOW.md)

## Known Limitations

- **Real-time collaboration**: Real-time collaborative editing (e.g., Yjs or Supabase Realtime) was deliberately scoped out due to the timebox, prioritizing a stable vertical slice of core features.
- **Complex file parsing**: Markdown import does a basic paragraph split rather than full AST markdown-to-tiptap parsing.

## Future Improvements

If given an additional 4-6 hours, I would build:
1. True real-time collaborative editing using Yjs and Supabase Realtime.
2. Advanced Markdown parsing for file imports.
3. Live presence indicators ("Bob is viewing").
4. Document export (PDF/Markdown).
