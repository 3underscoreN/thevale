/**
 * This is intended to be used with [locale].json files.
 */

import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Tag = 'p' | 'sb' | 'i';
type LinkTag = 'privacy' | 'guide' | 'rules';
type ListTag = 'ol' | 'ul' | 'li';
type ParagraphText = 'inspiration';
type SpecialThanksTag = 'iara' | 'chiiwawa' | 'smoking' | 'name' | 'br' | 'ul' | 'li';
type PrivacyTag = 'header' | 'ul' | 'li' | 'vercel' | 'microsoft' | 'email';

type ListTextProps = {
  children(tags: Record<Tag | ListTag | LinkTag, (chunks: ReactNode) => ReactNode>): ReactNode,
  className?: string
};
type ParagraphTextProps = {
  children(tags: Record <Tag | ParagraphText | LinkTag, (chunks: ReactNode) => ReactNode>): ReactNode,
  className?: string
};
type SpecialThanksTextProps = {
  children(tags: Record <Tag | SpecialThanksTag, (chunks: ReactNode) => ReactNode>): ReactNode,
  className?: string
};
type PrivacyTextProps = {
  children(tags: Record <Tag | PrivacyTag, (chunks: ReactNode) => ReactNode>): ReactNode,
  className?: string
};

export function ListText({ children, className }: ListTextProps) {
  return (
    <div className={className}>
      {children({
        p: (chunks) => <p className="mb-2">{chunks}</p>,
        sb: (chunks) => <span className='font-semibold'>{chunks}</span>,
        i: (chunks) => <span className='italic'>{chunks}</span>,
        ol: (chunks) => <ol className="list-decimal list-inside space-y-4">{chunks}</ol>,
        ul: (chunks) => <ul className="list-disc list-inside mb-2">{chunks}</ul>,
        li: (chunks) => <li>{chunks}</li>,
        privacy: (chunks) =>
          <Button variant="link" size="icon" className="text-blue-300 inline text-md" asChild>
            <Link href="/privacy">
              {chunks}
            </Link>
          </Button>,
        guide: (chunks) =>
          <Button variant="link" size="icon" className="text-blue-300 inline text-md" asChild>
            <Link href="/helpline">
              {chunks}
            </Link>
          </Button>,
        rules: (chunks) => 
          <Button variant="link" size="icon" className="text-blue-300 inline text-md" asChild>
            <Link href="/create">
              {chunks}
            </Link>
          </Button>,
      })}
    </div>
  );
}

export function ParagraphText({ children, className }: ParagraphTextProps) {
  return (
    <div className={className}>
      {children({
        p: (chunks) => <p className="mb-4">{chunks}</p>,
        sb: (chunks) => <span className='font-semibold'>{chunks}</span>,
        i: (chunks) => <span className='italic'>{chunks}</span>,
        inspiration: (chunks) =>
          <Button variant="link" size="icon" className="text-blue-300 inline text-md" asChild>
            <Link href="https://www.befrienders-jpn.org/tegami" target="_blank" rel="noopener noreferrer">
              {chunks}
            </Link>
          </Button>,
        privacy: (chunks) =>
          <Button variant="link" size="icon" className="text-blue-300 inline text-md" asChild>
            <Link href="/privacy">
              {chunks}
            </Link>
          </Button>,
        guide: (chunks) =>
          <Button variant="link" size="icon" className="text-blue-300 inline text-md" asChild>
            <Link href="/helpline">
              {chunks}
            </Link>
          </Button>,
        rules: (chunks) => 
          <Button variant="link" size="icon" className="text-blue-300 inline text-md" asChild>
            <Link href="/create">
              {chunks}
            </Link>
          </Button>,
      })}
    </div>
  );
}

export function SpecialThanksText({ children, className }: SpecialThanksTextProps) {
  return (
    <div className={className}>
      {children({
        p: (chunks) => <p className="text-md text-gray-300">{chunks}</p>,
        sb: (chunks) => <span className='font-semibold'>{chunks}</span>,
        i: (chunks) => <span className='italic'>{chunks}</span>,
        ul: (chunks) => <ul className="space-y-4">{chunks}</ul>,
        li: (chunks) => <li>{chunks}</li>,
        iara: (chunks) => 
          <Link href="https://twitter.com/iaramallows" target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
            {chunks}
          </Link>,
        chiiwawa: (chunks) =>
          <Link href="https://www.facebook.com/happy.chiiwawa" target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
            {chunks}
          </Link>,
        smoking: (chunks) =>
          <Link href="https://smkpdl58.top/" target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
            {chunks}
          </Link>,
        name: (chunks) => <h2 className="text-lg font-semibold">{chunks}</h2>,
        br: () => <br />,
      })}
    </div>
  );
}

export function PrivacyText({ children, className }: PrivacyTextProps) {
  return (
    <div className={className}>
      {children({
        p: (chunks) => <p className="mb-4">{chunks}</p>,
        header: (chunks) => <h2 className="pt-4 text-lg font-bold mb-4">{chunks}</h2>,
        sb: (chunks) => <span className='font-semibold'>{chunks}</span>,
        i: (chunks) => <span className='italic'>{chunks}</span>,
        ul: (chunks) => <ul className="list-disc list-inside mb-4 space-y-2">{chunks}</ul>,
        li: (chunks) => <li>{chunks}</li>,
        vercel: (chunks) =>
          <Button variant="link" size="icon" className="text-blue-300 inline text-md" asChild>
            <Link href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              {chunks}
            </Link>
          </Button>,
        microsoft: (chunks) =>
          <Button variant="link" size="icon" className="text-blue-300 inline text-md" asChild>
            <Link href="https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-ai/openai/data-privacy?tabs=azure-portal" target="_blank" rel="noopener noreferrer">
              {chunks}
            </Link>
          </Button>,
        email: (chunks) =>
          <Button variant="link" size="icon" className="text-blue-300 inline text-md" asChild>
            <Link href="mailto:support@thevale.com">
              {chunks}
            </Link>
          </Button>,
      })}
    </div>
  );
}