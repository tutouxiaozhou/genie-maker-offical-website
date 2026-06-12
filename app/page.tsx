'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp,
  Globe,
  Compass,
  ShieldCheck,
  Coins,
  FileSpreadsheet,
  UserCheck,
  Sliders,
  Mail,
  AlertTriangle,
  LayoutGrid,
  QrCode,
  ChevronDown,
  ChevronUp,
  Check,
  Loader2,
  Sparkles,
  Plus,
  ArrowUp,
  Database,
  Server,
  CheckCircle2,
  ArrowRight,
  Clock,
  Languages,
  CodeXml,
  Menu,
  X
} from 'lucide-react';

type DemoPresetId = 'rewrite' | 'shortVideo' | 'trends';

// Pre-defined suggestions for rapid testing
const PRESETS = [
  { id: 'rewrite' as const, label: "Rewrite materials", prompt: "Turn a product feature brief into a Xiaohongshu recommendation post." },
  { id: 'shortVideo' as const, label: "Video script", prompt: "Create a 30-second Douyin voiceover script for a product recommendation." },
  { id: 'trends' as const, label: "Trend breakdown", prompt: "Break down recent Xiaohongshu beauty topic patterns into content ideas." }
];

// High-fidelity pre-rendered designs in case the live generation needs fallback
const FALLBACK_DESIGNS: Record<string, any> = {
  creation: {
    appName: "Genie Content Studio",
    appSubtitle: "AI-assisted ideation, copywriting, storyboard, and publishing prep",
    colorPalette: {
      primary: "#FF5E3A",
      secondary: "#38BDF8",
      background: "#0F172A",
    },
    keyFeatures: [
      {
        title: "Structured Creation",
        description: "Turn prompts, attachments, and saved assets into structured content drafts.",
        icon: "TrendingUp",
      },
      {
        title: "Trend Context",
        description: "Convert live trend signals into angles, outlines, and platform-ready posts.",
        icon: "Globe",
      },
      {
        title: "Automated Funnels",
        description: "Save copy, generated images, and references back into the material library.",
        icon: "Compass",
      }
    ],
    databaseTables: [
      {
        name: "CreationSessions",
        description: "Stores AI chat sessions, prompts, generated outputs, and workbench snapshots.",
        columns: ["id: uuid", "topic: string", "status: varchar", "payload: jsonb", "updated_at: datetime"],
      },
      {
        name: "ContentDrafts",
        description: "Maintains draft titles, platform settings, assets, tags, and publish state.",
        columns: ["id: uuid", "title: string", "platform: varchar", "tags: jsonb", "status: varchar"],
      }
    ],
    mockChatConversation: [
      { sender: "user", message: "Help me turn this product sheet into a Xiaohongshu note." },
      { sender: "agent", message: "Drafted the hook, body copy, hashtags, and a matching image brief." },
      { sender: "user", message: "Save the generated images and copy to my material library." },
      { sender: "agent", message: "Saved the copy and image references with tags for later publishing." }
    ]
  },
  hotspots: {
    appName: "Genie Hotspot Radar",
    appSubtitle: "Cross-platform trend discovery and scheduled topic tracking",
    colorPalette: {
      primary: "#10B981",
      secondary: "#6366F1",
      background: "#090D16",
    },
    keyFeatures: [
      {
        title: "Hot List Coverage",
        description: "Collect platform hot lists and reveal category, rank, heat, and crawl batches.",
        icon: "ShieldCheck",
      },
      {
        title: "Keyword Tracking",
        description: "Schedule topic searches across engines and platforms with custom domains.",
        icon: "Coins",
      },
      {
        title: "Creator Signals",
        description: "Turn recurring trend results into actionable angles for content teams.",
        icon: "FileSpreadsheet",
      }
    ],
    databaseTables: [
      {
        name: "HotspotBatches",
        description: "Stores crawl batches, platform coverage, success counts, and source timestamps.",
        columns: ["id: uuid", "platform: varchar", "success_count: int", "failed_count: int", "crawled_at: datetime"],
      },
      {
        name: "TrackTasks",
        description: "Stores keyword groups, search engines, trigger windows, and enabled states.",
        columns: ["id: uuid", "name: string", "keywords: jsonb", "schedule: jsonb", "enabled: boolean"],
      }
    ],
    mockChatConversation: [
      { sender: "user", message: "Track AI video generation topics across Xiaohongshu and Douyin." },
      { sender: "agent", message: "Created a keyword task with platform filters and daily trigger windows." },
      { sender: "user", message: "Summarize what angles are worth posting about." },
      { sender: "agent", message: "Grouped repeated signals and prepared three creator-ready topic directions." }
    ]
  },
  assets: {
    appName: "Genie Asset Library",
    appSubtitle: "Structured image, video, document, and copy management for creators",
    colorPalette: {
      primary: "#C084FC",
      secondary: "#FB923C",
      background: "#180828",
    },
    keyFeatures: [
      {
        title: "Multi-Type Assets",
        description: "Manage images, videos, documents, and reusable copy in one library.",
        icon: "UserCheck",
      },
      {
        title: "Folders & Tags",
        description: "Keep personal and organization assets searchable by folder, tag, and type.",
        icon: "Sliders",
      },
      {
        title: "AI Saveback",
        description: "Save generated copy and images directly from the AI workbench to the library.",
        icon: "Mail",
      }
    ],
    databaseTables: [
      {
        name: "Materials",
        description: "Stores asset metadata, file ids, library scope, folders, tags, and remarks.",
        columns: ["id: uuid", "name: string", "type: varchar", "scope: varchar", "file_id: bigint"],
      },
      {
        name: "MaterialTags",
        description: "Keeps reusable labels for filtering assets and composing content workflows.",
        columns: ["id: uuid", "label: string", "color: varchar", "created_at: datetime"],
      }
    ],
    mockChatConversation: [
      { sender: "user", message: "Find the product images and attach them to this draft." },
      { sender: "agent", message: "Filtered image assets by folder and tag, then attached the selected URLs." },
      { sender: "user", message: "Save this final copy as a reusable material." },
      { sender: "agent", message: "Saved the copy material with platform tags and source remarks." }
    ]
  },
  workflow: {
    appName: "Genie Workflow Hub",
    appSubtitle: "Configurable research, creation, review, and publishing workflows",
    colorPalette: {
      primary: "#EAB308",
      secondary: "#64748B",
      background: "#080F1D",
    },
    keyFeatures: [
      {
        title: "Node-Based Runs",
        description: "Configure repeatable workflows for research, drafting, asset handling, and review.",
        icon: "AlertTriangle",
      },
      {
        title: "Execution Logs",
        description: "Inspect run status, node output, artifacts, and partial failures in one place.",
        icon: "LayoutGrid",
      },
      {
        title: "Publishing Prep",
        description: "Move approved content into drafts and route it to connected social accounts.",
        icon: "QrCode",
      }
    ],
    databaseTables: [
      {
        name: "WorkflowDefinitions",
        description: "Stores workflow nodes, edges, triggers, and organization-level configuration.",
        columns: ["id: uuid", "name: string", "nodes: jsonb", "edges: jsonb", "enabled: boolean"],
      },
      {
        name: "WorkflowRuns",
        description: "Tracks executions, node logs, output artifacts, status, and runtime metadata.",
        columns: ["id: uuid", "workflow_id: uuid", "status: varchar", "artifacts: jsonb", "started_at: datetime"],
      }
    ],
    mockChatConversation: [
      { sender: "user", message: "Run a workflow that researches a trend and drafts a post." },
      { sender: "agent", message: "Started the workflow and recorded each node output in the execution log." },
      { sender: "user", message: "Send the approved result to publishing prep." },
      { sender: "agent", message: "Created a draft with assets, tags, platform settings, and review status." }
    ]
  }
};

const FAQ_ITEMS = [
  {
    question: "What is Genie Maker?",
    answer: "Genie Maker is an AI creation and operations workspace for teams that turn trends, assets, and ideas into publishable social content."
  },
  {
    question: "How does Genie Maker work?",
    answer: "Teams chat with an AI creation agent, reference material library assets, track trend signals, generate drafts, and prepare content for connected social accounts."
  },
  {
    question: "Can I keep generated content and assets organized?",
    answer: "Yes. Generated copy, images, references, documents, and reusable snippets can be saved into personal or organization libraries with folders and tags."
  },
  {
    question: "Which platforms does it support?",
    answer: "The workspace is designed for multi-platform content operations, including Xiaohongshu, Douyin, WeChat Channels, WeChat Official Account, X / Twitter, and Bilibili."
  },
  {
    question: "Can teams manage organizations and shared libraries?",
    answer: "Yes. Genie Maker includes organization context, member management, shared assets, and organization-aware content workflows."
  },
  {
    question: "Does it support repeatable workflows?",
    answer: "Yes. Workflow configuration and execution logs help teams standardize research, drafting, review, asset handling, and publishing preparation."
  }
];

type Locale = 'zh' | 'en';

const PRESETS_ZH = [
    {
        id: 'rewrite' as const,
        label: "素材改写为内容",
        prompt: "帮我把产品功能介绍文档改写成一条小红书种草笔记",
    },
    {
        id: 'shortVideo' as const,
        label: "短视频脚本生成",
        prompt: "帮我生成一条抖音口播视频脚本，主题是母婴好物推荐，时长 30 秒",
    },
    {
        id: 'trends' as const,
        label: "爆款选题拆解",
        prompt: "帮我拆解最近 7 天小红书美妆类目的爆款封面和标题规律",
    },
];

type DemoScript = {
  legacyKey: 'creation' | 'hotspots' | 'assets' | 'workflow';
  title: string;
  subtitle: string;
  sessionTitle: string;
  toolName: string;
  userMessage: string;
  materials: string[];
  thinking: string[];
  tasks: string[];
  resultTitle: string;
  resultMeta: string;
  resultLines: string[];
  tags: string[];
  saveLabel: string;
};

const DEMO_SCRIPTS: Record<DemoPresetId, DemoScript> = {
  rewrite: {
    legacyKey: 'creation',
    title: "Material rewrite demo",
    subtitle: "A local animation that mirrors the real chat-to-workbench flow without calling the API.",
    sessionTitle: "Product brief to Xiaohongshu note",
    toolName: "Copywriting Workbench",
    userMessage: "Turn this product feature brief into a Xiaohongshu recommendation post.",
    materials: ["Feature brief.pdf", "Brand images x6", "Tone guide"],
    thinking: [
      "Reading product selling points and audience notes",
      "Matching Xiaohongshu structure and conversational tone",
      "Preparing hook, body copy, hashtags, and saveback metadata"
    ],
    tasks: ["Extract core benefits", "Adapt platform voice", "Generate publish-ready note"],
    resultTitle: "Gentle daily-use product note",
    resultMeta: "Xiaohongshu / soft recommendation / 420 words",
    resultLines: [
      "Title: I finally found a lightweight helper for busy content days",
      "Hook: If your product docs are clear but not social-ready, this workflow turns them into a warmer story.",
      "Body: Start with the pain point, fold in the strongest proof, then move toward a practical usage scene.",
      "Hashtags: #contentworkflow #aicreation #xiaohongshu"
    ],
    tags: ["Copy", "Assets", "Saveback"],
    saveLabel: "Save copy to library"
  },
  shortVideo: {
    legacyKey: 'workflow',
    title: "Short video script demo",
    subtitle: "Show how a prompt becomes a structured voiceover and shot list inside the workbench.",
    sessionTitle: "30-second Douyin script",
    toolName: "Storyboard Workbench",
    userMessage: "Create a 30-second Douyin voiceover script for a product recommendation.",
    materials: ["Product photos", "Audience notes", "Selling points"],
    thinking: [
      "Splitting the brief into opening, proof, demo, and call-to-action",
      "Balancing visual rhythm with spoken copy",
      "Structuring shots, captions, and voiceover timing"
    ],
    tasks: ["Build script outline", "Write voiceover beats", "Attach shot directions"],
    resultTitle: "30s voiceover storyboard",
    resultMeta: "Douyin / product recommendation / 4 shots",
    resultLines: [
      "0-3s: Close-up hook, show the product in use. VO: 'This solved the tiny daily problem I kept ignoring.'",
      "4-12s: Demonstrate the main benefit with one clear before/after contrast.",
      "13-23s: Add proof, usage detail, and one memorable line for retention.",
      "24-30s: End with a soft CTA and subtitle-friendly summary."
    ],
    tags: ["Storyboard", "Voiceover", "Captions"],
    saveLabel: "Save script draft"
  },
  trends: {
    legacyKey: 'hotspots',
    title: "Trend breakdown demo",
    subtitle: "Show the product's trend reasoning path and final topic matrix as a local animation.",
    sessionTitle: "Beauty topic pattern analysis",
    toolName: "Topic Strategy Workbench",
    userMessage: "Break down recent Xiaohongshu beauty topic patterns into content ideas.",
    materials: ["7-day hot list", "Cover examples", "Title samples"],
    thinking: [
      "Grouping repeated cover and title signals",
      "Separating short-lived buzz from reusable topic patterns",
      "Turning patterns into publishable angles for creators"
    ],
    tasks: ["Cluster hot signals", "Extract title formulas", "Create topic matrix"],
    resultTitle: "Reusable topic matrix",
    resultMeta: "Xiaohongshu / beauty / 6 content angles",
    resultLines: [
      "Pattern 1: 'Before I knew X...' titles work best when paired with close-up texture covers.",
      "Pattern 2: Ingredient-led posts convert better when the first screen names a specific use case.",
      "Angle: 'Commute makeup rescue kit' with three proof points and one measurable benefit.",
      "Angle: 'Beginner-friendly evening routine' framed around time saved, not product count."
    ],
    tags: ["Trend", "Titles", "Angles"],
    saveLabel: "Save topic matrix"
  }
};

const DEMO_SCRIPTS_ZH: Record<DemoPresetId, DemoScript> = {
  rewrite: {
    legacyKey: 'creation',
    title: "素材改写演示",
    subtitle: "不调用接口，用本地动画模拟真实产品里的聊天流、任务进度和右侧产物工作台。",
    sessionTitle: "产品资料改写为小红书笔记",
    toolName: "文案工作台",
    userMessage: "帮我把产品功能介绍文档改写成一条小红书种草笔记",
    materials: ["产品功能介绍.docx", "品牌图片 6 张", "语气参考"],
    thinking: [
      "读取产品卖点、目标人群和使用场景",
      "匹配小红书笔记结构与种草语气",
      "整理开头钩子、正文段落、话题标签和素材回存信息"
    ],
    tasks: ["提取核心卖点", "适配平台语气", "生成可发布笔记"],
    resultTitle: "小红书种草笔记草稿",
    resultMeta: "小红书 / 轻种草 / 约 420 字",
    resultLines: [
      "标题：被这个 AI 创作工作台救了一次内容排期",
      "开头：以前产品资料写得很完整，但一到发小红书就总觉得太像说明书。",
      "正文：现在我会先把功能点、图片和目标人群丢进 Genie Maker，它会把卖点拆成更像真实体验的表达。",
      "标签：#AI创作 #小红书运营 #素材改写 #内容工作流"
    ],
    tags: ["文案", "素材", "回存"],
    saveLabel: "保存文案到素材库"
  },
  shortVideo: {
    legacyKey: 'workflow',
    title: "短视频脚本演示",
    subtitle: "展示从需求到口播稿、镜头节奏和字幕提示的本地模拟生成过程。",
    sessionTitle: "30 秒抖音口播脚本",
    toolName: "分镜脚本工作台",
    userMessage: "帮我生成一条抖音口播视频脚本，主题是母婴好物推荐，时长 30 秒",
    materials: ["产品图片", "用户痛点", "卖点清单"],
    thinking: [
      "拆分 30 秒视频的开头、证明、演示和收尾节奏",
      "把卖点转换成适合口播的短句",
      "补充镜头画面、字幕重点和结尾行动引导"
    ],
    tasks: ["生成脚本结构", "编写口播节奏", "补充分镜与字幕"],
    resultTitle: "30 秒口播分镜",
    resultMeta: "抖音 / 母婴好物 / 4 个镜头",
    resultLines: [
      "0-3s：宝宝用品桌面近景。口播：'新手爸妈最怕的不是东西多，是每次都找不到顺手的。'",
      "4-12s：展示产品核心功能，画面对比使用前后的差异。",
      "13-23s：补充安全感和省心细节，字幕突出'一拿就用'、'清洁方便'。",
      "24-30s：收尾推荐语，给出适合人群和轻 CTA。"
    ],
    tags: ["脚本", "口播", "分镜"],
    saveLabel: "保存脚本草稿"
  },
  trends: {
    legacyKey: 'hotspots',
    title: "爆款选题拆解演示",
    subtitle: "模拟真实产品把热点信号、封面标题规律和可执行选题整理成工作台产物。",
    sessionTitle: "美妆爆款选题拆解",
    toolName: "选题策略工作台",
    userMessage: "帮我拆解最近 7 天小红书美妆类目的爆款封面和标题规律",
    materials: ["7 日热榜", "封面样例", "标题样本"],
    thinking: [
      "聚类近 7 天反复出现的封面与标题信号",
      "区分短期热词和可复用内容模式",
      "把规律转成创作者可以直接使用的选题角度"
    ],
    tasks: ["聚合热点信号", "提炼标题公式", "输出选题矩阵"],
    resultTitle: "可复用选题矩阵",
    resultMeta: "小红书 / 美妆类目 / 6 个方向",
    resultLines: [
      "规律 1：'早知道就...' 类标题更适合搭配强对比封面。",
      "规律 2：成分党内容需要在首屏直接点出使用场景，而不是先堆参数。",
      "选题：通勤补妆急救包，用 3 个场景证明产品价值。",
      "选题：新手晚间护肤流程，围绕'省时间'而不是'产品数量'展开。"
    ],
    tags: ["热点", "标题", "选题"],
    saveLabel: "保存选题矩阵"
  }
};

const FALLBACK_DESIGNS_ZH: Record<string, any> = {
  creation: {
    ...FALLBACK_DESIGNS.creation,
    appName: "Genie 内容工作室",
    appSubtitle: "AI 辅助选题、文案、分镜和发布准备",
    keyFeatures: [
      { title: "结构化创作", description: "把提示词、附件和素材转成可继续编辑的内容草稿。", icon: "TrendingUp" },
      { title: "热点上下文", description: "将实时趋势信号转化为选题角度、提纲和平台文案。", icon: "Globe" },
      { title: "素材回存", description: "把生成文案、图片和参考资料保存回素材库，方便复用。", icon: "Compass" }
    ],
    databaseTables: [
      { name: "创作会话", description: "记录 AI 对话、提示词、生成产物和工作台快照。", columns: ["id: uuid", "topic: string", "status: varchar", "payload: jsonb", "updated_at: datetime"] },
      { name: "内容草稿", description: "维护标题、平台设置、素材、标签和发布状态。", columns: ["id: uuid", "title: string", "platform: varchar", "tags: jsonb", "status: varchar"] }
    ],
    mockChatConversation: [
      { sender: "user", message: "帮我把这份产品资料改写成小红书笔记。" },
      { sender: "agent", message: "已生成开头钩子、正文、话题标签和配图建议。" },
      { sender: "user", message: "把生成的图片和文案保存到素材库。" },
      { sender: "agent", message: "已按标签保存文案和图片引用，后续发布可直接复用。" }
    ]
  },
  hotspots: {
    ...FALLBACK_DESIGNS.hotspots,
    appName: "Genie 热点雷达",
    appSubtitle: "跨平台热点发现与定时话题追踪",
    keyFeatures: [
      { title: "榜单覆盖", description: "抓取平台热榜，呈现类目、排名、热度和批次记录。", icon: "ShieldCheck" },
      { title: "关键词追踪", description: "按搜索引擎、平台和自定义域名定时追踪话题。", icon: "Coins" },
      { title: "创作信号", description: "把反复出现的趋势结果整理为内容团队可执行的选题。", icon: "FileSpreadsheet" }
    ],
    databaseTables: [
      { name: "热点批次", description: "记录抓取批次、平台覆盖、成功数量和来源时间。", columns: ["id: uuid", "platform: varchar", "success_count: int", "failed_count: int", "crawled_at: datetime"] },
      { name: "追踪任务", description: "保存关键词组、搜索引擎、触发时间段和启用状态。", columns: ["id: uuid", "name: string", "keywords: jsonb", "schedule: jsonb", "enabled: boolean"] }
    ],
    mockChatConversation: [
      { sender: "user", message: "帮我追踪小红书和抖音上的 AI 视频生成话题。" },
      { sender: "agent", message: "已创建关键词任务，并设置平台过滤和每日触发时间段。" },
      { sender: "user", message: "总结哪些角度值得发内容。" },
      { sender: "agent", message: "已聚合重复信号，并整理出三个适合创作的选题方向。" }
    ]
  },
  assets: {
    ...FALLBACK_DESIGNS.assets,
    appName: "Genie 素材库",
    appSubtitle: "面向创作者的图片、视频、文档和文案管理",
    keyFeatures: [
      { title: "多类型素材", description: "统一管理图片、视频、文档和可复用文案。", icon: "UserCheck" },
      { title: "文件夹与标签", description: "按文件夹、标签、类型搜索个人库和组织库素材。", icon: "Sliders" },
      { title: "AI 回存", description: "从 AI 工作台直接保存生成文案和图片到素材库。", icon: "Mail" }
    ],
    databaseTables: [
      { name: "素材", description: "保存素材信息、文件 ID、库范围、文件夹、标签和备注。", columns: ["id: uuid", "name: string", "type: varchar", "scope: varchar", "file_id: bigint"] },
      { name: "素材标签", description: "维护用于筛选素材和组织创作流程的可复用标签。", columns: ["id: uuid", "label: string", "color: varchar", "created_at: datetime"] }
    ],
    mockChatConversation: [
      { sender: "user", message: "找到产品图，并附加到这篇草稿里。" },
      { sender: "agent", message: "已按文件夹和标签筛选图片素材，并绑定选中的 URL。" },
      { sender: "user", message: "把最终文案保存成可复用素材。" },
      { sender: "agent", message: "已保存文案素材，并带上平台标签和来源备注。" }
    ]
  },
  workflow: {
    ...FALLBACK_DESIGNS.workflow,
    appName: "Genie 工作流中心",
    appSubtitle: "可配置的研究、创作、审核与发布工作流",
    keyFeatures: [
      { title: "节点化运行", description: "配置研究、起草、素材处理和审核的可复用流程。", icon: "AlertTriangle" },
      { title: "执行日志", description: "集中查看运行状态、节点输出、产物和部分失败信息。", icon: "LayoutGrid" },
      { title: "发布准备", description: "把审核后的内容转入草稿，并路由到已连接的社媒账号。", icon: "QrCode" }
    ],
    databaseTables: [
      { name: "工作流定义", description: "保存节点、连线、触发器和组织级配置。", columns: ["id: uuid", "name: string", "nodes: jsonb", "edges: jsonb", "enabled: boolean"] },
      { name: "工作流运行", description: "追踪执行记录、节点日志、输出产物、状态和运行元数据。", columns: ["id: uuid", "workflow_id: uuid", "status: varchar", "artifacts: jsonb", "started_at: datetime"] }
    ],
    mockChatConversation: [
      { sender: "user", message: "运行一条工作流，先研究热点再生成草稿。" },
      { sender: "agent", message: "已启动工作流，并记录每个节点的输出。" },
      { sender: "user", message: "把审核通过的结果送到发布准备。" },
      { sender: "agent", message: "已创建带素材、标签、平台设置和审核状态的草稿。" }
    ]
  }
};

const FAQ_ITEMS_ZH = [
  { question: "Genie Maker 是什么？", answer: "Genie Maker 是面向内容团队的 AI 创作运营工作台，帮助团队把热点、素材和想法转成可发布的社媒内容。" },
  { question: "Genie Maker 怎么工作？", answer: "团队可以和 AI 创作助手对话，引用素材库内容，追踪热点信号，生成草稿，并为已连接的社媒账号准备发布。" },
  { question: "生成内容和素材能统一管理吗？", answer: "可以。生成文案、图片、参考资料、文档和可复用片段都能保存到个人库或组织库，并支持文件夹和标签。" },
  { question: "支持哪些平台？", answer: "工作台面向多平台内容运营设计，包括小红书、抖音、视频号、微信公众号、X / Twitter 和 B 站等。" },
  { question: "团队能管理组织和共享素材吗？", answer: "可以。Genie Maker 支持组织上下文、成员管理、共享素材和按组织隔离的内容工作流。" },
  { question: "支持可复用工作流吗？", answer: "支持。工作流配置和执行日志可以帮助团队标准化热点研究、起草、审核、素材处理和发布准备。" }
];

const UI_COPY = {
  en: {
    navProduct: "Product",
    navDemo: "Creation Demo",
    navFeatures: "Features",
    navPlans: "Plans",
    navFaq: "FAQ",
    startCta: "Start Creating",
    badge: "AI creation operations workspace",
    heroTitle: "Build with Genie Maker",
    heroSubtitle: "Genie Maker helps content teams turn trends, materials, and ideas into publishable social posts with an AI creation workspace.",
    placeholder: "Describe the content you want to create. E.g., 'Turn this product sheet into a Xiaohongshu note with a strong hook...'",
    languageLabel: "Switch language",
    newBadge: "NEW",
    demoIdleTitle: "Creation Canvas Sandbox",
    demoRunningTitle: "Genie Creation Engine",
    demoSubtitle: "Experience the loop from prompt to draft. Pick a preset or customize a request, then see content modules, assets, and workflow records come together.",
    awaitingTitle: "State: Awaiting Brief",
    awaitingText: "Select one of the creation presets above or describe your content goal. Genie Maker will prepare a structured workspace preview in seconds.",
    loadPreset: "Load Content Preset",
    stage1: "Brief Analysis",
    stage1Active: "Reading creative brief...",
    stage1Done: "Analyzed in 1.4s",
    stageIdle: "Idle state",
    stage2: "Content Modules",
    stage2Active: "Structuring draft assets...",
    stage2Done: "2 Modules prepared",
    stage2Idle: "Awaiting content map",
    stage3: "Asset Binding",
    stage3Active: "Linking library references...",
    stage3Done: "Assets linked",
    stage3Idle: "Library idle",
    stage4: "Publish Prep",
    stage4Done: "Ready for Review",
    inactive: "Inactive",
    console0: "// Genie creation engine v2.10 online ...",
    console1: "Connecting creation agent and material context...",
    console2: "Reading brief, audience notes, platform intent, and attachments...",
    console3: "Draft modules detected. Preparing copy, assets, and publish metadata.",
    console4: "CREATE DRAFT title, hook, body, assets, hashtags, platform settings;",
    console5: "Material references linked and saveback targets prepared.",
    console6: "Publishing prep routed to review workspace and social accounts.",
    computing: "Preparing next creative step...",
    draftReady: "Draft: ",
    readyReview: "Ready for review",
    reviewReady: "Review Ready",
    generatedModules: "Generated Creation Modules",
    recordsTitle: "Structured Workspace Records",
    recordsNote: "Draft metadata prepared",
    saved: "Saved",
    historyTitle: "Creation History & Logs",
    creatorRequest: "Creator Request",
    genieAgent: "Genie Agent",
    workspaceReady: "Workspace ready",
    openDraft: "Open Draft",
    openDraftAlert: "The creation workspace is ready. Open the draft center to review, save, or publish.",
    featureEyebrow: "01 / 04 AI CREATION CO-PILOT",
    featureTitle: "Tell Genie Maker what you want to publish...",
    featureText: "Turn campaign goals, source materials, and rough ideas into platform-ready drafts, storyboards, scripts, and reusable content assets.",
    goCreator: "Go to Creator",
    agentName: "GENIE AGENT",
    agentLine: "Let's turn this product brief into a sharper social post. Should we focus on value or scene?",
    you: "YOU",
    userLine: "Use a scene-first hook, then save the final copy to my asset library.",
    conceptTag: "CONTENT CORE",
    conceptTitle: "Trend-To-Draft Workflow",
    conceptText: "Combine tracked topics, saved references, and platform rules into a draft that is ready for review.",
    voiceTag: "COPY CHANNELS",
    voiceTitle: "Multi-Platform Adaptation",
    voiceText: "\"One content idea can become a Xiaohongshu note, Douyin script, WeChat post, or X thread with platform-aware structure.\"",
    streaming: "Genie streaming platform-ready copy...",
    sequence: "Creation sequence configured",
    awaitingBrief: "Awaiting brief",
    opsEyebrow: "02 / 04 OPERATIONS WORKSPACE",
    opsTitle: "One workspace for creation, assets, trends, and publishing",
    opsText: "Manage draft content, published works, social accounts, material libraries, trend tracking, and workflow runs without scattering work across tools.",
    materialLibrary: "Material library",
    reviewReadyShort: "Review ready",
    registry: "Content Registry",
    healthy: "Healthy",
    active: "Active",
    ok: "100% OK",
    readiness: "Publish Readiness",
    assetLinks: "Asset links checked",
    metadataReady: "Draft metadata ready",
    workflowActive: "Workflow active",
    reviewQueue: "review queue",
    showcaseTitle: "Seamless creation from signal to publish-ready draft",
    showcaseText: "Click any workflow below to trigger the preview and see Genie Maker assemble the right creation workspace.",
    card1Tag: "AI Creation",
    card1Title: "Product Note Draft",
    card1Text: "Generate hooks, body copy, hashtags, and image prompts from a brief and selected assets.",
    card2Tag: "Hotspot Radar",
    card2Title: "Trend Signals",
    card2Text: "Watch platform lists, scheduled searches, and source records for topics worth acting on.",
    signalVerified: "Signal verified",
    card3Tag: "Asset Library",
    card3Title: "Reusable Materials",
    card3Text: "Keep brand media, documents, and finished copy searchable for the next creation flow.",
    pricingTitle: "Flexible plans for creator teams.",
    pricingText: "Start with an AI creation workspace, then scale into team libraries, workflow automation, and publishing operations.",
    pricingHint: "Adjust workspace capacity anytime",
    freeTitle: "Start with Genie",
    freeDesc: "Perfect for individual creators",
    free1: "AI chat and creation workspace",
    free2: "Personal material library",
    free3: "Draft and publish preparation",
    startCreating: "Start Creating",
    popular: "Popular",
    teamTitle: "Genie Team",
    teamDesc: "For content teams and operators",
    team1: "Shared organization workspaces",
    team2: "Team material libraries and tags",
    team3: "Trend tracking and workflow runs",
    team4: "Social account and publishing prep",
    upgradeTeam: "Upgrade to Team",
    enterpriseTitle: "Need an operations setup?",
    enterpriseText: "Organization rollout, custom workflows, account permissions, platform connections, and content governance.",
    contactAlert: "Contact the Genie Maker team to discuss organization rollout, workflow setup, and platform operations.",
    contactTeam: "Contact Team",
    faqTitle: "Frequently asked questions",
    faqIntro: "Need extra clarification about AI creation, material libraries, trend tracking, or social publishing workflows? Contact the Genie Maker team anytime.",
    finalTitle: "So, what are we creating today?",
    finalText: "Ready to turn an idea, trend, or product brief into publish-ready content? Jump back to the creation canvas and try a workflow.",
    goBrief: "Go to brief",
    footerBrand: "Genie Maker Platform",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    security: "Workspace Security",
    status: "Platform Status",
    support: "Contact Support",
    copyright: "Built for AI-powered content operations."
  },
  zh: {
    navProduct: "产品",
    navDemo: "创作演示",
    navFeatures: "功能",
    navPlans: "方案",
    navFaq: "常见问题",
    startCta: "开始创作",
    badge: "AI 创作运营工作台",
    heroTitle: "用 Genie Maker 开始创作",
    heroSubtitle: "Genie Maker 帮内容团队把热点、素材和想法转成可发布的社媒内容，并沉淀到统一的 AI 创作工作台。",
    placeholder: "描述你想创作的内容，例如：“把这份产品资料改写成一篇小红书笔记...”",
    languageLabel: "切换语言",
    newBadge: "最新",
    demoIdleTitle: "创作画布沙盒",
    demoRunningTitle: "Genie 创作引擎",
    demoSubtitle: "从提示词到草稿，体验一条完整创作回路。选择预设或输入需求，即可看到内容模块、素材和工作流记录被组织起来。",
    awaitingTitle: "状态：等待创作简报",
    awaitingText: "选择上方创作预设，或描述你的内容目标。Genie Maker 会在数秒内准备结构化工作台预览。",
    loadPreset: "加载内容预设",
    stage1: "简报分析",
    stage1Active: "正在读取创作简报...",
    stage1Done: "1.4 秒完成分析",
    stageIdle: "空闲状态",
    stage2: "内容模块",
    stage2Active: "正在整理草稿素材...",
    stage2Done: "已准备 2 个模块",
    stage2Idle: "等待内容结构",
    stage3: "素材绑定",
    stage3Active: "正在关联素材库引用...",
    stage3Done: "素材已关联",
    stage3Idle: "素材库空闲",
    stage4: "发布准备",
    stage4Done: "可进入审核",
    inactive: "未激活",
    console0: "// Genie 创作引擎 v2.10 已在线 ...",
    console1: "正在连接创作智能体和素材上下文...",
    console2: "正在读取简报、受众信息、平台意图和附件...",
    console3: "检测到草稿模块，正在准备文案、素材和发布元数据。",
    console4: "CREATE DRAFT 标题、钩子、正文、素材、话题标签、平台设置;",
    console5: "素材引用已关联，回存目标已准备。",
    console6: "发布准备已路由到审核工作区和社媒账号。",
    computing: "正在准备下一步创作...",
    draftReady: "草稿：",
    readyReview: "可审核",
    reviewReady: "审核就绪",
    generatedModules: "已生成创作模块",
    recordsTitle: "结构化工作台记录",
    recordsNote: "草稿元数据已准备",
    saved: "已保存",
    historyTitle: "创作历史与日志",
    creatorRequest: "创作者需求",
    genieAgent: "Genie 智能体",
    workspaceReady: "工作台已就绪",
    openDraft: "打开草稿",
    openDraftAlert: "创作工作台已准备好。可以打开发布中心审核、保存或发布。",
    featureEyebrow: "01 / 04 AI 创作搭档",
    featureTitle: "告诉 Genie Maker 你想发布什么...",
    featureText: "把营销目标、来源素材和粗略想法转成适配平台的草稿、分镜、脚本和可复用内容资产。",
    goCreator: "进入创作器",
    agentName: "GENIE 智能体",
    agentLine: "我来把这份产品简报改成更有吸引力的社媒内容。要突出价值点还是使用场景？",
    you: "你",
    userLine: "先用场景钩子开头，然后把最终文案保存到素材库。",
    conceptTag: "内容核心",
    conceptTitle: "热点到草稿工作流",
    conceptText: "把追踪话题、已保存参考和平台规则组合成一篇可审核草稿。",
    voiceTag: "文案渠道",
    voiceTitle: "多平台适配",
    voiceText: "“一个内容想法可以变成小红书笔记、抖音脚本、微信公众号文章或 X 线程，并保留平台结构。”",
    streaming: "Genie 正在输出平台化文案...",
    sequence: "创作序列已配置",
    awaitingBrief: "等待简报",
    opsEyebrow: "02 / 04 运营工作台",
    opsTitle: "创作、素材、热点和发布集中在一个工作台",
    opsText: "统一管理草稿、已发布作品、社媒账号、素材库、热点追踪和工作流运行，不再把内容运营拆散到多个工具。",
    materialLibrary: "素材库",
    reviewReadyShort: "审核就绪",
    registry: "内容登记",
    healthy: "正常",
    active: "已启用",
    ok: "100% 就绪",
    readiness: "发布准备度",
    assetLinks: "素材链接已检查",
    metadataReady: "草稿元数据就绪",
    workflowActive: "工作流运行中",
    reviewQueue: "审核队列",
    showcaseTitle: "从信号到可发布草稿，一条顺滑创作链路",
    showcaseText: "点击下方任一工作流，触发预览，看看 Genie Maker 如何组装对应的创作工作台。",
    card1Tag: "AI 创作",
    card1Title: "产品笔记草稿",
    card1Text: "基于简报和所选素材，生成开头钩子、正文、话题标签和配图提示。",
    card2Tag: "热点雷达",
    card2Title: "趋势信号",
    card2Text: "追踪平台榜单、定时搜索和来源记录，找到值得行动的内容机会。",
    signalVerified: "信号已确认",
    card3Tag: "素材库",
    card3Title: "可复用素材",
    card3Text: "让品牌媒体、文档和成稿文案保持可搜索，服务下一次创作。",
    pricingTitle: "适合创作者团队的灵活方案。",
    pricingText: "从 AI 创作工作台开始，逐步扩展到团队素材库、工作流自动化和发布运营。",
    pricingHint: "可随时调整工作台容量",
    freeTitle: "从 Genie 开始",
    freeDesc: "适合个人创作者",
    free1: "AI 对话与创作工作台",
    free2: "个人素材库",
    free3: "草稿与发布准备",
    startCreating: "开始创作",
    popular: "热门",
    teamTitle: "Genie 团队版",
    teamDesc: "适合内容团队和运营人员",
    team1: "共享组织工作区",
    team2: "团队素材库和标签",
    team3: "热点追踪与工作流运行",
    team4: "社媒账号和发布准备",
    upgradeTeam: "升级团队版",
    enterpriseTitle: "需要组织级运营配置？",
    enterpriseText: "支持组织落地、自定义工作流、账号权限、平台连接和内容治理。",
    contactAlert: "联系 Genie Maker 团队，了解组织落地、工作流配置和平台运营方案。",
    contactTeam: "联系团队",
    faqTitle: "常见问题",
    faqIntro: "想了解 AI 创作、素材库、热点追踪或社媒发布工作流？可以随时联系 Genie Maker 团队。",
    finalTitle: "今天要创作什么？",
    finalText: "准备好把想法、热点或产品简报变成可发布内容了吗？回到创作画布，试一条工作流。",
    goBrief: "回到简报",
    footerBrand: "Genie Maker 平台",
    privacy: "隐私政策",
    terms: "服务条款",
    security: "工作区安全",
    status: "平台状态",
    support: "联系支持",
    copyright: "为 AI 内容运营而构建。"
  }
};

const revealEase = [0.16, 1, 0.3, 1] as const;

const sectionReveal = {
  hidden: { opacity: 0, y: 42, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.82,
      ease: revealEase,
      staggerChildren: 0.11,
      delayChildren: 0.08,
    },
  },
};

const itemReveal = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.72,
      ease: revealEase,
    },
  },
};

const revealViewport = { once: true, amount: 0.22, margin: "0px 0px -12% 0px" };
const navSectionIds = ['product', 'demo', 'features', 'pricing', 'faq'] as const;
type NavSectionId = typeof navSectionIds[number];

function RevealSection({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemReveal} className={className}>
      {children}
    </motion.div>
  );
}

export default function Page() {
  const [locale, setLocale] = useState<Locale>('zh');
  const copy = UI_COPY[locale];
  const presets = locale === 'zh' ? PRESETS_ZH : PRESETS;
  const fallbackDesigns = locale === 'zh' ? FALLBACK_DESIGNS_ZH : FALLBACK_DESIGNS;
  const faqItems = locale === 'zh' ? FAQ_ITEMS_ZH : FAQ_ITEMS;

  // Playground prompt state
  const [promptInput, setPromptInput] = useState("");

  // Generation status and stages
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStage, setGenerationStage] = useState(4); // 1 = user brief, 2 = thinking, 3 = workbench streaming, 4 = completed
  const [generatedInfo, setGeneratedInfo] = useState<any | null>(null);
  const [activeDemoId, setActiveDemoId] = useState<DemoPresetId>('rewrite');
  const [demoRunKey, setDemoRunKey] = useState(0);

  // References and animation triggers
  const pipelineRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavId, setActiveNavId] = useState<NavSectionId>('product');

  // Interactive Features Tabs Section
  const [activeTabFeature, setActiveTabFeature] = useState<'chat' | 'idea' | 'narration'>('chat');

  // Interactive FAQs accordion state active IDs
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const demoScripts = locale === 'zh' ? DEMO_SCRIPTS_ZH : DEMO_SCRIPTS;
  const activeDemo = demoScripts[activeDemoId];
  const activeLegacyInfo = generatedInfo ?? fallbackDesigns[activeDemo.legacyKey];
  const demoAccent = activeLegacyInfo?.colorPalette?.primary || '#FF5E3A';

  // Tracking dynamic simulation timelines
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

  // Run a local product demo. This intentionally does not call the API.
  const handleGenerate = (finalPromptText?: string, explicitDemoId?: DemoPresetId) => {
    const textPrompt = finalPromptText || promptInput;
    if (!textPrompt.trim()) return;

    const nextDemoId = resolveDemoId(textPrompt, explicitDemoId);
    const nextDemo = demoScripts[nextDemoId];
    setActiveDemoId(nextDemoId);
    setPromptInput(textPrompt);
    setGeneratedInfo(fallbackDesigns[nextDemo.legacyKey]);
    setIsGenerating(true);
    setGenerationStage(1);
    setDemoRunKey((key) => key + 1);

    // Scroll smoothly to pipeline section
    setTimeout(() => {
      pipelineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  // Pre-fill a preset from the showcase card or buttons
  const triggerPreset = (preset: string | { id?: DemoPresetId; prompt: string }) => {
    const presetText = typeof preset === 'string' ? preset : preset.prompt;
    const presetId = typeof preset === 'string' ? undefined : preset.id;
    handleGenerate(presetText, presetId);
  };

  const navItems: { id: NavSectionId; label: string }[] = [
    { id: 'product', label: copy.navProduct },
    { id: 'demo', label: copy.navDemo },
    { id: 'features', label: copy.navFeatures },
    { id: 'pricing', label: copy.navPlans },
    { id: 'faq', label: copy.navFaq },
  ];

  // Return corresponding Icon Component based on icon string
  const renderIcon = (iconName: string, className = "h-5 w-5") => {
    switch (iconName) {
      case "TrendingUp": return <TrendingUp className={className} />;
      case "Globe": return <Globe className={className} />;
      case "Compass": return <Compass className={className} />;
      case "ShieldCheck": return <ShieldCheck className={className} />;
      case "Coins": return <Coins className={className} />;
      case "FileSpreadsheet": return <FileSpreadsheet className={className} />;
      case "UserCheck": return <UserCheck className={className} />;
      case "Sliders": return <Sliders className={className} />;
      case "Mail": return <Mail className={className} />;
      case "AlertTriangle": return <AlertTriangle className={className} />;
      case "LayoutGrid": return <LayoutGrid className={className} />;
      case "QrCode": return <QrCode className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  const demoComplete = generationStage === 4;
  const visibleResultLines = demoComplete
    ? activeDemo.resultLines
    : generationStage >= 3
      ? activeDemo.resultLines.slice(0, 2)
      : [];

  return (
    <div id="horizon-root" className="min-h-screen relative overflow-x-hidden selection:bg-orange-200 selection:text-orange-950">

      {/* Exquisite Top Navigation Bar */}
      <header className="fixed top-5 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl rounded-full border border-white/60 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl shadow-md z-50 transition-all">
        <div className="flex justify-between items-center py-2.5 px-6">

          {/* Logo with interactive click triggers (re-freshes) */}
          <a
            href="#product"
            onClick={(event) => scrollToSection(event, 'product')}
            className="flex items-center gap-2.5 group"
          >
            <Image
              src="/logo.png"
              alt="Genie Maker logo"
              width={36}
              height={36}
              className="h-9 w-9 object-contain select-none transition-all group-hover:scale-105 active:scale-95"
              priority
            />
            <span className="font-bold text-lg tracking-tight select-none">Genie Maker</span>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-1 rounded-full bg-white/35 p-1">
            {navItems.map((item) => {
              const isActive = activeNavId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => scrollToSection(event, item.id)}
                  className={`relative rounded-full px-3.5 py-1.5 text-[13.5px] transition-colors ${
                    isActive ? 'text-slate-950' : 'text-slate-500 hover:text-primary'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-slate-200/70"
                      transition={{ type: 'spring', stiffness: 420, damping: 34, mass: 0.7 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? 'font-semibold' : 'font-medium'}`}>
                    {item.label}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Nav Right CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLocale((current) => current === 'zh' ? 'en' : 'zh')}
              className="h-9 w-9 flex items-center justify-center rounded-full text-slate-500 hover:text-primary transition-colors hover:bg-slate-100"
              aria-label={copy.languageLabel}
              title={copy.languageLabel}
            >
              <Languages className="h-4 w-4" />
            </button>
            <a
              href="#demo"
              onClick={(event) => scrollToSection(event, 'demo')}
              className="bg-slate-900 text-white text-[13px] font-semibold px-5 py-2 rounded-full hover:bg-slate-800 active:scale-95 transition-all shadow-sm hidden sm:inline-flex"
            >
              {copy.startCta}
            </a>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden h-9 w-9 flex items-center justify-center rounded-full bg-slate-100 text-slate-700"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Nav Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-100/60 bg-white/95 px-6 py-4 flex flex-col gap-3 rounded-b-3xl"
            >
              {navItems.map((item, index) => {
                const isActive = activeNavId === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(event) => scrollToSection(event, item.id)}
                    className={`relative rounded-xl px-3 py-2 font-medium transition-colors ${
                      index < navItems.length - 1 ? 'border-b border-slate-100' : ''
                    } ${isActive ? 'text-slate-950 bg-slate-100' : 'text-slate-800 hover:text-primary'}`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Container */}
      <main className="w-full">

        {/* SECTION 1: HERO CONTAINER */}
        <section id="product" className="relative pt-40 pb-20 px-4 sm:px-8 md:px-16 min-h-[95vh] flex flex-col items-center justify-center text-center overflow-hidden">

          {/* Aesthetic Fluid Backdrop Shapes */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#38BDF8]/15 via-[#C084FC]/10 to-transparent -z-10" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-orange-400/10 to-indigo-500/15 rounded-full blur-[110px] -z-10" />

          {/* New Event Alert Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/60 border border-slate-200/50 rounded-full px-4 py-1.5 mb-7 shadow-sm backdrop-blur"
          >
            <span className="bg-orange-100 text-orange-600 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full">
              {copy.newBadge}
            </span>
            <span className="text-[12.5px] font-semibold text-slate-700">
              {copy.badge}
            </span>
          </motion.div>

          {/* Hero Header Typography */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mb-6 leading-[1.1]"
          >
            {copy.heroTitle}
          </motion.h1>

          {/* Hero Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mb-12"
          >
            {copy.heroSubtitle}
          </motion.p>

          {/* Prompt Entry Platform Box */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-[850px] bg-white rounded-3xl border border-slate-200 shadow-xl p-5 mb-8 backdrop-blur"
          >
            <div className="flex flex-col gap-4">
              <textarea
                value={promptInput}
                readOnly
                tabIndex={-1}
                className="w-full bg-transparent border-none resize-none text-base sm:text-lg text-slate-900 placeholder:text-slate-400 focus:ring-0 min-h-[95px] focus:outline-none cursor-default select-none"
                placeholder={copy.placeholder}
              />

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="p-2 rounded-full text-slate-400 cursor-default"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>

                <button
                  type="button"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="bg-white text-slate-900 border border-slate-200 rounded-full w-12 h-12 flex items-center justify-center transition-all shadow-md hover:bg-slate-50 cursor-default"
                >
                  <ArrowUp className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Simple Preset Suggestion Chips */}
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl">
            {presets.map((preset, index) => (
              <button
                key={index}
                onClick={() => triggerPreset(preset)}
                className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-200/80 shadow-xs rounded-full px-4.5 py-1.5 text-[12.5px] font-medium hover:border-slate-300 active:scale-95 transition-all cursor-pointer select-none"
              >
                {preset.label}
              </button>
            ))}
          </div>

        </section>

        {/* SECTION 2: LOCAL PRODUCT DEMO PLAYER */}
        <motion.div
          ref={pipelineRef}
          id="demo"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
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

                <div className="grid min-h-[620px] grid-cols-1 bg-slate-50 lg:grid-cols-[36%_64%]">
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

                    <div className="flex-1 space-y-5 overflow-hidden p-4">
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

                      <div className="min-h-0 flex-1 p-5">
                        <div className="flex h-full flex-col gap-4">
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

                          <div className="grid gap-4 lg:grid-cols-[1fr_0.78fr]">
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

                            <div className="space-y-4">
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

        {/* SECTION 3: FEATURE SLIDE SHOW 01 */}
        <RevealSection id="features" className="py-20 px-4 sm:px-8 md:px-16 relative">
          <RevealItem className="max-w-6xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[550px]">

            {/* Info Text Content */}
            <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{copy.featureEyebrow}</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 leading-tight">
                {copy.featureTitle}
              </h3>
              <p className="text-slate-600 text-[14.5px] leading-relaxed mb-8 max-w-md">
                {copy.featureText}
              </p>

              <a
                href="#demo"
                className="bg-white/90 border border-slate-200 text-slate-900 text-xs font-bold py-3 px-6 rounded-xl hover:bg-slate-50 transition-colors w-fit shadow-xs inline-flex items-center gap-1.5"
              >
                {copy.goCreator} <ArrowRight className="h-3.5 w-3.5 text-orange-500" />
              </a>
            </div>

            {/* Interactive Tab Frame (Swappable Tabs Visuals) */}
            <div className="flex-1 bg-slate-50/60 p-6 md:p-10 relative overflow-hidden flex flex-col justify-between border-l border-slate-100">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 via-indigo-500/5 to-transparent -z-10" />

              {/* Tabs Switcher Headers */}
              <div className="flex items-center justify-center mb-6">
                <div className="p-1 rounded-full border border-slate-200/80 bg-white shadow-xs inline-flex gap-1">
                  {(['chat', 'idea', 'narration'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTabFeature(tab)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all capitalize cursor-pointer ${
                        activeTabFeature === tab
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Display Screens */}
              <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between min-h-[220px]">

                {/* Chat Tab active */}
                {activeTabFeature === 'chat' && (
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <div className="w-5.5 h-5.5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold">A</div>
                      <div className="bg-slate-100 rounded-xl p-2.5 max-w-[85%] text-xs">
                        <p className="font-bold text-[9px] text-slate-500 mb-0.5">{copy.agentName}</p>
                        <p className="text-slate-700 leading-relaxed">{copy.agentLine}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-row-reverse">
                      <div className="w-5.5 h-5.5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10.5px] font-bold">U</div>
                      <div className="bg-orange-50 border border-orange-100 rounded-xl p-2.5 max-w-[85%] text-xs text-right">
                        <p className="font-bold text-[9px] text-orange-600 mb-0.5">{copy.you}</p>
                        <p className="text-slate-800 leading-relaxed text-left">{copy.userLine}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Idea Tab active */}
                {activeTabFeature === 'idea' && (
                  <div className="space-y-3">
                    <span className="text-[10px] bg-slate-100 text-indigo-700 font-bold px-2 py-0.5 rounded">{copy.conceptTag}</span>
                    <h5 className="font-bold text-slate-900 text-sm">{copy.conceptTitle}</h5>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {copy.conceptText}
                    </p>
                    <div className="p-2 border border-dashed border-slate-200 rounded-lg bg-slate-50 font-mono text-[10px] text-slate-600">
                      if (trend.heat &gt; 80) createDraftFromAssets();
                    </div>
                  </div>
                )}

                {/* Narration Tab active */}
                {activeTabFeature === 'narration' && (
                  <div className="space-y-3">
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded">{copy.voiceTag}</span>
                    <h5 className="font-bold text-slate-900 text-sm">{copy.voiceTitle}</h5>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {copy.voiceText}
                    </p>
                    <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold">
                      <div className="flex gap-0.5 items-end h-3">
                        <span className="w-0.5 h-2 bg-indigo-500 inline-block animate-bounce" />
                        <span className="w-0.5 h-3 bg-indigo-500 inline-block animate-bounce [animation-delay:0.2s]" />
                        <span className="w-0.5 h-1 bg-indigo-500 inline-block animate-bounce [animation-delay:0.4s]" />
                        <span className="w-0.5 h-2.5 bg-indigo-500 inline-block animate-bounce [animation-delay:0.1s]" />
                      </div>
                      <span>{copy.streaming}</span>
                    </div>
                  </div>
                )}

                {/* Mock bottom typing interface */}
                <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-[11px] text-slate-400 mt-2">
                  <span>{copy.sequence}</span>
                  <span className="font-semibold text-slate-700">{copy.awaitingBrief}</span>
                </div>

              </div>

            </div>

          </RevealItem>
        </RevealSection>

        {/* SECTION 4: FEATURE SLIDE SHOW 02 */}
        <RevealSection className="pb-20 px-4 sm:px-8 md:px-16 relative">
          <RevealItem className="max-w-6xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row-reverse min-h-[550px]">

            {/* Info Text Content */}
            <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{copy.opsEyebrow}</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 leading-tight">
                {copy.opsTitle}
              </h3>
              <p className="text-slate-600 text-[14.5px] leading-relaxed mb-8 max-w-md">
                {copy.opsText}
              </p>
              <div className="flex gap-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                  <Server className="h-4 w-4 text-emerald-500" /> {copy.materialLibrary}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                  <ShieldCheck className="h-4 w-4 text-orange-500" /> {copy.reviewReadyShort}
                </div>
              </div>
            </div>

            {/* Static Visual Card Representing deployment dashboard */}
            <div className="flex-1 bg-slate-50/60 p-6 md:p-10 relative overflow-hidden flex items-center justify-center border-r border-slate-100">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-indigo-500/5 to-transparent -z-10" />

              <div className="relative w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-md p-6">

                {/* Header widget */}
                <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-orange-100 flex items-center justify-center text-orange-500 font-bold">
                      <Globe className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block font-bold text-xs text-slate-900">{copy.registry}</span>
                      <span className="text-[9px] text-slate-400 font-mono">v1.12-ready</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] text-slate-400 font-mono uppercase font-bold text-teal-600">{copy.healthy}</span>
                    <div className="flex gap-0.5 items-center h-2.5 mt-0.5 select-none">
                      <span className="w-1 h-2 bg-emerald-400 rounded-full" />
                      <span className="w-1 h-3 bg-emerald-400 rounded-full" />
                      <span className="w-1 h-1.5 bg-emerald-400 rounded-full" />
                      <span className="w-1 h-2.5 bg-emerald-400 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Body Details */}
                <div className="space-y-3.5">
                  <div>
                    <div className="flex justify-between items-center text-xs text-slate-650 font-medium mb-1">
                      <span>{copy.readiness}</span>
                      <span className="font-bold font-mono">99.98%</span>
                    </div>
                    <div className="h-1 text-xs w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full w-[85%] bg-gradient-to-r from-orange-500 to-indigo-500 rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-2 pt-1 border-t border-slate-50 text-[11px] text-slate-500">
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> {copy.assetLinks}</span>
                      <span className="font-mono">{copy.active}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> {copy.metadataReady}</span>
                      <span className="font-mono">{copy.ok}</span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center text-xs mt-2 font-semibold">
                    <span className="flex items-center gap-1 text-slate-800">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> {copy.workflowActive}
                    </span>
                    <span className="text-slate-400 text-[10px] font-mono">{copy.reviewQueue}</span>
                  </div>
                </div>

              </div>

            </div>

          </RevealItem>
        </RevealSection>

        {/* SECTION 5: GALLERY SHOWCASE (CLICK TO RUN PRESETS) */}
        <RevealSection className="py-24 bg-white relative overflow-hidden border-t border-slate-200">

          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

          <RevealItem className="max-w-6xl mx-auto px-4 sm:px-8 text-center mb-16 relative z-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4">
              {copy.showcaseTitle}
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">
              {copy.showcaseText}
            </p>
          </RevealItem>

          {/* Interactive Showcase Horizontal Loop / Row */}
          <div className="w-full flex gap-6 overflow-x-auto px-6 pb-12 snap-x snap-mandatory hide-scrollbar justify-center max-w-7xl mx-auto">

            {/* ShowCard 1 */}
            <motion.div
              variants={itemReveal}
              onClick={() => triggerPreset(locale === 'zh' ? "基于产品资料、热点角度和品牌图片，生成一篇小红书笔记。" : "Create a Xiaohongshu note from a product sheet, trend angle, and saved brand images.")}
              className="snap-center shrink-0 w-[280px] sm:w-[320px] h-[340px] bg-slate-50 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-350 hover:shadow-md transition-all p-5 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="h-6 w-fit px-2 py-0.5 rounded bg-sky-50 border border-sky-100 text-sky-700 text-[10.5px] font-bold">
                  {copy.card1Tag}
                </div>
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">{copy.card1Title}</h4>
                <p className="text-slate-550 text-xs leading-relaxed">
                  {copy.card1Text}
                </p>
              </div>

              {/* Mock Graphic */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-3 h-[140px] flex flex-col justify-between">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                </div>
                <div className="flex gap-2 items-end justify-between h-[80px] pt-4">
                  <div className="w-full bg-sky-200 h-[60%] rounded-sm" />
                  <div className="w-full bg-primary/25 h-[80%] rounded-sm" />
                  <div className="w-full bg-indigo-200 h-[40%] rounded-sm" />
                  <div className="w-full bg-emerald-250 h-[90%] rounded-sm" />
                </div>
              </div>
            </motion.div>

            {/* ShowCard 2 */}
            <motion.div
              variants={itemReveal}
              onClick={() => triggerPreset(locale === 'zh' ? "追踪创作者经济话题，并把反复出现的信号转成活动选题。" : "Track creator economy topics and convert recurring signals into campaign angles.")}
              className="snap-center shrink-0 w-[280px] sm:w-[320px] h-[340px] bg-slate-50 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-350 hover:shadow-md transition-all p-5 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="h-6 w-fit px-2 py-0.5 rounded bg-purple-50 border border-purple-100 text-purple-700 text-[10.5px] font-bold">
                  {copy.card2Tag}
                </div>
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">{copy.card2Title}</h4>
                <p className="text-slate-550 text-xs leading-relaxed">
                  {copy.card2Text}
                </p>
              </div>

              {/* Mock Graphic */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-3 h-[140px] flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="h-3 w-full bg-slate-100 rounded" />
                  <div className="h-3 w-[80%] bg-slate-100 rounded" />
                </div>
                <div className="flex justify-between items-center text-[10.5px] text-teal-600 font-bold bg-teal-50 px-2 py-1.5 rounded-lg border border-teal-100">
                  <span>{copy.signalVerified}</span>
                  <span>12 hits</span>
                </div>
              </div>
            </motion.div>

            {/* ShowCard 3 */}
            <motion.div
              variants={itemReveal}
              onClick={() => triggerPreset(locale === 'zh' ? "整理一组可复用素材：产品图片、文案片段、标签和文件夹。" : "Prepare a reusable material set with product images, copy snippets, tags, and folders.")}
              className="snap-center shrink-0 w-[280px] sm:w-[320px] h-[340px] bg-slate-50 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-350 hover:shadow-md transition-all p-5 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="h-6 w-fit px-2 py-0.5 rounded bg-orange-50 border border-orange-100 text-orange-700 text-[10.5px] font-bold">
                  {copy.card3Tag}
                </div>
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">{copy.card3Title}</h4>
                <p className="text-slate-550 text-xs leading-relaxed">
                  {copy.card3Text}
                </p>
              </div>

              {/* Mock Graphic */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-3 h-[140px] flex flex-col justify-center">
                <div className="flex gap-2 items-center">
                  <div className="w-7 h-7 rounded bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">
                    ★
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="h-2.5 w-1/2 bg-slate-200 rounded" />
                    <div className="h-2 w-1/3 bg-slate-100 rounded" />
                  </div>
                </div>
                <div className="h-10 mt-3 bg-slate-50 border border-slate-100 rounded-lg" />
              </div>
            </motion.div>

          </div>
        </RevealSection>

        {/* SECTION 6: TRANSPARENT PRICING SCHEME */}
        <RevealSection id="pricing" className="py-24 bg-slate-50/50 border-t border-slate-100 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">

              {/* Column 1: Pricing Description Information */}
              <RevealItem className="p-8 flex flex-col justify-center bg-white rounded-2xl border border-slate-200 shadow-xs">
                <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4">
                  {copy.pricingTitle}
                </h3>
                <p className="text-slate-500 text-[14.5px] leading-relaxed mb-6">
                  {copy.pricingText}
                </p>
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-widest flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500" /> {copy.pricingHint}
                </div>
              </RevealItem>

              {/* Column 2: Free Tier */}
              <RevealItem className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-slate-350 transition-all shadow-xs flex flex-col relative overflow-hidden justify-between">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#38BDF8]" />
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{copy.freeTitle}</h4>
                  <p className="text-slate-400 text-xs mb-6">{copy.freeDesc}</p>

                  <div className="text-4xl font-extrabold text-slate-900 mb-6 font-mono">
                    $0<span className="text-sm text-slate-400 font-normal">/mo</span>
                  </div>

                  <ul className="space-y-4 mb-8 text-xs text-slate-600 font-semibold">
                    <li className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 text-emerald-500" /> {copy.free1}
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 text-emerald-500" /> {copy.free2}
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 text-emerald-500" /> {copy.free3}
                    </li>
                  </ul>
                </div>

                <a
                  href="#product"
                  className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 rounded-xl py-3 text-xs font-semibold text-center transition-colors shadow-xs"
                >
                  {copy.startCreating}
                </a>
              </RevealItem>

              {/* Column 3: Pro Paid Tier */}
              <RevealItem className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-slate-350 hover:shadow-lg transition-all shadow-sm flex flex-col relative overflow-hidden justify-between">
                <div className="absolute top-3 right-3 bg-slate-900 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {copy.popular}
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{copy.teamTitle}</h4>
                  <p className="text-slate-400 text-xs mb-6">{copy.teamDesc}</p>

                  <div className="text-4xl font-extrabold text-slate-900 mb-6 font-mono">
                    $20<span className="text-sm text-slate-400 font-normal">/mo</span>
                  </div>

                  <ul className="space-y-4 mb-8 text-xs text-slate-600 font-semibold">
                    <li className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 text-slate-900" /> {copy.team1}
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 text-slate-900" /> {copy.team2}
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 text-slate-900" /> {copy.team3}
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 text-slate-900" /> {copy.team4}
                    </li>
                  </ul>
                </div>

                <a
                  href="#product"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-3 text-xs font-semibold text-center transition-colors shadow-sm"
                >
                  {copy.upgradeTeam}
                </a>
              </RevealItem>

            </div>

            {/* Bottom Enterprise Row */}
            <RevealItem className="mt-8 bg-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between border border-slate-200 shadow-xs relative overflow-hidden">
              <div className="absolute inset-0 bg-[#38BDF8]/2 pointer-events-none -z-10" />
              <div>
                <h4 className="font-bold text-lg text-slate-900 mb-1">{copy.enterpriseTitle}</h4>
                <p className="text-slate-500 text-xs">
                  {copy.enterpriseText}
                </p>
              </div>

              <button
                onClick={() => {
                  alert(copy.contactAlert);
                }}
                className="mt-4 md:mt-0 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-semibold py-2.5 px-6 rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                {copy.contactTeam}
              </button>
            </RevealItem>

          </div>
        </RevealSection>

        {/* SECTION 7: INTERACTIVE ACCORDION FAQS */}
        <RevealSection id="faq" className="py-24 bg-white border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col lg:flex-row gap-12 sm:gap-16">

            {/* Left Header Area */}
            <RevealItem className="lg:w-1/3">
              <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 leading-tight sticky top-28">
                {copy.faqTitle}
              </h2>
              <p className="text-slate-400 text-xs mt-4 leading-relaxed max-w-xs">
                {copy.faqIntro}
              </p>
            </RevealItem>

            {/* Right Accordion Questions list */}
            <RevealItem className="lg:w-2/3 flex flex-col divide-y divide-slate-150">
              {faqItems.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="py-4.5 transition-colors">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex justify-between items-center text-left py-2 font-semibold text-[15.5px] text-slate-900 hover:text-primary transition-all group"
                      aria-expanded={isOpen}
                    >
                      <span className="font-bold pr-4">{faq.question}</span>
                      <span className="text-slate-400 group-hover:text-primary transition-colors shrink-0">
                        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="text-slate-550 text-[13.5px] leading-relaxed pt-2 pb-3 max-w-xl text-slate-600">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </RevealItem>

          </div>
        </RevealSection>

        {/* SECTION 8: FINAL CTA INTEGRATIVE CARD WITH PARTICLES */}
        <RevealSection className="py-28 px-4 sm:px-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[55vh] border-t border-slate-200 bg-slate-900 text-white">

          {/* Cosmic background shapes */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#1e1b4b_0%,transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,#311042_0%,transparent_60%)] pointer-events-none" />

          <RevealItem className="relative z-10 text-center max-w-2xl mx-auto space-y-8 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1]">
              {copy.finalTitle}
            </h2>

            <p className="text-slate-450 text-sm sm:text-base text-slate-405 leading-relaxed max-w-lg mx-auto">
              {copy.finalText}
            </p>

            <div className="pt-4">
              <a
                href="#horizon-root"
                className="bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 font-bold px-7 py-3 rounded-full hover:scale-105 active:scale-95 transition-all shadow-md inline-flex items-center gap-2"
              >
                {copy.goBrief} <ArrowUp className="h-4 w-4 text-orange-500 font-bold" />
              </a>
            </div>
          </RevealItem>

        </RevealSection>

      </main>

      {/* FOOTER NAVIGATION SUMMARY */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 text-xs sm:text-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-8">

          {/* Logo item */}
          <div className="flex items-center gap-2 text-white">
            <Image
              src="/logo.png"
              alt="Genie Maker logo"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
            <span className="font-bold tracking-tight text-slate-100">{copy.footerBrand}</span>
          </div>

          {/* Links links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-[12.5px] text-slate-405">
            <a href="#" className="hover:text-white transition-colors">{copy.privacy}</a>
            <a href="#" className="hover:text-white transition-colors">{copy.terms}</a>
            <a href="#" className="hover:text-white transition-colors">{copy.security}</a>
            <a href="#" className="hover:text-white transition-colors">{copy.status}</a>
            <a href="#" className="hover:text-white transition-colors">{copy.support}</a>
          </div>

          {/* Copyright information */}
          <div className="text-[11.5px] text-slate-500">
            &copy; {new Date().getFullYear()} Genie Maker. {copy.copyright}
          </div>

        </div>
      </footer>

    </div>
  );
}
