# 路由与菜单模型

本篇说明静态路由、隐藏路由、后端动态菜单的来源与合并方式，以及菜单渲染与组件解析规则。

## 概念说明

- **静态路由**：来自 `core/router/modules/*.ts` 与各子系统的 `SubsystemDefinition.routes`，在 `applySubsystemRoutes()` 时注入。
- **隐藏路由**：不显示在菜单中，如 404、重定向，放在 `remaining.ts`（不参与 `modules/` 自动导入），通过 `meta.showLink === false` 控制。
- **动态路由**：登录后通过 `userAPI.getAsyncRoutes(app?)` 获取，后端返回菜单树（或带 `parentId` 的扁平列表），经 `handleAsyncRoutes` 与子系统 `menuContributions` 合并后，再由 `addAsyncRoutes` 解析组件并挂到根路由的 children 下。
- **菜单与路由形状**：后端菜单可为树形或扁平（parentId）；框架会先转树再合并贡献，最终**扁平化为两级**（根 + children），以适配 keep-alive 等。

## 代码入口

- 路由实例与静态结构：`core/router/index.ts`（`constantRoutes`、`constantMenus`、`router`、`applySubsystemRoutes`）
- 动态路由、菜单合并、组件解析：`core/router/utils.ts`（`initRouter`、`handleAsyncRoutes`、`mergeMenuContributionsByName`、`addAsyncRoutes`、`enterSubApp`、`leaveSubApp`）
- 子系统门户：`core/router/subAppPortal.ts` 的 `subAppPortal`
- 路由与 meta 类型：`core/layout/types.ts`（`RouteConfigs`、`menuType`、`routeMetaType`）

## 动态路由组件解析规则

- `addAsyncRoutes` 使用 `getModulesRoutes()` 得到的键名集合：核心 `import.meta.glob("/src/views/**/*.{vue,tsx}")`（Vite root 为 `builder/`，通常为空）+ 子系统 viewModules 经 prefix 重写后的键。
- 对每条后端路由：若有 `meta.frameSrc` 则使用 iframe 组件；否则用后端返回的 `component` 字符串（或 `path`）在键名中做**精确/后缀/includes** 匹配，取匹配到的懒加载函数赋给 `route.component`。
- **隐式约束**：后端菜单里的 `component`（或用于匹配的 path）必须与合并后的 viewModules 键名**能匹配上**（例如 `/system/notice/index` 对应子系统 prefix `/system` 下的 `./views/notice/index.vue`）。否则匹配失败，页面空白。

## 子系统切换（splitSubApp）

默认关闭。宿主这样打开：`createFlexAdmin({ splitSubApp: { enable: true, home: "/apps/index", customEntry } })`。`home` 是离开子系统、以及直接打开站点根路径时回去的页面，由宿主自己定，框架不规定必须是 `/apps`。`customEntry` 由宿主挂到自己的路由上。

状态由 `subAppPortal` 这个对象持有：

| 方法 | 作用 |
| --- | --- |
| `setEnabled(boolean)` / `isEnabled()` | 门户开关，由 `createFlexAdmin` 在挂载前写入 |
| `setHome(path)` / `home()` | 门户首页地址 |
| `current()` / `select(name)` / `clear()` | 当前子系统，记在 `sessionStorage` 的 `owl-current-sub-app` |
| `normalizeParameter(app)` | 把 `"user,sms"` 或数组收成查询值 |
| `readAppFromLocation()` | 读地址栏 `?app=` |
| `routeCacheKey(app?)` / `clearRouteCache()` | 动态路由缓存键（`async-routes:user,sms`）与清理 |
| `groupEntries(menus)` | 按 `subApp` 把菜单根分组，供门户页渲染 |

进入某个子系统：`enterSubApp("sms")`，或地址栏 `?app=sms`。

- 参数可以是一个名称，或逗号分隔的多个名称：`enterSubApp("user,sms")`、`enterSubApp(["user", "sms"])`。
- 新窗口打开业务页时，把同一组名称放在地址栏 `?app=user,sms`（在 hash 之前）。侧栏里新窗口打开的大屏也会带上当前 `app`。新页面会按这个参数加载菜单，而不是回到切换页。
- 对应请求是 `GET /api/v1/users/me/menus?app=user,sms`。只注册这些子系统的根菜单，侧边栏同时显示它们。`app` 为空时仍返回全部菜单。
- 进入后展开第一个目录，并打开该目录下的第一个普通菜单。无布局或新窗口打开的大屏会跳过，避免一进来就铺满。
- 再次进入另一组、顶栏「主页」或登出时，卸掉上次挂上的动态路由，并清空多标签。
- 门户首页是宿主静态路由，在安装 router 之前注入。刷新该地址时，若这次匹配还没有首页路由，守卫会再进入一次，避免地址停在首页但界面空白。

## 菜单贡献（子系统）

- 子系统通过 `menuContributions` 声明「挂到哪个父菜单下」：`targetMenuName` 为父级路由的 **name**（不是 path），`menus` 为要追加的子菜单项。
- 合并逻辑在 `mergeMenuContributionsByName`：按 name 查找父节点，找不到则 `console.warn` 并跳过，不会抛错。

## 注意事项

- 菜单挂载依据的是父级路由 **name**，不是 path；写错 targetMenuName 只会打 warning，不会报错。
- `meta` 中与菜单/标签页相关的字段：`showLink`、`roles`、`auths`、`hiddenTag`、`fixedTag`、`noLayout`、`activePath`、`dynamicLevel`、`frameSrc`、`target`、`showParent`。
- 路由 **name** 与页面组件的 `defineOptions({ name })` 建议一致，便于 keep-alive 与多标签。

## 完成定义

- 读者能说清静态/动态/隐藏路由的来源，以及后端 `component` 与 viewModules 键的对应关系；知道菜单贡献按 name 挂载；知道门户开启后用 `?app=` 只取当前子系统菜单。
