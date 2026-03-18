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
  const packagePaths = onlyExternal
    ? allPaths.filter(item => item.startsWith("../"))
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

export function createWorkspaceAlias(
  packages: WorkspacePackage[]
): Record<string, string> {
  return Object.fromEntries(packages.map(pkg => [pkg.name, pkg.srcDir]));
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
