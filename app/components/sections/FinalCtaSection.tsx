'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import type { Locale } from '../../data/types';
import { UI_COPY } from '../../data/copy';
import { RevealSection, RevealItem } from '../shared/RevealSection';

interface FinalCtaSectionProps {
  locale: Locale;
}

export default function FinalCtaSection({ locale }: FinalCtaSectionProps) {
  const copy = UI_COPY[locale];

  return (
    <RevealSection className="py-28 px-4 sm:px-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[55vh] border-t border-slate-200 bg-slate-900 text-white">
      {/* Cosmic background shapes */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#1e1b4b_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,#311042_0%,transparent_60%)] pointer-events-none" />

      <RevealItem className="relative z-10 text-center max-w-2xl mx-auto space-y-8 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1]">
          {copy.finalTitle}
        </h2>

        <p className="text-slate-450 text-sm sm:text-base text-slate-405 leading-relaxed max-w-lg mx-auto">
          {copy.finalText}
        </p>

        <div className="pt-4">
          <a
            href="#horizon-root"
            className="bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 font-bold px-7 py-3 rounded-full hover:scale-105 active:scale-95 transition-all shadow-md inline-flex items-center gap-2"
          >
            {copy.goBrief} <ArrowUp className="h-4 w-4 text-orange-500 font-bold" />
          </a>
        </div>
      </RevealItem>
    </RevealSection>
  );
}