---
title: API Route Handler Rules & Security Guidelines
description: Strict guidelines for creating and modifying route handlers under src/app/api/
---

# API Route Handler Rules

These rules apply whenever viewing, creating, or editing route handlers under `src/app/api/`.

---

## 1. Dynamic Mode Declaration
Every route handler (`src/app/api/.../route.ts`) must explicitly declare:
```typescript
export const dynamic = "force-dynamic";
```
This prevents Next.js static build failures when deploying with dynamic headers, request bodies, or runtime variables.

---

## 2. External Service Resilience & Graceful Fallbacks
External AI, vector DB, and email services (Pinecone, Gemini, Anthropic, EmailJS) can experience rate limits, cold starts, or network timeouts:
- Always wrap external calls in `try/catch` blocks.
- Never allow an unhandled promise rejection to crash the server route.
- Provide a structured fallback response:
  ```typescript
  return NextResponse.json(
    { 
      content: "Fallback response or cached system intel.",
      fallback: true 
    },
    { status: 200 }
  );
  ```

---

## 3. Strict Request Validation & Status Codes
- Validate request method and payload body:
  - If required fields are missing, return `400 Bad Request` with `{ error: "Missing required parameter 'messages'" }`.
  - For authentication/key issues, return `401 Unauthorized`.
  - For external rate limits, return `429 Too Many Requests`.
- Always type request and response payloads using strict TypeScript interfaces. Do not use `any`.

---

## 4. Environment Variables
- Never hardcode API keys or connection secrets.
- Use `process.env.GEMINI_API_KEY`, `process.env.PINECONE_API_KEY`, etc.
- If an environment key is absent in the runtime environment, degrade gracefully to local offline intellect rather than throwing fatal runtime errors.
