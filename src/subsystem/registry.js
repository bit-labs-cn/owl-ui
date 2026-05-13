const _subsystems = [];
let _extraViewModules = {};
let _menuContributions = [];
/** 批量注册子系统（在 router 初始化前调用） */
export function registerSubsystems(subsystems) {
    _subsystems.push(...subsystems);
    subsystems.forEach(sub => {
        if (sub.viewModules) {
            const prefix = sub.viewModulesPathPrefix ?? sub.routes?.[0]?.path ?? `/${sub.name}`;
            const remapped = {};
            for (const [key, loader] of Object.entries(sub.viewModules)) {
                remapped[key.replace(/^\.\/views/, prefix)] = loader;
            }
            Object.assign(_extraViewModules, remapped);
        }
        if (sub.menuContributions?.length) {
            _menuContributions.push(...sub.menuContributions);
        }
    });
}
export function getSubsystems() {
    return _subsystems;
}
/** 获取所有子系统注册的静态路由（扁平合并） */
export function getSubsystemRoutes() {
    return _subsystems.flatMap(sub => sub.routes ?? []);
}
/** 获取所有子系统注册的视图模块映射（供动态路由匹配组件） */
export function getExtraViewModules() {
    return _extraViewModules;
}
/** 获取所有子系统注册的菜单贡献配置 */
export function getSubsystemMenuContributions() {
    return _menuContributions;
}
//# sourceMappingURL=registry.js.map