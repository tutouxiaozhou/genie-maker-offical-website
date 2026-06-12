import type {Metadata} from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css'; // Global styles

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Genie Maker - AI Content Operations',
  description: '面向内容运营团队的 AI 创作工作台，用于将热点、素材和想法转成可发布的社媒内容。',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="zh-CN" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased font-sans bg-slate-50/50 text-slate-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
