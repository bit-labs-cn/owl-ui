/**
 * 由 package.base.json（公共工具链）+ 目标项目所需的子系统 UI 依赖，合并生成：
 *   - <builderRoot>/package.json        （base + 该项目 UI workspace 依赖）
 *   - <builderRoot>/pnpm-workspace.yaml  （"." + 该项目用到的子系统目录）
 *
 * 用法：
 *   # 在业务 frontend/admin 目录：
 *   node ../../../owl-ui/builder/scripts/gen-package.mjs [project]
 *   # 在 owl-ui/builder（Docker / 全量）：
 *   node scripts/gen-package.mjs --all
 *
 * 子系统全集由扫描 monorepo 中的 @bit-labs.cn/* 包得出（无需手维护清单）；
 * 「某项目用到哪些」由入口 main.ts 的 import + 各包 package.json 依赖闭包裁剪。
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import {
  ALWAYS_INCLUDE_PACKAGES,
  loadProjectEnv,
  parseEntryImportSpecifiers,
  resolveDepClosure,
  resolveProjectEntryFile,
  scanMonorepoUiPackages,
  specifierToPackageName
} from "./builder-utils.mjs";
import {
  allowBuildsFromBase,
  formatPnpmWorkspaceYaml
} from "./workspace-yaml.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BUILDER_ROOT = join(__dirname, "..");

function sortObjectKeys(obj) {
  return Object.fromEntries(
    Object.keys(obj)
      .sort((a, b) => a.localeCompare(b))
      .map(k => [k, obj[k]])
  );
}

/**
 * 计算某项目（或全部）需要的工作区成员。
 * @returns {{ members: {name:string,dir:string,rel:string}[], names: string[] }}
 */
function resolveNeededMembers({ builderRoot, projectRoot, project, env, all }) {
  const scanned = scanMonorepoUiPackages(builderRoot);

  if (all || !project) {
    const names = scanned.map(m => m.name);
    return { members: scanned, names };
  }

  if (projectRoot === builderRoot) {
    throw new Error(
      `[gen-package] 请在业务项目 frontend/admin 目录生成依赖（cwd 不能是 owl-ui/builder）`
    );
  }

  const entryFile = resolveProjectEntryFile({ projectRoot, env });
  if (!existsSync(entryFile)) {
    throw new Error(`[gen-package] 入口文件不存在：${entryFile}`);
  }

  const members = [...scanned];
  const seed = new Set(ALWAYS_INCLUDE_PACKAGES);

  /** 业务项目：自动纳入自身 UI 包 */
  const localPkgFile = join(projectRoot, "package.json");
  if (existsSync(localPkgFile)) {
    try {
      const pkg = JSON.parse(readFileSync(localPkgFile, "utf8"));
      const localName = typeof pkg?.name === "string" ? pkg.name.trim() : "";
      if (localName) {
        if (!members.some(m => m.name === localName)) {
          members.push({
            name: localName,
            dir: projectRoot,
            rel: relative(builderRoot, projectRoot).replace(/\\/g, "/")
          });
        }
        seed.add(localName);
      }
    } catch {
      /* ignore */
    }
  }

  const specs = parseEntryImportSpecifiers(entryFile);
  const resolvedMemberNames = members.map(m => m.name);
  for (const spec of specs) {
    const name = specifierToPackageName(spec, resolvedMemberNames);
    if (name) seed.add(name);
  }

  const closure = resolveDepClosure([...seed], members);
  return { members, names: [...closure] };
}

/**
 * 生成 package.json 与 pnpm-workspace.yaml。
 * @returns {{ changed: boolean, packages: string[], uiNames: string[] }}
 */
export function generatePackage({
  builderRoot = BUILDER_ROOT,
  projectRoot = process.cwd(),
  project = null,
  env = null,
  all = false
} = {}) {
  const basePath = join(builderRoot, "package.base.json");
  if (!existsSync(basePath)) {
    throw new Error(`缺少 package.base.json：${basePath}`);
  }
  const base = JSON.parse(readFileSync(basePath, "utf8"));

  const envMap =
    env ||
    loadProjectEnv(
      projectRoot,
      process.env.NODE_ENV === "production" ? "production" : "development"
    );

  /** 未显式传 project 时从 VITE_APP_SYSTEM 推断 */
  if (!all && !project) {
    const fromEnv = (envMap.VITE_APP_SYSTEM || "").trim();
    if (fromEnv) project = fromEnv;
  }

  const { members, names } = resolveNeededMembers({
    builderRoot,
    projectRoot,
    project,
    env: envMap,
    all
  });

  const uiNames = [...names].sort((a, b) => a.localeCompare(b));

  const uiDeps = {};
  for (const name of uiNames) uiDeps[name] = "workspace:*";

  const pkg = {
    ...base,
    devDependencies: sortObjectKeys({
      ...(base.devDependencies || {}),
      ...uiDeps
    })
  };

  /** workspace.yaml：恒含 "."，再加各需要成员的相对路径 */
  const byName = new Map(members.map(m => [m.name, m]));
  const relPaths = uiNames
    .map(n => byName.get(n)?.rel)
    .filter(rel => typeof rel === "string" && rel !== ".");
  const wsPackages = [".", ...relPaths];

  const wsPath = join(builderRoot, "pnpm-workspace.yaml");
  const pkgPath = join(builderRoot, "package.json");
  const nextPkgBody = `${JSON.stringify(pkg, null, 2)}\n`;
  // pnpm 11：allowBuilds 必须在 workspace yaml；仅写 packages 会导致首次 install 报 ERR_PNPM_IGNORED_BUILDS
  const wsBody = formatPnpmWorkspaceYaml({
    packages: wsPackages,
    allowBuilds: allowBuildsFromBase(base)
  });

  let prevPkgBody = null;
  if (existsSync(pkgPath)) {
    try {
      prevPkgBody = readFileSync(pkgPath, "utf8");
    } catch {
      prevPkgBody = null;
    }
  }
  let prevWsBody = null;
  if (existsSync(wsPath)) {
    try {
      prevWsBody = readFileSync(wsPath, "utf8");
    } catch {
      prevWsBody = null;
    }
  }
  const changed = prevPkgBody !== nextPkgBody || prevWsBody !== wsBody;

  writeFileSync(pkgPath, nextPkgBody);
  writeFileSync(wsPath, wsBody);

  return { changed, packages: wsPackages, uiNames };
}

function main() {
  const arg = process.argv[2];
  const all = !arg || arg === "--all" || arg.startsWith("-");
  const project = all ? null : arg;

  const { packages, uiNames, changed } = generatePackage({
    project,
    all
  });

  const scope = all ? "扫描到的全部 UI 包" : `项目 "${project}"`;
  console.log(
    `[gen-package] 已生成 package.json / pnpm-workspace.yaml（${scope}）` +
      `\n  UI 依赖(${uiNames.length}): ${uiNames.join(", ") || "(无)"}` +
      `\n  workspace 成员(${packages.length}): ${packages.join(", ")}` +
      `\n  相对上次${changed ? "有变化（建议 pnpm install）" : "无变化"}`
  );
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("gen-package.mjs")) {
  main();
}
