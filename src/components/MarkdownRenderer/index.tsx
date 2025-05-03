import Markdown from "react-markdown";
import { markdownOptions } from "./config";

import '@/components/MarkdownRenderer/index.css'

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="md">
      <Markdown {...markdownOptions}>
        {content.replace("\n", "\n\n")}
      </Markdown>
    </div>
  );
}