import { LuClock } from "react-icons/lu";

import Badge from "../components/vscode/Badge";
import Panel from "../components/vscode/Panel";
import SectionHeader from "../components/vscode/SectionHeader";
import { learningItems } from "../data/portfolio";

export const metadata = {
  title: "Learning",
  description: "Current learning journey and educational goals of Raj Savaliya.",
  alternates: { canonical: "/Learning" },
};

export default function LearningPage() {
  return (
    <>
      <SectionHeader
        title="Learning"
        description="Vibe learning is key to staying relevant in tech. Few things I'm focusing on."
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-[var(--vscode-text-primary)] mb-4 flex items-center gap-2">
              <LuClock size={20} className="text-[var(--vscode-accent)]" />
              Currently Learning
            </h2>
            <div className="space-y-3">
              {learningItems.map((item) => (
                <Panel key={item.name} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-vscode-sm font-medium text-[var(--vscode-text-primary)]">
                        {item.name}
                      </h3>
                      <p className="text-vscode-xs text-[var(--vscode-text-secondary)]">
                        {item.category}
                      </p>
                    </div>
                    <Badge>{item.progress}%</Badge>
                  </div>
                  <div className="w-full bg-[var(--vscode-input-background)] rounded-full h-2">
                    <div
                      className="bg-[var(--vscode-accent)] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </Panel>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
