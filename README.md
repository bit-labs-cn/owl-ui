<h1>OwlUI</h1>

[![license](https://img.shields.io/github/license/pure-admin/vue-pure-admin.svg)](LICENSE)

**中文** | [English](./README.en-US.md)

## 简介

`@bit-labs.cn/owl-ui` 是一个基于 [vue-pure-admin](https://github.com/pure-admin/vue-pure-admin) 二次开发的 **Vue 3 企业级后台框架库**。它不是独立运行的应用，而是作为可复用的核心包，为宿主应用提供完整的后台管理能力——包括认证、动态路由、多布局、主题切换、国际化以及子系统扩展机制。

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | Vue | ^3.5 |
| 路由 | vue-router | ^4.5 |
| 状态管理 | Pinia | ^2.3 |
| UI 组件 | Element Plus | ^2.9 |
| 国际化 | vue-i18n | ^10.0 |
| HTTP | Axios | ^1.7 |
| 图表 | ECharts | ^5.5 |
| 工具 | @vueuse/core | ^12.0 |
| 类型 | TypeScript | 5.6 |

> Node 要求：`^18.18.0 || ^20.9.0 || >=22.0.0`，包管理器：pnpm >= 9

## 目录结构

```
src/
├── index.ts                 # 主入口，统一导出
├── bootstrap.ts             # createFlexAdmin 引导函数
├── App.vue                  # 根组件
├── api/                     # 接口层（登录、Token 刷新、动态路由等）
├── assets/                  # 静态资源（图标、插图、SVG）
├── components/              # 通用组件
│   ├── ReAuth/              #   权限指令组件
│   ├── ReDialog/            #   弹窗管理
│   ├── ReIcon/              #   图标（离线 / 在线 / iconfont）
│   ├── ReCountTo/           #   数字动画
│   ├── ReSegmented/         #   分段选择器
│   ├── ReCol/               #   响应式栅格
│   ├── RePureTableBar/      #   表格工具栏
│   └── ...
├── config/                  # 平台配置（读取 platform-config.json）
├── directives/              # 自定义指令（权限、复制、长按、水波纹等）
├── layout/                  # 布局系统
│   ├── components/          #   导航栏、侧边栏、标签页、设置面板等
│   └── hooks/               #   主题、布局、标签、导航等 composable
├── plugins/                 # 插件注册（i18n、Element Plus、ECharts）
├── router/                  # 路由（静态路由 + 动态路由注入）
├── store/                   # Pinia 状态（user、permission、app、multiTags、epTheme、settings）
├── style/                   # 全局样式（重置、主题、暗色、过渡动画）
├── subsystem/               # 子系统机制（defineSubsystem、注册表）
├── utils/                   # 工具函数（auth、http、tree、progress 等）
└── views/                   # 页面（login、welcome、error、placeholder）
```

## 核心特性

- **子系统架构** — 通过 `defineSubsystem` 注册独立业务模块，每个子系统可携带路由、国际化、视图和安装钩子
- **认证与授权** — 登录、Token 无感刷新、角色 / 权限控制（指令 + 组件双模式）
- **动态路由** — 支持后端返回菜单，前端自动注入路由并生成导航
- **多布局** — 垂直（vertical）、水平（horizontal）、混合（mix）三种布局可切换
- **主题系统** — 浅色 / 深色 / 跟随系统，可自定义主题色，支持灰色与色弱模式
- **多标签页** — 标签缓存、KeepAlive、右键菜单
- **国际化** — 内置中 / 英双语，基于 vue-i18n + YAML 翻译文件
- **响应式适配** — 移动端自动折叠侧边栏，断点响应式 storage

## 快速开始

### 在宿主应用中使用

```ts
// main.ts
import { createFlexAdmin } from "@bit-labs.cn/ow-ui/bootstrap";
import adminSubsystem from "@bit-labs.cn/subsystem-admin";

createFlexAdmin({
  subsystems: [adminSubsystem]
}).then(app => app.mount("#app"));
```

### 子系统菜单贡献（跨系统挂载）

子系统可通过 `menuContributions` 将菜单挂载到其他子系统的菜单节点。  
挂载点通过目标菜单的路由 `name` 定位（例如挂到 `admin` 的某个目录下）。

```ts
import { defineSubsystem } from "@bit-labs.cn/owl-ui";

export default defineSubsystem({
  name: "liftvision",
  viewModulesPathPrefix: "/lift-vision",
  viewModules: import.meta.glob("./views/**/*.{vue,tsx}"),
  menuContributions: [
    {
      // 目标菜单 name（来自后端返回菜单）
      targetMenuName: "SystemManage",
      menus: [
        {
          path: "/lift-vision/device",
          name: "LiftVisionDevice",
          component: "/lift-vision/device/index",
          meta: {
            title: "设备管理",
            icon: "ep:monitor",
            rank: 20,
            roles: ["admin"]
          }
        }
      ]
    }
  ]
});
```

说明：

- `menus` 会在动态路由装配阶段与后端菜单树合并后再统一渲染和注入。
- 若 `targetMenuName` 未命中，框架会跳过该贡献并输出告警，不影响其他菜单。
- 同一父节点下按 `name + path` 去重，避免重复注入。

### 开发与构建

框架本身不独立运行，需通过宿主应用（如 `new/app`）启动：

```bash
# 安装依赖
pnpm install

# 启动开发服务
pnpm dev

# 生产构建
pnpm build

# 预发布构建
pnpm build:staging

# 代码检查
pnpm lint
```

### 环境变量（宿主应用）

| 变量 | 说明 |
|------|------|
| `VITE_PUBLIC_PATH` | 公共基础路径 |
| `VITE_ROUTER_HISTORY` | 路由模式（`hash` / `history`） |
| `VITE_HIDE_HOME` | 是否隐藏首页 |

### 平台配置

运行时通过 `public/platform-config.json` 配置：

```jsonc
{
  "Title": "LiftVision",         // 网站标题
  "FixedHeader": true,            // 固定顶栏
  "Layout": "vertical",           // 布局模式
  "Theme": "light",               // 主题
  "Locale": "zh",                 // 语言
  "EpThemeColor": "#409EFF"       // Element Plus 主题色
}
```

## 状态管理

| Store | 职责 |
|-------|------|
| `user` | 用户信息、登录 / 登出、Token 刷新 |
| `permission` | 菜单树、路由扁平化、页面缓存列表 |
| `app` | 布局模式、侧边栏状态、设备与视口 |
| `multiTags` | 多标签页管理与持久化 |
| `epTheme` | Element Plus 主题色与模式 |
| `settings` | 标题、固定头部、隐藏侧边栏 |

## 致谢

本项目基于 [vue-pure-admin](https://github.com/pure-admin/vue-pure-admin) 构建，感谢原作者 [xiaoxian521](https://github.com/xiaoxian521) 及社区贡献者。

## 许可证

[MIT © 2020-present, pure-admin](./LICENSE)
