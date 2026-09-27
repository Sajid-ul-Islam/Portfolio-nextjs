# AI Agent Developer Guidelines & Operational Rules

Welcome to the **Sajid Islam Portfolio (VS Code Themed Next.js App)** repository. This document establishes operational instructions, architectural boundaries, coding standards, and best practices for AI agents and human contributors working within this codebase.

---

## 1. Project Overview & Personas

- **Owner**: Sajid Islam (Co-Founder @ CybrCraft | Product-Minded Business & Data Analyst).
- **Core Philosophy**: A high-fidelity, interactive Visual Studio Code desktop IDE replica built with Next.js (App Router), TypeScript, and Tailwind CSS. It serves as an interactive portfolio showcasing software solutions, AI integrations, data analytics dashboards, and professional experience.
- **Key Experience Showcase**: **CybrCraft** (https://cybrcraft.com/), **Deen Commerce**, **NZ TEX GROUP**, **Daraz Bangladesh**, and **Gear Master**.

---

## 2. Directory Structure Conventions

```text
├── .agents/                 # Workspace customizations, agent rules & skills
│   └── rules/               # Agent execution rules
├── public/                  # Static assets, project showcase screenshots, favicons
│   └── img/                 # Profile, project, and utility graphics
├── src/
│   ├── app/                 # Next.js App Router root
│   │   ├── api/             # Route handlers (AI Chat, Site Scraper, Feed)
│   │   ├── components/      # Reusable UI & VS Code shell components
│   │   │   └── vscode/      # ActivityBar, Sidebar, Terminal, AIChat, Breadcrumbs, etc.
│   │   ├── contact/         # Contact feedback form
│   │   ├── data/            # Static data stores (portfolio.ts)
│   │   ├── education/       # Academic timeline
│   │   ├── experience/      # Professional experience timeline
│   │   ├── github-pages/    # Embedded legacy GitHub page explorer
│   │   ├── lib/             # Custom hooks, search indexer, local intel engine
│   │   ├── projects/        # Featured projects & case studies ([id]/page.tsx)
│   │   ├── settings.json/   # IDE theme and accent settings page
│   │   ├── skills/          # Technical competencies and toolkits
│   │   ├── layout.tsx       # Root IDE shell wrapper (TitleBar, ActivityBar, Sidebar, StatusBar)
│   │   └── page.tsx         # Welcome / Overview landing page
│   └── lib/                 # Shared utilities (cn helper, classnames)
├── ARCHITECTURE.md          # System architecture and data flow
├── DESIGN_SYSTEM.md         # Design tokens, typography, and UI specs
├── INTENT.md                # Vision, goals, and strategic milestones
├── PRD.md                   # Product requirements document
└── CONTRIBUTING.md          # Contribution guidelines and workflow
```

---

## 3. Core Coding Rules for AI Agents

### Rule 1: Type Safety & Path Aliases
- Always ensure strict TypeScript typing. Do not use `any` unless absolutely unavoidable.
- Use the configured `@/*` aliases:
  - `@/lib/*` maps to `src/app/lib/*` and `src/lib/*`.
  - `@/app/data/portfolio` maps to `src/app/data/portfolio.ts`.
  - Prefer relative imports when referencing sibling files within `src/app/components/vscode/`.

### Rule 2: App Router & Client Components
- Every interactive VS Code shell element (Terminal, Tabs, Command Palette, Activity Bar, Theme toggles) must declare `"use client";` at the top of the file.
- Static data should reside in [`src/app/data/portfolio.ts`](file:///h:/Repo/Portfolio-nextjs/src/app/data/portfolio.ts) so it can be safely referenced across server and client components.

### Rule 3: API Route Handlers
- Every route handler under `src/app/api/.../route.ts` must explicitly declare:
  ```typescript
  export const dynamic = "force-dynamic";
  ```
- Gracefully handle external service failures (Pinecone, Gemini, Anthropic, EmailJS) with fallbacks.

### Rule 4: Design Token Integrity
- Never introduce hardcoded arbitrary colors when a VS Code theme token exists.
- Always use CSS variables defined in [`globals.css`](file:///h:/Repo/Portfolio-nextjs/src/app/globals.css):
  - `var(--vscode-editor-background)`
  - `var(--vscode-sideBar-background)`
  - `var(--vscode-activityBar-background)`
  - `var(--vscode-statusBar-background)`
  - `var(--vscode-accent)`
  - `var(--vscode-text-primary)` / `var(--vscode-text-secondary)`
  - `var(--vscode-border)`

### Rule 5: Tailwind Animation Syntax
- Avoid Tailwind ambiguous duration properties like `duration-[3000ms]`. Use CSS variable or style notation:
  ```typescript
  className="[animation-duration:3000ms]"
  ```

### Rule 6: Verification Requirement
- After making TypeScript or component changes, always run:
  ```bash
  npx tsc --noEmit
  ```
  to verify that no type or compilation regressions are introduced.

---

## 4. Agent Operational Directives

1. **Maintain Aesthetic Excellence**: Changes must preserve the polished dark glassmorphism and VS Code IDE fidelity.
2. **Never Remove Core Portfolio Content**: Always enrich experience data, projects, and personal achievements rather than pruning or replacing existing records.
3. **Preserve State Contexts**: Keep `themeContext.tsx`, `accentContext.tsx`, `useOpenTabs.ts`, and `recentPagesContext.tsx` synchronized when introducing new routes or pages.
