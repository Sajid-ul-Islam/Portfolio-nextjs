"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  Files,
  Search,
  GitBranch,
  MessageSquare,
  TerminalSquare,
  User,
  Settings,
} from "lucide-react";
import {
  VscFiles,
  VscSearch,
  VscSourceControl,
  VscCommentDiscussion,
  VscTerminal,
  VscAccount,
  VscSettingsGear,
} from "react-icons/vsc";
import {
  BiFolder,
  BiSearch,
  BiGitBranch,
  BiChat,
  BiTerminal,
  BiUser,
  BiCog,
} from "react-icons/bi";

export type IconName =
  | "files"
  | "search"
  | "git"
  | "chat"
  | "terminal"
  | "account"
  | "settings";

export type IconComponent = React.ComponentType<any>;

export type IconThemeId = "lucide" | "vscode" | "boxicons";

export type IconTheme = {
  id: IconThemeId;
  name: string;
  description: string;
  icons: Record<IconName, IconComponent>;
};

// Modern set (lucide-react): clean, consistent 24px stroke icons
const lucideIcons: Record<IconName, IconComponent> = {
  files: Files,
  search: Search,
  git: GitBranch,
  chat: MessageSquare,
  terminal: TerminalSquare,
  account: User,
  settings: Settings,
};

// Classic VS Code set (react-icons/vsc) — the original product icons
const vscodeIcons: Record<IconName, IconComponent> = {
  files: VscFiles,
  search: VscSearch,
  git: VscSourceControl,
  chat: VscCommentDiscussion,
  terminal: VscTerminal,
  account: VscAccount,
  settings: VscSettingsGear,
};

// Boxicons set (react-icons/bi) — rounded, friendly glyphs
const boxiconsIcons: Record<IconName, IconComponent> = {
  files: BiFolder,
  search: BiSearch,
  git: BiGitBranch,
  chat: BiChat,
  terminal: BiTerminal,
  account: BiUser,
  settings: BiCog,
};

export const ICON_THEMES: IconTheme[] = [
  {
    id: "lucide",
    name: "Modern (Lucide)",
    description: "Clean, consistent stroke icons",
    icons: lucideIcons,
  },
  {
    id: "vscode",
    name: "Classic (VS Code)",
    description: "The original product icons",
    icons: vscodeIcons,
  },
  {
    id: "boxicons",
    name: "Boxicons",
    description: "Rounded, friendly glyph style",
    icons: boxiconsIcons,
  },
];

type IconContextType = {
  iconTheme: IconTheme;
  iconThemeId: IconThemeId;
  setIconTheme: (id: IconThemeId) => void;
  getIcon: (name: IconName) => IconComponent;
};

const IconContext = createContext<IconContextType | null>(null);

function getTheme(id: IconThemeId): IconTheme {
  return ICON_THEMES.find((t) => t.id === id) ?? ICON_THEMES[0];
}

const FALLBACK = ICON_THEMES[0].icons.files;

export function IconProvider({ children }: { children: React.ReactNode }) {
  const [iconThemeId, setIconThemeId] = useState<IconThemeId>("lucide");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("vscode-icon-theme");
      if (stored && ICON_THEMES.some((t) => t.id === stored)) {
        setIconThemeId(stored as IconThemeId);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setIconTheme = useCallback((id: IconThemeId) => {
    setIconThemeId(id);
    try {
      localStorage.setItem("vscode-icon-theme", id);
    } catch {
      /* ignore */
    }
  }, []);

  const theme = getTheme(iconThemeId);
  const getIcon = useCallback(
    (name: IconName) => theme.icons[name] ?? FALLBACK,
    [theme]
  );

  return (
    <IconContext.Provider
      value={{ iconTheme: theme, iconThemeId, setIconTheme, getIcon }}
    >
      {children}
    </IconContext.Provider>
  );
}

export function useIconTheme() {
  const ctx = useContext(IconContext);
  if (!ctx) throw new Error("useIconTheme must be used within IconProvider");
  return ctx;
}
