# 子系统契约

本篇定义如何基于 Owl-UI 编写并注册一个**子系统**（扩展包），提供路由、视图模块、菜单贡献与 install 钩子。

## 概念说明

- **子系统**：实现 `SubsystemDefinition` 的对象，通常由 `defineSubsystem()` 生成，在宿主调用 `createFlexAdmin({ subsystems: [sub] })` 时传入。
- **注册时机**：必须在 router 创建与使用之前完成，因此只能在 `createFlexAdmin()` 的 options 里传入。
- **可提供能力**：静态 routes、viewModules（供动态路由解析）、menuContributions（按父 name 挂菜单）、login（登录页定制）、locales、install(app) 钩子。
- **存放位置**：注册结果由 `core/subsystem/registry.ts` 的 `subsystemRegistry` 持有，不再使用模块级变量与一组散函数。

## 代码入口

- 类型定义：`core/subsystem/types.ts`
- 注册表：`core/subsystem/registry.ts`（`SubsystemRegistry` 类 + `subsystemRegistry` 实例）
- 对外 API：`@bit-labs.cn/owl-ui` 导出 `defineSubsystem`，`@bit-labs.cn/owl-ui/core/subsystem` 导出 `subsystemRegistry`

## SubsystemDefinition 字段

| 字段 | 说明 |
|------|------|
| `name` | 子系统唯一标识 |
| `routes` | 静态路由表，格式同 `core/router/modules/*.ts`，可选 |
| `menuContributions` | 数组，每项含 `targetMenuName`（父路由 name）和 `menus`（子菜单项） |
| `viewModules` | 键为路径（如 `./views/xxx/index.vue`），值为 `() => Promise<any>`，通常用 `import.meta.glob('./views/**/*.{vue,tsx}')` |
| `viewModulesPathPrefix` | 将 viewModules 键中的 `./views` 替换为该前缀，用于与后端返回的 path/component 匹配；不设则用首条静态路由 path 或 `/${name}` |
| `login` | 可选，登录页定制：`bg`、`title`、`subtitle`、`primaryColor`、`accountLabel`、`passwordLabel`、`loginFormWidth` |
| `locales` | 可选，如 `{ 'zh-CN': {...}, en: {...} }` |
| `install` | 可选，`(app: App) => void`，在 app 创建并挂载前调用，可注册组件/指令/插件 |

## 注册表读取方式

业务代码不再调用散落的 get 函数，而是读 `subsystemRegistry`：

| 方法 | 返回 |
| --- | --- |
| `list()` | 已注册的全部子系统 |
| `routes()` | 扁平合并后的静态路由 |
| `viewModules()` | prefix 重写后的视图模块映射 |
| `contributions()` | 全部菜单贡献 |
| `login()` | 按 last-wins 合并的登录页定制，没有则 `null` |

## viewModules 与后端菜单的对应

- 后端返回的菜单项往往带有 `component` 或 `path`（如 `/system/notice/index`）。
- 注册时会把 `./views/notice/index.vue` 重写为 `{pathPrefix}/notice/index.vue`（例如 `/system/notice/index.vue` 或等价形式），`addAsyncRoutes` 用后端 `component`/path 与这些键匹配。
- 因此**后端配置的 component/path 必须与 prefix + 相对路径一致**，否则动态路由无法解析到组件。

## 标准步骤（新增一个子系统包）

1. 新建包，依赖 `@bit-labs.cn/owl-ui`，导出 `defineSubsystem({ name, routes?, viewModules?, viewModulesPathPrefix?, menuContributions?, login?, locales?, install? })`。
2. viewModules 使用 `import.meta.glob('./views/**/*.{vue,tsx}')`，并保证后端菜单的 component 与 prefix 后的路径一致。
3. 若需在已有后台菜单下挂子菜单，使用 `menuContributions`，且 `targetMenuName` 与后端返回的父级路由 name 一致。
4. 宿主在入口中 `createFlexAdmin({ subsystems: [yourSubsystem] })`。

## 注意事项

- 业务功能尽量放在子系统内，而不是往框架包 `theme/default/views` 里堆。
- targetMenuName 写错只会 warning，不会抛错，排查菜单不显示时先对一下后端接口里父节点的 name。
- `login` 由多个子系统共享时按注册顺序浅合并，后注册者覆盖先注册者的同名字段。

## 完成定义

- 读者能写出一个最小子系统并完成注册；理解 viewModulesPathPrefix 与后端 component 的对应关系；知道登录页定制与菜单贡献怎么读。
