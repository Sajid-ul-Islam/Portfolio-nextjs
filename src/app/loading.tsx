export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-[var(--vscode-sideBar-background)] rounded" />
      <div className="h-4 w-2/3 bg-[var(--vscode-sideBar-background)] rounded" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-32 bg-[var(--vscode-sideBar-background)] rounded" />
        <div className="h-32 bg-[var(--vscode-sideBar-background)] rounded" />
        <div className="h-32 bg-[var(--vscode-sideBar-background)] rounded" />
        <div className="h-32 bg-[var(--vscode-sideBar-background)] rounded" />
      </div>
    </div>
  );
}
