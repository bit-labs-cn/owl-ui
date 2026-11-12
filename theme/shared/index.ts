// ─── 跨风格共享组件 ───
export { Auth } from "./components/ReAuth";
export { Perms } from "./components/RePerms";
export { OwlLoading } from "./components/OwlLoading";
export { ReDialog, addDialog, closeDialog, updateDialog } from "./components/ReDialog";
export {
  IconifyIconOffline,
  IconifyIconOnline,
  FontIcon
} from "./components/ReIcon";
export { PureTableBar } from "./components/RePureTableBar";

// ─── 常用插件 ───
export { transformI18n, $t, useI18n } from "./plugins/i18n";
export { useElementPlus } from "./plugins/elementPlus";
export { useEcharts } from "./plugins/echarts";
export {
  elementMessageAdapter,
  closeAllElementMessage
} from "./plugins/message";
