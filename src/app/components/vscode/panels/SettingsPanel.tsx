"use client";

import Panel from "../Panel";
import Button from "../Button";
import { useRecentPagesContext } from "../../../lib/recentPagesContext";
import { useTabs } from "../../../lib/tabsContext";

export default function SettingsPanel() {
  const { clearPages } = useRecentPagesContext();
  const { closeAllTabs } = useTabs();

  return (
    <div className="p-4 space-y-4">
      <Panel>
        <h3 className="text-vscode-sm font-semibold text-[var(--vscode-text-primary)] mb-2">
          Workspace Actions
        </h3>
        <div className="flex flex-col gap-2">
          <Button type="button" variant="secondary" onClick={clearPages}>
            Clear Recent Pages
          </Button>
          <Button type="button" variant="secondary" onClick={closeAllTabs}>
            Close All Tabs
          </Button>
        </div>
      </Panel>
      <Panel>
        <h3 className="text-vscode-sm font-semibold text-[var(--vscode-text-primary)] mb-2">
          Preferences
        </h3>
        <p className="text-vscode-sm text-[var(--vscode-text-secondary)]">
          Theme and layout preferences are coming next. Your sidebar width is
          already persisted automatically.
        </p>
      </Panel>
    </div>
  );
}
