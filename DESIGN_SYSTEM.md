# Design System & UI Specifications

This document defines the design tokens, visual aesthetics, typography, motion curves, and component patterns of the **VS Code Themed Portfolio**.

---

## 1. Design Philosophy: Tactical Dark & VS Code Fidelity

The visual interface combines the familiarity of the world's most popular code editor with high-contrast **Tactical Dark Glassmorphism**.

### Core Tenets:
1. **Pixel-Perfect Fidelity**: Borders, heights, tab curves, and activity icons match the genuine Visual Studio Code desktop interface.
2. **Tactile Micro-Interactions**: Subtle glows, hover lifts, pulse indicators, and instant shortcut feedback create a responsive feel.
3. **No Visual Noise**: Minimalist syntax highlights, clean typography, and muted secondary text draw focus to technical depth and case studies.

---

## 2. Design Tokens & CSS Variables

All color variables are defined in [`src/app/globals.css`](file:///h:/Repo/Portfolio-nextjs/src/app/globals.css) and automatically switch with the active theme.

### Core Tokens:

| Variable | Tactical Dark Default | VS Code Dark | Dracula | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `--vscode-editor-background` | `#080b11` | `#1e1e1e` | `#282a36` | Main editor / canvas background |
| `--vscode-sideBar-background` | `#0d1117` | `#252526` | `#21222c` | Left sidebar & Explorer |
| `--vscode-activityBar-background` | `#090d13` | `#333333` | `#191a21` | Vertical activity bar |
| `--vscode-statusBar-background` | `#06080c` | `#007acc` | `#6272a4` | Bottom status bar |
| `--vscode-border` | `rgba(255,255,255,0.08)` | `#3c3c3c` | `#44475a` | Panel borders & tab dividers |
| `--vscode-text-primary` | `#f0f6fc` | `#cccccc` | `#f8f8f2` | Headings, active code, bold text |
| `--vscode-text-secondary` | `#8b949e` | `#858585` | `#6272a4` | Muted descriptions & timestamps |
| `--vscode-accent` | `#3b82f6` (User Custom) | `#007acc` | `#bd93f9` | Active indicators, focus rings, highlights |

---

## 3. Typography & Font Hierarchy

- **UI / Headings**: Inter, Roboto, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`.
- **Code / Monospace**: JetBrains Mono, Fira Code, Menlo, Consolas, `monospace`.

```css
/* Typography Scale */
--text-xs:   0.75rem (12px)  /* Badges, file extensions, breadcrumb items */
--text-sm:   0.875rem (14px) /* Body copy, sidebar item labels, table text */
--text-base: 1.0rem (16px)   /* Card titles, terminal input */
--text-lg:   1.125rem (18px) /* Section subtitles */
--text-xl:   1.5rem (24px)   /* Primary page headings */
--text-2xl:  2.0rem (32px)   /* Hero display headings */
```

---

## 4. Animation & Motion Guidelines

Animations are driven by **Framer Motion** with tuned spring dynamics to prevent jarring transitions.

```typescript
// Standard Container Stagger
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

// Item Elevation Spring
export const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};
```

### Motion Rules:
- **Card Hover**: `hover:scale-[1.01]` or `hover:translate-y-[-2px]` with smooth 200ms ease.
- **Pulse Indicators**: Ambient status indicator on current roles and terminal cursor.
- **Glassmorphism**: Backdrop blur `backdrop-blur-md` with subtle border opacity `border-white/5` to `border-white/10`.

---

## 5. UI Component Specifications

### 5.1 Badge Component (`src/app/components/vscode/Badge.tsx`)
- Used for tech stack tags, status flags, and metric counters.
- Supports variants: `default`, `accent`, `success`, `outline`.

### 5.2 Timeline Connector (`src/app/experience/page.tsx`)
- Left-aligned vertical line connecting career nodes.
- Highlights active current roles with accent node glows (`shadow-[var(--vscode-accent)]/30`).

### 5.3 Git Diff Viewer (`src/app/projects/[id]/page.tsx`)
- Side-by-side or unified code diff display styling green additions (`+`) and red deletions (`-`) with syntax highlighting.
