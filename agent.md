# AI Agent Developer Blueprint & Guidelines

This document serves as the guide, architectural blueprint, and set of operational rules for any AI agent working on the **VS Code Themed Portfolio** project.

---

## Project Goals & Ethos
1. **Simple & Elegant**: The portfolio is designed for **Sajid Islam (Product-Minded Business & Data Analyst)**. It must remain professional, clean, and elegant.
2. **VS Code Theme Fidelity**: The interface is a high-fidelity replica of the Visual Studio Code IDE (Activity Bar, Sidebar, Title Bar, Status Bar, Editor Tabs, Breadcrumbs, and interactive Terminal).
3. **No Bloat**: All extraneous non-portfolio features are removed to keep the bundle size and user interface focused.

---

## Folder Structure Blueprint
- `src/app/`: The core Next.js application directory.
  - `page.tsx` (Welcome/About landing page)
  - `experience/` (Professional experience timeline)
  - `skills/` (Technical competencies page)
  - `projects/` & `projects/[id]/` (Featured project views as code files in the IDE)
  - `education/` (Academic accomplishments)
  - `contact/` (Contact feedback form page)
  - `github-pages/` (Embedded browser for sajid-ul-islam.github.io)
  - `settings.json/` (Theme and accent color settings)
- `src/app/components/vscode/`: Core VS Code UI shell elements (ActivityBar, Sidebar, Terminal, AIChat, etc.).
- `src/app/lib/` & `src/lib/`: Custom hooks, search helpers, and state contexts (Theme, Tabs, Layout, Accent, RecentPages).
- `src/app/data/`: Static configuration and content datasets (`portfolio.ts`).
- `src/app/api/`: API routes for AI chat, GitHub feed, email, and site scraping.

---

## Crucial Development Rules

### 1. Casing and Path Imports
- In `tsconfig.json`, the absolute path alias `@/lib/*` is mapped to both `src/app/lib/*` and `src/lib/*`.
- Prefer placing utilities in `src/app/lib` and importing via `@/lib/<filename>`.
- Data store imports use `@/app/data/portfolio`.

### 2. API Routes & Prerendering
- API route handlers under `src/app/api/.../route.ts` must include:
  ```typescript
  export const dynamic = 'force-dynamic';
  ```

### 3. Tailwind Ambiguity Warnings
- Do not use `duration-[3000ms]` on elements with active animations. Use:
  ```typescript
  [animation-duration:3000ms]
  before:[animation-duration:2000ms]
  ```

### 4. Theme & Accent System
- **Themes**: Managed via `next-themes` in `themeContext.tsx`. Supports: tactical-dark, vscode-dark, vscode-light, dracula, monokai.
- **Accent Colors**: Managed via `accentContext.tsx`. 10 presets + custom picker. Persists in localStorage as `vscode-accent`.
- Theme switching: Command Palette (`Ctrl+P`) or Settings page (`/settings.json`).

---

## AI Copilot Chat Architecture
- Uses Vercel AI SDK, Pinecone, and Google Gemini / Anthropic Claude.
- Toggles between local portfolio data and crawled live external content (`/api/site`).
- WhatsApp and Telegram quick-connect links are embedded inside the chatbot UI.
- Maintain a clean **GitHub Copilot Chat** aesthetic.
