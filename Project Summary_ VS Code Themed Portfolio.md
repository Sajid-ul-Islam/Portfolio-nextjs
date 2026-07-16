# Project Summary: VS Code Themed Portfolio

An elegant, high-fidelity developer workspace-themed portfolio built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS**. Designed for **Sajid Islam (Product-Minded Business & Data Analyst)**.

**Live URL**: [sajid-ul-islam.vercel.app](https://sajid-ul-islam.vercel.app)

---

## Key Features

### VS Code IDE Interface
- **Activity Bar & Sidebar**: Clean navigation for files, search, and settings.
- **Editor Tab System**: Multi-tab interface with pinning, closing, and tab history.
- **Theme System**: 5 themes (Tactical Dark, VS Code Dark+, Light+, Dracula, Monokai) with Command Palette switching.
- **Accent Color Picker**: 10 preset colors + custom color picker in Settings.
- **Interactive File Tree**: Portfolio sections as files in the workspace explorer.
- **Simulated Terminal**: Interactive bash shell with system utilities.
- **Embedded Browser**: View sajid-ul-islam.github.io inside the app.

### Portfolio Core Sections
- **Welcome**: Main workspace landing page with personal summary and metrics.
- **Experience**: Professional corporate role timeline.
- **Skills**: Technical capabilities by domain (Data Analytics, BI, AI, Product).
- **Projects**: Featured work with case studies, git diffs, and live links.
- **Education**: Academic accomplishments.
- **Contact**: Contact form with Turnstile Captcha and email integration.

### AI Copilot Chat
- **Multi-Model Support**: Gemini 1.5 Flash, Gemini 1.5 Pro, Claude 3.5 Sonnet.
- **RAG Integration**: Vercel AI SDK + Pinecone for grounded responses.
- **Source Toggles**: Portfolio Data, Live Website Scraping, or Combined.
- **Quick Connect**: WhatsApp and Telegram links for direct messaging.

### Live GitHub Feed
- Real-time commit activity from GitHub Events API.
- Fallback data when API is unavailable.
- Auto-refresh every 60 seconds.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Animation**: Framer Motion
- **Icons**: Lucide React + React Icons
- **AI**: Vercel AI SDK, Google Gemini, Anthropic Claude, Pinecone
- **Deployment**: Vercel

## Dependencies

- **AI/ML**: `@ai-sdk/google`, `@anthropic-ai/sdk`, `@google/generative-ai`, `@pinecone-database/pinecone`, `ai`
- **UI/UX**: `framer-motion`, `lucide-react`, `react-icons`, `tailwindcss-animate`, `cmdk`, `next-themes`
- **Data**: `cheerio`, `gray-matter`, `next-mdx-remote`
- **Utilities**: `clsx`, `tailwind-merge`, `dotenv-vault`
- **Email**: `@emailjs/browser`

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - ESLint checks
- `npm run test:build` - Lint + build

## Configuration

- `next.config.mjs` - Next.js config with remote image patterns
- `tailwind.config.ts` - Custom VS Code font sizes, spacing, colors, and animations
- `tsconfig.json` - Path aliases (`@/lib/*`, `@/*`)
