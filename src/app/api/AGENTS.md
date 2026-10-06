# API Route Handler Operational Rules

This directory hosts server-side Next.js route handlers for AI chat, scraping, and email services.

## Operational Directives:
1. **Dynamic Execution**: Always specify `export const dynamic = "force-dynamic";` at the top of every `route.ts`.
2. **Resilience**: Never allow third-party API downtime (Gemini, Pinecone, Anthropic) to return unhandled 500 crashes. Fallback to cached or local intel responses gracefully.
3. **Typing**: Use strict TypeScript types for all request bodies and JSON responses.
4. **Environment Security**: Verify presence of environment variables (`PINECONE_API_KEY`, `GEMINI_API_KEY`) before invoking external SDKs.
