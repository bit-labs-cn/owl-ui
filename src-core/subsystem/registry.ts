import type {
  SubsystemDefinition,
  SubsystemLoginCustomization,
  SubsystemMenuContribution
} from "./types";

const _subsystems: SubsystemDefinition[] = [];
let _extraViewModules: Record<string, () => Promise<any>> = {};
let _menuContributions: SubsystemMenuContribution[] = [];
let _loginCustomization: SubsystemLoginCustomization | null = null;

/** 批量注册子系统（在 router 初始化前调用） */
export function registerSubsystems(subsystems: SubsystemDefinition[]) {
  _subsystems.push(...subsystems);
  subsystems.forEach(sub => {
    if (sub.viewModules) {
      const prefix =
        sub.viewModulesPathPrefix ?? sub.routes?.[0]?.path ?? `/${sub.name}`;
      const remapped: Record<string, () => Promise<any>> = {};
      for (const [key, loader] of Object.entries(sub.viewModules)) {
        remapped[key.replace(/^\.\/views/, prefix)] = loader;
      }
      Object.assign(_extraViewModules, remapped);
    }
    if (sub.menuContributions?.length) {
      _menuContributions.push(...sub.menuContributions);
    }
    if (sub.login) {
      // 按字段浅合并：后注册者覆盖前注册者；未填字段沿用上一个子系统贡献的值或 owl-ui 默认
      _loginCustomization = { ...(_loginCustomization ?? {}), ...sub.login };
    }
  });
}

export function getSubsystems(): SubsystemDefinition[] {
  return _subsystems;
}

/** 获取所有子系统注册的静态路由（扁平合并） */
export function getSubsystemRoutes(): any[] {
  return _subsystems.flatMap(sub => sub.routes ?? []);
}

/** 获取所有子系统注册的视图模块映射（供动态路由匹配组件） */
export function getExtraViewModules(): Record<string, () => Promise<any>> {
  return _extraViewModules;
}

/** 获取所有子系统注册的菜单贡献配置 */
export function getSubsystemMenuContributions(): SubsystemMenuContribution[] {
  return _menuContributions;
}

/**
 * 获取已聚合的登录页定制（按 last-wins 浅合并）。
 *
 * 未注册任何子系统、或没有任何子系统声明 `login` 时返回 `null`，
 * 调用方负责回退到 owl-ui 内置默认素材。
 */
export function getLoginCustomization(): SubsystemLoginCustomization | null {
  return _loginCustomization;
}
