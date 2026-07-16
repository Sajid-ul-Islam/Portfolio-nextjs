# VS Code Themed Portfolio

An elegant, high-fidelity developer workspace-themed portfolio built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS**. Designed for **Sajid Islam (Product-Minded Business & Data Analyst)**.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## Features

### VS Code IDE Interface
- **Activity Bar & Sidebar**: Clean navigation for files, search, and settings.
- **Editor Tab System**: Multi-tab interface supporting pinning, closing, and tab history.
- **Theme System**: 5 built-in themes (Tactical Dark, VS Code Dark+, Light+, Dracula, Monokai) with live switching via Command Palette (`Ctrl+P`).
- **Accent Color Picker**: 10 preset accent colors plus custom color picker in Settings.
- **Interactive File Tree**: Standard workspace explorer listing portfolio sections as files.
- **Simulated Terminal**: Interactive bash shell terminal supporting system utilities.
- **Embedded Browser**: View `sajid-ul-islam.github.io` directly inside the app.

### Portfolio Core Sections
- **Welcome**: Main workspace landing page with personal summary and metrics.
- **Experience**: Clean timeline of professional corporate roles.
- **Skills**: Technical capabilities categorized by domain (Data Analytics, BI, AI, Product).
- **Projects**: Grid of featured work with case studies, git diffs, and live links.
- **Education**: Academic accomplishments.
- **Contact**: Contact form with Turnstile Captcha and email integration.

### AI Copilot Chat
- **GitHub Copilot Style Panel**: Chat panel with model selector.
- **Models**: Gemini 1.5 Flash, Gemini 1.5 Pro, Claude 3.5 Sonnet.
- **RAG Integration**: Vercel AI SDK + Pinecone Vector Database for grounded responses.
- **Source Toggles**: Switch between Portfolio Data, Live Website Scraping, or Combined.
- **Quick Connect**: WhatsApp and Telegram links inside the chatbot for direct messaging.

### Live GitHub Feed
- Real-time commit activity from the GitHub Events API.
- Fallback data when the API is unavailable.
- Auto-refreshes every 60 seconds.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Animation**: Framer Motion
- **Icons**: Lucide React + React Icons
- **AI**: Vercel AI SDK, Google Gemini, Anthropic Claude, Pinecone
- **Deployment**: Vercel

---

## Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sajid-ul-Islam/Portfolio-nextjs.git
   cd Portfolio-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Copy `.env.example` to `.env.local` and configure:
   ```bash
   cp .env.example .env.local
   ```
   - AI: `GOOGLE_GENERATIVE_AI_API_KEY`, `ANTHROPIC_API_KEY`
   - RAG: `PINECONE_API_KEY`, `PINECONE_INDEX_NAME`
   - Email: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
   - GitHub: `GITHUB_USERNAME`, `GITHUB_TOKEN`

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with ThemeProvider + AccentProvider
│   ├── page.tsx            # Home page
│   ├── api/
│   │   ├── chat/route.ts   # AI chat endpoint
│   │   ├── github/route.ts # GitHub feed API
│   │   ├── sendEmail/      # Contact form email
│   │   └── site/           # Website content scraper
│   ├── components/vscode/  # All VS Code UI components
│   ├── data/portfolio.ts   # All portfolio content data
│   ├── lib/                # Contexts, hooks, utilities
│   ├── github-pages/       # Embedded browser for GitHub Pages
│   └── [sections]/         # experience, skills, projects, education, contact
```

---

## Contact

**Sajid Islam**
- Email: sajid.islam.chowdhury@gmail.com
- LinkedIn: [sajidislamchowdhury](https://www.linkedin.com/in/sajidislamchowdhury/)
- GitHub: [Sajid-ul-Islam](https://github.com/Sajid-ul-Islam)
- WhatsApp: [Chat on WhatsApp](https://wa.me/+8801824526054)
- Telegram: [Chat on Telegram](https://t.me/SajidIslam)
