'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { Locale, NavSectionId, DemoPresetId } from '@/app/data/types';
import { navSectionIds } from '@/app/data/types';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavId, setActiveNavId] = useState<NavSectionId>('product');
  const [promptInput, setPromptInput] = useState('');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStage, setGenerationStage] = useState(4); // 1=analyzing, 2=thinking, 3=workbench, 4=done
  const [activeDemoId, setActiveDemoId] = useState<DemoPresetId>('rewrite');
  const [demoRunKey, setDemoRunKey] = useState(0);

  const pipelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateActiveNav = () => {
      const scrollAnchor = window.scrollY + 150;
      const currentId = navSectionIds.reduce<NavSectionId>((activeId, sectionId) => {
        const section = document.getElementById(sectionId);
        if (!section) return activeId;
        return section.offsetTop <= scrollAnchor ? sectionId : activeId;
      }, 'product');
      setActiveNavId(currentId);
    };

    updateActiveNav();
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveNav);
  }, []);

  useEffect(() => {
    if (demoRunKey === 0) return;

    const timers: NodeJS.Timeout[] = [];

    timers.push(setTimeout(() => setGenerationStage(2), 700));
    timers.push(setTimeout(() => setGenerationStage(3), 1650));
    timers.push(setTimeout(() => {
      setGenerationStage(4);
      setIsGenerating(false);
    }, 3200));

    return () => timers.forEach(clearTimeout);
  }, [demoRunKey, activeDemoId]);

  const scrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: NavSectionId) => {
    event.preventDefault();
    setActiveNavId(sectionId);
    setMobileMenuOpen(false);

    const section = document.getElementById(sectionId);
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const headerOffset = sectionId === 'product' ? 0 : 96;
    const top = section.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.history.pushState(null, '', `#${sectionId}`);
    window.scrollTo({
      top: Math.max(0, top),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  const resolveDemoId = (textPrompt: string, explicitDemoId?: DemoPresetId): DemoPresetId => {
    if (explicitDemoId) return explicitDemoId;

    const lowerPrompt = textPrompt.toLowerCase();
    if (
      lowerPrompt.includes('video') ||
      lowerPrompt.includes('script') ||
      lowerPrompt.includes('短视频') ||
      lowerPrompt.includes('脚本') ||
      lowerPrompt.includes('口播') ||
      lowerPrompt.includes('抖音')
    ) {
      return 'shortVideo';
    }

    if (
      lowerPrompt.includes('trend') ||
      lowerPrompt.includes('hotspot') ||
      lowerPrompt.includes('topic') ||
      lowerPrompt.includes('爆款') ||
      lowerPrompt.includes('选题') ||
      lowerPrompt.includes('热点') ||
      lowerPrompt.includes('标题')
    ) {
      return 'trends';
    }

    return 'rewrite';
  };

  const handleGenerate = (finalPromptText?: string, explicitDemoId?: DemoPresetId) => {
    const textPrompt = finalPromptText || promptInput;
    if (!textPrompt.trim()) return;

    const nextDemoId = resolveDemoId(textPrompt, explicitDemoId);

    setActiveDemoId(nextDemoId);
    setPromptInput(textPrompt);
    setIsGenerating(true);
    setGenerationStage(1);
    setDemoRunKey((key) => key + 1);

    setTimeout(() => {
      pipelineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const triggerPreset = (preset: string | { id?: DemoPresetId; prompt: string }) => {
    const presetText = typeof preset === 'string' ? preset : preset.prompt;
    const presetId = typeof preset === 'string' ? undefined : preset.id;
    handleGenerate(presetText, presetId);
  };

  return (
    <div id="horizon-root" className="min-h-screen relative overflow-x-hidden selection:bg-orange-200 selection:text-orange-950">

      <Header
        locale={locale}
        activeNavId={activeNavId}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollToSection={scrollToSection}
      />

      <main className="w-full">
        <HeroSection
          locale={locale}
          promptInput={promptInput}
          onTriggerPreset={triggerPreset}
        />

        <DemoSection
          locale={locale}
          pipelineRef={pipelineRef}
          isGenerating={isGenerating}
          generationStage={generationStage}
          activeDemoId={activeDemoId}
          demoRunKey={demoRunKey}
        />

        <FeatureSection01 locale={locale} />
        <FeatureSection02 locale={locale} />
        <ShowcaseSection locale={locale} onTriggerPreset={triggerPreset} />
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
  );
}
