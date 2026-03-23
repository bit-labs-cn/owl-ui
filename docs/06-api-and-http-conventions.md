# API 与 HTTP 约定

本篇说明框架内封装的 HTTP 客户端、token 携带与刷新、错误提示，以及 API 模块的推荐写法。

## 概念说明

- **HTTP 封装**：基于 axios，在 `src/utils/http/index.ts` 中实现请求/响应拦截、Authorization 头、token 过期刷新与请求队列、统一错误提示（可配置 silentMessage 等）。
- **API 层**：按领域在 `src/api/` 下建模块（如 user.ts），内部使用封装的 `http.request()`，返回 Promise；登录、刷新、菜单等接口通常由框架包或宿主提供。

## 代码入口

- HTTP 实例与拦截器：`src/utils/http/index.ts`
- 示例 API 模块：`src/api/user.ts`（getAsyncRoutes、login、getUserInfo 等）

## 标准步骤（新增 API）

1. 在 `src/api/` 下新增或扩展模块，从 `@bit-labs.cn/owl-ui/utils/http` 引入 `http`。
2. 使用 `http.request<T>(method, url, params?, config?)`，需要静默失败时在 config 中设置 `silentMessage` 等。
3. 类型定义与后端约定一致，可放在同文件或 `api/commonType.ts`。

## 注意事项

- 请求白名单（不强制带 token）：包含 `/refresh-token`、`/login`，避免刷新死循环。
- Token 格式由 `formatToken(token)` 决定，拦截器自动为非白名单请求添加 Authorization。

## 完成定义

- 读者能按现有风格新增 API 方法并正确使用 http 与错误处理。
