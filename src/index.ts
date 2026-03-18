// ─── 子系统注册 ───
export { defineSubsystem } from "./subsystem";
export type {
  SubsystemDefinition,
  SubsystemMenuContribution
} from "./subsystem";

// ─── 应用引导 ───
export { createFlexAdmin } from "./bootstrap";
export type { FlexAdminOptions } from "./bootstrap";

// ─── 路由工具 ───
export {
  hasAuth,
  getAuths,
  ascending,
  filterTree,
  initRouter,
  getTopMenu,
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

// ─── Store Hooks ───
export { useUserStoreHook } from "./store/modules/user";
export { usePermissionStoreHook } from "./store/modules/permission";
export { useAppStoreHook } from "./store/modules/app";
export { useMultiTagsStoreHook } from "./store/modules/multiTags";
export { useEpThemeStoreHook } from "./store/modules/epTheme";
export { useSettingStoreHook } from "./store/modules/settings";

// ─── 工具函数 ───
export { http } from "./utils/http";
export {
  setToken,
  removeToken,
  getToken,
  formatToken,
  hasPerms
} from "./utils/auth";
export type { DataInfo } from "./utils/auth";
export { message } from "./utils/message";
export {
  handleTree,
  extractPathList,
  deleteChildren,
  buildHierarchyTree,
  getNodeByUniqueId,
  appendFieldByUniqueId
} from "./utils/tree";

// ─── 共享组件 ───
export { Auth } from "./components/ReAuth";
export { Perms } from "./components/RePerms";
export { ReDialog, addDialog, closeDialog, updateDialog } from "./components/ReDialog";
export {
  IconifyIconOffline,
  IconifyIconOnline,
  FontIcon
} from "./components/ReIcon";

// ─── API 通用类型 ───
export type { Result, ResultList, ResultTable } from "./api/commonType";

// ─── 配置 ───
export { getConfig, getPlatformConfig, responsiveStorageNameSpace } from "./config";
