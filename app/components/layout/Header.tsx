'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Languages, Menu, X } from 'lucide-react';
import type { Locale, NavSectionId } from '../../data/types';
import { UI_COPY } from '../../data/copy';

interface HeaderProps {
  locale: Locale;
  setLocale: (l: Locale) => void;
  activeNavId: NavSectionId;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, sectionId: NavSectionId) => void;
}

const navItemsConfig: { id: NavSectionId; key: keyof (typeof UI_COPY)['en'] }[] = [
  { id: 'product', key: 'navProduct' },
  { id: 'demo', key: 'navDemo' },
  { id: 'features', key: 'navFeatures' },
  { id: 'pricing', key: 'navPlans' },
  { id: 'faq', key: 'navFaq' },
];

export default function Header({
  locale,
  setLocale,
  activeNavId,
  mobileMenuOpen,
  setMobileMenuOpen,
  scrollToSection,
}: HeaderProps) {
  const copy = UI_COPY[locale];
  const navItems = navItemsConfig.map((item) => ({
    id: item.id,
    label: copy[item.key],
  }));

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl rounded-full border border-white/60 bg-white/40 backdrop-blur-xl shadow-md z-50 transition-all">
      <div className="flex justify-between items-center py-2.5 px-6">

        {/* Logo */}
        <a
          href="#product"
          onClick={(event) => scrollToSection(event, 'product')}
          className="flex items-center gap-2.5 group"
        >
          <Image
            src="/logo.png"
            alt="Genie Maker logo"
            width={36}
            height={36}
            className="h-9 w-9 object-contain select-none transition-all group-hover:scale-105 active:scale-95"
            priority
          />
          <span className="font-bold text-lg tracking-tight select-none">Genie Maker</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 rounded-full bg-white/35 p-1">
          {navItems.map((item) => {
            const isActive = activeNavId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => scrollToSection(event, item.id)}
                className={`relative rounded-full px-3.5 py-1.5 text-xs transition-colors ${
                  isActive ? 'text-slate-950' : 'text-slate-500 hover:text-primary'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-slate-200/70"
                    transition={{ type: 'spring', stiffness: 420, damping: 34, mass: 0.7 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? 'font-semibold' : 'font-medium'}`}>
                  {item.label}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Nav Right CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}
            className="h-9 w-9 flex items-center justify-center rounded-full text-slate-500 hover:text-primary transition-colors hover:bg-slate-100"
            aria-label={copy.languageLabel}
            title={copy.languageLabel}
          >
            <Languages className="h-4 w-4" />
          </button>
          <a
            href="#demo"
            onClick={(event) => scrollToSection(event, 'demo')}
            className="bg-slate-900 text-white text-xs font-semibold px-5 py-2 rounded-full hover:bg-slate-800 active:scale-95 transition-all shadow-sm hidden sm:inline-flex"
          >
            {copy.startCta}
          </a>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden h-9 w-9 flex items-center justify-center rounded-full bg-slate-100 text-slate-700"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Nav Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-100/60 bg-white/95 px-6 py-4 flex flex-col gap-3 rounded-b-3xl"
          >
            {navItems.map((item, index) => {
              const isActive = activeNavId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => scrollToSection(event, item.id)}
                  className={`relative rounded-xl px-3 py-2 font-medium transition-colors ${
                    index < navItems.length - 1 ? 'border-b border-slate-100' : ''
                  } ${isActive ? 'text-slate-950 bg-slate-100' : 'text-slate-800 hover:text-primary'}`}
                >
                  {item.label}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}