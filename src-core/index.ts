/**
 * owl-ui 核心层入口：纯 TypeScript 业务逻辑，不含 Vue 组件与样式。
 * 自研 UI 皮肤只依赖这里，即可复用路由、状态、权限、HTTP 与子系统机制。
 */

// ─── 应用引导 ───
export { createFlexAdminCore } from "./bootstrap";
export type { FlexAdminOptions, SplitSubAppOptions } from "./bootstrap";

// ─── UI 套件注册 ───
export {
  registerUiKit,
  getUiKit,
  isUiKitRegistered,
  layoutComponent,
  routeComponent,
  translate
} from "./ui-kit";
export type { OwlUiKit, OwlCoreViews, OwlViewLoader } from "./ui-kit";

// ─── 子系统 ───
export { defineSubsystem } from "./subsystem";
export type {
  SubsystemDefinition,
  SubsystemMenuContribution,
  SubsystemLoginCustomization
} from "./subsystem";

// ─── 路由 ───
export { default as router } from "./router";
export {
  hasAuth,
  getAuths,
  ascending,
  filterTree,
  initRouter,
  getTopMenu,
  enterSubApp,
  leaveSubApp,
  addPathMatch,
  isOneOfArray,
  getHistoryMode,
  addAsyncRoutes,
  getParentPaths,
  findRouteByPath,
  handleAliveRoute,
  formatTwoStageRoutes,
  formatFlatteningRoutes,
  filterNoPermissionTree
} from "./router/utils";

// ─── Store ───
export { setupStore, store } from "./store";
export { useUserStoreHook } from "./store/modules/user";
export { usePermissionStoreHook } from "./store/modules/permission";
export { useAppStoreHook } from "./store/modules/app";
export { useMultiTagsStoreHook } from "./store/modules/multiTags";
export { useEpThemeStoreHook } from "./store/modules/epTheme";
export { useSettingStoreHook } from "./store/modules/settings";

// ─── 配置 ───
export {
  getConfig,
  setConfig,
  getPlatformConfig,
  responsiveStorageNameSpace
} from "./config";
export { loadPublicSettings } from "./config/loadPublicSettings";

// ─── HTTP 与鉴权 ───
export { http, setHttpTimeout } from "./utils/http";
export {
  setToken,
  removeToken,
  getToken,
  formatToken,
  hasPerms
} from "./utils/auth";
export type { DataInfo } from "./utils/auth";

// ─── 消息适配 ───
export {
  message,
  closeAllMessage,
  registerMessageAdapter
} from "./utils/message";
export type {
  MessageAdapter,
  MessageParams,
  MessageBody,
  MessageHandler
} from "./utils/message";

// ─── 通用工具 ───
export {
  handleTree,
  extractPathList,
  deleteChildren,
  buildHierarchyTree,
  getNodeByUniqueId,
  appendFieldByUniqueId
} from "./utils/tree";
