import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center py-16 text-center">
      <p className="font-mono text-sm uppercase tracking-widest text-muted">
        Error 404
      </p>
      <h1 className="display-hollow mt-2 text-4xl">Page not found</h1>
      <p className="mt-3 max-w-sm font-light text-muted">
        This page doesn&apos;t exist, or maybe it moved somewhere else.
      </p>
      <Link
        href="/"
        className="mt-8 border-2 border-ink px-5 py-2.5 font-mono text-sm lowercase transition-colors duration-150 hover:bg-ink hover:text-bg active:translate-y-px"
      >
        go home
      </Link>
    </div>
  );
}
