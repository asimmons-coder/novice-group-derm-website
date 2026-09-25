'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { clsx } from '@/lib/clsx';

export interface AccordionItem {
  question: string;
  answer: string;
}

// Every answer is always in the DOM (collapsed with a grid-rows transition), so
// search engines and AI crawlers can read all of them from the server HTML.
// Each list also emits its own FAQPage schema.
export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <div className="divide-y divide-sand">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-6 py-7 text-left group"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="font-display text-xl text-charcoal group-hover:text-sage-deep transition-colors">
                  {item.question}
                </span>
                <span className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15 text-charcoal group-hover:border-sage-deep group-hover:text-sage-deep transition-colors">
                  {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              className={clsx(
                'grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p className="pb-7 pr-12 text-warm-gray leading-relaxed max-w-2xl">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
