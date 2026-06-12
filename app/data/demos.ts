import type { DemoScript, FallbackDesign } from './types';

export const FALLBACK_DESIGNS: Record<string, FallbackDesign> = {
  creation: {
    appName: "Genie Content Studio",
    appSubtitle: "AI-assisted ideation, copywriting, storyboard, and publishing prep",
    colorPalette: {
      primary: "#FF5E3A",
      secondary: "#38BDF8",
      background: "#0F172A",
    },
    keyFeatures: [
      { title: "Structured Creation", description: "Turn prompts, attachments, and saved assets into structured content drafts.", icon: "TrendingUp" },
      { title: "Trend Context", description: "Convert live trend signals into angles, outlines, and platform-ready posts.", icon: "Globe" },
      { title: "Automated Funnels", description: "Save copy, generated images, and references back into the material library.", icon: "Compass" }
    ],
    databaseTables: [
      { name: "CreationSessions", description: "Stores AI chat sessions, prompts, generated outputs, and workbench snapshots.", columns: ["id: uuid", "topic: string", "status: varchar", "payload: jsonb", "updated_at: datetime"] },
      { name: "ContentDrafts", description: "Maintains draft titles, platform settings, assets, tags, and publish state.", columns: ["id: uuid", "title: string", "platform: varchar", "tags: jsonb", "status: varchar"] }
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
      { title: "Hot List Coverage", description: "Collect platform hot lists and reveal category, rank, heat, and crawl batches.", icon: "ShieldCheck" },
      { title: "Keyword Tracking", description: "Schedule topic searches across engines and platforms with custom domains.", icon: "Coins" },
      { title: "Creator Signals", description: "Turn recurring trend results into actionable angles for content teams.", icon: "FileSpreadsheet" }
    ],
    databaseTables: [
      { name: "HotspotBatches", description: "Stores crawl batches, platform coverage, success counts, and source timestamps.", columns: ["id: uuid", "platform: varchar", "success_count: int", "failed_count: int", "crawled_at: datetime"] },
      { name: "TrackTasks", description: "Stores keyword groups, search engines, trigger windows, and enabled states.", columns: ["id: uuid", "name: string", "keywords: jsonb", "schedule: jsonb", "enabled: boolean"] }
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
      { title: "Multi-Type Assets", description: "Manage images, videos, documents, and reusable copy in one library.", icon: "UserCheck" },
      { title: "Folders & Tags", description: "Keep personal and organization assets searchable by folder, tag, and type.", icon: "Sliders" },
      { title: "AI Saveback", description: "Save generated copy and images directly from the AI workbench to the library.", icon: "Mail" }
    ],
    databaseTables: [
      { name: "Materials", description: "Stores asset metadata, file ids, library scope, folders, tags, and remarks.", columns: ["id: uuid", "name: string", "type: varchar", "scope: varchar", "file_id: bigint"] },
      { name: "MaterialTags", description: "Keeps reusable labels for filtering assets and composing content workflows.", columns: ["id: uuid", "label: string", "color: varchar", "created_at: datetime"] }
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
      { title: "Node-Based Runs", description: "Configure repeatable workflows for research, drafting, asset handling, and review.", icon: "AlertTriangle" },
      { title: "Execution Logs", description: "Inspect run status, node output, artifacts, and partial failures in one place.", icon: "LayoutGrid" },
      { title: "Publishing Prep", description: "Move approved content into drafts and route it to connected social accounts.", icon: "QrCode" }
    ],
    databaseTables: [
      { name: "WorkflowDefinitions", description: "Stores workflow nodes, edges, triggers, and organization-level configuration.", columns: ["id: uuid", "name: string", "nodes: jsonb", "edges: jsonb", "enabled: boolean"] },
      { name: "WorkflowRuns", description: "Tracks executions, node logs, output artifacts, status, and runtime metadata.", columns: ["id: uuid", "workflow_id: uuid", "status: varchar", "artifacts: jsonb", "started_at: datetime"] }
    ],
    mockChatConversation: [
      { sender: "user", message: "Run a workflow that researches a trend and drafts a post." },
      { sender: "agent", message: "Started the workflow and recorded each node output in the execution log." },
      { sender: "user", message: "Send the approved result to publishing prep." },
      { sender: "agent", message: "Created a draft with assets, tags, platform settings, and review status." }
    ]
  }
};

export const FALLBACK_DESIGNS_ZH: Record<string, FallbackDesign> = {
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

export const DEMO_SCRIPTS: Record<string, DemoScript> = {
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

export const DEMO_SCRIPTS_ZH: Record<string, DemoScript> = {
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