# AI Workflow

This project was built primarily by an autonomous AI agent (Google Antigravity) with human-in-the-loop oversight.

## Setup & Planning
1. The AI analyzed the prompt requirements and constraints (4-6 hour timebox, no Google Docs clone, focus on polish).
2. The AI generated a comprehensive implementation plan (`implementation_plan.md`), defining the tech stack (Next.js, Supabase, Tiptap, Tailwind) and the architectural approach.
3. The human engineer reviewed and approved the plan, acting as a Product Manager.

## Execution
The AI executed the plan iteratively:
- **Phase 1: Foundation**: Set up Next.js, installed Tailwind, shadcn/ui, and configured the Supabase database schema and RLS policies via SQL scripts.
- **Phase 2: Authentication**: Implemented Supabase SSR Auth, creating middleware to protect routes, and built the Login interface with seeded demo accounts.
- **Phase 3: Core Editor**: Integrated Tiptap, implemented a custom toolbar, and built the debounced autosave mechanism using Next.js Server Actions.
- **Phase 4: Dashboard & Sharing**: Built the dashboard to list owned and shared documents. Developed the Share Modal and implemented the sharing logic (viewer/editor permissions).
- **Phase 5: Import & Polish**: Added the ability to import `.txt` and `.md` files directly into the editor, converting them to Tiptap JSON.
- **Phase 6: Testing**: Wrote Vitest unit tests to verify the authorization logic (`authz.ts`) ensuring that users can only modify documents they own or have editor permissions for.

## Prompts & Interactions
The human primarily provided high-level directives and course corrections:
- "Please implement the Sharing UI."
- "Write an automated test around document access/sharing authorization using Vitest."

The AI handled all code generation, terminal commands, file writing, and test running. The AI also automatically corrected issues it encountered (e.g., mocking Supabase chaining in Vitest).
