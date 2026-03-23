# 布局、主题与运行时配置

本篇说明 `platform-config.json`、布局与标签页、暗黑模式与主题色、响应式存储的约定。

## 概念说明

- **运行时配置**：通过请求 `platform-config.json`（路径由 `VITE_PUBLIC_PATH` + `platform-config.json` 决定）加载，由 `getPlatformConfig(app)` 写入 `app.config.globalProperties.$config` 和内部 `getConfig()`，宿主需在 public 下提供该文件。
- **布局**：根路由使用 Layout，子路由在 `src/layout/` 下通过 lay-content 等渲染；路由 `meta.noLayout === true` 时该路由不包在 Layout 内（如全屏大屏）。
- **标签页**：由 multiTags store 与 layout 联动，`meta.hiddenTag`、`meta.fixedTag` 控制是否显示、是否固定。
- **主题**：epTheme store 与 Element Plus 主题色、暗黑模式相关；响应式存储（如 responsive-storage）的命名空间由 `getConfig().ResponsiveStorageNameSpace` 决定。

## 代码入口

- 配置加载：`src/config/index.ts`（`getPlatformConfig`、`getConfig`、`responsiveStorageNameSpace`）
- 布局：`src/layout/index.vue`、`src/layout/hooks/useLayout.ts`、`src/layout/components/lay-content/`
- 主题与响应式：`src/store/modules/epTheme.ts`、`src/utils/responsive.ts`、`src/layout/hooks/useDataThemeChange.ts`

## 注意事项

- 框架不包含 `platform-config.json` 内容，宿主必须提供；否则 `getPlatformConfig` 会 reject。
- 路由 meta 中与布局/标签相关的字段见 `CustomizeRouteMeta`：`noLayout`、`hiddenTag`、`fixedTag`、`dynamicLevel`、`activePath` 等。

## 完成定义

- 读者知道配置从哪里来、布局与标签页如何受 meta 控制，以及主题与响应式存储的入口。
