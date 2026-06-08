# 🛠️ Technical Competencies & Blueprint

This document outlines the core technical competencies, dependencies, and configuration blueprint required to maintain and build upon the VS Code-themed portfolio.

---

## 🤖 1. AI Integration & Orchestration
- **Model Routing**: Utilizes the **Vercel AI SDK** (`ai` package) to stream responses. Supports switching between:
  - Google Gemini (`@ai-sdk/google`)
  - Anthropic Claude (`@ai-sdk/anthropic`)
- **RAG (Retrieval-Augmented Generation)**: Grounded chat completions using vector search.
  - **Pinecone**: Vector database (`portfolio-index`) storing chunked document embeddings.
  - **Embeddings**: Google's `text-embedding-004` model generates query vectors.
- **Dynamic Context Ingestion**: Uses a Cheerio scraping endpoint (`/api/site`) to scrape the live portfolio website and inject it into the AI context window dynamically.

---

## 🌐 2. Next.js App Router Architecture
- **Static Page Generation**: The portfolio is optimized for static rendering. Route files under the `src/app/` tree must be kept clean of server-only modules unless defined as dynamic.
- **Dynamic API Directives**: Since this project compiles to static assets, API route files *must* explicitly opt out of static prerendering:
  ```typescript
  export const dynamic = 'force-dynamic';
  ```
- **Shared States**: State for open tabs, active explorer files, active sidebar, and current pathname is shared via:
  - `src/app/lib/tabsContext.tsx`
  - `src/app/lib/recentPagesContext.tsx`
  - `src/app/lib/themeContext.tsx`

---

## 🎨 3. Styling & Modern UI Tokens
- **Theme Variables**: Custom styling is handled through CSS custom properties (variables) defined in [globals.css](src/app/globals.css).
- **Tailwind CSS**: Utility classes must map directly to VS Code's standard tokens:
  - Backgrounds: `bg-[var(--vscode-editor-background)]`
  - Borders: `border-[var(--vscode-border)]`
  - Text: `text-[var(--vscode-foreground)]`
- **Ambiguity Checks**: Tailwind utilities must not conflict. Avoid using plain `duration-[...]` properties on elements containing animations; use exact property mappings (e.g. `[animation-duration:...]`).

---

## ⚙️ 4. Build & Environment Configurations
- **Environment Keys**: The following keys must be set in `.env.local` for full capability:
  - `GOOGLE_GENERATIVE_AI_API_KEY` (Gemini model access)
  - `PINECONE_API_KEY` & `PINECONE_INDEX_NAME` (RAG database)
  - `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (Contact mailer)
- **Path Mappings**:
  - `@/lib/*` mapped to `src/app/lib/*` and `src/lib/*`
  - `@/*` mapped to `src/*`