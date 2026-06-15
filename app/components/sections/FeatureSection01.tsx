'use client';

import React, { useState } from 'react';
import type { Locale } from '../../data/types';
import { UI_COPY } from '../../data/copy';
import { RevealSection, RevealItem } from '../shared/RevealSection';

interface FeatureSection01Props {
  locale: Locale;
}

export default function FeatureSection01({ locale }: FeatureSection01Props) {
  const copy = UI_COPY[locale];
  const [activeTabFeature, setActiveTabFeature] = useState<'chat' | 'idea' | 'narration'>('chat');
  const featureTabs = [
    { id: 'chat', label: copy.tabChat },
    { id: 'idea', label: copy.tabIdea },
    { id: 'narration', label: copy.tabNarration },
  ] as const;

  return (
    <RevealSection id="features" className="py-20 px-4 sm:px-8 md:px-16 relative">
      <RevealItem className="max-w-6xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[550px]">

        {/* Info Text Content */}
        <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{copy.featureEyebrow}</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 leading-tight">
            {copy.featureTitle}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-8 max-w-md">
            {copy.featureText}
          </p>
        </div>

        {/* Interactive Tab Frame */}
        <div className="flex-1 bg-slate-50/60 p-6 md:p-10 relative overflow-hidden flex flex-col justify-between border-l border-slate-100">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 via-indigo-500/5 to-transparent -z-10" />

          {/* Tabs Switcher */}
          <div className="flex items-center justify-center mb-6">
            <div className="p-1 rounded-full border border-slate-200/80 bg-white shadow-xs inline-flex gap-1">
              {featureTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabFeature(tab.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeTabFeature === tab.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Display Screens */}
          <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between min-h-[220px]">

            {/* Chat Tab active */}
            {activeTabFeature === 'chat' && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="w-[22px] h-[22px] rounded-full bg-slate-200 flex items-center justify-center text-2xs font-bold">A</div>
                  <div className="bg-slate-100 rounded-xl p-2.5 max-w-[85%] text-xs">
                    <p className="font-bold text-3xs text-slate-500 mb-0.5">{copy.agentName}</p>
                    <p className="text-slate-700 leading-relaxed">{copy.agentLine}</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-row-reverse">
                  <div className="w-[22px] h-[22px] rounded-full bg-slate-900 text-white flex items-center justify-center text-[11px] font-bold">U</div>
                  <div className="bg-orange-50 border border-orange-100 rounded-xl p-2.5 max-w-[85%] text-xs text-right">
                    <p className="font-bold text-3xs text-orange-600 mb-0.5">{copy.you}</p>
                    <p className="text-slate-800 leading-relaxed text-left">{copy.userLine}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Idea Tab active */}
            {activeTabFeature === 'idea' && (
              <div className="space-y-3">
                <span className="text-2xs bg-slate-100 text-indigo-700 font-bold px-2 py-0.5 rounded">{copy.conceptTag}</span>
                <h5 className="font-bold text-slate-900 text-sm">{copy.conceptTitle}</h5>
                <p className="text-slate-500 text-xs leading-relaxed">{copy.conceptText}</p>
                <div className="rounded-lg border border-indigo-100 bg-indigo-50/60 px-3 py-2 text-xs font-semibold leading-relaxed text-slate-700">
                  {copy.conceptAction}
                </div>
              </div>
            )}

            {/* Narration Tab active */}
            {activeTabFeature === 'narration' && (
              <div className="space-y-3">
                <span className="text-2xs bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded">{copy.voiceTag}</span>
                <h5 className="font-bold text-slate-900 text-sm">{copy.voiceTitle}</h5>
                <p className="text-slate-500 text-xs leading-relaxed">{copy.voiceText}</p>
                <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold">
                  <div className="flex gap-0.5 items-end h-3">
                    <span className="w-0.5 h-2 bg-indigo-500 inline-block animate-bounce" />
                    <span className="w-0.5 h-3 bg-indigo-500 inline-block animate-bounce [animation-delay:0.2s]" />
                    <span className="w-0.5 h-1 bg-indigo-500 inline-block animate-bounce [animation-delay:0.4s]" />
                    <span className="w-0.5 h-2.5 bg-indigo-500 inline-block animate-bounce [animation-delay:0.1s]" />
                  </div>
                  <span>{copy.streaming}</span>
                </div>
              </div>
            )}

            {/* Bottom status */}
            <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-[11px] text-slate-400 mt-2">
              <span>{copy.sequence}</span>
              <span className="font-semibold text-slate-700">{copy.awaitingBrief}</span>
            </div>
          </div>
        </div>
      </RevealItem>
    </RevealSection>
  );
}
