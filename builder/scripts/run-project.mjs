/**
 * 用法（在业务项目 frontend/admin 目录执行）：
 *   node ../../../owl-ui/builder/scripts/run-project.mjs <dev|build> [project] [--reinstall]
 *
 * 约定：
 * - cwd = 业务项目根（含 .env.example / .env* / main.ts / public/）
 * - [project] 可省略：取自 .env* 的 VITE_APP_SYSTEM
 * - Vite 仍在 owl-ui/builder 目录运行（共享工具链，勿手改其配置）
 * - env / public / 产物均取自业务项目目录
 * - 首次无 node_modules 时会自动从 package.base.json 引导 pnpm install
 * - --reinstall：强制 pnpm install --force（即使依赖已存在）
 *
 * 配置：复制 .env.example → .env，再用 .env.development / .env.production 覆盖。
 * dev：从合并后的 VITE_PORT 起探测空闲端口，支持多项目并行。
 */
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, rmSync } from "node:fs";
import net from "node:net";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureBuilderToolchain } from "./ensure-toolchain.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const builderRoot = join(__dirname, "..");
const projectRoot = process.cwd();

const mode = process.argv[2];
const cliArgs = process.argv.slice(3);
const forceReinstall = cliArgs.includes("--reinstall");
/** CLI 显式项目名；缺省时从 .env* 的 VITE_APP_SYSTEM 读取 */
let project = cliArgs.find(a => !a.startsWith("-"));

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

/**
 * @param {string} slug
 * @param {{ name: string, dir: string }[]} pkgs
 * @returns {string | null}
 */
function tryResolveLogoPath(slug, pkgs) {
  const candidates = [
    `@bit-labs.cn/${slug}-ui`,
    `@bit-labs.cn/${slug}`,
    slug
  ];
  const hit = pkgs.find(p => candidates.includes(p.name));
  if (!hit) return null;
  const logoFile = join(hit.dir, "src", "assets", "logo.png");
  if (!existsSync(logoFile)) return null;
  return logoFile;
}

/**
 * 从入口文件导入的子系统包查找 logo
 * @param {string} entryFile
 * @param {{ name: string, dir: string }[]} pkgs
 * @param {{ parseEntryImportSpecifiers: Function, specifierToPackageName: Function }} utils
 * @returns {string | null}
 */
function resolveLogoFromEntryImports(entryFile, pkgs, utils) {
  const memberNames = pkgs.map(p => p.name);
  for (const spec of utils.parseEntryImportSpecifiers(entryFile)) {
    const pkgName = utils.specifierToPackageName(spec, memberNames);
    if (!pkgName) continue;
    const hit = pkgs.find(p => p.name === pkgName);
    if (!hit) continue;
    const logoFile = join(hit.dir, "src", "assets", "logo.png");
    if (existsSync(logoFile)) return logoFile;
  }
  return null;
}

/**
 * @param {string} projectKey
 * @param {string | null} explicitLogoSlug
 * @param {{ name: string, dir: string }[]} pkgs
 * @param {string} entryFile
 * @param {string} projectRoot
 * @param {{ parseEntryImportSpecifiers: Function, specifierToPackageName: Function }} utils
 * @returns {string | null}
 */
function resolveProjectLogoPath(
  projectKey,
  explicitLogoSlug,
  pkgs,
  entryFile,
  projectRoot,
  utils
) {
  const slugs = explicitLogoSlug ? [explicitLogoSlug] : [projectKey];
  for (const slug of slugs) {
    const logoPath = tryResolveLogoPath(slug, pkgs);
    if (logoPath) return logoPath;
  }

  if (!explicitLogoSlug) {
    const fromEntry = resolveLogoFromEntryImports(entryFile, pkgs, utils);
    if (fromEntry) return fromEntry;

    const localLogo = join(projectRoot, "src", "assets", "logo.png");
    if (existsSync(localLogo)) return localLogo;
  }

  console.warn(
    `[owl-ui-builder] 项目 "${projectKey}" 未找到 logo.png（已尝试启动名与子系统入口导入），侧边栏 logo 将不可用`
  );
  return null;
}

/**
 * @param {Record<string, string>} envMap
 * @param {string | undefined} explicit
 * @returns {{ project: string, title: string, baseUrl: string }}
 */
function resolveProjectFromEnv(envMap, explicit) {
  const fromEnv = (envMap.VITE_APP_SYSTEM || "").trim();
  const projectKey =
    explicit && !explicit.startsWith("-") ? explicit.trim() : fromEnv;

  if (!projectKey) {
    fail(
      `缺少项目名：请在 .env 中设置 VITE_APP_SYSTEM，或在命令行传入。\n` +
        `若尚无 .env，请先：cp .env.example .env\n` +
        `示例: node ../../../owl-ui/builder/scripts/run-project.mjs ${mode} gui-lv`
    );
  }

  const title = (envMap.VITE_APP_TITLE || "").trim();
  if (!title) {
    fail(
      `缺少 VITE_APP_TITLE。请先 cp .env.example .env 并填写，或用 .env.${mode === "dev" ? "development" : "production"} 覆盖。`
    );
  }

  const buRaw = (envMap.VITE_BASE_URL || "").trim();
  if (!buRaw) {
    fail(
      `缺少 VITE_BASE_URL。请先 cp .env.example .env 并填写，或用 .env.${mode === "dev" ? "development" : "production"} 覆盖。`
    );
  }

  const baseUrl = buRaw.replace(/\/+$/, "") + "/";
  return { project: projectKey, title, baseUrl };
}

function findFreePort(startPort, maxAttempts = 80) {
  return new Promise((resolve, reject) => {
    let port = startPort;

    const tryListen = () => {
      if (port > startPort + maxAttempts) {
        reject(
          new Error(
            `无法在端口 ${startPort}–${startPort + maxAttempts} 范围内找到空闲端口`
          )
        );
        return;
      }

      const server = net.createServer();
      server.unref();
      server.once("error", () => {
        port += 1;
        tryListen();
      });
      server.listen(port, "0.0.0.0", () => {
        server.close(() => resolve(port));
      });
    };

    tryListen();
  });
}

async function main() {
  if (mode !== "dev" && mode !== "build") {
    fail(
      `用法: 在 frontend/admin 目录执行\n  node ../../../owl-ui/builder/scripts/run-project.mjs <dev|build> [project] [--reinstall]\n示例: pnpm dev  |  pnpm dev:reinstall`
    );
  }

  if (projectRoot === builderRoot) {
    fail(
      `[owl-ui builder] 请在业务项目的 frontend/admin 目录执行（cwd 不能是 owl-ui/builder）。\n` +
        `示例: cd ../gui-lv/frontend/admin && pnpm ${mode}`
    );
  }

  try {
    ensureBuilderToolchain(builderRoot);
  } catch (e) {
    fail(e?.message || String(e));
  }

  const {
    loadProjectEnv,
    parseEntryImportSpecifiers,
    readWorkspaceMembers,
    resolveProjectEntryFile,
    specifierToPackageName
  } = await import("./builder-utils.mjs");
  const { generatePackage } = await import("./gen-package.mjs");
  const logoUtils = { parseEntryImportSpecifiers, specifierToPackageName };

  const viteMode = mode === "build" ? "production" : "development";
  const envMap = loadProjectEnv(projectRoot, viteMode);

  if (
    !existsSync(join(projectRoot, ".env")) &&
    !existsSync(join(projectRoot, `.env.${viteMode}`))
  ) {
    fail(
      `缺少环境配置。请复制模板后修改：\n  cp .env.example .env\n然后可用 .env.${viteMode} 按环境覆盖。`
    );
  }

  const resolved = resolveProjectFromEnv(envMap, project);
  project = resolved.project;
  const { title, baseUrl } = resolved;

  const entryFile = resolveProjectEntryFile({ projectRoot, env: envMap });
  if (!existsSync(entryFile)) {
    fail(`入口文件不存在：${entryFile}`);
  }

  const platformPath = join(projectRoot, "public", "platform-config.json");
  if (!existsSync(platformPath)) {
    fail(
      `缺少 ${platformPath}\n每个项目须自持 public/platform-config.json`
    );
  }

  /** 由 package.base.json + 该项目 UI 依赖闭包，生成 package.json / pnpm-workspace.yaml */
  let genChanged = false;
  try {
    const gen = generatePackage({ builderRoot, projectRoot, project, env: envMap });
    genChanged = gen.changed;
    console.log(
      `[owl-ui-builder] 已为 ${project} 生成依赖清单（UI 包 ${gen.uiNames.length} 个）`
    );
  } catch (e) {
    fail(`生成 package.json 失败：${e?.message || String(e)}`);
  }

  /** 生成后的 workspace 依赖是否已落到 node_modules（首次引导后常缺 @bit-labs.cn/*） */
  function workspaceDepsMissing() {
    try {
      const pkg = JSON.parse(
        readFileSync(join(builderRoot, "package.json"), "utf8")
      );
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      for (const name of Object.keys(deps)) {
        if (!name.startsWith("@bit-labs.cn/")) continue;
        const parts = name.split("/");
        if (!existsSync(join(builderRoot, "node_modules", ...parts))) {
          return true;
        }
      }
      return false;
    } catch {
      return true;
    }
  }

  const nodeModulesDir = join(builderRoot, "node_modules");
  const needInstall =
    forceReinstall ||
    !existsSync(nodeModulesDir) ||
    genChanged ||
    workspaceDepsMissing();
  if (needInstall && process.env.BUILDER_SKIP_INSTALL !== "1") {
    const installArgs = forceReinstall ? ["install", "--force"] : ["install"];
    console.log(
      forceReinstall
        ? `[owl-ui-builder] 强制重装 workspace 依赖（pnpm install --force）…`
        : `[owl-ui-builder] 正在同步 workspace 依赖（pnpm install）…`
    );
    const install = spawnSync("pnpm", installArgs, {
      cwd: builderRoot,
      stdio: "inherit",
      shell: process.platform === "win32"
    });
    if (install.status !== 0) {
      fail(
        "pnpm install 失败。若日志含 ERR_PNPM_IGNORED_BUILDS，请确认 owl-ui/builder/pnpm-workspace.yaml 含 allowBuilds；否则请检查网络后重试"
      );
    }
  } else if (needInstall && process.env.BUILDER_SKIP_INSTALL === "1") {
    console.warn(
      "[owl-ui-builder] 检测到依赖未就绪，但 BUILDER_SKIP_INSTALL=1，跳过 install（可能导致启动失败）"
    );
  }

  let logoPath = null;
  const pkgs = readWorkspaceMembers(join(builderRoot, "pnpm-workspace.yaml"));
  logoPath = resolveProjectLogoPath(
    project,
    null,
    pkgs,
    entryFile,
    projectRoot,
    logoUtils
  );

  const distDir = join(projectRoot, "dist");

  /** Windows 路径统一为正斜杠，避免 \n 等被嵌入生成代码时当成转义 */
  const entryFileNormalized = entryFile.replace(/\\/g, "/");
  const distDirNormalized = distDir.replace(/\\/g, "/");
  const projectRootNormalized = projectRoot.replace(/\\/g, "/");
  const env = {
    ...process.env,
    VITE_APP_SYSTEM: project,
    VITE_APP_TITLE: title,
    VITE_APP_ENTRY_FILE: entryFileNormalized,
    VITE_APP_OUT_DIR: distDirNormalized,
    VITE_APP_PROJECT_ROOT: projectRootNormalized,
    VITE_BASE_URL: baseUrl
  };
  if (logoPath) {
    env.VITE_APP_LOGO_PATH = logoPath.replace(/\\/g, "/");
  }

  if (mode === "dev") {
    const start = Number(envMap.VITE_PORT) || 8851;
    try {
      const port = await findFreePort(start);
      env.VITE_PORT = String(port);
      const logoHint = logoPath
        ? `，logo：${relative(builderRoot, logoPath).replace(/\\/g, "/")}`
        : "";
      console.log(
        `[owl-ui-builder] ${project} → http://localhost:${port}/  （标题：${title}，API：${baseUrl}${logoHint}）`
      );
    } catch (e) {
      fail(e.message || String(e));
    }
  }

  const viteCli = join(builderRoot, "node_modules", "vite", "bin", "vite.js");
  if (!existsSync(viteCli)) {
    fail("未找到 vite，工具链安装可能不完整，请重试 pnpm dev");
  }

  if (mode === "build") {
    try {
      rmSync(distDir, { recursive: true, force: true });
    } catch {
      /* ignore */
    }
    console.log(
      `[owl-ui-builder] 产物目录：${distDir.replace(/\\/g, "/")}`
    );
  }

  const viteArgs = mode === "build" ? [viteCli, "build"] : [viteCli];

  const result = spawnSync(process.execPath, viteArgs, {
    cwd: builderRoot,
    env,
    stdio: "inherit"
  });

  process.exit(result.status ?? 1);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
