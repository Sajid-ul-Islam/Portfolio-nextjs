export default function ProjectsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-6 w-40 bg-[var(--vscode-sideBar-background)] rounded" />
      <div className="h-4 w-2/3 bg-[var(--vscode-sideBar-background)] rounded" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={`project-skeleton-${index}`}
            className="h-56 bg-[var(--vscode-sideBar-background)] rounded"
          />
        ))}
      </div>
    </div>
  );
}
