import type { Preset } from './types';

export const PRESETS: Preset[] = [
  { id: 'rewrite', label: "Rewrite materials", prompt: "Turn a product feature brief into a Xiaohongshu recommendation post." },
  { id: 'shortVideo', label: "Video script", prompt: "Create a 30-second Douyin voiceover script for a product recommendation." },
  { id: 'trends', label: "Trend breakdown", prompt: "Break down recent Xiaohongshu beauty topic patterns into content ideas." }
];

export const PRESETS_ZH: Preset[] = [
  { id: 'rewrite', label: "素材改写为内容", prompt: "帮我把产品功能介绍文档改写成一条小红书种草笔记" },
  { id: 'shortVideo', label: "短视频脚本生成", prompt: "帮我生成一条抖音口播视频脚本，主题是母婴好物推荐，时长 30 秒" },
  { id: 'trends', label: "爆款选题拆解", prompt: "帮我拆解最近 7 天小红书美妆类目的爆款封面和标题规律" },
];