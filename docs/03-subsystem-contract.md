# 子系统契�?
本篇定义如何基于 Owl-UI 编写并注册一�?*子系�?*（扩展包），提供路由、视图模块、菜单贡献与 install 钩子�?
## 概念说明

- **子系�?*：实�?`SubsystemDefinition` 的对象，通常�?`defineSubsystem()` 生成，在宿主调用 `createFlexAdmin({ subsystems: [sub] })` 时传入�?- **注册时机**：必须在 router 创建与使用之前完成，因此只能�?`createFlexAdmin()` �?options 里传入�?- **可提供能�?*：静�?routes、viewModules（供动态路由解析）、menuContributions（按�?name 挂菜单）、locales、install(app) 钩子�?
## 代码入口

- 类型定义：`core/subsystem/types.ts`
- 注册与读取：`core/subsystem/registry.ts`
- 对外 API：`src/index.ts` 导出 `defineSubsystem`、`SubsystemDefinition`、`SubsystemMenuContribution`

## SubsystemDefinition 字段

| 字段 | 说明 |
|------|------|
| `name` | 子系统唯一标识 |
| `routes` | 静态路由表，格式同 router/modules/*.ts，可�?|
| `menuContributions` | 数组，每项含 `targetMenuName`（父路由 name）和 `menus`（子菜单项） |
| `viewModules` | 键为路径（如 `./views/xxx/index.vue`），值为 `() => Promise<any>`，通常�?`import.meta.glob('./views/**/*.{vue,tsx}')` |
| `viewModulesPathPrefix` | �?viewModules 键中�?`./views` 替换为该前缀，用于与后端返回�?path/component 匹配；不设则用首条静态路�?path �?`/${name}` |
| `locales` | 可选，�?`{ 'zh-CN': {...}, en: {...} }` |
| `install` | 可选，`(app: App) => void`，在 app 创建并挂载前调用，可注册组件/指令/插件 |

## viewModules 与后端菜单的对应

- 后端返回的菜单项往往带有 `component` �?`path`（如 `/system/notice/index`）�?- 子系统在 registry 中会�?`./views/notice/index.vue` 重写�?`{pathPrefix}/notice/index.vue`（例�?`/system/notice/index.vue` 或等价形式），`addAsyncRoutes` 用后�?`component`/path 与这些键�?includes 匹配�?- 因此**后端配置�?component/path 必须�?prefix + 相对路径一�?*，否则动态路由无法解析到组件�?
## 标准步骤（新增一个子系统包）

1. 新建包，依赖 `@bit-labs.cn/owl-ui`，导�?`defineSubsystem({ name, routes?, viewModules?, viewModulesPathPrefix?, menuContributions?, locales?, install? })`�?2. viewModules 使用 `import.meta.glob('./views/**/*.{vue,tsx}')`，并保证后端菜单�?component �?prefix 后的路径一致�?3. 若需在已有后台菜单下挂子菜单，使�?`menuContributions`，且 `targetMenuName` 与后端返回的父级路由 name 一致�?4. 宿主在入口中 `createFlexAdmin({ subsystems: [yourSubsystem] })`�?
## 注意事项

- 业务功能尽量放在子系统内，而不是往框架�?`src/views` 里堆�?- targetMenuName 写错只会 warning，不会抛错，排查菜单不显示时先对一下后端接口里父节点的 name�?
## 完成定义

- 读者能写出一个最小子系统并完成注册；理解 viewModulesPathPrefix 与后�?component 的对应关系�?
