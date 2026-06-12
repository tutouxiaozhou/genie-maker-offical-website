export type DemoPresetId = 'rewrite' | 'shortVideo' | 'trends';
export type Locale = 'zh' | 'en';

export const navSectionIds = ['product', 'demo', 'features', 'pricing', 'faq'] as const;
export type NavSectionId = (typeof navSectionIds)[number];

export interface Preset {
  id: DemoPresetId;
  label: string;
  prompt: string;
}

export interface DemoScript {
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
}

export interface FallbackDesign {
  appName: string;
  appSubtitle: string;
  colorPalette: {
    primary: string;
    secondary: string;
    background: string;
  };
  keyFeatures: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  databaseTables: Array<{
    name: string;
    description: string;
    columns: string[];
  }>;
  mockChatConversation: Array<{
    sender: string;
    message: string;
  }>;
}