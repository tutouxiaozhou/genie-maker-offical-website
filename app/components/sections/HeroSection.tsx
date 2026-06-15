'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Plus, ArrowUp } from 'lucide-react';
import type { Locale, DemoPresetId } from '../../data/types';
import { UI_COPY } from '../../data/copy';
import { PRESETS, PRESETS_ZH } from '../../data/presets';

interface HeroSectionProps {
  locale: Locale;
  promptInput: string;
  onTriggerPreset: (preset: string | { id?: DemoPresetId; prompt: string }) => void;
}

export default function HeroSection({ locale, promptInput, onTriggerPreset }: HeroSectionProps) {
  const copy = UI_COPY[locale];
  const presets = locale === 'zh' ? PRESETS_ZH : PRESETS;

  return (
    <section id="product" className="relative pt-40 pb-20 px-4 sm:px-8 md:px-16 min-h-[95vh] flex flex-col items-center justify-center text-center overflow-hidden">

      {/* Aesthetic Fluid Backdrop Shapes */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#38BDF8]/15 via-[#C084FC]/10 to-transparent -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-orange-400/10 to-indigo-500/15 rounded-full blur-[110px] -z-10" />

      {/* New Event Alert Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 bg-white/60 border border-slate-200/50 rounded-full px-4 py-1.5 mb-7 shadow-sm backdrop-blur"
      >
        <span className="bg-orange-100 text-orange-600 font-bold text-2xs uppercase tracking-wider px-2 py-0.5 rounded-full">
          {copy.newBadge}
        </span>
        <span className="text-xs font-semibold text-slate-700">
          {copy.badge}
        </span>
      </motion.div>

      {/* Hero Header */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mb-6 leading-[1.1]"
      >
        {copy.heroTitle}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mb-12"
      >
        {copy.heroSubtitle}
      </motion.p>

      {/* Prompt Entry Box */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full max-w-[850px] bg-white rounded-3xl border border-slate-200 shadow-xl p-5 mb-8 backdrop-blur"
      >
        <div className="flex flex-col gap-4">
          <div className="relative">
            {!promptInput && <span className="fake-caret" aria-hidden="true" />}
            <textarea
              value={promptInput}
              readOnly
              tabIndex={-1}
              className="w-full bg-transparent border-none resize-none text-base sm:text-lg text-slate-900 placeholder:text-slate-400 focus:ring-0 min-h-[95px] focus:outline-none cursor-default select-none caret-transparent pl-3"
              placeholder={copy.placeholder}
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <button type="button" tabIndex={-1} aria-hidden="true" className="p-2 rounded-full text-slate-400 cursor-default">
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <button type="button" tabIndex={-1} aria-hidden="true" className="bg-white text-slate-900 border border-slate-200 rounded-full w-12 h-12 flex items-center justify-center transition-all shadow-md hover:bg-slate-50 cursor-default">
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Preset Chips */}
      <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl">
        {presets.map((preset, index) => (
          <button
            key={index}
            onClick={() => onTriggerPreset(preset)}
            className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-200/80 shadow-xs rounded-full px-[18px] py-1.5 text-xs font-medium hover:border-slate-300 active:scale-95 transition-all cursor-pointer select-none"
          >
            {preset.label}
          </button>
        ))}
      </div>

    </section>
  );
}
