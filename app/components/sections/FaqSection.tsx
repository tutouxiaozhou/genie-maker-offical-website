'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Locale } from '../../data/types';
import { UI_COPY } from '../../data/copy';
import { FAQ_ITEMS, FAQ_ITEMS_ZH } from '../../data/faq';
import { RevealSection, RevealItem } from '../shared/RevealSection';

interface FaqSectionProps {
  locale: Locale;
}

export default function FaqSection({ locale }: FaqSectionProps) {
  const copy = UI_COPY[locale];
  const faqItems = locale === 'zh' ? FAQ_ITEMS_ZH : FAQ_ITEMS;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <RevealSection id="faq" className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col lg:flex-row gap-12 sm:gap-16">

        {/* Left Header Area */}
        <RevealItem className="lg:w-1/3">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 leading-tight sticky top-28">
            {copy.faqTitle}
          </h2>
          <p className="text-slate-400 text-xs mt-4 leading-relaxed max-w-xs">
            {copy.faqIntro}
          </p>
        </RevealItem>

        {/* Right Accordion */}
        <RevealItem className="lg:w-2/3 flex flex-col divide-y divide-slate-200">
          {faqItems.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="py-[18px] transition-colors">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center text-left py-2 font-semibold text-base text-slate-900 hover:text-primary transition-all group"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold pr-4">{faq.question}</span>
                  <span className="text-slate-400 group-hover:text-primary transition-colors shrink-0">
                    {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="text-slate-500 text-sm leading-relaxed pt-2 pb-3 max-w-xl text-slate-600">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </RevealItem>

      </div>
    </RevealSection>
  );
}