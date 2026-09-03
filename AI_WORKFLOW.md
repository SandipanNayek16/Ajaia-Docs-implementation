# AI Workflow

This project was built leveraging an AI-native workflow, treating the AI as an autonomous pair programmer.

## 1. Which AI tools you used
I used **Google Antigravity**, an agentic AI coding assistant designed to handle complex, multi-file software engineering tasks autonomously.

## 2. Where AI materially sped up your work
The AI significantly accelerated development in several key areas:
- **Scaffolding and Boilerplate**: Setting up the Next.js App Router, integrating Tailwind CSS with shadcn/ui, and wiring up the initial Supabase SSR clients were completed in minutes instead of an hour.
- **Database Architecture**: The AI instantly generated robust SQL schemas and PostgreSQL Row Level Security (RLS) policies (`schema.sql`), ensuring data access was secure by default without me having to manually write complex SQL.
- **Component Implementation**: Integrating the Tiptap editor and building a custom formatting toolbar would normally require extensive documentation reading, but the AI generated a working, styled component out of the box.

## 3. What AI-generated output you changed or rejected
While the AI was highly capable, I had to course-correct and refine its output:
- **Vitest Mocking**: The AI initially struggled with chaining mocks (`select().eq().single()`) in Vitest when testing Supabase. I stepped in and guided it to extract the authorization logic into a pure function (`authz.ts`) so we could test the business logic directly without wrestling with complex ORM mocks.
- **Scope Creep**: I acted as the Product Manager, explicitly preventing the AI from attempting to build WebSockets or real-time Yjs syncing, prioritizing a stable, debounced autosave architecture instead to fit within the timebox.

## 4. How you verified correctness, UX quality, and implementation reliability
- **Correctness**: I instructed the AI to write an automated test suite (`authz.test.ts`) covering the critical authorization matrix to ensure that viewers couldn't edit documents and unrelated users couldn't read them. 
- **UX Quality**: I reviewed the frontend visually at each step, ensuring the shadcn/ui components felt premium and cohesive. I explicitly requested features like inline-title renaming and clean empty states.
- **Reliability**: I relied heavily on Supabase's Row Level Security (RLS). By verifying the RLS policies in `schema.sql`, I ensured that even if a frontend component or Server Action had a vulnerability, the database itself would reject unauthorized queries.
