# Project Summary: VS Code Themed Portfolio

This project, titled "VS Code Themed Portfolio," is an elegant, high-fidelity developer workspace-themed portfolio built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**. It is designed for **Sajid Islam (Business & Data Analyst)**.

## Key Features

### VS Code IDE Interface
*   **Activity Bar & Sidebar**: Provides clean navigation for files, search, and settings.
*   **Editor Tab System**: Supports multi-tab interface with pinning, closing, and tab history.
*   **Theme Variables**: Integrates full VS Code theme configurations (Dark, Light, Dracula, Monokai).
*   **Interactive File Tree**: Lists portfolio sections as files in a standard workspace explorer.
*   **Simulated Terminal**: Offers an interactive bash shell terminal supporting system utilities like `ls`, `cd`, `cat`, `neofetch`, `pwd`, and `status`.

### Portfolio Core Sections
*   **Welcome**: The main workspace landing page displaying a personal summary.
*   **Experience**: A clean timeline of professional corporate roles.
*   **Skills**: Categorizes technical capabilities by domain (Data Analytics, BI, Web Dev).
*   **Projects**: Presents a grid of featured work as tabbed code files within the IDE.
*   **Education**: Details academic accomplishments.
*   **Contact**: A simulated editor-like feedback form with Turnstile Captcha and Resend email transmission.

### AI Copilot Chat
*   **GitHub Copilot Style Panel**: A chat panel integrated into the sidebar or floating triggers.
*   **Model Selector**: Allows in-app selection between Gemini 1.5 Flash, Gemini 1.5 Pro, and Claude 3.5 Sonnet.
*   **Retrieval-Augmented Generation (RAG)**: Integrates with Vercel AI SDK and Pinecone Vector Database to answer user queries with actual data.
*   **Source Toggles**: Enables dynamic context switching between Local Portfolio Data and Live Scraping Snapshots.

## Tech Stack

*   **Framework**: Next.js 14 (App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS + Custom CSS Variables
*   **Icons**: Lucide React + React Icons
*   **Deployment**: Vercel

## Dependencies

The project utilizes a range of dependencies for various functionalities, including:

*   **AI/ML**: `@ai-sdk/google`, `@anthropic-ai/sdk`, `@google/generative-ai`, `@pinecone-database/pinecone`, `ai`
*   **UI/UX & Animation**: `framer-motion`, `lucide-react`, `react-icons`, `tailwindcss-animate`
*   **Data Handling**: `cheerio`, `gray-matter`, `next-mdx-remote`
*   **Utilities**: `clsx`, `cmdk`, `dotenv-vault`, `tailwind-merge`
*   **Email**: `@emailjs/browser`
*   **Next.js Specific**: `next`, `next-themes`

## Development Scripts

*   `dev`: Starts the development server.
*   `build`: Builds the Next.js application for production.
*   `prebuild`: Skips audit for urgent deploy.
*   `export`: Exports the Next.js application to static HTML.
*   `start`: Starts the production server.
*   `lint`: Runs ESLint for code quality checks.
*   `test:build`: Runs lint and build.
*   `predeploy`: Runs `test:build` before deployment.
*   `deploy`: Deploys the `out` directory using `gh-pages`.

## Configuration

The `next.config.mjs` file configures Next.js, including remote image patterns for `https://via.placeholder.com` and `https://img.icons8.com`.
