// ─── 子系统注册 ───
export { defineSubsystem } from "@bit-labs.cn/owl-ui/core/subsystem";
export type {
  SubsystemDefinition,
  SubsystemMenuContribution,
  SubsystemLoginCustomization
} from "@bit-labs.cn/owl-ui/core/subsystem";

// ─── 应用引导 ───
export { createFlexAdmin } from "./bootstrap";
export type { FlexAdminOptions, SplitSubAppOptions } from "./bootstrap";

// ─── 路由工具 ───
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
} from "@bit-labs.cn/owl-ui/core/router/utils";

// ─── Store Hooks ───
export { useUserStoreHook } from "@bit-labs.cn/owl-ui/core/store/modules/user";
export { usePermissionStoreHook } from "@bit-labs.cn/owl-ui/core/store/modules/permission";
export { useAppStoreHook } from "@bit-labs.cn/owl-ui/core/store/modules/app";
export { useMultiTagsStoreHook } from "@bit-labs.cn/owl-ui/core/store/modules/multiTags";
export { useEpThemeStoreHook } from "@bit-labs.cn/owl-ui/core/store/modules/epTheme";
export { useSettingStoreHook } from "@bit-labs.cn/owl-ui/core/store/modules/settings";

// ─── 工具函数 ───
export { http, setHttpTimeout } from "@bit-labs.cn/owl-ui/core/utils/http";
export {
  setToken,
  removeToken,
  getToken,
  formatToken,
  hasPerms
} from "@bit-labs.cn/owl-ui/core/utils/auth";
export type { DataInfo } from "@bit-labs.cn/owl-ui/core/utils/auth";
export {
  message,
  closeAllMessage,
  registerMessageAdapter
} from "@bit-labs.cn/owl-ui/core/utils/message";
export type {
  MessageAdapter,
  MessageParams
} from "@bit-labs.cn/owl-ui/core/utils/message";
export {
  handleTree,
  extractPathList,
  deleteChildren,
  buildHierarchyTree,
  getNodeByUniqueId,
  appendFieldByUniqueId
} from "@bit-labs.cn/owl-ui/core/utils/tree";

// ─── 共享组件 ───
export { Auth } from "./components/ReAuth";
export { OwlLoading } from "./components/OwlLoading";
export { Perms } from "./components/RePerms";
export { ReDialog, addDialog, closeDialog, updateDialog } from "./components/ReDialog";
export {
  IconifyIconOffline,
  IconifyIconOnline,
  FontIcon
} from "./components/ReIcon";

// ─── 核心层 UI 适配 ───
export {
  registerUiKit,
  getUiKit,
  isUiKitRegistered
} from "@bit-labs.cn/owl-ui/core/ui-kit";
export type { OwlUiKit, OwlCoreViews } from "@bit-labs.cn/owl-ui/core/ui-kit";

// ─── API 通用类型 ───
export type {
  Result,
  ResultList,
  ResultTable
} from "@bit-labs.cn/owl-ui/core/api/commonType";

// ─── 配置 ───
export {
  getConfig,
  getPlatformConfig,
  responsiveStorageNameSpace
} from "@bit-labs.cn/owl-ui/core/config";

export type { SubAppEntry } from "@bit-labs.cn/owl-ui/core/router/subAppPortal";
export {
  groupSubAppEntries,
  isSubAppPortalEnabled
} from "@bit-labs.cn/owl-ui/core/router/subAppPortal";
