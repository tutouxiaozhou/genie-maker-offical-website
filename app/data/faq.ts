export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
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

export const FAQ_ITEMS_ZH: FaqItem[] = [
  { question: "Genie Maker 是什么？", answer: "Genie Maker 是面向内容团队的 AI 创作运营工作台，帮助团队把热点、素材和想法转成可发布的社媒内容。" },
  { question: "Genie Maker 怎么工作？", answer: "团队可以和 AI 创作助手对话，引用素材库内容，追踪热点信号，生成草稿，并为已连接的社媒账号准备发布。" },
  { question: "生成内容和素材能统一管理吗？", answer: "可以。生成文案、图片、参考资料、文档和可复用片段都能保存到个人库或组织库，并支持文件夹和标签。" },
  { question: "支持哪些平台？", answer: "工作台面向多平台内容运营设计，包括小红书、抖音、视频号、微信公众号、X / Twitter 和 B 站等。" },
  { question: "团队能管理组织和共享素材吗？", answer: "可以。Genie Maker 支持组织上下文、成员管理、共享素材和按组织隔离的内容工作流。" },
  { question: "支持可复用工作流吗？", answer: "支持。工作流配置和执行日志可以帮助团队标准化热点研究、起草、审核、素材处理和发布准备。" }
];