/**
 * pnpm-workspace.yaml 生成（纯 Node，无第三方依赖）。
 * ensure-toolchain 在尚无 node_modules 时也会用到，故不可依赖 yaml 包。
 */

/**
 * 从 package.base.json 的 pnpm.onlyBuiltDependencies 推导 pnpm 11+ 所需的 allowBuilds。
 * （pnpm 11 已移除 onlyBuiltDependencies，strictDepBuilds 默认 true，未批准则 install 失败）
 * @param {{ pnpm?: { onlyBuiltDependencies?: string[] } }} base
 * @returns {Record<string, boolean>}
 */
export function allowBuildsFromBase(base) {
  const list = base?.pnpm?.onlyBuiltDependencies;
  if (!Array.isArray(list)) return {};
  /** @type {Record<string, boolean>} */
  const out = {};
  for (const name of list) {
    if (typeof name === "string" && name.trim()) out[name.trim()] = true;
  }
  return out;
}

/**
 * 生成 pnpm-workspace.yaml 正文（packages + 可选 allowBuilds）。
 * @param {{ packages: string[], allowBuilds?: Record<string, boolean> }} opts
 * @returns {string}
 */
export function formatPnpmWorkspaceYaml({ packages, allowBuilds }) {
  const lines = [
    "packages:",
    ...packages.map(p => `  - ${JSON.stringify(p)}`)
  ];
  if (allowBuilds && Object.keys(allowBuilds).length > 0) {
    lines.push("allowBuilds:");
    for (const name of Object.keys(allowBuilds).sort((a, b) =>
      a.localeCompare(b)
    )) {
      lines.push(`  ${JSON.stringify(name)}: ${allowBuilds[name]}`);
    }
  }
  return `${lines.join("\n")}\n`;
}
