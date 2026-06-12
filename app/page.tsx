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

export default function Page() {
  const [locale, setLocale] = useState<Locale>('zh');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavId, setActiveNavId] = useState<NavSectionId>('product');
  const [promptInput, setPromptInput] = useState('');

  // Demo generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStage, setGenerationStage] = useState(4); // 1=analyzing, 2=thinking, 3=workbench, 4=done
  const [activeDemoId, setActiveDemoId] = useState<DemoPresetId>('rewrite');
  const [demoRunKey, setDemoRunKey] = useState(0);

  const pipelineRef = useRef<HTMLDivElement>(null);

  // Scroll-driven nav highlight
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

  // Demo animation timeline
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
        setLocale={setLocale}
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
        <FinalCtaSection locale={locale} />
      </main>

      <Footer locale={locale} />

    </div>
  );
}