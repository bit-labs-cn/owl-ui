import { setupStore } from "@bit-labs.cn/owl-ui/core/store";
import { getConfig, getPlatformConfig } from "@bit-labs.cn/owl-ui/core/config";
import { loadPublicSettings } from "@bit-labs.cn/owl-ui/core/config/loadPublicSettings";
import { setHttpTimeout } from "@bit-labs.cn/owl-ui/core/utils/http";
import { createApp, type App as VueApp, type Component } from "vue";
import { injectResponsiveStorage } from "@bit-labs.cn/owl-ui/core/utils/responsive";
import {
  registerSubsystems,
  getSubsystems
} from "@bit-labs.cn/owl-ui/core/subsystem/registry";
import router, { applySubsystemRoutes } from "@bit-labs.cn/owl-ui/core/router";
import {
  setSplitSubAppHome,
  setSubAppPortalEnabled
} from "@bit-labs.cn/owl-ui/core/router/subAppPortal";
import type { SubsystemDefinition } from "@bit-labs.cn/owl-ui/core/subsystem/types";
import { getUiKit } from "@bit-labs.cn/owl-ui/core/ui-kit";

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

type OwlSplashController = {
  set: (percent: number, text?: string, phase?: string) => void;
  done: () => void;
};

function owlSplash(): OwlSplashController | undefined {
  return (window as Window & { __owlSplash?: OwlSplashController }).__owlSplash;
}

/**
 * 框架核心启动流程：只负责业务逻辑与路由，不关心具体布局、组件库与样式。
 * UI 层须先调用 `registerUiKit()` 注册根组件、布局、视图和插件安装钩子。
 */
export async function createFlexAdminCore(
  options: FlexAdminOptions = {}
): Promise<VueApp> {
  // 1. 注册子系统（在 router 使用前将路由和视图模块写入 registry）
  registerSubsystems(options.subsystems ?? []);
  if (options.splitSubApp?.enable) {
    setSubAppPortalEnabled(true);
    setSplitSubAppHome(options.splitSubApp.home ?? "/");
  }

  const kit = getUiKit();
  const app = createApp(kit.root);

  // 2. UI 层安装指令、全局组件与轻量插件
  await kit.installApp?.(app);

  // 3. 加载平台配置 → 初始化 store
  const config = await getPlatformConfig(app);
  owlSplash()?.set(80, "正在准备运行环境", "环境");
  const httpTimeout = getConfig()?.HttpTimeout;
  if (httpTimeout != null) {
    setHttpTimeout(httpTimeout);
  }
  setupStore(app);

  // 4. 先注入子系统静态路由，再安装 router。
  // app.use(router) 会立刻按地址栏做第一次匹配。装完再注入时，
  // 刷新门户首页（如 /apps/index）这次匹配是空的，放行后界面空白。
  applySubsystemRoutes();
  app.use(router);

  await router.isReady();
  owlSplash()?.set(90, "正在读取基础数据", "数据");
  injectResponsiveStorage(app, config);

  // 5. UI 层安装组件库、i18n、图表等重插件
  await kit.installPlugins?.(app, config);

  // 6. 读取公开配置，再调用子系统 install。公开配置读完再进首屏，避免先闪内置标志。
  await loadPublicSettings();
  for (const sub of getSubsystems()) {
    await sub.install?.(app);
  }
  owlSplash()?.set(96, "马上进入系统", "进入");

  const mount = app.mount.bind(app);
  app.mount = ((...args: Parameters<VueApp["mount"]>) => {
    const mounted = mount(...args);
    owlSplash()?.done();
    return mounted;
  }) as VueApp["mount"];

  return app;
}
