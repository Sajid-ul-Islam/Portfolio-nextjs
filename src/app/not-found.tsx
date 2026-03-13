import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";

export default function NotFound() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-semibold text-[var(--vscode-text-primary)] mb-4">
        404 - File Not Found
      </h1>
      <p className="text-vscode-base text-[var(--vscode-text-secondary)] mb-6">
        The file you&apos;re looking for doesn&apos;t exist in this workspace.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-vscode-sm text-[var(--vscode-text-link)] hover:text-[var(--vscode-text-linkHover)] transition-colors"
      >
        <LuArrowLeft size={16} />
        Back to Welcome
      </Link>
    </div>
  );
}
