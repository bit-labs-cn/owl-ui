# Owl-UI 框架文档

本目录为 **@bit-labs.cn/owl-ui** 的开发者手册，面向 AI 开发工具与人工开发者。Owl-UI �?*前端框架�?*，不是独立业务应用；宿主应用通过 `createFlexAdmin()` 启动，并可通过**子系�?*扩展路由、菜单与视图�?
## 阅读顺序

建议按以下顺序阅读：


| 顺序  | 文档                                                                             | 说明                                        |
| --- | ------------------------------------------------------------------------------ | ----------------------------------------- |
| 1   | [01-architecture-and-bootstrap.md](01-architecture-and-bootstrap.md)           | 框架包与宿主边界、启动顺序、运行时配置                       |
| 2   | [02-routing-and-menu-model.md](02-routing-and-menu-model.md)                   | 静�?隐藏/动态路由、后端菜单、扁平化与渲染规�?                 |
| 3   | [03-subsystem-contract.md](03-subsystem-contract.md)                           | 子系统定义与注册：routes、viewModules、menus、install |
| 4   | [04-state-auth-and-permission.md](04-state-auth-and-permission.md)             | Pinia 模块、token、roles/auths/perms 三层权限     |
| 5   | [05-layout-theme-and-runtime-config.md](05-layout-theme-and-runtime-config.md) | platform-config、布局、标签页、主�?                |
| 6   | [06-api-and-http-conventions.md](06-api-and-http-conventions.md)               | http 封装、token 刷新、API 写法                   |
| 7   | [07-feature-authoring-playbook.md](07-feature-authoring-playbook.md)           | 新增页面/功能步骤，宿�?vs 子系�?                      |
| 8   | [08-minimal-subsystem-template.md](08-minimal-subsystem-template.md)           | 最小前端子系统包骨架（独立包，可复制）                     |


## 术语�?

| 术语                    | 含义                                                                                                             |
| --------------------- | -------------------------------------------------------------------------------------------------------------- |
| **宿主应用**              | 调用 `createFlexAdmin()` 的独�?SPA 项目，负责提�?`platform-config.json` 与入�?HTML                                         |
| **子系�?*               | 通过 `defineSubsystem()` 定义、在 `createFlexAdmin({ subsystems })` 中注册的扩展包，可提�?routes、viewModules、menuContributions |
| **viewModules**       | 视图模块映射（如 `import.meta.glob` 结果），键名�?prefix 替换后用于动态路由组件解�?                                                      |
| **Core 核心�?*          | `core/`，纯 TypeScript 逻辑（路由、状态、权限、HTTP、子系统），不引用组件与样式                                                 |
| **Theme 风格�?*         | `theme/`，多风格主题套件（`theme/default` 为默认布局套件，`theme/<风格�?` 为扩展风格）                                      |
| **Shared UI 资产**       | `theme/shared/`，跨风格共享的通用组件（ReIcon、ReDialog、OwlLoading 等）、指令与插件                                        |
| **menuContributions** | 按父级路�?`name` 挂载的菜单贡献，与后端菜单树合并后渲�?                                                                              |


## 相关项目与文档索�?
- **owl-admin-ui**：基于本框架的后台前端子系统包。若要在后台中新增业务页面，请阅�?owl-admin-ui �?`docs/`�?- **owl**：后端应用框架。创建新的独立后端子系统时见 `owl/docs/`�?- **owl-admin**：后�?API 与菜�?角色数据来源。在后台后端新增模块时见 `owl-admin/docs/`�?
## 四仓阅读路径（全栈新子系统）

后端独立子系统：owl/docs �?05/07/08�? 
后台后端新模块：owl-admin/docs �?02/07/08�? 
前端框架与子系统：本目录 �?01/02/03/07�? 
后台前端新页面：owl-admin-ui/docs �?01/02/03/07�?
