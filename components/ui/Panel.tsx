import type { ReactNode } from "react";

export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[0.7rem] border-2 border-ink bg-surface ${className}`}
    >
      {children}
    </div>
  );
}
