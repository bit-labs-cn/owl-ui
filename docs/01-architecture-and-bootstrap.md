# 架构与启动

本篇说明 Owl-UI 的**包定位**、**宿主与框架边界**以及 `createFlexAdmin()` 的启动顺序。

## 概念说明

- **Owl-UI 是框架包**：提供路由、状态、布局、权限、HTTP 封装和子系统扩展点，不包含业务页面的完整 SPA。
- **宿主应用**：独立前端项目（如 lift-vision-web），负责入口 HTML、构建配置、`public/platform-config.json`，并调用 `createFlexAdmin({ subsystems })` 启动。
- **配置由宿主提供**：运行时配置通过请求 `platform-config.json` 加载，框架不内置该文件。

## 代码入口

- 包入口与导出：`src/index.ts`
- 启动逻辑：`src/bootstrap.ts` 中的 `createFlexAdmin(options)`

## 启动顺序（bootstrap.ts）

1. **注册子系统**：`registerSubsystems(options.subsystems ?? [])`，在 router 使用前将子系统的 routes、viewModules、menuContributions 写入 registry。
2. **创建 Vue 应用**：`createApp(App)`。
3. **注册指令与全局组件**：如 `v-auth`、`Auth`、`Perms`、图标等。
4. **加载平台配置**：`getPlatformConfig(app)` 请求 `platform-config.json`，失败则抛错。
5. **初始化 Store**：`setupStore(app)`，以及 echarts。
6. **注入子系统路由**：`applySubsystemRoutes()` 在 `app.use(router)` 之前执行。安装 router 会立刻按地址栏做第一次匹配；装完再注入的话，刷新门户首页时匹配为空，页面空白。
7. **安装 Router**：`app.use(router)`，`router.isReady()` 后注入响应式存储、Motion、i18n、Element Plus、Table。
8. **子系统 install 钩子**：依次 `await sub.install?.(app)`。公开配置和 install 完成后，首屏进度收到 96。

首屏加载页由 owl-ui-builder 的 `index.html` 挂上，样式在 `splash.css`，进度在 `splash.js`，不依赖框架包，页面一打开就显示。入口脚本没有字节级进度，这段只按时间缓缓靠近 70%。`createFlexAdmin` 在平台配置、路由就绪、公开配置这几步把进度推到 80、90、96，并换上对应文案，`app.mount` 之后收到 100% 并收起。不等路由懒加载和图片。进系统之后若要再盖一层同样的加载页，用 `OwlLoading` 组件，传入 `percent`。

## 宿主职责

- 在 `public/` 下提供 `platform-config.json`（或通过构建注入等价配置）。
- 若使用子系统，在入口中调用 `createFlexAdmin({ subsystems: [defineSubsystem(...)] })`，并在 `main.ts` 中 `app.mount("#app")`。
- 框架核心视图在 `src/views/`（如 login、welcome、error）；**业务功能建议放在子系统**，而不是堆在框架包的 `src/views` 下。

## 注意事项

- 子系统必须在 `createFlexAdmin()` 调用时传入，不能在 app 创建后再注册。
- `getPlatformConfig` 失败会抛错，宿主必须保证配置可访问或做降级。

## 完成定义

- 读者能区分“框架包 / 宿主 / 子系统”三者，并知道启动顺序与配置来源。
