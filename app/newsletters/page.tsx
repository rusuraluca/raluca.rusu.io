import type { Metadata } from "next";
import { Panel } from "@/components/ui/Panel";
import { PaperPlaneIcon } from "@/components/illustrations/icons";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Newsletters",
  description: "Newsletters are on their way. Subscribe pages coming soon.",
  path: "/newsletters",
});

export default function NewslettersPage() {
  return (
    <Panel className="flex flex-col items-center gap-4 px-6 py-16 text-center">
      <PaperPlaneIcon className="h-12 w-12 -rotate-6 text-accent" />
      <h2 className="display-hollow text-2xl">Coming soon</h2>
      <p className="max-w-md text-sm font-light leading-relaxed text-muted">
        Newsletters will live here. Each publication with its own page and
        archive. Check back soon.
      </p>
    </Panel>
  );
}
