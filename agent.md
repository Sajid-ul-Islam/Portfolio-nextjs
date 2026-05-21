# 🤖 AI Agent Architecture & Features

This document outlines the AI enhancements integrated into the VS Code Themed Portfolio. The AI chat feature provides an interactive way for visitors to query information about the portfolio and the developer using advanced LLMs and live website data.

## 🧠 AI Model Selection

The portfolio features a dynamic model selection UI, allowing users to choose the underlying language model that powers the chat responses.

### Supported Models
- **Gemini 1.5 Flash**: Optimized for speed and quick interactions.
- **Gemini 1.5 Pro**: Advanced reasoning for more complex queries.
- **Claude 3.5 Sonnet**: High-performance model with excellent nuanced comprehension.

### Security & Validation
- The backend implements strict API validation to ensure only the explicitly allowed models can be queried.
- Clear error responses are returned if an invalid or unsupported model is requested.

## 📚 Retrieval-Augmented Generation (RAG)

The chat agent implements a sophisticated RAG architecture using the Vercel AI SDK and Pinecone Vector Database to ground the LLM's responses in actual portfolio data.

### Architecture Flow
1. **Embedding Generation**: User queries are transformed into vector embeddings using Google's `text-embedding-004` model via the Vercel AI SDK.
2. **Similarity Search**: The embeddings are used to query a **Pinecone Vector Database** (`portfolio-index`) for the top-K most mathematically similar documents (e.g., resume details, project descriptions, blog posts).
3. **Context Augmentation**: The retrieved metadata text is injected directly into the LLM's system prompt context window.
4. **Streaming Generation**: The augmented prompt is sent to the selected model (e.g., `gemini-1.5-flash`), and the response is streamed back to the client interface.

### Fallback & Error Handling
- If context retrieval fails, the system gracefully degrades by informing the agent that specific context could not be found, allowing it to rely on its base knowledge where appropriate.

## 🌐 Data Sources & Website Scraping

To ensure the AI agent provides accurate and up-to-date information, it supports multiple data sources which can be toggled via the chat interface.

### Source Mode Toggle
Users can switch the AI's context between two primary modes:
1. **Portfolio Local Data**: The agent uses the static content bundled within the Next.js repository (Experience, Projects, Skills, etc.).
2. **Website Content**: The agent actively uses data scraped from the live external website.

### Website Scraping Endpoint (`/api/site`)
- A dedicated Next.js API route (`/api/site`) handles the extraction of text from the external site: `https://sajid-ul-islam.github.io/`.
- This allows the AI to ground its answers in the most recent external profile data.

### Live Refresh
- **"Refresh Site Snapshot" Button**: An in-chat utility that allows users to manually trigger a re-scrape of the website. This ensures the source content fed to the context window is completely up to date before the AI generates its response.

---

*This documentation serves as a guide for understanding the integration between the frontend chat interface, the scraping backend, and the chosen language models.*