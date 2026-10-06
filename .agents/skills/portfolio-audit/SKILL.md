---
name: portfolio-audit
description: >-
  Audits, tests, and validates the Next.js VS Code-themed portfolio before deployment, pull request, or major release.
  Use this skill when verifying portfolio datasets, testing static exports vs dynamic API routes, running typechecks,
  or conducting QA on theme fidelity and live site previews.
---

# Portfolio Audit & Release Runbook

This skill defines the complete verification and release workflow for the **Sajid Islam Portfolio (VS Code Themed Next.js App)**.

---

## Workflow Checklist

### Phase 1: Static Data Synchronicity Audit
Verify that updates to work history, projects, or achievements are synchronized across all relevant components:
1. **Portfolio Data**: Check [`src/app/data/portfolio.ts`](file:///h:/Repo/Portfolio-nextjs/src/app/data/portfolio.ts):
   - `experiences`: Contains accurate company names, roles, dates, bullets, and `current: boolean`.
   - `projects`: Contains unique `id`, `title`, `description`, `technologies`, `featured` status, and matching `image` path.
   - `fileTree`: Explorer tree reflects all routes and project shortcuts.
2. **Local Intel Engine**: Check [`src/app/lib/intelEngine.ts`](file:///h:/Repo/Portfolio-nextjs/src/app/lib/intelEngine.ts) for matching intent keywords.
3. **Virtual Shell File Tree**: Check [`src/app/components/vscode/Terminal.tsx`](file:///h:/Repo/Portfolio-nextjs/src/app/components/vscode/Terminal.tsx) `INITIAL_FS` and `FILE_CONTENT` dictionaries.

### Phase 2: Type Safety & Compilation
Run strict TypeScript validation to ensure zero type regressions:
```bash
npx tsc --noEmit
```
*Criteria*: Must exit with code 0. No `any` types or missing prop interfaces.

### Phase 3: Production Build Verification
Execute Next.js production build:
```bash
npm run build
```
*Criteria*:
- Turbopack compiles successfully.
- All static pages (48+ routes) and dynamic server endpoints (`/api/chat`, `/api/site`, `/api/github`) build without errors.
- Image assets resolve properly under `public/img/`.

### Phase 4: Live Preview & External Embedding Audit
1. Open [`src/app/github-pages/page.tsx`](file:///h:/Repo/Portfolio-nextjs/src/app/github-pages/page.tsx) and verify:
   - Presets include Deen Commerce (`https://deencommerce.vercel.app/`), CybrCraft (`https://cybrcraft.com/`), and Deakho TV (`https://deakho.vercel.app/`).
   - Multi-viewport switcher (Desktop, Tablet, Mobile) toggles responsive widths.
   - Escape key exits fullscreen preview.
   - Direct "Open in Tab" fallback link is present for sites with framing restrictions.

### Phase 5: Theme & Aesthetic Integrity Audit
Verify theme persistence and token integrity across:
- **Themes**: Tactical Dark, VS Code Dark+, VS Code Light+, Dracula, Monokai.
- **Aesthetic Modes**: Luminous Glassmorphism, Quantum Cyber 2099, Tactical Cyber, Claymorphism, Classic IDE.
- **Design Tokens**: No hardcoded colors where `var(--vscode-*)` tokens exist in `globals.css`.
- **Sound SFX**: Web Audio API toggle functions properly in Status Bar and Title Bar without blocking page loads.

---

## Deployment Modes

### Mode A: Vercel / Full-Stack Node.js (Recommended)
Supports live streaming AI chat (`/api/chat`), Pinecone vector lookups, and web scraping:
```bash
vercel --prod
```

### Mode B: Static HTML Export (GitHub Pages)
When deploying purely static HTML without serverless functions:
```bash
$env:NEXT_EXPORT="true"; npm run build; npm run deploy
```
*(Windows PowerShell syntax)*
