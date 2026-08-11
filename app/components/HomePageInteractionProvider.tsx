'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import { navSectionIds, type DemoPresetId, type NavSectionId } from '@/app/data/types';

type PresetInput = string | { id?: DemoPresetId; prompt: string };

interface HomePageInteractionContextValue {
  activeNavId: NavSectionId;
  activeDemoId: DemoPresetId;
  demoRunKey: number;
  generationStage: number;
  isGenerating: boolean;
  mobileMenuOpen: boolean;
  pipelineRef: RefObject<HTMLDivElement | null>;
  promptInput: string;
  scrollToSection: (sectionId: NavSectionId) => void;
  setMobileMenuOpen: (open: boolean) => void;
  triggerPreset: (preset: PresetInput) => void;
}

const HomePageInteractionContext = createContext<HomePageInteractionContextValue | null>(null);

function resolveDemoId(textPrompt: string, explicitDemoId?: DemoPresetId): DemoPresetId {
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
}

export function HomePageInteractionProvider({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavId, setActiveNavId] = useState<NavSectionId>('product');
  const [promptInput, setPromptInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStage, setGenerationStage] = useState(4);
  const [activeDemoId, setActiveDemoId] = useState<DemoPresetId>('rewrite');
  const [demoRunKey, setDemoRunKey] = useState(0);
  const pipelineRef = useRef<HTMLDivElement>(null);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    const timers = [
      setTimeout(() => setGenerationStage(2), 700),
      setTimeout(() => setGenerationStage(3), 1650),
      setTimeout(() => {
        setGenerationStage(4);
        setIsGenerating(false);
      }, 3200),
    ];

    return () => timers.forEach(clearTimeout);
  }, [demoRunKey, activeDemoId]);

  useEffect(() => () => {
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
  }, []);

  const scrollToSection = (sectionId: NavSectionId) => {
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

  const triggerPreset = (preset: PresetInput) => {
    const presetText = typeof preset === 'string' ? preset : preset.prompt;
    const presetId = typeof preset === 'string' ? undefined : preset.id;
    if (!presetText.trim()) return;

    setActiveDemoId(resolveDemoId(presetText, presetId));
    setPromptInput(presetText);
    setIsGenerating(true);
    setGenerationStage(1);
    setDemoRunKey((key) => key + 1);

    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      pipelineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <HomePageInteractionContext.Provider
      value={{
        activeNavId,
        activeDemoId,
        demoRunKey,
        generationStage,
        isGenerating,
        mobileMenuOpen,
        pipelineRef,
        promptInput,
        scrollToSection,
        setMobileMenuOpen,
        triggerPreset,
      }}
    >
      {children}
    </HomePageInteractionContext.Provider>
  );
}

export function useHomePageInteraction() {
  const context = useContext(HomePageInteractionContext);
  if (!context) {
    throw new Error('useHomePageInteraction must be used inside HomePageInteractionProvider');
  }
  return context;
}
