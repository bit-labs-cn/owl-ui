# API 与 HTTP 约定

本篇说明框架内封装的 HTTP 客户端、token 携带与刷新、错误提示，以及 API 模块的推荐写法。

## 概念说明

- **HTTP 封装**：基于 axios，在 `core/utils/http/index.ts` 中实现请求/响应拦截、Authorization 头、token 过期刷新与请求队列、统一错误提示（可配置 `silentMessage`、`silentError`）。
- **API 层**：按领域在 `core/api/` 下建模块（如 `user.ts`），内部使用封装的 `http.request()`，返回 Promise；登录、刷新、菜单等接口通常由框架包或宿主提供。
- **提示适配**：核心层不依赖组件库，提示通过 `registerMessageAdapter()` 注入；默认皮肤的 `bootstrap.ts` 注入 Element Plus 实现。

## 代码入口

- HTTP 实例与拦截器：`core/utils/http/index.ts`（`http`、`setHttpTimeout`）
- 示例 API 模块：`core/api/user.ts`（`login`、`refreshTokenApi`、`getAsyncRoutes`、`getMyPermissions`、`getMe` 等，导出 `userAPI` 单例）
- 通用类型：`core/api/commonType.ts`（`Result`、`ResultList`、`ResultTable`）

## 标准步骤（新增 API）

1. 在 `core/api/` 下新增或扩展模块，从 `@bit-labs.cn/owl-ui/utils/http` 引入 `http`；业务子系统的 API 放在子系统包自己的 `api/` 下。
2. 使用 `http.request<T>(method, url, params?, config?)`，需要静默失败时在 config 中设置 `silentMessage` / `silentError`。
3. 类型定义与后端约定一致，可放在同文件或 `api/commonType.ts`。
4. 用类收敛同一领域的接口，导出单例，避免散落的函数：

```ts
class ArticleAPI {
  getList = (params?: object) =>
    http.request<ResultTable>("get", "/api/v1/articles", { params }, { silentMessage: true });

  create = (data?: object) => http.request("post", "/api/v1/articles", { data });
}

export const articleAPI = new ArticleAPI();
```

## 注意事项

- 请求白名单（不强制带 token）：`/refresh-token`、`/login`，避免刷新死循环。
- Token 格式由 `formatToken(token)` 决定，拦截器自动为非白名单请求添加 Authorization。
- `success === false` 的响应会被拒绝并弹出 `msg`，调用方按 Promise 的 catch 处理即可。
- 401 由拦截器统一登出；单个接口不要再重复处理 401。

## 完成定义

- 读者能按现有风格新增 API 方法并正确使用 http 与错误处理。
