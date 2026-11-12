import type {
  SubsystemDefinition,
  SubsystemLoginCustomization,
  SubsystemMenuContribution
} from "./types";

/** 已注册子系统的路由、视图和登录页定制。 */
export class SubsystemRegistry {
  private readonly subsystems: SubsystemDefinition[] = [];
  private readonly extraViewModules: Record<string, () => Promise<any>> = {};
  private readonly menuContributions: SubsystemMenuContribution[] = [];
  private loginCustomization: SubsystemLoginCustomization | null = null;

  /** 在创建路由之前登记。后登记的登录页字段覆盖先登记的。 */
  register(subsystems: SubsystemDefinition[]): void {
    this.subsystems.push(...subsystems);
    subsystems.forEach(subsystem => {
      if (subsystem.viewModules) {
        const prefix =
          subsystem.viewModulesPathPrefix ??
          subsystem.routes?.[0]?.path ??
          `/${subsystem.name}`;
        for (const [key, loader] of Object.entries(subsystem.viewModules)) {
          this.extraViewModules[key.replace(/^\.\/views/, prefix)] = loader;
        }
      }
      if (subsystem.menuContributions?.length) {
        this.menuContributions.push(...subsystem.menuContributions);
      }
      if (subsystem.login) {
        this.loginCustomization = {
          ...(this.loginCustomization ?? {}),
          ...subsystem.login
        };
      }
    });
  }

  list(): SubsystemDefinition[] {
    return this.subsystems;
  }

  routes(): any[] {
    return this.subsystems.flatMap(subsystem => subsystem.routes ?? []);
  }

  viewModules(): Record<string, () => Promise<any>> {
    return this.extraViewModules;
  }

  contributions(): SubsystemMenuContribution[] {
    return this.menuContributions;
  }

  /** 没有任何子系统声明登录页时返回 null。 */
  login(): SubsystemLoginCustomization | null {
    return this.loginCustomization;
  }
}

export const subsystemRegistry = new SubsystemRegistry();
