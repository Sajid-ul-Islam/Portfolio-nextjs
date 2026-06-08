# 🤖 AI Agent Developer Blueprint & Guidelines

This document serves as the guide, architectural blueprint, and set of operational rules for any AI agent (including yourself) working on the **VS Code Themed Portfolio** project.

---

## 🎯 Project Goals & Ethos
1. **Simple & Elegant**: The portfolio is designed for **Sajid Islam (Business & Data Analyst)**. It must remain professional, clean, and elegant.
2. **VS Code Theme Fidelity**: The interface is a high-fidelity replica of the Visual Studio Code IDE (Activity Bar, Sidebar, Title Bar, Status Bar, Editor Tabs, Breadcrumbs, and interactive Terminal).
3. **No Bloat**: All extraneous non-portfolio features (such as Word/Excel document simulators, hobbies tabs, family trees, or blogs) are removed to keep the bundle size and user interface focused.

---

## 🏗️ Folder Structure Blueprint
- `src/app/`: The core Next.js application directory.
- `src/app/(routes)/`: Holds the core portfolio pages:
  - `page.tsx` (Welcome/About)
  - `Experience/`
  - `Skills/`
  - `projects/` & `projects/[id]/` (Featured project views represented as code files)
  - `Education/`
  - `contact/`
- `src/app/components/vscode/`: Core VS Code UI shell elements.
- `src/app/lib/` & `src/lib/`: Custom hooks, helpers, and state contexts.
- `src/app/data/`: Static configuration and content datasets.

---

## ⚠️ Crucial Development Rules

### 1. Casing and Path Imports
- In [tsconfig.json](tsconfig.json), the absolute path alias `@/lib/*` is explicitly mapped to both `src/app/lib/*` and `src/lib/*`. 
- When adding new utility files, prefer placing them in `src/app/lib` or `src/lib` and importing them using `@/lib/<filename>`.
- Always check that imports of the data store use `@/app/data/portfolio` rather than `@/data/portfolio` which does not exist.

### 2. API Routes & Prerendering
- Any route handler under `src/app/api/.../route.ts` (such as `sendEmail` or `chat`) **must** include the dynamic directive:
  ```typescript
  export const dynamic = 'force-dynamic';
  ```
  Without this, the Next.js static build process will attempt to prerender these routes as static pages during page collection, causing compilation failures.

### 3. Tailwind Ambiguity Warnings
- Do not use class lists like `duration-[3000ms]` or `before:duration-[2000ms]` on elements that have active animations (e.g., `animate-ping`). This causes Tailwind compiler warnings because of ambiguity between transition-duration and animation-duration.
- Instead, use explicit Tailwind arbitrary properties:
  ```typescript
  [animation-duration:3000ms]
  before:[animation-duration:2000ms]
  ```

### 4. Running Commands on the Host
- On the Windows workspace host, PowerShell resolution can fail if run from root. Always invoke terminal commands with:
  - **Cwd**: `C:/Windows/System32/WindowsPowerShell/v1.0`
  - **Pathing**: Use `--prefix g:/Portfolio-nextjs` or absolute paths to target files.
  - **Do not** propose `cd` commands.

---

## 🤖 AI Copilot Chat Architecture
- The AI chat uses Vercel AI SDK, Pinecone, and Google Gemini.
- Toggles between local portfolio data and crawled live external content (`/api/site` cheerio web scraper).
- Maintain a clean **GitHub Copilot Chat** aesthetic: avoid sci-fi/tactical terminology ("Intel", "Operative", "Secure Uplink"). Use professional assistant framing.