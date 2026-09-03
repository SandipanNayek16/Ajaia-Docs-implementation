# Architecture

This document outlines the architectural decisions and tradeoffs made during the development of Ajaia Docs.

## 1. Framework: Next.js (App Router) & React 19
- **Why**: Next.js App Router provides a seamless way to combine server-side logic (Server Actions, Route Handlers) with client-side interactivity. The built-in routing, optimized rendering, and ease of deployment on Vercel make it ideal for this timeboxed assignment.
- **Tradeoffs**: Next.js App Router has a learning curve around Server Components vs. Client Components, but it enables extremely secure data fetching and mutation patterns without building a separate API layer.

## 2. Database & Auth: Supabase (PostgreSQL)
- **Why**: Supabase provides a production-ready PostgreSQL database with built-in Auth and Row Level Security (RLS). This eliminates the need for managing sessions manually or writing complex backend authorization middleware.
- **RLS**: The data layer is secured at the database level. Even if a Server Action mistakenly allowed a read/write, RLS policies explicitly block access based on the authenticated user's ID and permissions (owner, viewer, editor).

## 3. Editor: Tiptap
- **Why**: Tiptap is a headless, framework-agnostic rich-text editor based on ProseMirror. It outputs structured JSON rather than raw HTML, which is cleaner, safer (prevents XSS), and easier to parse/manipulate.
- **Tradeoffs**: Tiptap doesn't come with a default UI, requiring us to build our own toolbar (which gives us better design control using shadcn/ui and Tailwind). 

## 4. State Persistence: Debounced Autosave
- **Implementation**: The editor uses a custom React hook approach to track changes. On every keystroke, a timer is reset. If the user stops typing for 1000ms, a Server Action (`updateDocument`) is triggered to persist the JSON to Supabase.
- **Tradeoffs**: Simple and effective for a single-user editing session or async collaboration. True real-time sync (like Google Docs) requires WebSockets/CRDTs (e.g., Yjs), which was scoped out due to the 4-6 hour timebox.

## 5. UI/UX: Tailwind CSS + shadcn/ui
- **Why**: shadcn/ui provides beautifully designed, accessible components that we have full control over. Tailwind enables rapid styling without context switching. The combination ensures a premium, polished feel within the strict time constraints.

## 6. Access Control & Authorization
- **Implementation**: The application uses a robust multi-layered approach to authorization:
  1. **Next.js Middleware**: Prevents unauthenticated users from accessing protected routes (`/dashboard`, `/documents/*`).
  2. **Server Actions**: Validates that the user is the owner or a shared editor before mutating the database.
  3. **Row Level Security (RLS)**: The ultimate source of truth, ensuring that database queries only return data the user is authorized to see or modify.

## 7. Automated Testing
- **Implementation**: Vitest is used to test the core authorization logic (`authz.ts`) to ensure that owners, editors, and viewers are correctly granted or denied access to document mutations.
