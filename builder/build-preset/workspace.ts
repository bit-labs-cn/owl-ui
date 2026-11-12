import { dirname, resolve } from "node:path";
import { existsSync, readFileSync } from "node:fs";

export interface WorkspaceLoadOptions {
  startDir?: string;
  workspaceFilePath?: string;
  onlyExternal?: boolean;
}

/** 工作空间里的一个包。别名规则跟这个包的 package.json 放在一起。 */
export class WorkspacePackage {
  readonly name: string;
  readonly dir: string;
  readonly srcDir: string;
  private readonly exportsField: Record<string, unknown>;

  private constructor(
    name: string,
    dir: string,
    srcDir: string,
    exportsField: Record<string, unknown>
  ) {
    this.name = name;
    this.dir = dir;
    this.srcDir = srcDir;
    this.exportsField = exportsField;
  }

  /** 目录里没有 package.json 时返回 null。 */
  static tryRead(dir: string): WorkspacePackage | null {
    const pkgFile = resolve(dir, "package.json");
    if (!existsSync(pkgFile)) return null;
    const pkg = JSON.parse(readFileSync(pkgFile, "utf-8")) as {
      name?: unknown;
      exports?: unknown;
    };
    const exportsField =
      pkg.exports && typeof pkg.exports === "object"
        ? (pkg.exports as Record<string, unknown>)
        : {};
    return new WorkspacePackage(
      String(pkg.name),
      dir,
      resolve(dir, "src"),
      exportsField
    );
  }

  /**
   * 按 package.json `exports` 生成子路径别名。
   *
   * 通配符导出优先，精确导出兜底。同一 find 只保留通配符那条，
   * 这样 `@.../store` 既能让裸导入落到目录（Vite 解析 index），
   * 又能让 `@.../store/modules/user` 继续拼接子路径。
   */
  aliasEntries(): Array<[string, string]> {
    const wildcardAliases: Array<[string, string]> = [];
    const exactAliases: Array<[string, string]> = [];

    for (const [key, value] of Object.entries(this.exportsField)) {
      if (typeof value !== "string" || !value.startsWith("./")) continue;
      if (key === ".") continue;

      if (key.includes("*") && value.includes("*")) {
        const subPath = key.slice(2).replace(/\/\*$/, "");
        const target = value.replace(/^\.\//, "").replace(/\/\*$/, "");
        const find = subPath ? `${this.name}/${subPath}` : this.name;
        wildcardAliases.push([find, resolve(this.dir, target)]);
        continue;
      }

      // `theme` 指向具体样式文件：保留通配符别名，避免把 theme/index.scss 拼坏
      if (key === "./theme") continue;
      const find = `${this.name}/${key.slice(2)}`;
      const target = value
        .replace(/^\.\//, "")
        .replace(/\.(ts|tsx|js|mjs|cjs|json)$/, "");
      exactAliases.push([find, resolve(this.dir, target)]);
    }

    const merged = new Map<string, string>();
    for (const [find, replacement] of exactAliases) {
      merged.set(find, replacement);
    }
    for (const [find, replacement] of wildcardAliases) {
      merged.set(find, replacement);
    }
    return [...merged.entries()];
  }
}

/** 一份 pnpm-workspace.yaml 以及它列出来的包。 */
export class PnpmWorkspace {
  private readonly packages: WorkspacePackage[];

  private constructor(packages: WorkspacePackage[]) {
    this.packages = packages;
  }

  static load(options: WorkspaceLoadOptions = {}): PnpmWorkspace {
    const {
      startDir = process.cwd(),
      workspaceFilePath,
      onlyExternal = false
    } = options;
    const wsFile = workspaceFilePath ?? PnpmWorkspace.findFile(startDir);
    if (!wsFile || !existsSync(wsFile)) return new PnpmWorkspace([]);

    const wsRoot = dirname(wsFile);
    const raw = readFileSync(wsFile, "utf-8");
    const allPaths = [...raw.matchAll(/-\s+['"]?([^'"\n]+)['"]?/g)].map(match =>
      match[1].trim()
    );
    // onlyExternal 只排除 builder 自身（"."），父目录 ".." 也是需要参与别名的包
    const packagePaths = onlyExternal
      ? allPaths.filter(item => item !== ".")
      : allPaths;

    const packages = packagePaths
      .map(packagePath => WorkspacePackage.tryRead(resolve(wsRoot, packagePath)))
      .filter((pkg): pkg is WorkspacePackage => pkg !== null);
    return new PnpmWorkspace(packages);
  }

  list(): WorkspacePackage[] {
    return this.packages;
  }

  /**
   * 深层路径优先，短前缀与包名最后兜底。
   * 同一别名只保留先出现的那条。
   */
  aliases(): Record<string, string> {
    const aliases: Array<[string, string]> = [];
    for (const pkg of this.packages) {
      aliases.push(...pkg.aliasEntries());
    }
    for (const pkg of this.packages) {
      aliases.push([pkg.name, pkg.srcDir]);
    }
    aliases.sort((a, b) => b[0].length - a[0].length);
    const merged = new Map<string, string>();
    for (const [find, replacement] of aliases) {
      if (!merged.has(find)) merged.set(find, replacement);
    }
    return Object.fromEntries(merged);
  }

  fsAllow(root: string): string[] {
    return [root, ...this.packages.map(pkg => pkg.dir)];
  }

  tailwindContent(baseContent: string[]): string[] {
    const dirs = ["src", "theme", "core"];
    return [
      ...baseContent,
      ...this.packages.flatMap(pkg =>
        dirs.map(dir => `${pkg.dir}/${dir}/**/*.{vue,js,ts,jsx,tsx}`)
      )
    ];
  }

  private static findFile(startDir: string): string | null {
    let current = resolve(startDir);
    while (current !== dirname(current)) {
      const wsFile = resolve(current, "pnpm-workspace.yaml");
      if (existsSync(wsFile)) return wsFile;
      current = dirname(current);
    }
    return null;
  }
}
