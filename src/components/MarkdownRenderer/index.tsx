import Markdown from "react-markdown";

import '@/components/MarkdownRenderer/index.css'

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="md">
      <Markdown>
        {content}
      </Markdown>
    </div>
  );
}