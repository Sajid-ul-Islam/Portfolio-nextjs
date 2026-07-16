# Technical Competencies & Blueprint

This document outlines the core technical competencies, dependencies, and configuration blueprint required to maintain and build upon the VS Code-themed portfolio.

---

## 1. AI Integration & Orchestration
- **Model Routing**: Vercel AI SDK (`ai` package) with support for:
  - Google Gemini (`@ai-sdk/google`) - Flash and Pro models
  - Anthropic Claude (`@anthropic-ai/sdk`) - 3.5 Sonnet
- **RAG (Retrieval-Augmented Generation)**: Vector search using Pinecone (`portfolio-index`).
- **Dynamic Context Ingestion**: Cheerio scraper (`/api/site`) fetches live content from `sajid-ul-islam.github.io`.

---

## 2. Next.js App Router Architecture
- **Static Page Generation**: Portfolio optimized for static rendering.
- **Dynamic API Routes**: Must include `export const dynamic = 'force-dynamic';`
- **Shared Contexts**:
  - `src/app/lib/tabsContext.tsx` - Open tabs state
  - `src/app/lib/recentPagesContext.tsx` - Navigation history
  - `src/app/lib/themeContext.tsx` - Theme provider (next-themes)
  - `src/app/lib/accentContext.tsx` - Accent color provider
  - `src/app/lib/layoutContext.tsx` - Layout state (sidebar, terminal, AI chat)
  - `src/app/lib/useViewport.ts` - Responsive breakpoint detection

---

## 3. Styling & UI Tokens
- **Theme Variables**: CSS custom properties in `globals.css`.
- **Tailwind CSS**: Utility classes map to VS Code tokens:
  - Backgrounds: `bg-[var(--vscode-editor-background)]`
  - Borders: `border-[var(--vscode-border)]`
  - Text: `text-[var(--vscode-text-primary)]`
- **Accent Colors**: Dynamic via `--vscode-accent` variable, set by `accentContext.tsx`.
- **Custom Scrollbars**: Styled via CSS in `globals.css`.

---

## 4. Build & Environment Configuration
- **Environment Variables** (`.env.local`):
  - `GOOGLE_GENERATIVE_AI_API_KEY` - Gemini model access
  - `ANTHROPIC_API_KEY` - Claude model access
  - `PINECONE_API_KEY` & `PINECONE_INDEX_NAME` - RAG database
  - `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` - Contact form
  - `GITHUB_USERNAME`, `GITHUB_TOKEN` - GitHub feed API
- **Path Mappings**:
  - `@/lib/*` -> `src/app/lib/*` and `src/lib/*`
  - `@/*` -> `src/*`

---

## 5. Key Components
- **VSCodeShell**: Main layout wrapper, manages workspace state (active/minimized/closed).
- **AIChat**: Chatbot with WhatsApp/Telegram quick-connect links.
- **GitHubFeed**: Real-time commit feed from GitHub Events API with fallback data.
- **CommandPalette**: `Ctrl+P` palette for theme switching, navigation, and actions.
- **Settings Page**: GUI editor for themes, accent colors, font sizes, and zoom.
- **Embedded Browser**: `/github-pages` route renders `sajid-ul-islam.github.io` in an iframe.
