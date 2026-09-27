---
title: Workspace Custom Rules for Portfolio
description: Project specific rules and architectural standards for AI agents
---

# Workspace Development Rules

## 1. Project Context
- **Repository**: VS Code Themed Portfolio for Sajid Islam.
- **Roles & Ventures**: Co-Founder at **CybrCraft** (https://cybrcraft.com/), Business & Data Analyst.
- **Tech Stack**: Next.js 16 (App Router), React 18, TypeScript 5, Tailwind CSS, Framer Motion, Lucide & React Icons.

## 2. Component Guidelines
- Use `"use client";` for components utilizing hooks, browser APIs, or Framer Motion animations.
- Ensure all interactive items have descriptive aria labels and keyboard shortcuts (`Ctrl+P`, `Ctrl+\``, `Ctrl+B`, `Ctrl+Shift+F`).
- Support open tab tracking in `useOpenTabs.ts` for any new top-level routes or project pages.

## 3. Data Flow Standards
- Keep static datasets in `src/app/data/portfolio.ts`.
- When updating work history or ventures, update:
  1. `experiences` array in `portfolio.ts`.
  2. `projects` array in `portfolio.ts` (if project case study exists).
  3. `fileTree` Explorer items in `portfolio.ts`.
  4. `intelEngine.ts` intent matching.
  5. Virtual filesystem in `Terminal.tsx`.

## 4. Quality Control
- Validate builds and type checks via `npx tsc --noEmit` before concluding major modifications.
- Preserve responsive layout integrity across desktop, tablet, and mobile breakpoints.
