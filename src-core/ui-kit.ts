import type { App, Component } from "vue";

/**
 * 视图加载器。核心层只负责路由结构，具体页面/布局由 UI 套件注册。
 * 统一使用异步加载，保证与 vue-router 的懒加载语义一致。
 */
export type OwlViewLoader = () => Promise<Component>;

/** 核心层路由需要引用的 UI 视图集合 */
export interface OwlCoreViews {
  /** 登录页 */
  login: OwlViewLoader;
  /** 无权限页 */
  unauthorized: OwlViewLoader;
  /** 首页/欢迎页 */
  welcome: OwlViewLoader;
  /** 子系统门户页 */
  portal: OwlViewLoader;
  /** 刷新中转页 */
  redirect: OwlViewLoader;
  /** iframe 外链页 */
  frame: OwlViewLoader;
  /** 403 */
  error403: OwlViewLoader;
  /** 404 */
  error404: OwlViewLoader;
  /** 500 */
  error500: OwlViewLoader;
}

/** 一套 UI 皮肤向核心层提供的全部能力 */
export interface OwlUiKit {
  /** 根组件（通常为 App.vue） */
  root: Component;
  /** 布局组件加载器 */
  layout: OwlViewLoader;
  /** 核心路由引用的视图 */
  views: OwlCoreViews;
  /** 文案国际化转换；未提供时原样返回 */
  translate?: (message: any) => string;
  /** 创建 app 后立即安装：指令、全局组件、tippy、字体图标等 */
  installApp?: (app: App) => void | Promise<void>;
  /** 路由就绪后安装：i18n、Element Plus、图表、动画等插件 */
  installPlugins?: (app: App, config: PlatformConfigs) => void | Promise<void>;
}

let uiKit: OwlUiKit | null = null;

/** 注册 UI 套件。必须在创建 app 之前调用。 */
export function registerUiKit(kit: OwlUiKit): void {
  uiKit = kit;
}

export function getUiKit(): OwlUiKit {
  if (!uiKit) {
    throw new Error(
      "owl-ui: 尚未注册 UI 套件。请在 createFlexAdmin 中先调用 registerUiKit。"
    );
  }
  return uiKit;
}

export function isUiKitRegistered(): boolean {
  return uiKit !== null;
}

/** 作为路由 component 使用的布局加载器 */
export function layoutComponent(): OwlViewLoader {
  return () => getUiKit().layout();
}

/** 作为路由 component 使用的视图加载器 */
export function routeComponent(name: keyof OwlCoreViews): OwlViewLoader {
  return () => getUiKit().views[name]();
}

/** 文案转换，未注册翻译函数时原样返回 */
export function translate(message: any): string {
  if (uiKit?.translate) return uiKit.translate(message);
  return typeof message === "string" ? message : "";
}
