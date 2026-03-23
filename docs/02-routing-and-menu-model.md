# 路由与菜单模型

本篇说明静态路由、隐藏路由、后端动态菜单的来源与合并方式，以及菜单渲染与组件解析规则。

## 概念说明

- **静态路由**：来自 `src/router/modules/*.ts` 与各子系统的 `SubsystemDefinition.routes`，在 `applySubsystemRoutes()` 时注入。
- **隐藏路由**：不显示在菜单中，如 404、重定向，放在 `remaining.ts` 等，通过 `meta.showLink === false` 控制。
- **动态路由**：登录后通过 `userAPI.getAsyncRoutes()` 获取，后端返回菜单树（或带 `parentId` 的扁平列表），经 `handleAsyncRoutes` 与子系统 `menuContributions` 合并后，再通过 `addAsyncRoutes` 解析组件并挂到根路由的 children 下。
- **菜单与路由形状**：后端菜单可为树形或扁平（parentId）；框架会先转树再合并贡献，最终**扁平化为两级**（根 + children），以适配 keep-alive 等。

## 代码入口

- 路由实例与静态结构：`src/router/index.ts`
- 动态路由、菜单合并、组件解析：`src/router/utils.ts`（`initRouter`、`handleAsyncRoutes`、`mergeMenuContributionsByName`、`addAsyncRoutes`）
- 路由与 meta 类型：`types/router.d.ts`

## 动态路由组件解析规则

- `addAsyncRoutes` 使用 `getModulesRoutes()` 得到的键名集合（核心 `import.meta.glob("/src/views/**/*.{vue,tsx}")` + 子系统 viewModules 经 prefix 重写后的键）。
- 对每条后端路由：若有 `meta.frameSrc` 则使用 iframe 组件；否则用后端返回的 `component` 字符串（或 `path`）在键名中做 **includes** 匹配，取第一个匹配的懒加载函数赋给 `route.component`。
- **隐式约束**：后端菜单里的 `component`（或用于匹配的 path）必须与合并后的 viewModules 键名**能匹配上**（例如 `/system/notice/index` 对应子系统 prefix `/system` 下的 `./views/notice/index.vue`）。否则匹配失败，页面空白。

## 菜单贡献（子系统）

- 子系统通过 `menuContributions` 声明「挂到哪个父菜单下」：`targetMenuName` 为父级路由的 **name**（不是 path），`menus` 为要追加的子菜单项。
- 合并逻辑在 `mergeMenuContributionsByName`：按 name 查找父节点，找不到则 `console.warn` 并跳过，不会抛错。

## 注意事项

- 菜单挂载依据的是父级路由 **name**，不是 path；写错 targetMenuName 只会打 warning，不会报错。
- `meta` 中与菜单/标签页相关的字段：`showLink`、`roles`、`auths`、`hiddenTag`、`fixedTag`、`noLayout`、`activePath`、`dynamicLevel` 等，见 `CustomizeRouteMeta`。
- 路由 **name** 与页面组件的 `defineOptions({ name })` 建议一致，便于 keep-alive 与多标签。

## 完成定义

- 读者能说清静态/动态/隐藏路由的来源，以及后端 `component` 与 viewModules 键的对应关系；知道菜单贡献按 name 挂载。
