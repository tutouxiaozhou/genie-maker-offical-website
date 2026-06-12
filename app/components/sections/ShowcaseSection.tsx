'use client';

import React from 'react';
import { motion } from 'motion/react';
import type { Locale, DemoPresetId } from '../../data/types';
import { UI_COPY } from '../../data/copy';
import { RevealSection, RevealItem, itemReveal } from '../shared/RevealSection';

interface ShowcaseSectionProps {
  locale: Locale;
  onTriggerPreset: (preset: string | { id?: DemoPresetId; prompt: string }) => void;
}

export default function ShowcaseSection({ locale, onTriggerPreset }: ShowcaseSectionProps) {
  const copy = UI_COPY[locale];

  return (
    <RevealSection className="py-24 bg-white relative overflow-hidden border-t border-slate-200">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <RevealItem className="max-w-6xl mx-auto px-4 sm:px-8 text-center mb-16 relative z-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4">
          {copy.showcaseTitle}
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto text-sm">
          {copy.showcaseText}
        </p>
      </RevealItem>

      {/* Showcase Cards */}
      <div className="w-full flex gap-6 overflow-x-auto px-6 pb-12 snap-x snap-mandatory hide-scrollbar justify-center max-w-7xl mx-auto">

        {/* ShowCard 1 */}
        <motion.div
          variants={itemReveal}
          onClick={() => onTriggerPreset(locale === 'zh' ? "基于产品资料、热点角度和品牌图片，生成一篇小红书笔记。" : "Create a Xiaohongshu note from a product sheet, trend angle, and saved brand images.")}
          className="snap-center shrink-0 w-[280px] sm:w-[320px] h-[340px] bg-slate-50 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md transition-all p-5 cursor-pointer flex flex-col justify-between group"
        >
          <div className="space-y-3">
            <div className="h-6 w-fit px-2 py-0.5 rounded bg-sky-50 border border-sky-100 text-sky-700 text-[11px] font-bold">
              {copy.card1Tag}
            </div>
            <h4 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">{copy.card1Title}</h4>
            <p className="text-slate-500 text-xs leading-relaxed">{copy.card1Text}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200/80 p-3 h-[140px] flex flex-col justify-between">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            </div>
            <div className="flex gap-2 items-end justify-between h-[80px] pt-4">
              <div className="w-full bg-sky-200 h-[60%] rounded-sm" />
              <div className="w-full bg-primary/25 h-[80%] rounded-sm" />
              <div className="w-full bg-indigo-200 h-[40%] rounded-sm" />
              <div className="w-full bg-emerald-200 h-[90%] rounded-sm" />
            </div>
          </div>
        </motion.div>

        {/* ShowCard 2 */}
        <motion.div
          variants={itemReveal}
          onClick={() => onTriggerPreset(locale === 'zh' ? "追踪创作者经济话题，并把反复出现的信号转成活动选题。" : "Track creator economy topics and convert recurring signals into campaign angles.")}
          className="snap-center shrink-0 w-[280px] sm:w-[320px] h-[340px] bg-slate-50 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md transition-all p-5 cursor-pointer flex flex-col justify-between group"
        >
          <div className="space-y-3">
            <div className="h-6 w-fit px-2 py-0.5 rounded bg-purple-50 border border-purple-100 text-purple-700 text-[11px] font-bold">
              {copy.card2Tag}
            </div>
            <h4 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">{copy.card2Title}</h4>
            <p className="text-slate-500 text-xs leading-relaxed">{copy.card2Text}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200/80 p-3 h-[140px] flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="h-3 w-full bg-slate-100 rounded" />
              <div className="h-3 w-[80%] bg-slate-100 rounded" />
            </div>
            <div className="flex justify-between items-center text-[11px] text-teal-600 font-bold bg-teal-50 px-2 py-1.5 rounded-lg border border-teal-100">
              <span>{copy.signalVerified}</span>
              <span>12 hits</span>
            </div>
          </div>
        </motion.div>

        {/* ShowCard 3 */}
        <motion.div
          variants={itemReveal}
          onClick={() => onTriggerPreset(locale === 'zh' ? "整理一组可复用素材：产品图片、文案片段、标签和文件夹。" : "Prepare a reusable material set with product images, copy snippets, tags, and folders.")}
          className="snap-center shrink-0 w-[280px] sm:w-[320px] h-[340px] bg-slate-50 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md transition-all p-5 cursor-pointer flex flex-col justify-between group"
        >
          <div className="space-y-3">
            <div className="h-6 w-fit px-2 py-0.5 rounded bg-orange-50 border border-orange-100 text-orange-700 text-[11px] font-bold">
              {copy.card3Tag}
            </div>
            <h4 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">{copy.card3Title}</h4>
            <p className="text-slate-500 text-xs leading-relaxed">{copy.card3Text}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200/80 p-3 h-[140px] flex flex-col justify-center">
            <div className="flex gap-2 items-center">
              <div className="w-7 h-7 rounded bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">★</div>
              <div className="flex-1 space-y-1">
                <div className="h-2.5 w-1/2 bg-slate-200 rounded" />
                <div className="h-2 w-1/3 bg-slate-100 rounded" />
              </div>
            </div>
            <div className="h-10 mt-3 bg-slate-50 border border-slate-100 rounded-lg" />
          </div>
        </motion.div>

      </div>
    </RevealSection>
  );
}