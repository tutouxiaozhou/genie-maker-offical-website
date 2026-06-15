import type { Metadata } from 'next';
import { locales, type Locale } from './types';

export const defaultLocale: Locale = 'zh';

export const localeMeta = {
  zh: {
    htmlLang: 'zh-CN',
    title: 'Genie Maker - AI 内容运营工作台',
    description: '面向内容运营团队的 AI 创作工作台，用于将热点、素材和想法转成可发布的社媒内容。',
  },
  en: {
    htmlLang: 'en',
    title: 'Genie Maker - AI Content Operations',
    description: 'An AI creation workspace for content operations, trend tracking, material libraries, and publishing preparation.',
  },
} satisfies Record<Locale, {
  htmlLang: string;
  title: string;
  description: string;
}>;

export const languageAlternates: NonNullable<Metadata['alternates']>['languages'] = {
  'zh-CN': '/zh',
  en: '/en',
};

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function getNextLocale(locale: Locale): Locale {
  return locale === 'zh' ? 'en' : 'zh';
}
