'use client';

import React from 'react';
import Image from 'next/image';
import type { Locale } from '../../data/types';
import { UI_COPY } from '../../data/copy';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const copy = UI_COPY[locale];

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 text-xs sm:text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Logo */}
        <div className="flex items-center gap-2 text-white">
          <Image
            src="/logo.png"
            alt="Genie Maker logo"
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
          <span className="font-bold tracking-tight text-slate-100">{copy.footerBrand}</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[12.5px] text-slate-405">
          <a href="#" className="hover:text-white transition-colors">{copy.privacy}</a>
          <a href="#" className="hover:text-white transition-colors">{copy.terms}</a>
          <a href="#" className="hover:text-white transition-colors">{copy.security}</a>
          <a href="#" className="hover:text-white transition-colors">{copy.status}</a>
          <a href="#" className="hover:text-white transition-colors">{copy.support}</a>
        </div>

        {/* Copyright */}
        <div className="text-[11.5px] text-slate-500">
          &copy; {new Date().getFullYear()} Genie Maker. {copy.copyright}
        </div>

      </div>
    </footer>
  );
}