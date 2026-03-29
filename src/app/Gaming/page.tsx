import { FaGamepad } from "react-icons/fa";
import { LuMonitor, LuTrophy } from "react-icons/lu";

import Badge from "../components/vscode/Badge";
import Panel from "../components/vscode/Panel";
import SectionHeader from "../components/vscode/SectionHeader";
import { favoriteGames, gamingPlatforms, gamingStats } from "../data/portfolio";
import { cn } from "../lib/cn";

export const metadata = {
  title: "Gaming",
  description: "Gaming interests and favorite games of Raj Savaliya.",
  alternates: { canonical: "/Gaming" },
};

export default function GamingPage() {
  return (
    <>
      <SectionHeader
        title="Gaming"
        description="When I'm not coding, I enjoy playing video games to unwind."
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-[var(--vscode-text-primary)] mb-4 flex items-center gap-2">
              <FaGamepad className="text-[var(--vscode-accent)]" />
              Favorite Games
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {favoriteGames.map((game) => (
                <Panel
                  key={game.name}
                  className="flex items-center justify-between p-4"
                  hover
                >
                  <div>
                    <h3 className="text-vscode-sm font-medium text-[var(--vscode-text-primary)]">
                      {game.name}
                    </h3>
                    <p className="text-vscode-xs text-[var(--vscode-text-secondary)]">
                      {game.category}
                    </p>
                  </div>
                  <Badge>{game.platform}</Badge>
                </Panel>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[var(--vscode-text-primary)] mb-4 flex items-center gap-2">
              <LuMonitor size={20} className="text-[var(--vscode-accent)]" />
              Platforms
            </h2>
            <div className="flex flex-wrap gap-3">
              {gamingPlatforms.map((platform) => (
                <Panel
                  key={platform.name}
                  className={cn("flex items-center gap-3 px-6 py-4")}
                  hover
                >
                  <LuMonitor size={24} className="text-[var(--vscode-accent)]" />
                  <span className="text-vscode-sm text-[var(--vscode-text-primary)]">
                    {platform.name}
                  </span>
                </Panel>
              ))}
            </div>
          </section>
        </div>
        <aside>
          <h2 className="text-lg font-semibold text-[var(--vscode-text-primary)] mb-4 flex items-center gap-2">
            <LuTrophy size={20} className="text-[var(--vscode-accent)]" />
            Quick Stats
          </h2>
          <Panel className="p-4 space-y-4">
            {gamingStats.map((stat) => (
              <div key={stat.label} className="flex justify-between items-center">
                <span className="text-vscode-sm text-[var(--vscode-text-secondary)]">
                  {stat.label}
                </span>
                <span className="text-vscode-sm font-medium text-[var(--vscode-text-primary)]">
                  {stat.value}
                </span>
              </div>
            ))}
          </Panel>
        </aside>
      </div>
    </>
  );
}
