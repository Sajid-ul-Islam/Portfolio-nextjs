import { cn } from "../../lib/cn";

type PanelProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
};

export default function Panel({ children, className, hover, onClick }: PanelProps) {
  return (
    <div
      className={cn(
        "bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] rounded-[var(--vscode-border-radius-md)] p-4 transition-all duration-200",
        hover && "hover:border-[var(--vscode-focusBorder)] cursor-pointer",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
