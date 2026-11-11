# owl-ui/builder

**运行时目录**（共享 Vite 工具链，随 owl-ui 同仓库维护）。日常开发**不要**进入本目录改配置。

业务项目在各自 `frontend/admin` 自持全部配置，并在该目录执行：

```bash
cd ../gui-lv/frontend/admin   # 任意宿主项目
cp .env.example .env          # 首次
pnpm dev
pnpm build
```

首次 `pnpm dev` 会自动在本目录生成 `package.json` / `pnpm-workspace.yaml` 并按需 `pnpm install`（产物，勿手改）。

## 环境

- Node `^18.18.0 || ^20.9.0 || >=22.0.0`
- pnpm `>=9`

## 业务项目自持（不在本目录）

| 文件 | 作用 |
|------|------|
| `main.ts` | `createFlexAdmin` 宿主入口 |
| `.env.example` | 全量 `VITE_*` 模板（提交） |
| `.env` | 开发者从 example 复制后本地修改（不提交） |
| `.env.development` / `.env.production` | 按环境覆盖 `.env` |
| `public/platform-config.json` | 运行时平台配置模板 |
| `public/*` | 其它静态资源 |

产物输出到**项目** `frontend/admin/dist/`。

`package.json` scripts 示例：

```json
{
  "dev": "node ../../../owl-ui/builder/scripts/run-project.mjs dev",
  "build": "node ../../../owl-ui/builder/scripts/run-project.mjs build"
}
```

项目名默认取自 `.env*` 的 `VITE_APP_SYSTEM`，也可在命令行传入。

## 本目录是什么

仅工具链与共享 HTML 壳：

- `scripts/run-project.mjs` / `gen-package.mjs` / `builder-utils.mjs`
- `vite.config.ts` + `vite-configure/*`
- `index.html` + `src/main.ts`
- `package.base.json`（工具链依赖模板）

**禁止**在本目录放置业务 `.env*`、`public/` 或入口 `main.ts`。

UI 包全集由脚本扫描 monorepo 中的 `@bit-labs.cn/*` 目录得出，再按入口 import 闭包裁剪；**无需**手维护子系统登记表。

## 新增宿主

1. 在 `<repo>/frontend/admin` 放齐 `main.ts`、`.env.example`、`.env.development` / `.env.production`、`public/platform-config.json`
2. `cp .env.example .env` 并按项目改 `VITE_APP_SYSTEM` / `VITE_APP_TITLE` / `VITE_BASE_URL` 等
3. scripts 指向上方 `run-project.mjs`
4. `cd <repo>/frontend/admin && pnpm dev`

### 环境变量

加载顺序：`.env` → `.env.[mode]`（后者覆盖前者）。

业务必填：

- `VITE_APP_SYSTEM` — 项目短名
- `VITE_APP_TITLE` — 平台标题
- `VITE_BASE_URL` — API / 开发代理 target

常用可配：`VITE_PORT`、`VITE_PUBLIC_PATH`、`VITE_ROUTER_HISTORY`、`VITE_CDN`、`VITE_HIDE_HOME`、`VITE_COMPRESSION`。

启动时由 builder 自动注入（一般无需手写）：`VITE_APP_ENTRY_FILE`、`VITE_APP_OUT_DIR`、`VITE_APP_PROJECT_ROOT`、`VITE_APP_LOGO_PATH`。

完整清单见各业务项目的 `.env.example`。

## 其它

- `node scripts/gen-package.mjs --all`：扫描全量 UI 包生成 workspace（Docker 用）
- `pnpm dev:edge` / `pnpm build:staging`：旁路调试，不经业务项目包装

## 说明

- Vite `root` 为本目录；`envDir` / `publicDir` / `outDir` 指向当前业务项目
- 多项目并行：各项目 `.env` 或 `.env.development` 设不同 `VITE_PORT` 即可
