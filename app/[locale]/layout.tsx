import type {Metadata} from 'next';
import { notFound } from 'next/navigation';
import { defaultLocale, isLocale, localeMeta } from '../data/i18n';
import { jetbrainsMono, plusJakartaSans } from '../fonts';
import '../globals.css'; // Global styles

export const metadata: Metadata = {
  title: {
    default: localeMeta[defaultLocale].title,
    template: '%s',
  },
  description: localeMeta[defaultLocale].description,
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: Promise<{ locale?: string }>;
}) {
  const resolvedParams = params ? await params : {};
  if (!isLocale(resolvedParams.locale)) notFound();

  const locale = resolvedParams.locale;
  const htmlLang = localeMeta[locale].htmlLang;

  return (
    <html lang={htmlLang} className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased font-sans bg-slate-50/50 text-slate-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
