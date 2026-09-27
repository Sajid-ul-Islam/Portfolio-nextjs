# Product Requirements Document (PRD)

## Project Title: VS Code Interactive Portfolio
- **Owner**: Sajid Islam (Co-Founder @ CybrCraft | Product-Minded Business & Data Analyst)
- **Live URL**: https://sajid-ul-islam.vercel.app
- **Version**: 2.0.0
- **Status**: Active / Production

---

## 1. Executive Summary & Problem Statement

### 1.1 The Challenge
Standard developer portfolios often consist of static landing pages with generic layouts that fail to engage technical recruiters, engineering leaders, and potential enterprise clients. They lack interactive depth and fail to showcase both software development capability and product analytical thinking.

### 1.2 The Solution
An interactive, high-fidelity **Visual Studio Code IDE portfolio** built with Next.js and Tailwind CSS. The portfolio turns portfolio browsing into an immersive developer workflow, combining real IDE interactions (code tabs, terminal emulator, command palette, live search, breadcrumbs, and AI Copilot chat) with deep product case studies and verified business impact metrics.

---

## 2. Target Audience & User Personas

| Persona | Motivation | Key Needs |
| :--- | :--- | :--- |
| **Enterprise Clients & Founders** | Seeking technical co-founders or software engineering solutions from CybrCraft. | Case studies, business impact, live URLs, technology reliability, direct contact channels. |
| **Tech Recruiters & HR** | Evaluating technical and product analytics background. | Fast navigation, clear timeline, resume download, verified skillset breakdown. |
| **Engineering Managers** | Assessing code quality, architectural depth, and full-stack/AI capabilities. | Real code diffs, interactive terminal, API design, RAG pipeline demonstrations. |

---

## 3. Core Features & Functional Requirements

### 3.1 VS Code Shell & Navigation
- **Activity Bar**: Quick switching between Explorer, Global Search, Source Control (Git info), AI Chat, Account & Settings.
- **Collapsible Sidebar**: Dynamic file tree explorer categorizing welcome, experience, projects, skills, education, and contact pages.
- **Tab Management System**:
  - Open, close, switch, and pin tabs.
  - Keyboard shortcuts (`Ctrl+W` to close tab, `Ctrl+Tab` to cycle).
  - Dynamic file icons and extensions based on technology (e.g., `.tsx`, `.py`, `.json`, `.sql`).
- **Command Palette (`Ctrl+P` / `Cmd+P`)**:
  - Instant fuzzy search across all files, case studies, themes, and actions.
- **Status Bar**: Real-time git branch (`main*`), error/warning counts, line/column tracking, UTF-8 badge, and quick theme indicator.

### 3.2 Interactive Terminal Emulator (`Ctrl+\``)
- Fully interactive POSIX-like command shell with mock filesystem (`/home/sajid/...`).
- Supported commands: `help`, `ls`, `cd`, `cat`, `clear`, `pwd`, `whoami`, `contact`, `projects`, `experience`, `skills`, `theme`, `date`, `exit`.
- Command history navigation (`Up` / `Down` arrows) and tab autocompletion.

### 3.3 Portfolio Showcase & Case Studies
- **Experience Timeline**: Detailed career progression showcasing **CybrCraft (Co-Founder)**, **Deen Commerce**, **NZ TEX GROUP**, **Daraz Bangladesh**, and **Gear Master** with verified metrics, external links, and tech stacks.
- **Project Case Studies**:
  - In-depth problem/solution breakdowns, impact statistics, and live demo links.
  - Interactive Git Diffs simulating code review pull requests.
  - Mission logs and real-time execution animation.
- **Technical Skills Matrix**: Visual category grouping (ML & Forecasting, BI & Dashboards, Core Data Ops, AI Systems, Product & Strategy).
- **Academic Background**: Higher education credentials, publications, and certifications.
- **Contact & Feedback**: Functional inquiry form with EmailJS integration and direct WhatsApp/Telegram triggers.

### 3.4 AI Copilot Assistant & Intelligence Engine
- **Hybrid Search Engine**:
  - Local intent resolver (`intelEngine.ts`) for instant zero-latency responses.
  - Fallback to Vector Database (Pinecone) / LLM (Gemini / Claude) for comprehensive questions.
- Integrated quick-action prompts (e.g., *"Summarize Sajid's Experience"*, *"Tell me about CybrCraft"*, *"Show RAG projects"*).

### 3.5 Personalization & Theme Engine
- 5 high-contrast themes: `tactical-dark`, `vscode-dark`, `vscode-light`, `dracula`, `monokai`.
- 10 accent color presets + custom hex color picker persisting in `localStorage`.

---

## 4. Non-Functional Requirements

- **Performance**: Lighthouse score ≥ 95 on desktop and mobile. Zero layout shift (CLS < 0.05).
- **SEO & Social Sharing**: Complete OpenGraph, Twitter Cards, dynamic sitemap (`/sitemap.xml`), and robots.txt.
- **Accessibility**: ARIA labels on all interactive controls, full keyboard accessibility, high-contrast text ratios.
- **Responsiveness**: Adaptive layout scaling seamlessly from 320px mobile screens to 4K ultra-wide monitors.
- **Reliability**: Graceful degradation when third-party APIs (AI models, email gateways) are unreachable.

---

## 5. Success Metrics & KPIs

1. **User Engagement**: Average session duration > 2.5 minutes; interaction rate with Terminal or Command Palette > 40%.
2. **Inquiry Conversion**: Contact form submissions and WhatsApp chat triggers.
3. **Performance Standards**: First Contentful Paint (FCP) < 1.0s, Time to Interactive (TTI) < 1.5s.
