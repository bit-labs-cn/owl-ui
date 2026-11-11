import { dirname, resolve } from "node:path";
import { existsSync, readFileSync } from "node:fs";

export interface WorkspacePackage {
  name: string;
  dir: string;
  srcDir: string;
}

interface GetWorkspacePackagesOptions {
  startDir?: string;
  workspaceFilePath?: string;
  onlyExternal?: boolean;
}

function findWorkspaceFile(startDir: string): string | null {
  let current = resolve(startDir);
  while (current !== dirname(current)) {
    const wsFile = resolve(current, "pnpm-workspace.yaml");
    if (existsSync(wsFile)) return wsFile;
    current = dirname(current);
  }
  return null;
}

export function getWorkspacePackages(
  options: GetWorkspacePackagesOptions = {}
): WorkspacePackage[] {
  const {
    startDir = process.cwd(),
    workspaceFilePath,
    onlyExternal = false
  } = options;
  const wsFile = workspaceFilePath ?? findWorkspaceFile(startDir);
  if (!wsFile || !existsSync(wsFile)) return [];

  const wsRoot = dirname(wsFile);
  const raw = readFileSync(wsFile, "utf-8");
  const allPaths = [...raw.matchAll(/-\s+['"]?([^'"\n]+)['"]?/g)].map(match =>
    match[1].trim()
  );
  // onlyExternal 只排除 builder 自身（"."），父目录 ".." 也是需要参与别名的包
  const packagePaths = onlyExternal
    ? allPaths.filter(item => item !== ".")
    : allPaths;

  return packagePaths
    .map(packagePath => resolve(wsRoot, packagePath))
    .filter(dir => existsSync(resolve(dir, "package.json")))
    .map(dir => {
      const pkg = JSON.parse(readFileSync(resolve(dir, "package.json"), "utf-8"));
      return {
        name: String(pkg.name),
        dir,
        srcDir: resolve(dir, "src")
      };
    });
}

/**
 * 按包自身的 package.json `exports` 生成子路径别名。
 *
 * 例：owl-ui 的 `"./core/*": "./src-core/*"` 会得到
 *   `@bit-labs.cn/owl-ui/core` -> `<owl-ui>/src-core`
 *
 * 通配符导出优先，精确导出兜底。同一 find 只保留通配符那条，
 * 这样 `@.../store` 既能让裸导入落到目录（Vite 解析 index），
 * 又能让 `@.../store/modules/user` 继续拼接子路径。
 */
function exportsAliases(pkg: WorkspacePackage): Record<string, string> {
  const pkgFile = resolve(pkg.dir, "package.json");
  if (!existsSync(pkgFile)) return {};
  let exportsField: Record<string, unknown> | undefined;
  try {
    exportsField = JSON.parse(readFileSync(pkgFile, "utf-8")).exports;
  } catch {
    return {};
  }
  if (!exportsField || typeof exportsField !== "object") return {};

  const wildcardAliases: Array<[string, string]> = [];
  const exactAliases: Array<[string, string]> = [];

  for (const [key, value] of Object.entries(exportsField)) {
    if (typeof value !== "string" || !value.startsWith("./")) continue;
    if (key === ".") continue;

    if (key.includes("*") && value.includes("*")) {
      const subPath = key.slice(2).replace(/\/\*$/, "");
      const target = value.replace(/^\.\//, "").replace(/\/\*$/, "");
      const find = subPath ? `${pkg.name}/${subPath}` : pkg.name;
      wildcardAliases.push([find, resolve(pkg.dir, target)]);
      continue;
    }

    // `theme` 指向具体样式文件：保留通配符别名，避免把 theme/index.scss 拼坏
    if (key === "./theme") continue;
    const find = `${pkg.name}/${key.slice(2)}`;
    const target = value
      .replace(/^\.\//, "")
      .replace(/\.(ts|tsx|js|mjs|cjs|json)$/, "");
    exactAliases.push([find, resolve(pkg.dir, target)]);
  }

  // 同一 find 只保留通配符那条：裸导入走目录解析，子路径继续拼接
  const merged = new Map<string, string>();
  for (const [find, replacement] of [...wildcardAliases, ...exactAliases]) {
    if (!merged.has(find)) merged.set(find, replacement);
  }
  return Object.fromEntries(merged);
}

export function createWorkspaceAlias(
  packages: WorkspacePackage[]
): Record<string, string> {
  const aliases: Array<[string, string]> = [];
  for (const pkg of packages) {
    aliases.push(...Object.entries(exportsAliases(pkg)));
  }
  for (const pkg of packages) {
    aliases.push([pkg.name, pkg.srcDir]);
  }
  // 子路径在前，包名兜底在后；同一 find 保留先出现的配置
  const merged = new Map<string, string>();
  for (const [find, replacement] of aliases) {
    if (!merged.has(find)) merged.set(find, replacement);
  }
  return Object.fromEntries(merged);
}

export function createFsAllow(root: string, packages: WorkspacePackage[]): string[] {
  return [root, ...packages.map(pkg => pkg.dir)];
}

export function createTailwindContent(
  baseContent: string[],
  packages: WorkspacePackage[]
): string[] {
  return [
    ...baseContent,
    ...packages.map(pkg => `${pkg.srcDir}/**/*.{vue,js,ts,jsx,tsx}`)
  ];
}
