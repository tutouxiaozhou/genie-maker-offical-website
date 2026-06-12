'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Loader2, CheckCircle2, Check, ChevronDown, LayoutGrid,
  Plus, ArrowUp, Sparkles, X
} from 'lucide-react';
import type { Locale, DemoPresetId } from '../../data/types';
import { DEMO_SCRIPTS, DEMO_SCRIPTS_ZH, FALLBACK_DESIGNS, FALLBACK_DESIGNS_ZH } from '../../data/demos';
import { RevealItem, revealEase } from '../shared/RevealSection';

interface DemoSectionProps {
  locale: Locale;
  pipelineRef: React.RefObject<HTMLDivElement | null>;
  isGenerating: boolean;
  generationStage: number;
  activeDemoId: DemoPresetId;
  demoRunKey: number;
}

export default function DemoSection({
  locale,
  pipelineRef,
  isGenerating,
  generationStage,
  activeDemoId,
  demoRunKey,
}: DemoSectionProps) {
  const demoScripts = locale === 'zh' ? DEMO_SCRIPTS_ZH : DEMO_SCRIPTS;
  const fallbackDesigns = locale === 'zh' ? FALLBACK_DESIGNS_ZH : FALLBACK_DESIGNS;
  const activeDemo = demoScripts[activeDemoId];
  const activeLegacyInfo = fallbackDesigns[activeDemo.legacyKey];
  const demoAccent = activeLegacyInfo?.colorPalette?.primary || '#FF5E3A';

  const demoComplete = generationStage === 4;
  const visibleResultLines = demoComplete
    ? activeDemo.resultLines
    : generationStage >= 3
      ? activeDemo.resultLines.slice(0, 2)
      : [];

  return (
    <motion.div
      ref={pipelineRef}
      id="demo"
      initial={{ opacity: 0, y: 42, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.22, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.82, ease: revealEase }}
      className="scroll-mt-28 py-20 bg-slate-100/50 border-t border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <RevealItem className="text-center mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">
            {activeDemo.title}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm">
            {activeDemo.subtitle}
          </p>
        </RevealItem>

        <RevealItem>
          <motion.div
            key={`${activeDemoId}-${demoRunKey}`}
            initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.55, ease: revealEase }}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
          >
            {/* macOS-style window bar */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-950 px-4 py-3 text-white sm:px-5">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="min-w-0 truncate text-xs font-semibold text-slate-300">
                  Genie Maker / {activeDemo.sessionTitle}
                </div>
              </div>
              <div className="hidden items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-[11px] font-semibold text-slate-300 sm:flex">
                {isGenerating ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" style={{ color: demoAccent }} />
                ) : (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                )}
                {demoComplete
                  ? (locale === 'zh' ? '演示完成' : 'Demo complete')
                  : (locale === 'zh' ? '正在模拟真实工作台' : 'Simulating workspace')}
              </div>
            </div>

            {/* Main grid: chat left + workbench right */}
            <div className="grid min-h-[620px] grid-cols-1 bg-slate-50 lg:grid-cols-[36%_64%]">

              {/* LEFT: Chat Panel */}
              <div className="relative flex min-h-[520px] flex-col border-b border-slate-200 bg-white lg:border-b-0 lg:border-r">
                <div className="flex h-14 shrink-0 items-center justify-between border-b border-slate-100 px-4">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold text-slate-900">{activeDemo.sessionTitle}</div>
                    <div className="text-[11px] text-slate-400">
                      {locale === 'zh' ? 'AI 创作会话' : 'AI creation session'}
                    </div>
                  </div>
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">
                    {demoComplete ? 'DONE' : 'LIVE'}
                  </span>
                </div>

                {/* Chat messages */}
                <div className="flex-1 space-y-5 overflow-hidden p-4">
                  {/* User message */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.24 }}
                    className="flex justify-end"
                  >
                    <div className="max-w-[86%] rounded-2xl rounded-tr-md bg-orange-50 px-4 py-3 text-sm leading-6 text-slate-800 ring-1 ring-orange-100">
                      {activeDemo.userMessage}
                      <div className="mt-2 flex flex-wrap justify-end gap-1.5">
                        {activeDemo.materials.map((material) => (
                          <span key={material} className="inline-flex rounded-md bg-white px-2 py-1 text-[10px] font-semibold text-slate-500 ring-1 ring-slate-200">
                            @{material}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Thinking card */}
                  <AnimatePresence>
                    {generationStage >= 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="rounded-xl bg-slate-50 ring-1 ring-slate-200"
                      >
                        <div className="flex items-center justify-between px-3 py-2">
                          <div className="flex items-center gap-2">
                            <span className="relative flex h-2.5 w-2.5">
                              {!demoComplete && (
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-40" style={{ backgroundColor: demoAccent }} />
                              )}
                              <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: demoAccent }} />
                            </span>
                            <span className="text-xs font-bold" style={{ color: demoAccent }}>
                              {locale === 'zh' ? 'Genie 正在思考' : 'Genie is thinking'}
                            </span>
                          </div>
                          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                        </div>
                        <div className="space-y-2 border-t border-slate-200 px-3 py-2">
                          {activeDemo.thinking.map((step, index) => {
                            const visible = generationStage >= index + 2 || demoComplete;
                            const active = !demoComplete && generationStage === index + 2;
                            return visible ? (
                              <motion.div
                                key={step}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2, delay: index * 0.08 }}
                                className="flex items-start gap-2 text-xs leading-5 text-slate-500"
                              >
                                {active ? (
                                  <Loader2 className="mt-0.5 h-3.5 w-3.5 shrink-0 animate-spin" style={{ color: demoAccent }} />
                                ) : (
                                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                                )}
                                <span>{step}</span>
                              </motion.div>
                            ) : null;
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Genie response */}
                  <AnimatePresence>
                    {generationStage >= 3 && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="text-sm leading-6 text-slate-700"
                      >
                        <div className="mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Genie
                        </div>
                        <div className="rounded-2xl rounded-tl-md bg-white px-4 py-3 shadow-xs ring-1 ring-slate-200">
                          {locale === 'zh'
                            ? '已打开右侧产物工作台，我会把过程内容整理成可保存、可复制的结构化草稿。'
                            : 'The workbench is open. I am turning the process into a structured draft you can save or copy.'}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom: Task progress + attachments */}
                <div className="border-t border-slate-100 bg-white p-4">
                  <AnimatePresence initial={false}>
                    {generationStage >= 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="mb-3 rounded-xl border border-slate-200 bg-slate-50 p-3"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-[13px] font-bold" style={{ color: demoAccent }}>
                            <LayoutGrid className="h-4 w-4" />
                            {locale === 'zh' ? '任务进度' : 'Task progress'}
                          </div>
                          <span className="rounded-full bg-white px-2 py-0.5 text-[11px] text-slate-500 ring-1 ring-slate-200">
                            {activeDemo.tasks.filter((_, index) => demoComplete || generationStage >= index + 3).length}/{activeDemo.tasks.length}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {activeDemo.tasks.map((task, index) => {
                            const state = demoComplete || generationStage >= index + 3
                              ? 'done'
                              : generationStage === index + 2
                                ? 'running'
                                : 'todo';
                            return (
                              <div
                                key={task}
                                className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs ${
                                  state === 'done'
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : state === 'running'
                                      ? 'bg-white text-slate-800 ring-1 ring-slate-200'
                                      : 'bg-slate-100 text-slate-400'
                                }`}
                              >
                                {state === 'done' ? (
                                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                                ) : state === 'running' ? (
                                  <Loader2 className="h-4 w-4 shrink-0 animate-spin" style={{ color: demoAccent }} />
                                ) : (
                                  <span className="h-4 w-4 shrink-0 rounded-full border border-slate-300" />
                                )}
                                <span className="truncate font-medium">{task}</span>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Attachments bar */}
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-2">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Plus className="h-4 w-4" />
                      <span className="text-xs">{locale === 'zh' ? '附件 / 素材' : 'Attachments / materials'}</span>
                    </div>
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                      <ArrowUp className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT: Workbench Panel */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`workbench-${activeDemoId}-${demoRunKey}`}
                  initial={{ x: 96, opacity: 0, filter: 'blur(8px)' }}
                  animate={{
                    x: generationStage >= 3 ? 0 : 48,
                    opacity: generationStage >= 3 ? 1 : 0.38,
                    filter: generationStage >= 3 ? 'blur(0px)' : 'blur(4px)'
                  }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex min-h-[620px] flex-col bg-slate-100/70"
                >
                  {/* Toolbar */}
                  <div className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-5">
                    <div className="flex min-w-0 items-center gap-2">
                      <Sparkles className="h-4 w-4 shrink-0" style={{ color: demoAccent }} />
                      <span className="truncate text-sm font-bold text-slate-900">{activeDemo.toolName}</span>
                      <span className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] text-slate-500">
                        {demoComplete
                          ? (locale === 'zh' ? '已完成' : 'Done')
                          : (locale === 'zh' ? '生成中' : 'Generating')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="hidden h-8 items-center gap-1.5 rounded-lg bg-slate-900 px-3 text-xs font-bold text-white sm:inline-flex">
                        <Check className="h-3.5 w-3.5" />
                        {activeDemo.saveLabel}
                      </button>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Workbench content */}
                  <div className="min-h-0 flex-1 p-5">
                    <div className="flex h-full flex-col gap-4">
                      {/* Result header */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-black tracking-tight text-slate-900">{activeDemo.resultTitle}</h3>
                          <p className="mt-1 text-xs text-slate-500">{activeDemo.resultMeta}</p>
                        </div>
                        <div className="flex flex-wrap justify-end gap-1.5">
                          {activeDemo.tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-white px-2 py-1 text-[11px] font-bold text-slate-500 ring-1 ring-slate-200">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Output grid */}
                      <div className="grid gap-4 lg:grid-cols-[1fr_0.78fr]">
                        {/* Output preview */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                          <div className="mb-3 flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-500">
                              {locale === 'zh' ? '产物预览' : 'Output preview'}
                            </span>
                            {isGenerating && (
                              <span className="flex items-center gap-1 text-[11px] font-bold" style={{ color: demoAccent }}>
                                <Loader2 className="h-3 w-3 animate-spin" />
                                {locale === 'zh' ? '流式生成' : 'Streaming'}
                              </span>
                            )}
                          </div>
                          <div className="space-y-3 text-sm leading-6 text-slate-700">
                            {visibleResultLines.map((line, index) => (
                              <motion.p
                                key={`${line}-${demoRunKey}`}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.25, delay: index * 0.14 }}
                                className="rounded-xl bg-slate-50 px-3 py-2"
                              >
                                {line}
                              </motion.p>
                            ))}
                            {!visibleResultLines.length && (
                              <div className="flex h-52 items-center justify-center rounded-xl border border-dashed border-slate-200 text-xs text-slate-400">
                                {locale === 'zh' ? '等待智能体打开产物工作台...' : 'Waiting for the workbench to open...'}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Sidebar: materials + snapshot */}
                        <div className="space-y-4">
                          {/* Referenced materials */}
                          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                            <div className="mb-3 text-xs font-bold text-slate-500">
                              {locale === 'zh' ? '素材引用' : 'Referenced materials'}
                            </div>
                            <div className="space-y-2">
                              {activeDemo.materials.map((material, index) => (
                                <motion.div
                                  key={material}
                                  initial={{ opacity: 0, x: 8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.2, delay: index * 0.08 }}
                                  className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600"
                                >
                                  <span className="truncate">@{material}</span>
                                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Session snapshot */}
                          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-4 text-white shadow-sm">
                            <div className="mb-3 flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-300">
                                {locale === 'zh' ? '会话快照' : 'Session snapshot'}
                              </span>
                              <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            </div>
                            <div className="space-y-2 text-[11px] text-slate-400">
                              <div className="flex justify-between">
                                <span>{locale === 'zh' ? '当前状态' : 'Status'}</span>
                                <span className="font-mono text-slate-200">{demoComplete ? 'split.done' : 'split.streaming'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>{locale === 'zh' ? '工作台' : 'Workbench'}</span>
                                <span className="font-mono text-slate-200">{activeDemo.toolName}</span>
                              </div>
                              <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{ backgroundColor: demoAccent }}
                                  initial={{ width: '18%' }}
                                  animate={{ width: demoComplete ? '100%' : generationStage >= 3 ? '72%' : '38%' }}
                                  transition={{ duration: 0.45 }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </motion.div>
        </RevealItem>
      </div>
    </motion.div>
  );
}