import Image from "next/image";
import SectionHeader from "../components/vscode/SectionHeader";
import { favoriteMedia } from "../data/portfolio";
import { cn } from "../lib/cn";

export const metadata = {
  title: "Favorites",
  description:
    "Favorite movies and novels that Sajid Islam enjoys.",
  alternates: { canonical: "/Favorites" },
};

export default function FavoritesPage() {
  return (
    <>
      <SectionHeader title="Favorites" description="Some of my favorite movies and novels." />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {favoriteMedia.map((item) => (
          <div
            key={item.id}
            className={cn(
              "group relative overflow-hidden",
              "rounded-[var(--vscode-border-radius-md)]",
              "border border-[var(--vscode-border)]",
              "hover:border-[var(--vscode-focusBorder)]",
              "transition-all duration-200"
            )}
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-vscode-sm font-semibold text-white truncate">
                  {item.title}
                </h3>
                <p className="text-vscode-xs text-gray-300">{item.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
