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
    <RevealSection className="py-20 sm:py-24 px-4 sm:px-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[44vh] text-slate-950">
      <RevealItem className="relative z-10 text-center max-w-2xl mx-auto space-y-8 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1]">
          {copy.finalTitle}
        </h2>

        <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
          {copy.finalText}
        </p>

        <div className="pt-4">
          <a
            href="#horizon-root"
            className="bg-white/75 text-slate-900 border border-white/80 hover:bg-white font-bold px-7 py-3 rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_16px_45px_rgba(15,23,42,0.08)] inline-flex items-center gap-2 backdrop-blur-md"
          >
            {copy.goBrief} <ArrowUp className="h-4 w-4 text-orange-500 font-bold" />
          </a>
        </div>
      </RevealItem>
    </RevealSection>
  );
}
