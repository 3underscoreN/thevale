import type { Options } from 'react-markdown';

export const markdownOptions: Options = {
  allowedElements: [
    /**
     * The following elements are allowed in the markdown renderer:
     * - `h1` to `h6`: Headings of different levels.
     * - `p`: Paragraphs.
     * - `ul`: Unordered lists.
     * - `ol`: Ordered lists.
     * - `li`: List items.
     * - `em`: Emphasized text (italics).
     * - `strong`: Strongly emphasized text (bold).
     */
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'p',
    'ul',
    'ol',
    'li',
    'em',
    'strong',
  ],
  skipHtml: true,
}