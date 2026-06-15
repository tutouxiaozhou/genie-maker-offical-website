import type { Metadata } from 'next';
import { defaultLocale, localeMeta } from '../data/i18n';
import { jetbrainsMono, plusJakartaSans } from '../fonts';
import '../globals.css';

export const metadata: Metadata = {
  title: localeMeta[defaultLocale].title,
  description: localeMeta[defaultLocale].description,
};

export default function RedirectRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={localeMeta[defaultLocale].htmlLang} className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased font-sans bg-slate-50/50 text-slate-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
