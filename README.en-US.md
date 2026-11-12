<h1>OwlUI</h1>

[![license](https://img.shields.io/github/license/pure-admin/vue-pure-admin.svg)](LICENSE)

**English** | [中文](./README.md)

## Introduction

`@bit-labs.cn/owl-ui` is a **Vue 3 admin framework** based on [vue-pure-admin](https://github.com/pure-admin/vue-pure-admin). It is not a standalone app. Host applications use it for authentication, dynamic routes, i18n, and subsystems. The UI and business logic are separated: `theme/default` is the default admin skin, and `core` is the layer without any UI code.

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | Vue | ^3.5 |
| Router | vue-router | ^4.5 |
| State | Pinia | ^2.3 |
| UI | Element Plus | ^2.9 |
| I18n | vue-i18n | ^10.0 |
| HTTP | Axios | ^1.7 |
| Charts | ECharts | ^5.5 |
| Utilities | @vueuse/core | ^12.0 |
| Types | TypeScript | 5.6 |
| Build | Vite | ^6.0 |

> Node: `^18.18.0 || ^20.9.0 || >=22.0.0`. Package manager: pnpm >= 9.

## Directory Structure

```
src/
└── index.ts                 # Public entry: re-exports core, shared components, and the default layout
builder/                     # Shared Vite toolchain
├── build-preset/            #   Build preset (aliases, compression)
├── scripts/                 #   Host dev / build scripts
└── vite-configure/          #   Vite config pieces
core/                        # TypeScript only. No .vue files or styles
├── bootstrap.ts             #   createFlexAdminCore
├── ui-kit.ts                #   Skins register layout and pages here
├── api/                     #   Login, token refresh, dynamic routes
├── config/                  #   platform-config.json
├── router/
├── store/
├── subsystem/               #   defineSubsystem
├── utils/                   #   auth, http, message, tree
└── layout/                  #   Layout types and constants
theme/
├── default/                 # Default admin: header, sidebar, tags, settings
│   ├── bootstrap.ts         #   createFlexAdmin; the ./bootstrap export points here
│   ├── layout/
│   ├── views/               #   Login, welcome, portal, errors
│   └── style/
└── shared/                  # Shared UI assets
    ├── components/          #   ReDialog, ReIcon, PureTableBar, OwlLoading, ...
    ├── directives/
    ├── plugins/             #   i18n, Element Plus, ECharts
    └── assets/
```

`core` does not import `.vue` files. A skin registers its layout and the login, welcome, and error pages through `ui-kit`. Business pages live in subsystem packages, not in this repo.

## Layout and UI

A skin registers its layout plus the login, welcome, and error pages through `ui-kit`; `core` handles routes, permissions, menus, and HTTP. The default skin offers vertical, horizontal, and mixed layouts, several theme colors, light/dark mode, a tab bar, and menu search.

The package name `@bit-labs.cn/owl-ui` exports the public API; it does not boot the app.

## Getting Started

```ts
// frontend/admin/main.ts
import { createFlexAdmin } from "@bit-labs.cn/owl-ui/bootstrap";
import adminSubsystem from "@bit-labs.cn/owl-admin-ui";

createFlexAdmin({
  subsystems: [adminSubsystem]
}).then(app => app.mount("#app"));
```

### Menu contributions

A subsystem can attach menus to an existing node. The mount point is that route's `name`.

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

- `menus` are merged into the backend menu tree while dynamic routes are built.
- A missing `targetMenuName` skips that contribution and logs a warning.
- Siblings are deduped by `name + path`.

### Login customization

A subsystem may set `login` on `defineSubsystem`. The login request still goes through owl-ui.

On the default skin, setting `bg` turns on the full-bleed background with the form on the right. Without `bg`, the built-in login page is used. `title` and `subtitle` override the brand copy on the login page.

Put the artwork at `src/assets/login/bg.png` in the subsystem package.

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

When several subsystems set the same field, the later entry in `subsystems` wins. If `title` is omitted, the site name from platform config is used. `SubsystemLoginCustomization` is exported from `@bit-labs.cn/owl-ui`.

The browser title comes from the host build config. The sidebar mark defaults to `src/assets/logo.png` in the active subsystem package. `login` only affects the login page.

### Develop and build

Start from the host `frontend/admin`, not from this repo root:

```bash
pnpm install
pnpm dev
pnpm build
```

Those scripts call `owl-ui/builder/scripts/run-project.mjs`.

### Environment variables (host)

| Variable | Description |
|----------|-------------|
| `VITE_PUBLIC_PATH` | Public base path |
| `VITE_ROUTER_HISTORY` | `hash` or `history` |
| `VITE_HIDE_HOME` | Hide the home page |
| `VITE_HTTP_TIMEOUT` | Request timeout in milliseconds. Default `60000`. `0` means no timeout |
| `VITE_BASE_URL` | API base URL |
| `VITE_PORT` | Dev server port |

### Platform configuration

The host serves `public/platform-config.json`:

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

`Layout` values `horizontal` and `mix` choose between a horizontal and a mixed layout. `Theme` and `EpThemeColor` drive the multi-color theme, while light/dark is stored in `layout.darkMode`.

## State

| Store | Responsibility |
|-------|---------------|
| `user` | Profile, login / logout, token refresh |
| `permission` | Menu tree, flattened routes, cached pages |
| `app` | Layout mode, sidebar, device and viewport |
| `multiTags` | Open pages |
| `epTheme` | Element Plus theme color |
| `settings` | Title, fixed header, hidden sidebar |

## Acknowledgments

This project is built on [vue-pure-admin](https://github.com/pure-admin/vue-pure-admin). Thanks to [xiaoxian521](https://github.com/xiaoxian521) and the community.

## License

[MIT © 2020-present, pure-admin](./LICENSE)
