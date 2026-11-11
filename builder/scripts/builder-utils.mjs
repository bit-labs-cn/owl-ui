/**
 * owl-ui/builder 脚本共享工具。
 * 被 run-project.mjs 与 gen-package.mjs 复用：workspace 成员解析、入口 import 解析、依赖闭包计算、入口文件定位。
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { parse as parseYaml } from "yaml";

/** vite.config / bootstrap 自身依赖的核心包，任何项目都必须可解析 */
export const ALWAYS_INCLUDE_PACKAGES = ["@bit-labs.cn/owl-ui"];

const SKIP_DIR_NAMES = new Set([
  "node_modules",
  "dist",
  ".git",
  ".idea",
  ".vscode",
  "coverage",
  "tmp",
  "temp",
  "builder"
]);

function readUtf8(p) {
  return readFileSync(p, "utf8").replace(/^\uFEFF/, "");
}

/**
 * 读取一个 pnpm-workspace.yaml，返回其登记的工作区成员（仅保留磁盘上真实存在 package.json 的）。
 * @param {string} workspaceFilePath pnpm-workspace.yaml 的绝对路径
 * @returns {{ name: string, dir: string, rel: string }[]}
 */
export function readWorkspaceMembers(workspaceFilePath) {
  if (!existsSync(workspaceFilePath)) return [];
  const rootDir = dirname(workspaceFilePath);
  const map = parseYaml(readUtf8(workspaceFilePath));
  const paths = Array.isArray(map?.packages) ? map.packages : [];

  const result = [];
  for (const rel of paths) {
    if (typeof rel !== "string") continue;
    const dir = resolve(rootDir, rel);
    const pkgFile = join(dir, "package.json");
    if (!existsSync(pkgFile)) continue;
    try {
      const pkg = JSON.parse(readUtf8(pkgFile));
      if (pkg && typeof pkg.name === "string" && pkg.name.trim()) {
        result.push({ name: pkg.name, dir, rel });
      }
    } catch {
      /* ignore */
    }
  }
  return result;
}

/**
 * @param {string} dir
 * @param {string} builderRoot
 * @returns {{ name: string, dir: string, rel: string } | null}
 */
function tryReadUiPackage(dir, builderRoot) {
  const pkgFile = join(dir, "package.json");
  if (!existsSync(pkgFile)) return null;
  try {
    const pkg = JSON.parse(readUtf8(pkgFile));
    const name = typeof pkg?.name === "string" ? pkg.name.trim() : "";
    if (!name.startsWith("@bit-labs.cn/")) return null;
    return {
      name,
      dir,
      rel: relative(builderRoot, dir).replace(/\\/g, "/")
    };
  } catch {
    return null;
  }
}

/**
 * 扫描 monorepo 中可参与 workspace 的 @bit-labs.cn/* UI 包。
 * 覆盖：owl-ui、各仓库 frontend/admin、firefly/cloud/frontend/admin 等（深度有限，跳过 node_modules）。
 * @param {string} builderRoot
 * @returns {{ name: string, dir: string, rel: string }[]}
 */
export function scanMonorepoUiPackages(builderRoot) {
  const monorepoRoot = resolve(builderRoot, "../..");
  /** @type {Map<string, { name: string, dir: string, rel: string }>} */
  const byName = new Map();

  const add = dir => {
    const hit = tryReadUiPackage(dir, builderRoot);
    if (!hit) return;
    const prev = byName.get(hit.name);
    if (!prev || prev.dir.length > hit.dir.length) {
      byName.set(hit.name, hit);
    }
  };

  /** 明确根包：owl-ui 自身（builder 的父目录） */
  add(resolve(builderRoot, ".."));

  /**
   * @param {string} dir
   * @param {number} depth
   */
  const walk = (dir, depth) => {
    if (depth > 5) return;
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const ent of entries) {
      if (!ent.isDirectory()) continue;
      if (SKIP_DIR_NAMES.has(ent.name) || ent.name.startsWith(".")) continue;
      const child = join(dir, ent.name);

      if (ent.name === "admin") {
        const parent = dirname(child);
        if (
          parent.endsWith(`${"/"}frontend`) ||
          parent.endsWith("\\frontend")
        ) {
          add(child);
        }
      }

      /** owl-ui 已单独加入；其它含 package.json 的 @bit-labs.cn 包也收 */
      if (ent.name !== "owl-ui-builder") {
        add(child);
      }

      try {
        if (statSync(child).isDirectory()) walk(child, depth + 1);
      } catch {
        /* ignore */
      }
    }
  };

  walk(monorepoRoot, 0);

  return [...byName.values()].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * 解析入口文件里所有 `from "@bit-labs.cn/..."` 的 import 说明符（原样，可能带子路径）。
 * @param {string} entryFile
 * @returns {string[]}
 */
export function parseEntryImportSpecifiers(entryFile) {
  if (!existsSync(entryFile)) return [];
  const text = readUtf8(entryFile);
  const importRe = /from\s+["'](@bit-labs\.cn\/[^"']+)["']/g;
  const specs = [];
  let m;
  while ((m = importRe.exec(text)) !== null) {
    specs.push(m[1]);
  }
  return specs;
}

/**
 * 把一个 import 说明符（可能形如 `@bit-labs.cn/owl-ui/bootstrap`）映射到工作区包名。
 * 取「最长前缀匹配」的成员名。
 * @param {string} spec
 * @param {string[]} memberNames
 * @returns {string | null}
 */
export function specifierToPackageName(spec, memberNames) {
  let best = null;
  for (const name of memberNames) {
    if (spec === name || spec.startsWith(`${name}/`)) {
      if (!best || name.length > best.length) best = name;
    }
  }
  return best;
}

/**
 * 从 seed 包出发，按各包 package.json 里的 @bit-labs.cn/* 依赖做传递闭包，
 * 只在传入的工作区成员集合内闭合。
 * @param {string[]} seedNames
 * @param {{ name: string, dir: string }[]} members
 * @returns {Set<string>}
 */
export function resolveDepClosure(seedNames, members) {
  const byName = new Map(members.map(m => [m.name, m]));
  const result = new Set();
  const queue = [...seedNames];

  while (queue.length) {
    const name = queue.shift();
    if (result.has(name)) continue;
    const member = byName.get(name);
    if (!member) continue;
    result.add(name);

    let pkg;
    try {
      pkg = JSON.parse(readUtf8(join(member.dir, "package.json")));
    } catch {
      continue;
    }
    const deps = {
      ...pkg.dependencies,
      ...pkg.devDependencies,
      ...pkg.peerDependencies
    };
    for (const dep of Object.keys(deps)) {
      if (byName.has(dep) && !result.has(dep)) queue.push(dep);
    }
  }
  return result;
}

/**
 * 解析单个 dotenv 文件（KEY=VALUE，忽略注释与空行；支持引号）。
 * @param {string} filePath
 * @returns {Record<string, string>}
 */
export function parseEnvFile(filePath) {
  if (!existsSync(filePath)) return {};
  const out = {};
  const text = readFileSync(filePath, "utf8");
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    if (!key) continue;
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

/**
 * 合并 .env + .env.[mode]（后者覆盖前者），与 Vite loadEnv 顺序一致。
 * @param {string} projectRoot
 * @param {"dev" | "build" | "development" | "production"} mode
 * @returns {Record<string, string>}
 */
export function loadProjectEnv(projectRoot, mode) {
  const viteMode =
    mode === "dev" || mode === "development" ? "development" : "production";
  return {
    ...parseEnvFile(join(projectRoot, ".env")),
    ...parseEnvFile(join(projectRoot, `.env.${viteMode}`))
  };
}

/**
 * 定位某项目的入口文件（与 run-project.mjs 的语义保持一致）。
 * - 默认入口 <projectRoot>/main.ts
 * - 环境变量 VITE_APP_ENTRY（相对 projectRoot）优先
 * @param {object} opts
 * @param {string} opts.projectRoot
 * @param {Record<string, string>} [opts.env]
 * @param {string} [opts.entry]
 * @returns {string}
 */
export function resolveProjectEntryFile({ projectRoot, env = {}, entry }) {
  const entryRaw =
    (typeof entry === "string" && entry.trim()) ||
    (typeof env.VITE_APP_ENTRY === "string" && env.VITE_APP_ENTRY.trim()) ||
    "";
  if (entryRaw) {
    return resolve(projectRoot, entryRaw);
  }
  return join(projectRoot, "main.ts");
}
