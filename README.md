# 💻 VS Code Themed Portfolio

An elegant, high-fidelity developer workspace-themed portfolio built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**. Designed for **Sajid Islam (Business & Data Analyst)**.

[![Next.js](https://img.shields.io/badge/Next.js-14.2.35-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## ✨ Features

### 💻 **VS Code IDE Interface**
- **Activity Bar & Sidebar**: Clean navigation for files, search, and settings.
- **Editor Tab System**: Multi-tab interface supporting pinning, closing, and tab history.
- **Theme Variables**: Full integration of VS Code theme configurations (Dark, Light, Dracula, Monokai).
- **Interactive File Tree**: Standard workspace explorer listing portfolio sections as files.
- **Simulated Terminal**: Interactive bash shell terminal supporting system utilities (`ls`, `cd`, `cat`, `neofetch`, `pwd`, `status`, etc.).

### 🚀 **Portfolio Core Sections**
- **Welcome**: Main workspace landing page showing personal summary.
- **Experience**: Clean timeline of professional corporate roles.
- **Skills**: Technical capabilities categorized by domain (Data Analytics, BI, Web Dev).
- **Projects**: Grid of featured work represented as tabbed code files in the IDE.
- **Education**: Detailed listing of academic accomplishments.
- **Contact**: Simulated editor-like feedback form with Turnstile Captcha and Resend email transmission.

### 🤖 **AI Copilot Chat**
- **GitHub Copilot Style Panel**: Chat panel built into the sidebar / floating triggers.
- **Model Selector**: In-app selection between Gemini 1.5 Flash, Gemini 1.5 Pro, and Claude 3.5 Sonnet.
- **Retrieval-Augmented Generation (RAG)**: Integrates with Vercel AI SDK and Pinecone Vector Database to answer user queries with actual data.
- **Source Toggles**: Switch context dynamically between Local Portfolio Data and Live Scraping Snaphots.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Icons**: Lucide React + React Icons
- **Deployment**: Vercel

---

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sajid-ul-islam/portfolio-nextjs.git
   cd portfolio-nextjs
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
   - *Mail settings*: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
   - *AI settings*: `GOOGLE_GENERATIVE_AI_API_KEY`, `PINECONE_API_KEY`, `PINECONE_INDEX_NAME`
   - *Optional features*: `GITHUB_USERNAME`, `GITHUB_TOKEN`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the workspace.

---

## 🤖 AI Agent & Developer Blueprints
For details on system rules, import path mappings, API configurations, and guidelines for future agent modifications, please review:
- [agent.md](agent.md) — Architectural rules and guidelines.
- [skill.md](skill.md) — Technical competencies and system dependencies.

---

## 📞 Contact

**Sajid Islam**
- 📧 Email: sajid.islam.chowdhury@gmail.com
- 💼 LinkedIn: [sajidislamchowdhury](https://www.linkedin.com/in/sajidislamchowdhury/)
- 🐱 GitHub: [sajid-ul-islam](https://github.com/sajid-ul-islam)
