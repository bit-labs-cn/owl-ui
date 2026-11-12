# 布局、主题与运行时配置

本篇说明 `platform-config.json`、布局与标签页、暗黑模式与主题色、样式入口与响应式存储的约定。

## 概念说明

- **运行时配置**：通过请求 `platform-config.json`（路径由 `VITE_PUBLIC_PATH` + `platform-config.json` 决定）加载，由 `platformConfig.load(app)` 写入 `app.config.globalProperties.$config` 与内部缓存，宿主需在 `public/` 下提供该文件。
- **布局**：根路由使用 Layout，子路由在 `theme/default/layout/` 下通过 lay-content 等渲染；路由 `meta.noLayout === true` 时该路由不包在 Layout 内（如全屏大屏）。
- **标签页**：由 multiTags store 与 layout 联动，`meta.hiddenTag`、`meta.fixedTag` 控制是否显示、是否固定；`platform-config.json` 的 `HideTabs` 可整体关闭。
- **主题**：epTheme store 与 Element Plus 主题色、暗黑模式相关；响应式存储的命名空间由 `platformConfig.get().ResponsiveStorageNameSpace` 决定。

## 代码入口

- 配置读取：`core/config/index.ts` 的 `PlatformConfig` 类（`get(key?)`、`set()`、`storageNamespace()`、`load(app)`）
- 公开配置：`core/config/loadPublicSettings.ts`（站点名称、Logo、版权等）
- 布局：`theme/default/layout/index.vue`、`theme/default/layout/hooks/useLayout.ts`、`theme/default/layout/components/lay-content/`
- 布局常量与类型：`core/layout/constants.ts`、`core/layout/types.ts`
- 样式入口：`theme/default/style/`（`index.scss` 汇总 tokens / reset / element-plus / sidebar / dark）
- 主题与响应式：`core/store/modules/epTheme.ts`、`core/utils/responsive.ts`、`theme/default/layout/hooks/useDataThemeChange.ts`
- 皮肤注册：`theme/default/bootstrap.ts` 的 `uiKitRegistry.register({ layout, views, ... })`

## 样式与文案

| 资源 | 位置 |
| --- | --- |
| 默认皮肤样式 | `theme/default/style/*`，`@bit-labs.cn/owl-ui/theme` 指向 `index.scss` |
| 登录页样式 | `theme/default/style/login.css` |
| Tailwind 入口 | `theme/default/style/tailwind.css` |
| 文案 | 包根 `locales/zh-CN.yaml`、`locales/en.yaml` |
| i18n 插件 | `theme/shared/plugins/i18n.ts`（`useI18n`、`transformI18n`） |

文案目录在包根，插件的 `import.meta.glob` 相对自身位置指回包根。改插件路径时同步改 glob，否则界面上会直接显示 `login.pureLogin` 这类 key。

## 注意事项

- 框架不包含 `platform-config.json` 内容，宿主必须提供；否则 `platformConfig.load()` 会抛错。
- 接口超时默认 60 秒。构建时用 `VITE_HTTP_TIMEOUT`（毫秒）；运行时用 `platform-config.json` 的 `HttpTimeout`（覆盖前者）。单次请求仍可传 axios `timeout`。
- 路由 meta 中与布局/标签相关的字段见 `menuType.meta`：`noLayout`、`hiddenTag`、`fixedTag`、`dynamicLevel`、`activePath` 等。
- 布局 hooks 仍按组合式函数使用（`useNav`、`useTag`、`useLayout`、`useDataThemeChange`），因为它们依赖 Vue 的注入；纯状态容器则收成类，如 `BooleanFlag`、`frameRegistry`、`DialogService`。

## 完成定义

- 读者知道配置从哪里来、布局与标签页如何受 meta 控制，以及主题、样式与文案的入口。
