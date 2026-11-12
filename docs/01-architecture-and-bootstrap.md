# 架构与启�?
本篇说明 Owl-UI �?*包定�?*�?*三层结构**�?*宿主与框架边�?*以及 `createFlexAdmin()` 的启动顺序�?
## 概念说明

- **Owl-UI 是框架包**：提供路由、状态、布局、权限、HTTP 封装和子系统扩展点，不包含业务页面的完整 SPA�?- **宿主应用**：独立前端项目（�?lift-vision-web），负责入口 HTML、构建配置、`public/platform-config.json`，并调用 `createFlexAdmin({ subsystems })` 启动�?- **配置由宿主提�?*：运行时配置通过请求 `platform-config.json` 加载，框架不内置该文件�?- **工具链在 `builder/`**：原 `owl-ui-builder` 已并�?`owl-ui/builder/`，宿�?`frontend/admin` �?`dev` / `build` 脚本指向 `owl-ui/builder/scripts/run-project.mjs`�?
## 架构分层

Owl-UI 采用 **Headless Core + Multi-Theme/Layout（无头核�?+ 多风格套件）** 架构�?
| �?| 目录 | 职责 | 依赖边界 |
| --- | --- | --- | --- |
| **Core 核心�?* | `core/` | 路由、状态、权限、HTTP、配置、子系统、消息适配、核心启动流�?| �?TypeScript 逻辑�?*禁止**引用 `.vue`、样式或组件�?|
| **Theme 风格�?* | `theme/` | 多风格主题与布局套件（每个子目录代表一套独立完整风格） | 依赖 Core，包含自�?Layout、视图、专属样式与 bootstrap |
| �?**Default 风格** | `theme/default/` | 原经典管理后台布局（顶栏、侧栏、标签页、设置面板、默认视图与全局 SCSS�?| 默认开箱即用的一套完整管理后台风�?|
| �?**新风格扩�?* | `theme/<风格�?/` | 未来开发的定制风格（如大屏看板、控制台门户、极简单页等） | 实现专有 Layout 与可选定制视图，注册接入 Core |
| �?**共享 UI 资产** | `theme/shared/` | 跨风格通用�?UI 组件（ReIcon、ReDialog、OwlLoading 等）、指令与插件 | 供各风格与宿主复�?|

`package.json` 中对外暴露：

- `@bit-labs.cn/owl-ui` �?`src/index.ts`（默认导�?default 风格与完整能力，100% 向前兼容�?- `@bit-labs.cn/owl-ui/core/*` �?`core/*`（纯 TS 核心层能力）
- `@bit-labs.cn/owl-ui/theme/default` �?`theme/default/index.ts`（默认风格入口）
- `@bit-labs.cn/owl-ui/theme/<风格�?` �?`theme/<风格�?/index.ts`（新风格入口�?- `@bit-labs.cn/owl-ui/theme/*` �?`theme/*`（主题样式与资源�?- `@bit-labs.cn/owl-ui/shared/*` �?`/components/*` �?`theme/shared/*`

为兼容既有子系统，`/api`、`/config`、`/store`、`/router`、`/subsystem`、`/utils`、`/layout/types` 等旧路径仍映射到 `core/`；新代码优先使用 `/core/*`�?
## 代码入口

- 包入口与兼容导出：`src/index.ts`
- 核心启动逻辑：`core/bootstrap.ts` 中的 `createFlexAdminCore(options)`
- 默认 UI 套件入口：`theme/default/bootstrap.ts` 中的 `createFlexAdmin(options)`
- 核心层路由引用的布局与页面：通过 `core/ui-kit.ts` �?`registerUiKit()` 注入

## 启动顺序

1. **注册子系�?*：`registerSubsystems(options.subsystems ?? [])`，在 router 使用前将子系统的 routes、viewModules、menuContributions 写入 registry�?2. **创建 Vue 应用**：`createApp(kit.root)`，根组件�?UI 套件提供�?3. **UI 安装（早期）**：`kit.installApp(app)` 注册指令、全局组件、tippy、字体图标�?4. **加载平台配置**：`getPlatformConfig(app)` 请求 `platform-config.json`，失败则抛错；随�?`setupStore(app)`�?5. **注入子系统路�?*：`applySubsystemRoutes()` �?`app.use(router)` 之前执行。安�?router 会立刻按地址栏做第一次匹配；装完再注入的话，刷新门户首页时匹配为空，页面空白�?6. **安装 Router**：`app.use(router)`，`router.isReady()` 后注入响应式存储�?7. **UI 安装（插件）**：`kit.installPlugins(app, config)` 安装 i18n、Element Plus、Table、图表与动画�?8. **子系�?install 钩子**：依�?`await sub.install?.(app)`。公开配置�?install 完成后，首屏进度收到 96�?
首屏加载页由 `owl-ui/builder` �?`index.html` 挂上，样式在 `splash.css`，进度在 `splash.js`，不依赖框架包，页面一打开就显示。入口脚本没有字节级进度，这段只按时间缓缓靠�?70%。`createFlexAdminCore` 在平台配置、路由就绪、公开配置这几步把进度推到 80�?0�?6，并换上对应文案，`app.mount` 之后收到 100% 并收起。不等路由懒加载和图片。进系统之后若要再盖一层同样的加载页，�?`OwlLoading` 组件，传�?`percent`�?
## UI 套件注册�?
`registerUiKit()` 需要提供：

- `root`：根组件（默�?`App.vue`�?- `layout`、`views.login / unauthorized / welcome / portal / redirect / frame / error403 / error404 / error500`：异步组件加载器
- `translate`：文案转换（默认 `transformI18n`�?- `installApp` / `installPlugins`：两段安装钩�?
消息提示通过 `registerMessageAdapter()` 注入；核心层默认只打印到控制台，不依�?Element Plus�?
新增一套风格时，只需�?`theme/<新风格名�?/` 下新建目录，实现该风格特有的 `layout/`（以及可选的专属视图与样式），在 `bootstrap.ts` 中注册并调用 `createFlexAdminCore()`，业务与核心逻辑完全零修改复用�?
## 宿主职责

- �?`public/` 下提�?`platform-config.json`（或通过构建注入等价配置）�?- 若使用子系统，在入口中调�?`createFlexAdmin({ subsystems: [defineSubsystem(...)] })`，并�?`main.ts` �?`app.mount("#app")`�?- 框架核心视图�?`src/views/`（如 login、welcome、error）；**业务功能建议放在子系�?*，而不是堆在框架包�?`src/views` 下�?
## 注意事项

- 子系统必须在 `createFlexAdmin()` 调用时传入，不能�?app 创建后再注册�?- `getPlatformConfig` 失败会抛错，宿主必须保证配置可访问或做降级�?- Core 层不得引�?`.vue`、SCSS �?Element Plus；需�?UI 能力时通过 `ui-kit` 适配器注入�?
## 完成定义

- 读者能区分「Core / Theme / UI」三层与「框架包 / 宿主 / 子系统」三者，并知道启动顺序与配置来源�?
