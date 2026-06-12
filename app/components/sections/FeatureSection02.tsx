'use client';

import React from 'react';
import { Server, ShieldCheck, Globe, CheckCircle2 } from 'lucide-react';
import type { Locale } from '../../data/types';
import { UI_COPY } from '../../data/copy';
import { RevealSection, RevealItem } from '../shared/RevealSection';

interface FeatureSection02Props {
  locale: Locale;
}

export default function FeatureSection02({ locale }: FeatureSection02Props) {
  const copy = UI_COPY[locale];

  return (
    <RevealSection className="pb-20 px-4 sm:px-8 md:px-16 relative">
      <RevealItem className="max-w-6xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row-reverse min-h-[550px]">

        {/* Info Text Content */}
        <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{copy.opsEyebrow}</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 leading-tight">
            {copy.opsTitle}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-8 max-w-md">
            {copy.opsText}
          </p>
          <div className="flex gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <Server className="h-4 w-4 text-emerald-500" /> {copy.materialLibrary}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <ShieldCheck className="h-4 w-4 text-orange-500" /> {copy.reviewReadyShort}
            </div>
          </div>
        </div>

        {/* Static Visual Card */}
        <div className="flex-1 bg-slate-50/60 p-6 md:p-10 relative overflow-hidden flex items-center justify-center border-r border-slate-100">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-indigo-500/5 to-transparent -z-10" />

          <div className="relative w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-md p-6">
            {/* Header widget */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-orange-100 flex items-center justify-center text-orange-500 font-bold">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <span className="block font-bold text-xs text-slate-900">{copy.registry}</span>
                  <span className="text-3xs text-slate-400 font-mono">v1.12-ready</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-3xs text-slate-400 font-mono uppercase font-bold text-teal-600">{copy.healthy}</span>
                <div className="flex gap-0.5 items-center h-2.5 mt-0.5 select-none">
                  <span className="w-1 h-2 bg-emerald-400 rounded-full" />
                  <span className="w-1 h-3 bg-emerald-400 rounded-full" />
                  <span className="w-1 h-1.5 bg-emerald-400 rounded-full" />
                  <span className="w-1 h-2.5 bg-emerald-400 rounded-full" />
                </div>
              </div>
            </div>

            {/* Body Details */}
            <div className="space-y-3.5">
              <div>
                <div className="flex justify-between items-center text-xs text-slate-600 font-medium mb-1">
                  <span>{copy.readiness}</span>
                  <span className="font-bold font-mono">99.98%</span>
                </div>
                <div className="h-1 text-xs w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-gradient-to-r from-orange-500 to-indigo-500 rounded-full" />
                </div>
              </div>

              <div className="space-y-2 pt-1 border-t border-slate-50 text-[11px] text-slate-500">
                <div className="flex justify-between">
                  <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> {copy.assetLinks}</span>
                  <span className="font-mono">{copy.active}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> {copy.metadataReady}</span>
                  <span className="font-mono">{copy.ok}</span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center text-xs mt-2 font-semibold">
                <span className="flex items-center gap-1 text-slate-800">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> {copy.workflowActive}
                </span>
                <span className="text-slate-400 text-2xs font-mono">{copy.reviewQueue}</span>
              </div>
            </div>
          </div>
        </div>
      </RevealItem>
    </RevealSection>
  );
}