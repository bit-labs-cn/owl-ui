import { storageLocal } from "@pureadmin/utils";

const SUB_APP_SESSION_KEY = "owl-current-sub-app";
const ASYNC_ROUTES_CACHE_KEY = "async-routes";

let portalEnabled = false;
let portalHome = "/";

export interface SubAppEntry {
  subApp: string;
  title: string;
  icon?: string;
}

/** 是否开启子系统门户。由 createFlexAdmin 在挂载前写入。 */
export function isSubAppPortalEnabled(): boolean {
  return portalEnabled;
}

export function setSubAppPortalEnabled(enabled: boolean) {
  portalEnabled = enabled;
}

export function setSplitSubAppHome(path: string) {
  portalHome = path || "/";
}

export function getSplitSubAppHome(): string {
  return portalHome;
}

export function getCurrentSubApp(): string {
  return sessionStorage.getItem(SUB_APP_SESSION_KEY) ?? "";
}

export function setCurrentSubApp(subApp: string) {
  sessionStorage.setItem(SUB_APP_SESSION_KEY, subApp);
}

export function clearCurrentSubApp() {
  sessionStorage.removeItem(SUB_APP_SESSION_KEY);
}

/** 把一个或多个子系统名收成 app 查询值，如 user,sms。 */
export function normalizeAppParam(app: string | string[]): string {
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
export function appFromLocationSearch(): string {
  if (typeof window === "undefined") return "";
  return normalizeAppParam(new URLSearchParams(window.location.search).get("app") ?? "");
}

/** 清掉全量与按子系统分开的动态路由缓存。 */
export function clearAsyncRouteCache() {
  storageLocal().removeItem(ASYNC_ROUTES_CACHE_KEY);
  const scoped: string[] = [];
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (key && key.startsWith(`${ASYNC_ROUTES_CACHE_KEY}:`)) {
      scoped.push(key);
    }
  }
  scoped.forEach(key => storageLocal().removeItem(key));
}

export function asyncRoutesCacheKey(subApp?: string): string {
  return subApp ? `${ASYNC_ROUTES_CACHE_KEY}:${subApp}` : ASYNC_ROUTES_CACHE_KEY;
}

/** 把菜单根按 subApp 分组。没有该字段时，每棵根菜单单独成组，键用路由 name。 */
export function groupSubAppEntries(menus: any[]): SubAppEntry[] {
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
