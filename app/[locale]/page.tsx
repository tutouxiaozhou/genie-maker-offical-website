import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LocalizedHomePage from '@/app/components/LocalizedHomePage';
import { isLocale, languageAlternates, localeMeta } from '@/app/data/i18n';
import { locales, type Locale } from '@/app/data/types';

interface LocalePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : 'zh';
  const meta = localeMeta[locale];

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: languageAlternates,
    },
  };
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  return <LocalizedHomePage locale={rawLocale as Locale} />;
}
