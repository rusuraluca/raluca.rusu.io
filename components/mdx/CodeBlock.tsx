"use client";

import { useRef, useState, type HTMLAttributes } from "react";
import { CheckIcon, CopyIcon } from "@/components/illustrations/icons";

export function CodeBlock(props: HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = preRef.current?.textContent ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="group relative">
      <pre ref={preRef} {...props} />
      <button
        type="button"
        onClick={copy}
        aria-label="Copy code"
        className="code-block__copy"
      >
        {copied ? (
          <CheckIcon className="h-4 w-4 text-code" />
        ) : (
          <CopyIcon className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
