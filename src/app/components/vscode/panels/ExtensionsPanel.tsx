"use client";

import Badge from "../Badge";
import Panel from "../Panel";

const extensions = [
  {
    name: "Portfolio Insights",
    description: "Highlights the impact metrics and outcomes across projects.",
    status: "Enabled",
  },
  {
    name: "Data Storyteller",
    description: "Adds narrative summaries to case studies and dashboards.",
    status: "Recommended",
  },
  {
    name: "VS Code Theme Sync",
    description: "Keeps colors consistent across sections and pages.",
    status: "Enabled",
  },
  {
    name: "Focus Mode",
    description: "Minimizes distractions while reading a case study.",
    status: "Recommended",
  },
];

export default function ExtensionsPanel() {
  return (
    <div className="p-4 space-y-3">
      {extensions.map((extension) => (
        <Panel key={extension.name} hover>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-vscode-sm font-semibold text-[var(--vscode-text-primary)]">
                {extension.name}
              </h3>
              <p className="mt-1 text-vscode-sm text-[var(--vscode-text-secondary)]">
                {extension.description}
              </p>
            </div>
            <Badge variant={extension.status === "Enabled" ? "success" : "info"}>
              {extension.status}
            </Badge>
          </div>
        </Panel>
      ))}
    </div>
  );
}
