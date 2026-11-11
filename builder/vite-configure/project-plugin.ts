import type { Plugin } from "vite";
import type { Connect } from "vite";
import {
  copyFileSync,
  createReadStream,
  existsSync,
  readFileSync,
  writeFileSync
} from "node:fs";
import { join } from "node:path";

const RESOLVED_VIRTUAL = "\0virtual:project-entry";

/** 将 logo 中间件插到 connect 栈最前，优先于 public/ 静态资源 */
function prependMiddleware(
  middlewares: Connect.Server,
  handler: Connect.NextHandleFunction
) {
  middlewares.use(handler);
  const stack = middlewares.stack;
  if (stack.length > 1) {
    const layer = stack.pop();
    if (layer) stack.unshift(layer);
  }
}

/**
 * 多项目并行 dev/build：
 * - virtual:project-entry：加载 VITE_APP_ENTRY_FILE（项目 main.ts）
 * - env / public 均来自业务项目根（VITE_APP_PROJECT_ROOT）
 * - dev：拦截 platform-config.json，按进程注入 Title（不写磁盘）
 * - dev：拦截 /logo.png，返回子应用 src/assets/logo.png
 * - build：在产物目录覆盖写入 platform-config.json 与 logo.png
 */
export function owlBuilderProjectPlugin(options: {
  projectRoot: string;
}): Plugin {
  let outDir = "";
  let isBuild = false;

  return {
    name: "owl-builder-project",
    enforce: "pre",
    configResolved(config) {
      outDir = config.build.outDir;
      isBuild = config.command === "build";
    },
    resolveId(id) {
      if (id === "virtual:project-entry") return RESOLVED_VIRTUAL;
      return undefined;
    },
    load(id) {
      if (id !== RESOLVED_VIRTUAL) return undefined;

      /** Windows 路径含 \n 等序列，嵌入生成代码时必须 JSON.stringify，避免变成换行导致非法 JS */
      const toModulePath = (p: string) => JSON.stringify(p.replace(/\\/g, "/"));

      const explicitEntry = process.env.VITE_APP_ENTRY_FILE;
      if (!explicitEntry) {
        return `
export function loadProjectEntry() {
  return Promise.reject(new Error(
    "[owl-ui-builder] 缺少环境变量 VITE_APP_ENTRY_FILE，请在业务项目 frontend/admin 目录执行 pnpm dev / pnpm build"
  ));
}
`;
      }

      if (!existsSync(explicitEntry)) {
        return `export function loadProjectEntry() {
  return Promise.reject(new Error(${JSON.stringify(`[owl-ui-builder] 入口不存在: ${explicitEntry}`)}));
}
`;
      }

      return `export function loadProjectEntry() {\n  return import(${toModulePath(explicitEntry)});\n}\n`;
    },
    configureServer(server) {
      const logoPath = process.env.VITE_APP_LOGO_PATH;

      if (logoPath) {
        prependMiddleware(server.middlewares, (req, res, next) => {
          const base = server.config.base.replace(/\/$/, "") || "";
          const pathname = new URL(req.url || "/", "http://vite.local").pathname;
          const logoUrlPaths = new Set<string>(["/logo.png"]);
          if (base) logoUrlPaths.add(`${base}/logo.png`);

          if (!logoUrlPaths.has(pathname)) {
            next();
            return;
          }
          if (!existsSync(logoPath)) {
            next();
            return;
          }
          res.setHeader("Content-Type", "image/png");
          res.setHeader("Cache-Control", "no-cache");
          createReadStream(logoPath).pipe(res);
        });
      }

      server.middlewares.use((req, res, next) => {
        const title = process.env.VITE_APP_TITLE?.trim();
        if (!title) {
          next();
          return;
        }

        const base = server.config.base.replace(/\/$/, "") || "";
        const pathname = new URL(req.url || "/", "http://vite.local").pathname;

        const paths = new Set<string>(["/platform-config.json"]);
        if (base) paths.add(`${base}/platform-config.json`);

        let hit = false;
        for (const p of paths) {
          if (pathname === p) {
            hit = true;
            break;
          }
        }
        if (!hit) {
          next();
          return;
        }

        const platformPath = join(
          options.projectRoot,
          "public",
          "platform-config.json"
        );
        if (!existsSync(platformPath)) {
          next();
          return;
        }

        try {
          const json = JSON.parse(readFileSync(platformPath, "utf8")) as Record<
            string,
            unknown
          >;
          json.Title = title;
          const body = `${JSON.stringify(json, null, 2)}\n`;
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.end(body);
        } catch {
          next();
        }
      });
    },
    closeBundle() {
      if (!isBuild) return;

      const title = process.env.VITE_APP_TITLE?.trim();
      const platformPath = join(
        options.projectRoot,
        "public",
        "platform-config.json"
      );
      if (title && existsSync(platformPath)) {
        try {
          const json = JSON.parse(readFileSync(platformPath, "utf8")) as Record<
            string,
            unknown
          >;
          json.Title = title;
          writeFileSync(
            join(outDir, "platform-config.json"),
            `${JSON.stringify(json, null, 2)}\n`
          );
        } catch {
          /* ignore */
        }
      }

      const logoPath = process.env.VITE_APP_LOGO_PATH;
      if (logoPath && existsSync(logoPath)) {
        try {
          copyFileSync(logoPath, join(outDir, "logo.png"));
        } catch {
          /* ignore */
        }
      }
    }
  };
}
