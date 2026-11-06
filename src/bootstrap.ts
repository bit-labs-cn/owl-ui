import App from "./App.vue";
import { setupStore } from "@bit-labs.cn/owl-ui/store";
import { useI18n } from "@bit-labs.cn/owl-ui/plugins/i18n";
import { getPlatformConfig, getConfig } from "./config";
import { loadPublicSettings } from "./config/loadPublicSettings";
import { setHttpTimeout } from "./utils/http";
import { MotionPlugin } from "@vueuse/motion";
import {
  createApp,
  type App as VueApp,
  type Component,
  type Directive
} from "vue";
import { useElementPlus } from "@bit-labs.cn/owl-ui/plugins/elementPlus";
import { useEcharts } from "@bit-labs.cn/owl-ui/plugins/echarts";
import { injectResponsiveStorage } from "@bit-labs.cn/owl-ui/utils/responsive";
import Table from "@pureadmin/table";

import {
  registerSubsystems,
  getSubsystems
} from "@bit-labs.cn/owl-ui/subsystem/registry";
import router, { applySubsystemRoutes } from "@bit-labs.cn/owl-ui/router";
import {
  setSplitSubAppHome,
  setSubAppPortalEnabled
} from "@bit-labs.cn/owl-ui/router/subAppPortal";
import type { SubsystemDefinition } from "@bit-labs.cn/owl-ui/subsystem/types";

import "./style/reset.scss";
import "./style/index.scss";
import "./style/tailwind.css";
import "element-plus/dist/index.css";
import iconfontScript from "./assets/iconfont/iconfont.js?raw";
import "./assets/iconfont/iconfont.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

{
  const el = document.createElement("script");
  el.textContent = iconfontScript;
  document.head.appendChild(el);
}

export interface SplitSubAppOptions {
  /** 开启后，只有携带 app 名称时才加载对应子系统菜单 */
  enable: boolean;
  /** 离开子系统时回到的路径，由宿主决定 */
  home?: string;
  /** 宿主自己的入口页组件，由宿主挂到自己的路由上 */
  customEntry?: Component;
}

export interface FlexAdminOptions {
  subsystems?: SubsystemDefinition[];
  splitSubApp?: SplitSubAppOptions;
}

export async function createFlexAdmin(
  options: FlexAdminOptions = {}
): Promise<VueApp> {
  // 1. 注册子系统（在 router 使用前将路由和视图模块写入 registry）
  registerSubsystems(options.subsystems ?? []);
  if (options.splitSubApp?.enable) {
    setSubAppPortalEnabled(true);
    setSplitSubAppHome(options.splitSubApp.home ?? "/");
  }

  const app = createApp(App);

  // 2. 注册自定义指令
  const directives = await import("@bit-labs.cn/owl-ui/directives");
  Object.keys(directives).forEach(key => {
    app.directive(key, (directives as { [key: string]: Directive })[key]);
  });

  // 3. 注册全局组件
  const { IconifyIconOffline, IconifyIconOnline, FontIcon } = await import(
    "./components/ReIcon"
  );
  app.component("IconifyIconOffline", IconifyIconOffline);
  app.component("IconifyIconOnline", IconifyIconOnline);
  app.component("FontIcon", FontIcon);

  const { Auth } = await import("@bit-labs.cn/owl-ui/components/ReAuth");
  const { Perms } = await import("@bit-labs.cn/owl-ui/components/RePerms");
  app.component("Auth", Auth);
  app.component("Perms", Perms);

  // 4. 注册 vue-tippy
  const VueTippy = (await import("vue-tippy")).default;
  app.use(VueTippy);

  // 5. 加载平台配置 → 初始化 store / router / 插件
  const config = await getPlatformConfig(app);
  const httpTimeout = getConfig()?.HttpTimeout;
  if (httpTimeout != null) {
    setHttpTimeout(httpTimeout);
  }
  setupStore(app);
  useEcharts(app);

  app.use(router);

  // 6. 将子系统路由注入到已创建的 router 实例
  applySubsystemRoutes();

  await router.isReady();
  injectResponsiveStorage(app, config);
  app.use(MotionPlugin).use(useI18n).use(useElementPlus).use(Table);

  // 7. 读取公开配置，再调用子系统 install。公开配置读完再进首屏，避免先闪内置标志。
  await loadPublicSettings();
  for (const sub of getSubsystems()) {
    await sub.install?.(app);
  }

  return app;
}
