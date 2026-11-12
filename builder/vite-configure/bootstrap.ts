import {
    pathResolve,
    PnpmWorkspace,
  } from "@bit-labs.cn/owl-ui/build-preset";
import { resolve } from "node:path";

/** Vite root：始终是 owl-ui/builder（共享 index.html / src/main.ts） */
const root = process.cwd();

/** 业务项目根：由 run-project.mjs 注入；未注入时回退到 builder（旁路命令） */
const projectRoot = process.env.VITE_APP_PROJECT_ROOT
  ? resolve(process.env.VITE_APP_PROJECT_ROOT)
  : root;

const workspace = PnpmWorkspace.load({
  workspaceFilePath: pathResolve("../pnpm-workspace.yaml", import.meta.url),
  onlyExternal: true
});
const workspacePackages = workspace.list();
const alias = workspace.aliases();

const fsAllow = [
  root,
  projectRoot,
  ...workspacePackages.map(item => item.dir)
];

console.log("Vite Resolve Alias:", alias)
console.log("根目录:", root)
console.log("项目根目录:", projectRoot)
console.log("工作空间包：", workspacePackages);
console.log("vite允许访问的目录：", fsAllow)

export { root, projectRoot, workspacePackages, alias, fsAllow }
