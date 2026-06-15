'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import type { Locale } from '../../data/types';
import { UI_COPY } from '../../data/copy';
import { RevealSection, RevealItem } from '../shared/RevealSection';

interface PricingSectionProps {
  locale: Locale;
}

export default function PricingSection({ locale }: PricingSectionProps) {
  const copy = UI_COPY[locale];

  const cardMotion = {
    rest: {
      y: 0,
      scale: 1,
      boxShadow: '0 18px 55px rgba(15, 23, 42, 0.06)',
    },
    hover: {
      y: -10,
      scale: 1.015,
      boxShadow: '0 30px 85px rgba(15, 23, 42, 0.14)',
    },
  };

  const glowMotion = {
    rest: { opacity: 0.65, backgroundPosition: '0% 0%' },
    hover: { opacity: 1, backgroundPosition: '100% 100%' },
  };

  return (
    <RevealSection id="pricing" className="py-24 bg-white border-t border-slate-100 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">

          {/* Column 1: Description */}
          <RevealItem>
            <motion.div
              initial="rest"
              whileHover="hover"
              variants={cardMotion}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="h-full min-h-[360px] p-8 sm:p-10 flex flex-col justify-center rounded-[10px] border border-slate-100 bg-white/90 shadow-sm"
            >
              <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-950 leading-tight mb-6">
                {copy.pricingTitle}
              </h3>
              <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-sm">{copy.pricingText}</p>
              <div className="text-xs text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                <Check className="h-4 w-4 text-[#ff6b57]" /> {copy.pricingHint}
              </div>
            </motion.div>
          </RevealItem>

          {/* Column 2: Free Tier */}
          <RevealItem>
            <motion.div
              initial="rest"
              whileHover="hover"
              variants={cardMotion}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="h-full min-h-[360px] p-8 sm:p-10 bg-white rounded-[10px] border border-cyan-50 shadow-sm flex flex-col relative overflow-hidden justify-between"
            >
              <motion.div
                variants={glowMotion}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-[linear-gradient(135deg,rgba(224,247,255,0.92),rgba(255,255,255,0.9)_52%,rgba(255,255,255,0.98))] bg-[length:180%_180%]"
              />
              <div className="relative z-10">
                <h4 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950 mb-2">{copy.freeTitle}</h4>
                <p className="text-slate-500 text-sm mb-6">{copy.freeDesc}</p>
                <div className="text-5xl font-semibold tracking-tight text-slate-950 mb-8">
                  $0<span className="text-base text-slate-500 font-medium">{copy.pricingPeriod}</span>
                </div>
                <ul className="space-y-4 mb-8 text-sm text-slate-600 font-semibold">
                  <li className="flex items-center gap-3"><Check className="h-4 w-4 text-[#ff6b57] shrink-0" /> {copy.free1}</li>
                  <li className="flex items-center gap-3"><Check className="h-4 w-4 text-[#ff6b57] shrink-0" /> {copy.free2}</li>
                  <li className="flex items-center gap-3"><Check className="h-4 w-4 text-[#ff6b57] shrink-0" /> {copy.free3}</li>
                </ul>
              </div>
              <motion.a
                href="#product"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative z-10 w-full bg-white/60 hover:bg-white/80 border border-white/80 text-slate-900 rounded-[8px] py-4 text-sm font-bold text-center transition-colors shadow-[0_12px_35px_rgba(15,23,42,0.05)]"
              >
                {copy.startCreating}
              </motion.a>
            </motion.div>
          </RevealItem>

          {/* Column 3: Team Tier */}
          <RevealItem>
            <motion.div
              initial="rest"
              whileHover="hover"
              variants={cardMotion}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="h-full min-h-[360px] p-8 sm:p-10 bg-white rounded-[10px] border border-pink-100 shadow-sm flex flex-col relative overflow-hidden justify-between"
            >
              <motion.div
                variants={glowMotion}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-[linear-gradient(135deg,rgba(245,229,255,0.9),rgba(255,244,247,0.86)_48%,rgba(255,231,225,0.9))] bg-[length:180%_180%]"
              />
              <div className="absolute top-5 right-5 z-10 bg-white/65 backdrop-blur-md border border-white/80 text-slate-800 shadow-sm text-3xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                {copy.popular}
              </div>
              <div className="relative z-10">
                <h4 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950 mb-2 pr-24">{copy.teamTitle}</h4>
                <p className="text-slate-500 text-sm mb-6">{copy.teamDesc}</p>
                <div className="text-5xl font-semibold tracking-tight text-slate-950 mb-8">
                  $20<span className="text-base text-slate-500 font-medium">{copy.pricingPeriod}</span>
                </div>
                <ul className="space-y-4 mb-8 text-sm text-slate-600 font-semibold">
                  <li className="flex items-center gap-3"><Check className="h-4 w-4 text-slate-950 shrink-0" /> {copy.team1}</li>
                  <li className="flex items-center gap-3"><Check className="h-4 w-4 text-slate-950 shrink-0" /> {copy.team2}</li>
                  <li className="flex items-center gap-3"><Check className="h-4 w-4 text-slate-950 shrink-0" /> {copy.team3}</li>
                  <li className="flex items-center gap-3"><Check className="h-4 w-4 text-slate-950 shrink-0" /> {copy.team4}</li>
                </ul>
              </div>
              <motion.a
                href="#product"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative z-10 w-full bg-white/55 hover:bg-white/80 backdrop-blur-md border border-white/80 text-slate-950 rounded-[8px] py-4 text-sm font-bold text-center transition-colors shadow-[0_12px_35px_rgba(15,23,42,0.06)]"
              >
                {copy.upgradeTeam}
              </motion.a>
            </motion.div>
          </RevealItem>

        </div>

        {/* Enterprise */}
        <RevealItem>
          <motion.div
            initial="rest"
            whileHover="hover"
            variants={cardMotion}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="mt-8 rounded-[10px] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-cyan-50 bg-[#f1fbff] shadow-sm relative overflow-hidden"
          >
            <motion.div
              variants={glowMotion}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-[linear-gradient(120deg,rgba(236,250,255,0.9),rgba(255,255,255,0.55),rgba(235,247,250,0.95))] bg-[length:180%_180%]"
            />
            <div className="relative z-10">
              <h4 className="font-semibold text-2xl text-slate-950 mb-2">{copy.enterpriseTitle}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{copy.enterpriseText}</p>
            </div>
            <motion.button
              onClick={() => { alert(copy.contactAlert); }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative z-10 w-full md:w-auto bg-white/65 hover:bg-white/90 border border-white/80 text-slate-900 text-sm font-bold py-3 px-8 rounded-[8px] transition-colors shadow-[0_12px_35px_rgba(15,23,42,0.05)] cursor-pointer"
            >
              {copy.contactTeam}
            </motion.button>
          </motion.div>
        </RevealItem>

      </div>
    </RevealSection>
  );
}
