# Genie Maker Official Website

Genie Maker 的中英文产品官网，基于 Next.js App Router 构建。网站展示 AI 内容运营工作台、创作演示、功能、价格方案和常见问题。

## 技术栈

- Next.js 16、React 19、TypeScript
- Tailwind CSS 4
- Motion for React
- pnpm

## 本地开发

环境要求：

- Node.js 20.9 或更高版本
- pnpm 10.34.5

安装依赖并启动开发服务器：

```bash
pnpm install
pnpm dev
```

网站默认运行在 <http://localhost:3001>，根路径会跳转到中文页面：

- `/zh`：简体中文
- `/en`：English

## 常用命令

```bash
pnpm dev          # 启动开发服务器
pnpm check        # 依次运行 ESLint、TypeScript 和测试
pnpm test:i18n    # 检查多语言路由及构建产物
pnpm build        # 创建生产构建
pnpm start        # 在 3001 端口启动生产服务器
```

## 项目结构

```text
app/
├── [locale]/             # 中英文页面、元数据和静态参数
├── (redirect)/           # 根路径重定向
├── components/           # 页面布局、区块和交互状态
└── data/                 # 文案、演示数据、FAQ 和类型
public/                   # 静态资源
tests/                    # 路由与国际化检查
```

`LocalizedHomePage` 保持为服务端组件。跨区块的导航和演示状态集中在轻量的 `HomePageInteractionProvider` 中，各交互区块作为独立客户端组件运行。

## 生产部署

常规 Node.js 部署：

```bash
pnpm build
pnpm start
```

需要 Next.js standalone 产物时，在构建环境中设置：

```bash
NEXT_OUTPUT_STANDALONE=true pnpm build
```

提交前建议运行：

```bash
pnpm check
pnpm build
pnpm audit --prod --registry=https://registry.npmjs.org
```
