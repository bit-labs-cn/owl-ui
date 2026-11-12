<h1>OwlUI</h1>

[![license](https://img.shields.io/github/license/pure-admin/vue-pure-admin.svg)](LICENSE)

**中文** | [English](./README.en-US.md)

## 简介

`@bit-labs.cn/owl-ui` 是基于 [vue-pure-admin](https://github.com/pure-admin/vue-pure-admin) 二次开发的 **Vue 3 企业级后台框架库**。它不是独立运行的应用，而是给宿主应用提供认证、动态路由、国际化和子系统扩展。界面与业务逻辑分层：`theme/default` 是默认后台皮肤，`core` 是不含界面代码的核心层。

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
| 构建 | Vite | ^6.0 |

> Node：`^18.18.0 || ^20.9.0 || >=22.0.0`。包管理器：pnpm >= 9。

## 目录结构

```
src/
└── index.ts                 # 包公开入口：重新导出 core，以及共享组件和默认布局
builder/                     # 共享 Vite 工具链
├── build-preset/            #   构建预设（别名、压缩等）
├── scripts/                 #   宿主的 dev / build 脚本
└── vite-configure/          #   Vite 配置分块
core/                        # 纯 TypeScript。不引用 .vue 和样式
├── bootstrap.ts             #   createFlexAdminCore
├── ui-kit.ts                #   皮肤向核心注册布局和页面
├── api/                     #   登录、刷新 Token、动态路由
├── config/                  #   platform-config.json
├── router/                  #   静态路由和动态路由
├── store/                   #   Pinia
├── subsystem/               #   defineSubsystem
├── utils/                   #   auth、http、message、tree
└── layout/                  #   布局类型和常量
theme/
├── default/                 # 默认后台：顶栏、侧栏、标签页、设置面板
│   ├── bootstrap.ts         #   createFlexAdmin，包导出 ./bootstrap 指向这里
│   ├── layout/
│   ├── views/               #   登录、欢迎、门户、错误页
│   └── style/
└── shared/                  # 界面层共用资产
    ├── components/          #   ReDialog、ReIcon、PureTableBar、OwlLoading 等
    ├── directives/
    ├── plugins/             #   i18n、Element Plus、ECharts
    └── assets/
```

`core` 不引用 `.vue`。皮肤通过 `ui-kit` 把布局和登录、欢迎、错误页注册进去。业务页面放在子系统包里，不放进这个仓库。

## 布局与界面

皮肤通过 `ui-kit` 把布局和登录、欢迎、错误页注册进去，`core` 只负责路由、权限、菜单和 HTTP。默认皮肤提供垂直、水平、混合三种布局，支持多色主题、明暗切换、标签栏和菜单搜索。

`@bit-labs.cn/owl-ui` 这个包名本身不启动应用，它导出的是公开 API。

## 快速开始

```ts
// frontend/admin/main.ts
import { createFlexAdmin } from "@bit-labs.cn/owl-ui/bootstrap";
import adminSubsystem from "@bit-labs.cn/owl-admin-ui";

createFlexAdmin({
  subsystems: [adminSubsystem]
}).then(app => app.mount("#app"));
```

### 子系统菜单贡献

子系统用 `menuContributions` 把菜单挂到已有菜单节点上。挂载点是目标菜单的路由 `name`。

```ts
import { defineSubsystem } from "@bit-labs.cn/owl-ui";

export default defineSubsystem({
  name: "liftvision",
  viewModulesPathPrefix: "/lift-vision",
  viewModules: import.meta.glob("./views/**/*.{vue,tsx}"),
  menuContributions: [
    {
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

- `menus` 在动态路由装配时并进后端菜单树，再一起渲染。
- `targetMenuName` 对不上时，这条贡献会被跳过并留下告警，其他菜单不受影响。
- 同一父节点下按 `name + path` 去重。

### 登录页定制

子系统可以在 `defineSubsystem` 里声明 `login`。登录请求仍由 owl-ui 处理。

default 皮肤在声明了 `bg` 之后使用全屏背景加右侧表单。没声明时用内置登录页。`title` 和 `subtitle` 用来覆盖登录页上的品牌文案。

背景图建议放在子系统包的 `src/assets/login/bg.png`。

```ts
import { defineSubsystem } from "@bit-labs.cn/owl-ui";
import loginBg from "./assets/login/bg.png";

export default defineSubsystem({
  name: "myapp",
  viewModules: import.meta.glob("./views/**/*.{vue,tsx}"),
  login: {
    bg: loginBg,
    title: "欢迎回来",
    subtitle: "请输入您的账号信息以登录系统",
    primaryColor: "#06b6d4",
    loginFormWidth: "480px"
  }
});
```

多个子系统声明同一字段时，`subsystems` 数组里靠后的覆盖靠前的。`title` 没写时用平台配置里的站点名。`SubsystemLoginCustomization` 从 `@bit-labs.cn/owl-ui` 导出。

宿主 `frontend/admin` 里，浏览器标题来自项目的构建配置。侧栏标志默认找当前子系统包的 `src/assets/logo.png`。`login` 只影响登录页。

### 开发与构建

在宿主的 `frontend/admin` 里启动，不在本仓库根目录启动：

```bash
pnpm install
pnpm dev
pnpm build
```

`dev` / `build` 会调用 `owl-ui/builder/scripts/run-project.mjs`。

### 环境变量（宿主）

| 变量 | 说明 |
|------|------|
| `VITE_PUBLIC_PATH` | 公共基础路径 |
| `VITE_ROUTER_HISTORY` | `hash` 或 `history` |
| `VITE_HIDE_HOME` | 是否隐藏首页 |
| `VITE_HTTP_TIMEOUT` | 请求超时（毫秒）。缺省 `60000`，`0` 表示不超时 |
| `VITE_BASE_URL` | 接口根地址 |
| `VITE_PORT` | 开发服务端口 |

### 平台配置

宿主在 `public/platform-config.json` 里提供运行时配置：

```jsonc
{
  "Title": "后台管理",
  "FixedHeader": true,
  "Layout": "vertical",
  "Theme": "clean",
  "Locale": "zh",
  "EpThemeColor": "#409EFF",
  "HttpTimeout": 60000
}
```

`Layout` 的 `horizontal` 和 `mix` 决定默认皮肤用水平还是混合布局。`Theme` 和 `EpThemeColor` 驱动多色主题，明暗状态记在 `layout.darkMode`。

## 状态管理

| Store | 职责 |
|-------|------|
| `user` | 用户信息、登录 / 登出、Token 刷新 |
| `permission` | 菜单树、路由扁平化、页面缓存 |
| `app` | 布局模式、侧栏、设备和视口 |
| `multiTags` | 已打开页面 |
| `epTheme` | Element Plus 主题色 |
| `settings` | 标题、固定顶栏、隐藏侧栏 |

## 致谢

本项目基于 [vue-pure-admin](https://github.com/pure-admin/vue-pure-admin)，感谢原作者 [xiaoxian521](https://github.com/xiaoxian521) 和社区贡献者。

## 许可证

[MIT © 2020-present, pure-admin](./LICENSE)
