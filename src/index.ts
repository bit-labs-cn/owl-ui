/**
 * 包的公开入口。核心能力来自 core，组件和默认布局来自 theme。
 * 不能放进 core：这里会导出 .vue。
 */
// ─── 子系统注册 ───
export { defineSubsystem } from "@bit-labs.cn/owl-ui/core/subsystem";
export type {
  SubsystemDefinition,
  SubsystemMenuContribution,
  SubsystemLoginCustomization
} from "@bit-labs.cn/owl-ui/core/subsystem";

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
export { Auth } from "../theme/shared/components/ReAuth";
export { OwlLoading } from "../theme/shared/components/OwlLoading";
export { Perms } from "../theme/shared/components/RePerms";
export { ReDialog, dialogService } from "../theme/shared/components/ReDialog";
export {
  IconifyIconOffline,
  IconifyIconOnline,
  FontIcon
} from "../theme/shared/components/ReIcon";
export { PureTableBar } from "../theme/shared/components/RePureTableBar";

// ─── 默认布局 ───
export { default as Layout } from "../theme/default/layout/index.vue";

// ─── 核心层 UI 适配 ───
export {
  uiKitRegistry
} from "@bit-labs.cn/owl-ui/core/ui-kit";
export type { OwlUiKit, OwlCoreViews } from "@bit-labs.cn/owl-ui/core/ui-kit";

// ─── API 通用类型 ───
export type {
  Result,
  ResultList,
  ResultTable
} from "@bit-labs.cn/owl-ui/core/api/commonType";

// ─── 配置 ───
export { platformConfig } from "@bit-labs.cn/owl-ui/core/config";

export type { SubAppEntry } from "@bit-labs.cn/owl-ui/core/router/subAppPortal";
export { subAppPortal } from "@bit-labs.cn/owl-ui/core/router/subAppPortal";
