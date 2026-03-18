import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { existsSync } from "node:fs";

const _require = createRequire(import.meta.url);

/**
 * 根据可选路径片段生成绝对路径
 */
export function pathResolve(dir = ".", metaUrl = import.meta.url): string {
  const currentFileDir = dirname(fileURLToPath(metaUrl));
  const buildDir = resolve(currentFileDir, "build");
  const resolvedPath = resolve(currentFileDir, dir);

  if (resolvedPath.startsWith(buildDir)) {
    return fileURLToPath(metaUrl);
  }

  return resolvedPath;
}

/**
 * 解析包根目录
 */
export function resolvePackageRoot(pkgName: string): string {
  const entryFile = _require.resolve(pkgName);
  let dir = dirname(entryFile);

  while (dir !== dirname(dir)) {
    if (existsSync(resolve(dir, "package.json"))) {
      return dir;
    }
    dir = dirname(dir);
  }

  throw new Error(`Cannot find package root for ${pkgName}`);
}

/**
 * 解析 workspace/依赖包中的子路径
 */
export function resolvePackagePath(pkgName: string, ...subPaths: string[]): string {
  return resolve(resolvePackageRoot(pkgName), ...subPaths);
}
