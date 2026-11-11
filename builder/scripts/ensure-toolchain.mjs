/**
 * 仅用 Node 内置模块：在 owl-ui-builder 尚无 node_modules 时，
 * 从 package.base.json 引导安装工具链（含 yaml / vite）。
 */
import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  allowBuildsFromBase,
  formatPnpmWorkspaceYaml
} from "./workspace-yaml.mjs";

/**
 * 粗解析现有 workspace 的 packages 列表（无 yaml 依赖；失败则回退 ["."]）
 * @param {string} text
 * @returns {string[]}
 */
function peekWorkspacePackages(text) {
  const packages = [];
  let inPackages = false;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trimEnd();
    if (/^packages:\s*$/.test(line)) {
      inPackages = true;
      continue;
    }
    if (inPackages) {
      if (/^[A-Za-z]/.test(line.trim())) break;
      const m = line.match(/^\s*-\s+(.+)\s*$/);
      if (!m) continue;
      let v = m[1].trim();
      if (
        (v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))
      ) {
        v = v.slice(1, -1);
      }
      if (v) packages.push(v);
    }
  }
  return packages.length ? packages : ["."];
}

/**
 * 保证 pnpm-workspace.yaml 含 allowBuilds（pnpm 11 首次 install 必需）
 * @param {string} builderRoot
 * @param {object} base
 */
function ensureAllowBuildsInWorkspace(builderRoot, base) {
  const wsYaml = join(builderRoot, "pnpm-workspace.yaml");
  const allowBuilds = allowBuildsFromBase(base);
  let packages = ["."];
  if (existsSync(wsYaml)) {
    try {
      packages = peekWorkspacePackages(readFileSync(wsYaml, "utf8"));
    } catch {
      packages = ["."];
    }
  }
  writeFileSync(
    wsYaml,
    formatPnpmWorkspaceYaml({ packages, allowBuilds })
  );
}

/**
 * @param {string} builderRoot
 */
export function ensureBuilderToolchain(builderRoot) {
  const yamlDir = join(builderRoot, "node_modules", "yaml");
  const pkgJson = join(builderRoot, "package.json");
  const baseJson = join(builderRoot, "package.base.json");

  if (existsSync(yamlDir) && existsSync(pkgJson)) {
    return false;
  }

  if (!existsSync(baseJson)) {
    throw new Error(`[owl-ui-builder] 缺少 package.base.json：${baseJson}`);
  }

  const base = JSON.parse(readFileSync(baseJson, "utf8"));

  if (!existsSync(pkgJson)) {
    copyFileSync(baseJson, pkgJson);
    console.log("[owl-ui-builder] 已从 package.base.json 生成 package.json");
  }

  ensureAllowBuildsInWorkspace(builderRoot, base);

  console.log(
    "[owl-ui-builder] 工具链未安装，正在 pnpm install（首次可能较慢）…"
  );
  const install = spawnSync("pnpm", ["install"], {
    cwd: builderRoot,
    stdio: "inherit",
    shell: process.platform === "win32"
  });
  if (install.status !== 0) {
    throw new Error(
      "[owl-ui-builder] pnpm install 失败。若出现 ERR_PNPM_IGNORED_BUILDS，请确认 pnpm-workspace.yaml 含 allowBuilds；否则请检查网络后重试"
    );
  }
  if (!existsSync(yamlDir)) {
    throw new Error(
      "[owl-ui-builder] 安装后仍找不到 yaml，请确认 package.base.json 含 yaml 依赖"
    );
  }
  return true;
}
