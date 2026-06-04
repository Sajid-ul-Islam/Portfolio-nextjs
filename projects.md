# 🚀 Portfolio Projects & AI Modules

This document details the specific projects and technical modules described in the AI Agent architecture. These components serve as both functional features and the primary data sources for the RAG (Retrieval-Augmented Generation) system.

## 1. VS Code Themed Portfolio
- **Description**: A Next.js-based interactive developer portfolio designed to replicate the Visual Studio Code interface.
- **Role in AI Agent**: Acts as the primary "Local Data" source. The agent retrieves context from the Experience, Projects, and Skills sections bundled within this repository.
- **Key Technologies**: Next.js 14, TypeScript, Tailwind CSS.

## 2. AI Chat Agent (RAG Implementation)
- **Description**: An intelligent conversational interface integrated directly into the portfolio.
- **Capabilities**: Grounded query responses using Pinecone, streaming text generation, and dynamic model switching.
- **Integration**: Built using the **Vercel AI SDK** and supports models from Google (Gemini) and Anthropic (Claude).

## 3. Website Content Scraper (`/api/site`)
- **Description**: A dedicated API utility used to ingest data from external sources.
- **Source URL**: `https://sajid-ul-islam.github.io/`
- **Functionality**: Extracts raw text content from the live external profile to ensure the AI's "Website Content" mode is always current.

## 4. Portfolio Vector Index (`portfolio-index`)
- **Description**: A high-performance vector database hosted on **Pinecone**.
- **Data Content**: Stores mathematically represented "embeddings" of resume details, detailed project descriptions, and blog posts.
- **Search Logic**: Uses semantic similarity to find the most relevant context for any user query.

## 5. Metadata Context Engine
- **Description**: The system responsible for injecting retrieved text metadata into the LLM system prompt.
- **Fallback Mechanism**: Ensures the agent can still provide helpful, general information even if a specific similarity search returns low-confidence results.