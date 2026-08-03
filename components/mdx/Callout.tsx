import type { ReactNode } from "react";

export function Callout({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <aside className="rounded-[0.7rem] border-2 border-accent bg-surface p-4">
      {title && (
        <p className="mb-1 font-mono text-sm font-semibold uppercase tracking-wide text-accent">
          {title}
        </p>
      )}
      <div className="text-sm leading-relaxed">{children}</div>
    </aside>
  );
}
