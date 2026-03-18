import type { App } from "vue";

export interface SubsystemMenuContribution {
  /** 目标父菜单路由 name（按该值定位挂载点） */
  targetMenuName: string;
  /** 需要挂载到目标菜单下的菜单路由 */
  menus: RouteConfigsTable[];
}

export interface SubsystemDefinition {
  /** 子系统唯一标识 */
  name: string;
  /**
   * 静态路由定义，格式与 router/modules/*.ts 一致。
   * 如果路由完全由后端动态返回，可省略或传空数组。
   */
  routes?: RouteConfigsTable[];
  /** 菜单贡献声明（可将菜单挂载到其他子系统菜单节点） */
  menuContributions?: SubsystemMenuContribution[];
  /**
   * 子系统视图模块映射，供动态路由匹配组件。
   * 通常由 `import.meta.glob('./views/**\/*.{vue,tsx}')` 生成
   */
  viewModules?: Record<string, () => Promise<any>>;
  /**
   * 视图模块的路由路径前缀。框架会将 glob 键名中的 `./views`
   * 替换为此前缀，使 `addAsyncRoutes` 能按后端路径匹配到组件。
   *
   * 例：prefix 为 `/lift-vision` 时
   *   `./views/community/index.vue` → `/lift-vision/community/index.vue`
   *
   * 未设置时依次回退：第一条静态路由的 path → `/${name}`
   */
  viewModulesPathPrefix?: string;
  /** 子系统 i18n 翻译，如 `{ 'zh-CN': {...}, en: {...} }` */
  locales?: Record<string, Record<string, any>>;
  /** 安装钩子：可注册子系统专属的全局组件、指令、插件等 */
  install?: (app: App) => void;
}
