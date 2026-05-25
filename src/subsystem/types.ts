import type { App } from "vue";

export interface SubsystemMenuContribution {
  /** 目标父菜单路由 name（按该值定位挂载点） */
  targetMenuName: string;
  /** 需要挂载到目标菜单下的菜单路由 */
  menus: RouteConfigsTable[];
}

/**
 * 子系统对登录页的素材/文案定制。
 *
 * 仅支持替换已有渲染槽位（背景、插画、头像、主副标题、主题色），
 * 不改变登录页布局与表单逻辑。多个子系统同时声明同一字段时，
 * 在 `subsystems` 数组中靠后的子系统覆盖靠前的子系统（last-wins）。
 */
export interface SubsystemLoginCustomization {
  /**
   * 登录页全屏背景图（声明后自动启用全屏背景 + 右侧表单布局）。
   * 建议使用 `import bg from "./assets/login/bg.png"` 取得 URL 字符串。
   */
  bg?: string;
  /** 登录页大标题；未提供时回退到 `useNav().title` */
  title?: string;
  /** 登录页副标题/欢迎语；未提供时不渲染 */
  subtitle?: string;
  /** 主题色（写入 `--el-color-primary` CSS 变量，让 Element Plus 自动接管按钮等） */
  primaryColor?: string;
  /** 登录表单区域宽度，默认 `480px` */
  loginFormWidth?: string;
  /** 账号字段标签，默认「账号」 */
  accountLabel?: string;
  /** 密码字段标签，默认「密码」 */
  passwordLabel?: string;
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
  /**
   * 登录页素材/文案定制。
   *
   * 多个子系统同时声明时，`subsystems` 数组中靠后的子系统按字段覆盖靠前的（浅合并）；
   * 子系统未填写的字段会回退到 owl-ui 内置默认素材。
   */
  login?: SubsystemLoginCustomization;
  /** 安装钩子：可注册子系统专属的全局组件、指令、插件等 */
  install?: (app: App) => void;
}
