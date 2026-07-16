# Portfolio Projects & AI Modules

This document details the specific projects and technical modules described in the AI Agent architecture.

## 1. VS Code Themed Portfolio
- **Description**: Next.js interactive developer portfolio replicating the Visual Studio Code interface.
- **URL**: [sajid-ul-islam.vercel.app](https://sajid-ul-islam.vercel.app)
- **Role in AI Agent**: Primary "Local Data" source for RAG context.
- **Key Technologies**: Next.js 16, TypeScript, Tailwind CSS, Framer Motion.

## 2. AI Chat Agent (RAG Implementation)
- **Description**: Conversational interface integrated into the portfolio.
- **Capabilities**: Grounded responses via Pinecone, streaming text, model switching.
- **Models**: Gemini 1.5 Flash, Gemini 1.5 Pro, Claude 3.5 Sonnet.
- **Integration**: Vercel AI SDK with Google and Anthropic providers.

## 3. Website Content Scraper (`/api/site`)
- **Description**: API utility for ingesting external content.
- **Source URL**: `https://sajid-ul-islam.github.io/`
- **Functionality**: Extracts raw text from the live GitHub Pages profile for AI context.

### Implementation
```typescript
// src/app/api/site/route.ts
import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET() {
  try {
    const targetUrl = 'https://sajid-ul-islam.github.io/';
    const response = await fetch(targetUrl, { next: { revalidate: 3600 } });
    const html = await response.text();
    
    const $ = cheerio.load(html);
    $('script, style, nav, footer, noscript').remove();
    const rawText = $('body').text().replace(/\s+/g, ' ').trim();

    return NextResponse.json({ content: rawText });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch external site' }, { status: 500 });
  }
}
```

## 4. Portfolio Vector Index (`portfolio-index`)
- **Description**: Vector database hosted on Pinecone.
- **Data**: Embeddings of resume details, project descriptions, and skills.
- **Search**: Semantic similarity for grounding AI responses.

## 5. GitHub Feed API (`/api/github`)
- **Description**: Fetches real-time commit activity from GitHub Events API.
- **Fallback**: Returns curated commit data when the API is unavailable or rate-limited.
- **Features**: Auto-refresh every 60s, handles PushEvent, CreateEvent, ForkEvent, WatchEvent, etc.

## 6. Embedded Browser (`/github-pages`)
- **Description**: Iframe viewer that renders `sajid-ul-islam.github.io` inside the app.
- **Features**: Fullscreen toggle, external open link, loading state, status bar.

## 7. Metadata Context Engine
- **Description**: Injects retrieved text metadata into the LLM system prompt.
- **Fallback**: Provides general portfolio information when similarity search returns low-confidence results.
