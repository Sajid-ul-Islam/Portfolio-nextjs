"use client";

import SocialLinks from "../SocialLinks";
import Panel from "../Panel";

export default function AccountPanel() {
  return (
    <div className="p-4 space-y-4">
      <Panel>
        <h3 className="text-vscode-sm font-semibold text-[var(--vscode-text-primary)] mb-2">
          Profile
        </h3>
        <p className="text-vscode-sm text-[var(--vscode-text-secondary)]">
          Stay connected with me across the web.
        </p>
      </Panel>
      <Panel>
        <h3 className="text-vscode-sm font-semibold text-[var(--vscode-text-primary)] mb-3">
          Social
        </h3>
        <SocialLinks />
      </Panel>
    </div>
  );
}
