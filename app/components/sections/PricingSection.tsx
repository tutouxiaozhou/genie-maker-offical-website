'use client';

import React from 'react';
import { Check } from 'lucide-react';
import type { Locale } from '../../data/types';
import { UI_COPY } from '../../data/copy';
import { RevealSection, RevealItem } from '../shared/RevealSection';

interface PricingSectionProps {
  locale: Locale;
}

export default function PricingSection({ locale }: PricingSectionProps) {
  const copy = UI_COPY[locale];

  return (
    <RevealSection id="pricing" className="py-24 bg-slate-50/50 border-t border-slate-100 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">

          {/* Column 1: Description */}
          <RevealItem className="p-8 flex flex-col justify-center bg-white rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4">{copy.pricingTitle}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">{copy.pricingText}</p>
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-widest flex items-center gap-1.5">
              <Check className="h-4 w-4 text-emerald-500" /> {copy.pricingHint}
            </div>
          </RevealItem>

          {/* Column 2: Free Tier */}
          <RevealItem className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-all shadow-xs flex flex-col relative overflow-hidden justify-between">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#38BDF8]" />
            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-1">{copy.freeTitle}</h4>
              <p className="text-slate-400 text-xs mb-6">{copy.freeDesc}</p>
              <div className="text-4xl font-extrabold text-slate-900 mb-6 font-mono">
                $0<span className="text-sm text-slate-400 font-normal">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 text-xs text-slate-600 font-semibold">
                <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> {copy.free1}</li>
                <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> {copy.free2}</li>
                <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> {copy.free3}</li>
              </ul>
            </div>
            <a href="#product" className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 rounded-xl py-3 text-xs font-semibold text-center transition-colors shadow-xs">
              {copy.startCreating}
            </a>
          </RevealItem>

          {/* Column 3: Team Tier */}
          <RevealItem className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all shadow-sm flex flex-col relative overflow-hidden justify-between">
            <div className="absolute top-3 right-3 bg-slate-900 text-white text-3xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {copy.popular}
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-1">{copy.teamTitle}</h4>
              <p className="text-slate-400 text-xs mb-6">{copy.teamDesc}</p>
              <div className="text-4xl font-extrabold text-slate-900 mb-6 font-mono">
                $20<span className="text-sm text-slate-400 font-normal">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 text-xs text-slate-600 font-semibold">
                <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-slate-900" /> {copy.team1}</li>
                <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-slate-900" /> {copy.team2}</li>
                <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-slate-900" /> {copy.team3}</li>
                <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-slate-900" /> {copy.team4}</li>
              </ul>
            </div>
            <a href="#product" className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-3 text-xs font-semibold text-center transition-colors shadow-sm">
              {copy.upgradeTeam}
            </a>
          </RevealItem>

        </div>

        {/* Enterprise */}
        <RevealItem className="mt-8 bg-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="absolute inset-0 bg-[#38BDF8]/2 pointer-events-none -z-10" />
          <div>
            <h4 className="font-bold text-lg text-slate-900 mb-1">{copy.enterpriseTitle}</h4>
            <p className="text-slate-500 text-xs">{copy.enterpriseText}</p>
          </div>
          <button
            onClick={() => { alert(copy.contactAlert); }}
            className="mt-4 md:mt-0 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-semibold py-2.5 px-6 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            {copy.contactTeam}
          </button>
        </RevealItem>

      </div>
    </RevealSection>
  );
}