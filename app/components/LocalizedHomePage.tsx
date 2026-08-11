import type { Locale } from '@/app/data/types';
import { HomePageInteractionProvider } from '@/app/components/HomePageInteractionProvider';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import HeroSection from '@/app/components/sections/HeroSection';
import DemoSection from '@/app/components/sections/DemoSection';
import FeatureSection01 from '@/app/components/sections/FeatureSection01';
import FeatureSection02 from '@/app/components/sections/FeatureSection02';
import ShowcaseSection from '@/app/components/sections/ShowcaseSection';
import PricingSection from '@/app/components/sections/PricingSection';
import FaqSection from '@/app/components/sections/FaqSection';
import FinalCtaSection from '@/app/components/sections/FinalCtaSection';

interface LocalizedHomePageProps {
  locale: Locale;
}

export default function LocalizedHomePage({ locale }: LocalizedHomePageProps) {
  return (
    <HomePageInteractionProvider>
      <div id="horizon-root" className="min-h-screen relative overflow-x-hidden selection:bg-orange-200 selection:text-orange-950">

        <Header locale={locale} />

        <main className="w-full">
          <HeroSection locale={locale} />

          <DemoSection locale={locale} />

          <FeatureSection01 locale={locale} />
          <FeatureSection02 locale={locale} />
          <ShowcaseSection locale={locale} />
          <PricingSection locale={locale} />
          <FaqSection locale={locale} />
        </main>

        <div className="relative overflow-hidden border-t border-slate-100 bg-[#f8fafc]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(130deg,#f7f9fc_0%,#edf6f5_42%,#f4edff_100%)]" />
          <div className="pointer-events-none absolute -left-28 top-[-18%] h-[420px] w-[540px] rounded-full bg-[radial-gradient(circle,rgba(164,170,216,0.52)_0%,rgba(181,187,226,0.24)_43%,transparent_73%)] blur-2xl" />
          <div className="pointer-events-none absolute left-[28%] top-[12%] h-[470px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(205,225,225,0.58)_0%,rgba(218,232,232,0.26)_46%,transparent_76%)] blur-3xl" />
          <div className="pointer-events-none absolute -right-24 bottom-[-16%] h-[430px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(210,181,231,0.54)_0%,rgba(224,205,239,0.26)_45%,transparent_74%)] blur-2xl" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.68)_0%,rgba(255,255,255,0.14)_48%,rgba(255,255,255,0.42)_100%)]" />
          <div className="relative z-10">
            <FinalCtaSection locale={locale} />
            <Footer locale={locale} />
          </div>
        </div>

      </div>
    </HomePageInteractionProvider>
  );
}
