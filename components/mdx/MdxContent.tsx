import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { shikiThemes } from "@/lib/shiki-themes";
import { CodeBlock } from "./CodeBlock";
import { Callout } from "./Callout";

const prettyCodeOptions = {
  theme: shikiThemes,
  keepBackground: false,
  defaultLang: "plaintext",
};

const components = {
  pre: CodeBlock,
  Callout,
};

export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
        },
      }}
    />
  );
}
