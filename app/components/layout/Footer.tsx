import Image from 'next/image';
import type { Locale } from '../../data/types';
import { UI_COPY } from '../../data/copy';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const copy = UI_COPY[locale];

  return (
    <footer className="text-slate-600 py-12 text-xs sm:text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Logo */}
        <div className="flex items-center gap-2 text-slate-950">
          <Image
            src="/logo.png"
            alt="Genie Maker logo"
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
          <span className="font-bold tracking-tight text-slate-900">{copy.footerBrand}</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600">
          <a href="#" className="hover:text-slate-950 transition-colors">{copy.privacy}</a>
          <a href="#" className="hover:text-slate-950 transition-colors">{copy.terms}</a>
          <a href="#" className="hover:text-slate-950 transition-colors">{copy.security}</a>
          <a href="#" className="hover:text-slate-950 transition-colors">{copy.status}</a>
          <a href="#" className="hover:text-slate-950 transition-colors">{copy.support}</a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Genie Maker. {copy.copyright}
        </div>

      </div>
    </footer>
  );
}
