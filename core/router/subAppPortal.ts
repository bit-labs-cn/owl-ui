import { storageLocal } from "@pureadmin/utils";

const currentSubAppSessionKey = "owl-current-sub-app";
const asyncRoutesCacheKeyName = "async-routes";

export interface SubAppEntry {
  subApp: string;
  title: string;
  icon?: string;
}

/** 子系统门户：是否开启、回到哪一页、当前进了哪个子系统。 */
export class SubAppPortal {
  private enabled = false;
  private homePath = "/";

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  setHome(path: string): void {
    this.homePath = path || "/";
  }

  home(): string {
    return this.homePath;
  }

  current(): string {
    return sessionStorage.getItem(currentSubAppSessionKey) ?? "";
  }

  select(subApp: string): void {
    sessionStorage.setItem(currentSubAppSessionKey, subApp);
  }

  clear(): void {
    sessionStorage.removeItem(currentSubAppSessionKey);
  }

  /** 把一个或多个子系统名收成查询值，例如 user,sms。 */
  normalizeParameter(app: string | string[]): string {
    const parts = Array.isArray(app) ? app : String(app).split(",");
    const names: string[] = [];
    const seen = new Set<string>();
    for (const part of parts) {
      const name = part.trim();
      if (!name || seen.has(name)) continue;
      seen.add(name);
      names.push(name);
    }
    return names.join(",");
  }

  /** 地址栏 ?app= 上的子系统。新窗口打开业务页时靠它加载菜单。 */
  readAppFromLocation(): string {
    if (typeof window === "undefined") return "";
    return this.normalizeParameter(
      new URLSearchParams(window.location.search).get("app") ?? ""
    );
  }

  clearRouteCache(): void {
    storageLocal().removeItem(asyncRoutesCacheKeyName);
    const scoped: string[] = [];
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (key && key.startsWith(`${asyncRoutesCacheKeyName}:`)) {
        scoped.push(key);
      }
    }
    scoped.forEach(key => storageLocal().removeItem(key));
  }

  routeCacheKey(subApp?: string): string {
    return subApp
      ? `${asyncRoutesCacheKeyName}:${subApp}`
      : asyncRoutesCacheKeyName;
  }

  /** 把菜单根按子系统分组。没有该字段时，每棵根菜单单独成组，键用路由 name。 */
  groupEntries(menus: any[]): SubAppEntry[] {
    const entries: SubAppEntry[] = [];
    const seen = new Set<string>();
    for (const menu of menus ?? []) {
      if (!menu || menu.meta?.showLink === false) continue;
      const key = String(menu.subApp || menu.name || "");
      if (!key || seen.has(key)) continue;
      seen.add(key);
      const icon = menu.meta?.icon;
      entries.push({
        subApp: key,
        title: String(menu.meta?.title || key),
        icon: typeof icon === "string" ? icon : undefined
      });
    }
    return entries;
  }
}

export const subAppPortal = new SubAppPortal();
