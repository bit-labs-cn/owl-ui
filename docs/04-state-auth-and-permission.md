# 状态、认证与权限

本篇说明 Pinia 模块划分、token 生命周期，以及 **roles / auths / perms** 三层权限模型及对应指令与组件。

## 概念说明

- **状态**：集中在 `src/store/modules/`，如 user（登录信息、角色、权限码）、permission（菜单、可缓存路由）、app（布局、设备）、multiTags（标签页）、epTheme（主题色）、settings（侧栏等开关）。
- **Token**：存取在 `src/utils/auth.ts`（如 setToken、getToken、removeToken、formatToken），请求拦截器自动带 Authorization，过期后可走 refresh 队列。
- **三层权限**：
  - **roles**：路由/菜单级，`meta.roles`，用于过滤菜单与路由访问；无权限则不显示/不可访问。
  - **auths**：按钮/操作级，`meta.auths`，配合 `v-auth` 或 `<Auth>` 控制按钮显隐。
  - **perms**：用户权限码列表，与后端返回的 permissions 对应，用 `v-perms` 或 `<Perms>` 做细粒度控制。

## 代码入口

- Store：`src/store/index.ts`、`src/store/modules/user.ts`、`permission.ts`、`app.ts`、`multiTags.ts`、`epTheme.ts`、`settings.ts`
- 认证工具：`src/utils/auth.ts`
- 权限指令与组件：`src/directives/auth/`、`src/directives/perms/`、`src/components/ReAuth`、`src/components/RePerms`
- 动态路由与菜单过滤：`src/router/utils.ts` 中 `filterNoPermissionTree`（按 roles 过滤）

## 标准用法

- 菜单/路由显隐：由后端返回的菜单 + 当前用户 roles 过滤，见 `filterNoPermissionTree`。
- 按钮显隐：在路由 meta 中配置 `auths`，在模板中使用 `v-auth="'xxx'"` 或 `<Auth value="xxx">`。
- 权限码：使用 `v-perms="['code1','code2']"` 或 `<Perms :value="['code1']">`，与用户 permissions 列表比对。

## 注意事项

- roles、auths、perms 三者不要混用：roles 管菜单/路由，auths 管路由下声明的按钮权限，perms 管通用权限码。
- Token 刷新与请求队列逻辑在 `src/utils/http/index.ts`，白名单包含 `/refresh-token`、`/login`。

## 完成定义

- 读者能区分三层权限并正确使用 store、auth 工具与指令/组件。
