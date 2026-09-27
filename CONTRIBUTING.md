# Contributing Guidelines

Thank you for your interest in contributing to the **Sajid Islam VS Code Portfolio**! Please review the guidelines below to ensure a smooth, high-quality development process.

---

## 1. Getting Started & Local Setup

### Prerequisites
- **Node.js**: v18.18.0 or higher (v20+ recommended).
- **npm** / **yarn** / **pnpm**.
- **Git**.

### Installation
```bash
# Clone the repository
git clone https://github.com/Sajid-ul-Islam/Portfolio-nextjs.git

# Navigate into the project root
cd Portfolio-nextjs

# Install dependencies
npm install

# Start the development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 2. Environment Variables Setup

Copy `.env.example` to `.env.local` or `.env` and fill in any required credentials:

```bash
cp .env.example .env.local
```

### Key Environment Keys:
- `NEXT_PUBLIC_SITE_URL`: Base domain (e.g., `https://sajid-ul-islam.vercel.app`).
- `GOOGLE_GENERATIVE_AI_API_KEY`: For Gemini model integration.
- `PINECONE_API_KEY`: Vector database for contextual RAG search.
- `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`: For contact feedback submission.

---

## 3. Git Workflow & Branching Strategy

1. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Commit your changes**:
   Use descriptive, conventional commit messages:
   - `feat: add CybrCraft case study and co-founder experience`
   - `fix: resolve terminal autocompletion path resolution`
   - `docs: update PRD and architecture diagrams`
   - `style: refine status bar badge padding`
3. **Run quality checks**:
   ```bash
   npm run lint
   npx tsc --noEmit
   ```
4. **Push and create a Pull Request**:
   ```bash
   git push origin feature/your-feature-name
   ```

---

## 4. Coding Standards & Conventions

### TypeScript & React
- Strict type checking is enforced. Do not leave implicit `any` types.
- Ensure all client components that use hooks or interactive state include `"use client";` at line 1.
- Use structured data definitions from [`src/app/data/portfolio.ts`](file:///h:/Repo/Portfolio-nextjs/src/app/data/portfolio.ts) rather than hardcoding personal data in presentation components.

### Styling & CSS
- Leverage VS Code theme variables (`var(--vscode-*)`) instead of static colors.
- Follow Tailwind CSS utility patterns combined with `cn()` (`clsx` + `tailwind-merge`).

### Performance & Accessibility
- Ensure all interactive buttons, links, and modal triggers have proper `aria-label` attributes.
- Use `next/image` with proper `sizes` and `aspect-ratio` for project graphics.

---

## 5. Pull Request Verification Checklist

- [ ] `npx tsc --noEmit` exits with code 0 without any errors.
- [ ] `npm run lint` passes without warnings.
- [ ] The responsive layout looks crisp across mobile and desktop viewports.
- [ ] No secrets, API keys, or temporary files are committed.
- [ ] New features or major data additions are documented in the respective markdown files.
