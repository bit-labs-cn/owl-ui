import type { App as VueApp } from "vue";
import App from "./App.vue";
import { MotionPlugin } from "@vueuse/motion";
import Table from "@pureadmin/table";
import {
  createFlexAdminCore,
  type FlexAdminOptions,
  type SplitSubAppOptions
} from "@bit-labs.cn/owl-ui/core/bootstrap";
import { uiKitRegistry } from "@bit-labs.cn/owl-ui/core/ui-kit";
import { registerMessageAdapter } from "@bit-labs.cn/owl-ui/core/utils/message";
import {
  closeAllElementMessage,
  elementMessageAdapter
} from "@bit-labs.cn/owl-ui/plugins/message";
import { transformI18n, useI18n } from "@bit-labs.cn/owl-ui/plugins/i18n";
import { useElementPlus } from "@bit-labs.cn/owl-ui/plugins/elementPlus";
import { useEcharts } from "@bit-labs.cn/owl-ui/plugins/echarts";
import iconfontScript from "@bit-labs.cn/owl-ui/assets/iconfont/iconfont.js?raw";

import "./style/index.scss";
import "./style/tailwind.css";
import "element-plus/dist/index.css";
import "@bit-labs.cn/owl-ui/assets/iconfont/iconfont.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

export type { FlexAdminOptions, SplitSubAppOptions };

/** 将字体图标写入 head（只需执行一次） */
function installIconfont(): void {
  if (document.getElementById("owl-ui-iconfont")) return;
  const el = document.createElement("script");
  el.id = "owl-ui-iconfont";
  el.textContent = iconfontScript;
  document.head.appendChild(el);
}

/** 注册指令、全局组件与 tippy */
async function installApp(app: VueApp): Promise<void> {
  const directives = await import("@bit-labs.cn/owl-ui/directives");
  Object.keys(directives).forEach(key => {
    app.directive(key, directives[key]);
  });

  const { IconifyIconOffline, IconifyIconOnline, FontIcon } = await import(
    "@bit-labs.cn/owl-ui/components/ReIcon"
  );
  app.component("IconifyIconOffline", IconifyIconOffline);
  app.component("IconifyIconOnline", IconifyIconOnline);
  app.component("FontIcon", FontIcon);

  const { Auth } = await import("@bit-labs.cn/owl-ui/components/ReAuth");
  const { Perms } = await import("@bit-labs.cn/owl-ui/components/RePerms");
  app.component("Auth", Auth);
  app.component("Perms", Perms);

  const VueTippy = (await import("vue-tippy")).default;
  app.use(VueTippy);

  installIconfont();
}

/** 注册默认 UI 套件：核心层只认这些注册项，不直接引用任何 .vue 或组件库 */
export function registerDefaultUiKit(): void {
  registerMessageAdapter(elementMessageAdapter, closeAllElementMessage);
  uiKitRegistry.register({
    root: App,
    layout: () => import("./layout/index.vue"),
    views: {
      login: () => import("./views/login/index.vue"),
      unauthorized: () => import("./views/error/unauthorized.vue"),
      welcome: () => import("./views/welcome/index.vue"),
      portal: () => import("./views/portal/index.vue"),
      redirect: () => import("./layout/redirect.vue"),
      frame: () => import("./layout/frame.vue"),
      error403: () => import("./views/error/403.vue"),
      error404: () => import("./views/error/404.vue"),
      error500: () => import("./views/error/500.vue")
    },
    translate: transformI18n,
    installApp,
    installPlugins: (app, config) => {
      useEcharts(app);
      app.use(MotionPlugin).use(useI18n).use(useElementPlus).use(Table);
      void config;
    }
  });
}

/**
 * 默认 UI 套件入口。宿主调用 `createFlexAdmin(options)`；
 * 换皮肤时只需在 theme/<新风格> 另写一份同样形状的 bootstrap，复用 `createFlexAdminCore`。
 */
export async function createFlexAdmin(options: FlexAdminOptions = {}) {
  registerDefaultUiKit();
  return createFlexAdminCore(options);
}
