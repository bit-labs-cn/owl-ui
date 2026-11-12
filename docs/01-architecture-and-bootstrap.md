# 架构与启动

本篇说明 Owl-UI 的**包定位**、**分层目录**、**宿主与框架边界**，以及 `createFlexAdmin()` 的启动顺序。

## 概念说明

- **Owl-UI 是框架包**：提供路由、状态、布局、权限、HTTP 封装和子系统扩展点，不包含业务页面的完整 SPA。
- **宿主应用**：独立前端项目（如 `bit-labs/frontend/admin`），负责入口 HTML、构建配置、`public/platform-config.json`，并调用 `createFlexAdmin({ subsystems })` 启动。
- **配置由宿主提供**：运行时配置通过请求 `platform-config.json` 加载，框架不内置该文件。
- **工具链在 `builder/`**：`dev` / `build` 脚本指向 `owl-ui/builder/scripts/run-project.mjs`，共享 `index.html` 与 `src/main.ts`。

## 分层目录

| 层 | 目录 | 职责 | 依赖边界 |
| --- | --- | --- | --- |
| **Core 核心层** | `core/` | 路由、状态、权限、HTTP、配置、子系统注册、UI 套件适配、启动流程 | 纯 TypeScript，**禁止**引用 `.vue`、样式或组件库 |
| **Theme 皮肤层** | `theme/default/` | 默认后台皮肤：布局、登录/欢迎/错误页、专属样式与 `bootstrap.ts` | 依赖 Core，可含 `.vue` 与 SCSS |
| **共享 UI 资产** | `theme/shared/` | 跨皮肤复用的组件（ReDialog、ReIcon 等）、指令、插件（i18n、Element Plus、ECharts）、静态资源 | 供各皮肤与宿主复用 |
| **构建工具链** | `builder/` | Vite 配置、项目启动脚本、`build-preset`、`index.html` 与首屏加载页 | 不参与运行时 |
| **文案资源** | `locales/` | `zh-CN.yaml`、`en.yaml`，由 `theme/shared/plugins/i18n.ts` 读取 | 位于包根，不随插件搬动 |

`package.json` 中对外暴露的主要路径：

- `@bit-labs.cn/owl-ui` → `src/index.ts`（公开入口：核心能力 + 共享组件 + 默认布局）
- `@bit-labs.cn/owl-ui/core/*` → `core/*`（自研皮肤只需依赖这里）
- `@bit-labs.cn/owl-ui/bootstrap` → `theme/default/bootstrap.ts`（默认皮肤的 `createFlexAdmin`）
- `@bit-labs.cn/owl-ui/theme`、`/theme/login.css`、`/theme/tailwind.css` → `theme/default/style/*`
- `@bit-labs.cn/owl-ui/theme/default/*`、`/theme/shared/*` → 对应皮肤目录
- `@bit-labs.cn/owl-ui/build-preset` → `builder/build-preset/index.ts`

为兼容既有子系统，`/api`、`/config`、`/store`、`/router`、`/subsystem`、`/utils`、`/layout/types` 等路径仍映射到 `core/`；新代码优先使用 `/core/*`。

## 代码入口

- 包公开入口：`src/index.ts`
- 核心启动逻辑：`core/bootstrap.ts` 中的 `createFlexAdminCore(options)`
- 默认皮肤入口：`theme/default/bootstrap.ts` 中的 `createFlexAdmin(options)`
- 核心层路由引用的布局与页面：通过 `core/ui-kit.ts` 的 `uiKitRegistry.register()` 注入
- 子系统注册表：`core/subsystem/registry.ts` 的 `subsystemRegistry`
- 平台配置：`core/config/index.ts` 的 `platformConfig`
- 子系统门户：`core/router/subAppPortal.ts` 的 `subAppPortal`

## 启动顺序

1. **注册子系统**：`subsystemRegistry.register(options.subsystems ?? [])`，在 router 使用前写入 routes、viewModules、menuContributions 与登录页定制。
2. **子系统门户**：开启 `splitSubApp` 时调用 `subAppPortal.setEnabled(true)` 与 `subAppPortal.setHome(path)`。
3. **创建 Vue 应用**：`createApp(kit.root)`，根组件由 UI 套件提供。
4. **UI 安装（早期）**：`kit.installApp(app)` 注册指令、全局组件、tippy、字体图标。
5. **加载平台配置**：`platformConfig.load(app)` 请求 `platform-config.json`，失败则抛错；随后 `setupStore(app)`。
6. **注入子系统路由**：`applySubsystemRoutes()` 在 `app.use(router)` 之前执行。安装 router 会立刻按地址栏做第一次匹配；装完再注入的话，刷新门户首页时匹配为空，页面空白。
7. **安装 Router**：`app.use(router)`，`router.isReady()` 后注入响应式存储。
8. **UI 安装（插件）**：`kit.installPlugins(app, config)` 安装 i18n、Element Plus、Table、图表与动画。
9. **公开配置**：`loadPublicSettings()` 读取站点名称、Logo 等公开项。
10. **子系统 install 钩子**：依次 `await sub.install?.(app)`，完成后首屏进度收到 96。

## 首屏加载页

首屏由 `builder/index.html` 挂上，结构在 HTML 内，样式在 `splash.css`，进度在 `splash.js`，不依赖框架包。

- `splash.js` 是模块脚本，并在文件内 `import "./splash.css"`，因此会随构建产出带哈希的文件，部署在 `/admin/` 这类子路径下也能取到。
- 它排在 `/src/main.ts` 之前，模块按文档顺序执行，所以 `window.__owlSplash` 先挂好，应用启动时已有进度接口。
- 入口脚本没有字节级进度，这段只按时间缓缓靠近 70%。`createFlexAdminCore` 在平台配置、路由就绪、公开配置这几步把进度推到 80、90、96，并换上对应文案，`app.mount` 之后收到 100% 并收起。

进系统之后若要再盖一层同样的加载页，用 `OwlLoading` 组件，传入 `percent`。

## UI 套件注册项

`uiKitRegistry.register(kit)` 需要提供：

- `root`：根组件（默认 `App.vue`）
- `layout`、`views.login / unauthorized / welcome / portal / redirect / frame / error403 / error404 / error500`：异步组件加载器
- `translate`：文案转换（默认 `transformI18n`）
- `installApp` / `installPlugins`：两段安装钩子

读取用 `uiKitRegistry.require()`；路由模块在加载时先取 `layoutComponent()` / `routeComponent(name)`，真正渲染时才解析套件。

消息提示通过 `registerMessageAdapter()` 注入；核心层默认只打印到控制台，不依赖 Element Plus。

新增一套皮肤时，新建 `theme/<名称>/`，实现自己的 `layout/`、`views/`、`style/` 与 `bootstrap.ts`，注册上述项目后调用 `createFlexAdminCore()`，业务逻辑零修改。

## 宿主职责

- 在 `public/` 下提供 `platform-config.json`（或通过构建注入等价配置）。
- 若使用子系统，在入口中调用 `createFlexAdmin({ subsystems: [defineSubsystem(...)] })`，并在 `main.ts` 中 `app.mount("#app")`。
- 框架默认视图在 `theme/default/views/`（login、welcome、error 等）；**业务功能放在子系统**，而不是堆在框架包里。

## 注意事项

- 子系统必须在 `createFlexAdmin()` 调用时传入，不能在 app 创建后再注册。
- `platformConfig.load()` 失败会抛错，宿主必须保证配置可访问或做降级。
- Core 层不得引用 `.vue`、SCSS 或 Element Plus；需要 UI 能力时通过 `ui-kit` 适配器注入。

## 完成定义

- 读者能区分「Core / Theme / Shared / Builder」与「框架包 / 宿主 / 子系统」三者，并知道启动顺序与配置来源。
