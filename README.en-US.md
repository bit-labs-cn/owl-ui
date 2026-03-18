<h1>SubBase</h1>

[![license](https://img.shields.io/github/license/pure-admin/vue-pure-admin.svg)](LICENSE)

**English** | [中文](./README.md)

## Introduction

`@bit-labs.cn/flex-admin` is an enterprise-grade **Vue 3 admin framework library** built on top of [vue-pure-admin](https://github.com/pure-admin/vue-pure-admin). Rather than a standalone application, it serves as a reusable core package that provides host applications with a full set of admin capabilities — authentication, dynamic routing, multiple layouts, theming, i18n, and a subsystem extension mechanism.

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

> Node requirement: `^18.18.0 || ^20.9.0 || >=22.0.0` — Package manager: pnpm >= 9

## Directory Structure

```
src/
├── index.ts                 # Main entry, unified exports
├── bootstrap.ts             # createFlexAdmin bootstrap
├── App.vue                  # Root component
├── api/                     # API layer (login, token refresh, dynamic routes, etc.)
├── assets/                  # Static resources (icons, illustrations, SVGs)
├── components/              # Reusable components
│   ├── ReAuth/              #   Permission directive component
│   ├── ReDialog/            #   Dialog manager
│   ├── ReIcon/              #   Icons (offline / online / iconfont)
│   ├── ReCountTo/           #   Number animation
│   ├── ReSegmented/         #   Segmented control
│   ├── ReCol/               #   Responsive grid
│   ├── RePureTableBar/      #   Table toolbar
│   └── ...
├── config/                  # Platform config (reads platform-config.json)
├── directives/              # Custom directives (auth, copy, longpress, ripple, etc.)
├── layout/                  # Layout system
│   ├── components/          #   Navbar, sidebar, tags, settings panel, etc.
│   └── hooks/               #   Theme, layout, tags, nav composables
├── plugins/                 # Plugin registration (i18n, Element Plus, ECharts)
├── router/                  # Routing (static + dynamic route injection)
├── store/                   # Pinia stores (user, permission, app, multiTags, epTheme, settings)
├── style/                   # Global styles (reset, theme, dark mode, transitions)
├── subsystem/               # Subsystem mechanism (defineSubsystem, registry)
├── utils/                   # Utilities (auth, http, tree, progress, etc.)
└── views/                   # Pages (login, welcome, error, placeholder)
```

## Key Features

- **Subsystem Architecture** — Register independent business modules via `defineSubsystem`, each carrying its own routes, i18n, views, and install hooks
- **Auth & Authorization** — Login, silent token refresh, role/permission control (directive + component dual mode)
- **Dynamic Routing** — Backend-driven menu with automatic frontend route injection and navigation generation
- **Multiple Layouts** — Switch between vertical, horizontal, and mix layouts
- **Theming** — Light / dark / system-follow modes with customizable primary color, greyscale, and color-weak support
- **Multi-tab** — Tab caching, KeepAlive, context menu
- **Internationalization** — Built-in Chinese / English, powered by vue-i18n + YAML translation files
- **Responsive** — Auto-collapse sidebar on mobile, breakpoint-aware responsive storage

## Getting Started

### Usage in a Host Application

```ts
// main.ts
import { createFlexAdmin } from "@bit-labs.cn/flex-admin/bootstrap";
import adminSubsystem from "@bit-labs.cn/subsystem-admin";

createFlexAdmin({
  subsystems: [adminSubsystem]
}).then(app => app.mount("#app"));
```

### Development & Build

The framework does not run standalone — start it via a host application (e.g. `new/app`):

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Production build
pnpm build

# Staging build
pnpm build:staging

# Lint
pnpm lint
```

### Environment Variables (Host Application)

| Variable | Description |
|----------|-------------|
| `VITE_PUBLIC_PATH` | Public base path |
| `VITE_ROUTER_HISTORY` | Router mode (`hash` / `history`) |
| `VITE_HIDE_HOME` | Whether to hide the home page |

### Platform Configuration

Runtime configuration via `public/platform-config.json`:

```jsonc
{
  "Title": "LiftVision",         // Site title
  "FixedHeader": true,            // Fixed header
  "Layout": "vertical",           // Layout mode
  "Theme": "light",               // Theme
  "Locale": "zh",                 // Locale
  "EpThemeColor": "#409EFF"       // Element Plus theme color
}
```

## State Management

| Store | Responsibility |
|-------|---------------|
| `user` | User info, login/logout, token refresh |
| `permission` | Menu tree, flattened routes, cached page list |
| `app` | Layout mode, sidebar state, device & viewport |
| `multiTags` | Multi-tab management & persistence |
| `epTheme` | Element Plus theme color & mode |
| `settings` | Title, fixed header, hidden sidebar |

## Acknowledgments

This project is built upon [vue-pure-admin](https://github.com/pure-admin/vue-pure-admin). Thanks to the original author [xiaoxian521](https://github.com/xiaoxian521) and all community contributors.

## License

[MIT © 2020-present, pure-admin](./LICENSE)
