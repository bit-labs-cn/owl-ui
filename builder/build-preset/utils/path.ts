import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { existsSync } from "node:fs";

const _require = createRequire(import.meta.url);

/** 默认相对 build-preset 目录解析，不随这个文件挪进 utils 而改变。 */
const presetAnchor = new URL("../index.ts", import.meta.url).href;

/**
 * 根据可选路径片段生成绝对路径。
 * 调用方应传入自己的 import.meta.url，路径就相对那个文件。
 */
export function pathResolve(dir = ".", metaUrl = presetAnchor): string {
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
