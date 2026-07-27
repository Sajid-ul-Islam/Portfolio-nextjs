# VS Code Themed Portfolio

An elegant, high-fidelity developer workspace-themed portfolio built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS**. Designed for **Sajid Islam (Product-Minded Business & Data Analyst)**.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## Featured Products & Automation Chatbots

- ⚡ **DESCO Electricity Usage Assistant** ([Telegram Bot @descoTGbot](https://t.me/descoTGbot) | [GitHub Repo](https://github.com/Sajid-ul-Islam/descoiunfobot))
  - Real-time electricity consumption monitoring, prepaid/postpaid bill queries, and automated utility assistance via Telegram.
- 🛍️ **WooCommerce Telegram E-Commerce Bot** ([Telegram Bot @DEEN_Commerce_bot](https://t.me/DEEN_Commerce_bot) | [GitHub Repo](https://github.com/Sajid-ul-Islam/woocom_telegram_bot))
  - Automated e-commerce shopping chatbot allowing customers to browse catalog products, place orders, check stock levels, and track status live in Telegram.
- 💬 **WooCommerce WhatsApp Business Assistant** ([GitHub Repo](https://github.com/Sajid-ul-Islam/WooCom_WhatsApp_Bot))
  - Python Flask webhook application linking WooCommerce stores with Twilio WhatsApp API for 24/7 automated support & order dispatch alerts.

---

## Features

### VS Code IDE Interface
- **Material Icon Theme & Codicons**: High-fidelity file icons and VS Code activity bar icons.
- **Activity Bar & Sidebar**: Clean navigation for files, search, source control, and settings.
- **Editor Tab System**: Multi-tab interface supporting pinning, closing, and tab history without render side-effects.
- **Theme System**: 5 built-in themes (Tactical Dark, VS Code Dark+, Light+, Dracula, Monokai) with live switching.
- **Interactive File Tree**: Standard workspace explorer featuring nested project scripts (`desco_bot.py`, `woocom_bot.py`, `woocom_whatsapp.py`) beneath `Projects.py`.
- **VS Code Web Browser (`/github-pages`)**: Interactive live browser preview with address bar, viewport switcher (desktop, tablet, mobile), and SSL status.

### Portfolio Core Sections
- **Welcome**: Main workspace landing page with personal summary and metrics.
- **Experience**: Clean timeline of professional corporate roles.
- **Skills**: Technical capabilities categorized by domain (Data Analytics, BI, AI, Product).
- **Projects**: Grid of featured work with case studies, git diffs, live demos, and verified GitHub repositories.
- **Education**: Academic accomplishments.
- **Contact**: Contact form with Turnstile Captcha and email integration.

### Antigravity AI Agent Chatbox (v3.6)
- **High-Tech Agent Interface**: Futuristic glassmorphism card with glowing cybernetic accents.
- **Step-by-Step Thought Trace**: Collapsible multi-step reasoning trace box for agent lookups.
- **Model Selector**: Switch between Gemini 3.6 Flash, Gemini 1.5 Pro, and Claude 3.5 Sonnet.
- **RAG Integration**: Vector embedding search grounded with portfolio data and live web scraping.
- **Quick Action Chips**: One-click quick prompts for instant background & project inquiries.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Synchronized CSS Theme Variables
- **Animation**: Framer Motion
- **Icons**: Simple Icons + React Icons (Lu & Vsc Codicons)
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
│   │   ├── chat/route.ts   # Antigravity AI chat endpoint
│   │   ├── github/route.ts # GitHub feed API
│   │   ├── sendEmail/      # Contact form email
│   │   └── site/           # Website content scraper
│   ├── components/vscode/  # All VS Code UI components & Antigravity Agent
│   ├── data/portfolio.ts   # All portfolio content data & project catalog
│   ├── lib/                # Contexts, hooks, utilities
│   ├── github-pages/       # Interactive VS Code Live Browser
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

