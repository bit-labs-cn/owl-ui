# 功能编写操作清单

本篇给出�?Owl-UI 体系�?*新增页面/功能**的标准步骤，以及何时放在宿主、何时放在子系统�?

## 概念说明

- **框架包内 `src/views/`**：仅放框架级页面（login、welcome、error、placeholder 等），不建议在此堆业务页面�?
- **业务功能**：应放在**子系�?*中，通过 `defineSubsystem` 提供 viewModules 与可�?routes、menuContributions，由宿主�?`createFlexAdmin({ subsystems })` 中注册�?
- **后端驱动**：若菜单与路由完全由后端返回，只需保证子系�?viewModules 的路径前缀与后端菜单的 component/path 一致，即可解析到对�?Vue 组件�?

## 标准步骤（在子系统中新增页面�?

1. **在子系统包内**新增页面组件，例�?`subsystem-package/src/views/notice/index.vue`，并设置 `defineOptions({ name: 'NoticeList' })`（与路由 name 或后端约定一致，便于 keep-alive/多标签）�?
2. **viewModules**：子系统�?`import.meta.glob('./views/**/*.{vue,tsx}')` 已包含该路径；确�?`viewModulesPathPrefix` 与后端菜单中该页�?component/path 一致（�?`/system/notice/index`）�?
3. **菜单**：若菜单由后端下发，只需在后端配置对应菜单项�?component；若需在前端追加，使用子系统的 `menuContributions`，`targetMenuName` 为父级路�?name，`menus` 中包�?path、name、meta（title、icon 等）�?
4. **权限**：路�?meta �?`roles`/`auths` 与后端角�?按钮权限一致；页面内按钮用 `v-auth` �?`<Perms>`�?
5. **API**：在子系统或宿主中调�?`http` 封装的接口，不破坏框架包内的请求拦截�?token 逻辑�?

## 何时写进宿主 vs 子系�?

- **宿主**：入�?HTML、platform-config.json、依赖安装、`createFlexAdmin({ subsystems: [ ... ] })` 以及仅宿主需要的静态路�?页面�?
- **子系�?*：所有与某业务域相关的视图、路由、菜单贡献、可�?locales �?install；一个子系统对应一�?npm 包或 monorepo 子包�?

## 注意事项（AI 自检�?

- 新增业务页面不要写在框架�?`owl-ui/src/views` 下，应写在子系统包内�?
- 动态路由组件解析依赖后�?`component`/path �?viewModules 键名�?includes 匹配，前缀必须一致�?
- 菜单贡献�?targetMenuName 是父�?*路由 name**，不�?path；写错只�?warning，菜单不显示�?
- 页面组件 `defineOptions({ name })` 与路�?name 保持一致，利于 keep-alive 与多标签匹配�?

## 完成定义

- 读者能按“子系统 + viewModules + 后端菜单�?menuContributions”完成新页面接入，并知道宿主与子系统的职责边界�?
