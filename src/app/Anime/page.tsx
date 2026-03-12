import SectionHeader from "../components/vscode/SectionHeader";
import { animeSeries } from "../data/portfolio";
import { cn } from "../lib/cn";

export const metadata = {
  title: "Anime",
  description:
    "Anime series that Raj Savaliya enjoys watching. A collection of favorite anime.",
  alternates: { canonical: "/Anime" },
};

export default function AnimePage() {
  return (
    <>
      <SectionHeader title="Anime" description="Some of my anime series that i liked." />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {animeSeries.map((anime) => (
          <div
            key={anime.id}
            className={cn(
              "group relative overflow-hidden",
              "rounded-[var(--vscode-border-radius-md)]",
              "border border-[var(--vscode-border)]",
              "hover:border-[var(--vscode-focusBorder)]",
              "transition-all duration-200"
            )}
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={anime.image}
                alt={anime.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-vscode-sm font-semibold text-white truncate">
                  {anime.title}
                </h3>
                <p className="text-vscode-xs text-gray-300">{anime.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
