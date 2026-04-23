// import "@bit-labs.cn/owl-ui/utils/sso";
import Cookies from "js-cookie";
import { getConfig } from "@bit-labs.cn/owl-ui/config";
import NProgress from "@bit-labs.cn/owl-ui/utils/progress";
import { transformI18n } from "@bit-labs.cn/owl-ui/plugins/i18n";
import { buildHierarchyTree } from "@bit-labs.cn/owl-ui/utils/tree";
import remainingRouter from "./modules/remaining";
import { useMultiTagsStoreHook } from "@bit-labs.cn/owl-ui/store/modules/multiTags";
import { usePermissionStoreHook } from "@bit-labs.cn/owl-ui/store/modules/permission";
import { useUserStoreHook } from "@bit-labs.cn/owl-ui/store/modules/user";
import {
  isUrl,
  openLink,
  cloneDeep,
  storageLocal,
  isAllEmpty
} from "@pureadmin/utils";
import {
  ascending,
  getTopMenu,
  initRouter,
  isOneOfArray,
  getHistoryMode,
  findRouteByPath,
  handleAliveRoute,
  formatTwoStageRoutes,
  formatFlatteningRoutes
} from "./utils";
import {
  type Router,
  createRouter,
  type RouteRecordRaw,
  type RouteComponent
} from "vue-router";
import {
  type DataInfo,
  userKey,
  removeToken,
  multipleTabsKey
} from "@bit-labs.cn/owl-ui/utils/auth";

/** 自动导入框架核心静态路由 */
const modules: Record<string, any> = import.meta.glob(
  ["./modules/**/*.ts", "!./modules/**/remaining.ts"],
  {
    eager: true
  }
);

/** 框架核心路由（未做任何处理） */
const coreRoutes = [];

Object.keys(modules).forEach(key => {
  coreRoutes.push(modules[key].default);
});

/** 导出处理后的静态路由（三级及以上的路由全部拍成二级） */
export const constantRoutes: Array<RouteRecordRaw> = formatTwoStageRoutes(
  formatFlatteningRoutes(ascending(coreRoutes.flat(Infinity)))
);

/** 用于渲染菜单，保持原始层级 */
export const constantMenus: Array<RouteComponent> = ascending(
  coreRoutes.flat(Infinity)
).concat(...remainingRouter);

/** 不参与菜单的路由 */
export const remainingPaths = Object.keys(remainingRouter).map(v => {
  return remainingRouter[v].path;
});

/** 创建路由实例 */
export const router: Router = createRouter({
  history: getHistoryMode(import.meta.env.VITE_ROUTER_HISTORY),
  routes: constantRoutes.concat(...(remainingRouter as any)),
  strict: true,
  scrollBehavior(to, from, savedPosition) {
    return new Promise(resolve => {
      if (savedPosition) {
        return savedPosition;
      } else {
        if (from.meta.saveSrollTop) {
          const top: number =
            document.documentElement.scrollTop || document.body.scrollTop;
          resolve({ left: 0, top });
        }
      }
    });
  }
});

/** 重置路由 */
export function resetRouter() {
  usePermissionStoreHook().clearAllCachePage();
}

/** 路由白名单 */
const whiteList = ["/login"];

const { VITE_HIDE_HOME } = import.meta.env;

router.beforeEach(async (to: ToRouteType, _from, next) => {
  if (to.meta?.keepAlive) {
    handleAliveRoute(to, "add");
    // 页面整体刷新和点击标签页刷新
    if (_from.name === undefined || _from.name === "Redirect") {
      handleAliveRoute(to);
    }
  }
  const userInfo = storageLocal().getItem<DataInfo<number>>(userKey);
  NProgress.start();
  const externalLink = isUrl(to?.name as string);
  if (!externalLink) {
    to.matched.some(item => {
      if (!item.meta.title) return "";
      const Title = getConfig().Title;
      if (Title)
        document.title = `${transformI18n(item.meta.title)} | ${Title}`;
      else document.title = transformI18n(item.meta.title);
    });
  }
  /** 如果已经登录并存在登录信息后不能跳转到路由白名单，而是继续保持在当前页面 */
  function toCorrectRoute() {
    whiteList.includes(to.fullPath) ? next(_from.fullPath) : next();
  }
  if (Cookies.get(multipleTabsKey) && userInfo) {
    await useUserStoreHook().ensurePermissionsFresh();
    // 无权限跳转403页面
    if (to.meta?.roles && !isOneOfArray(to.meta?.roles, userInfo?.roles)) {
      next({ path: "/error/403" });
    }
    // 开启隐藏首页后在浏览器地址栏手动输入首页welcome路由则跳转到404页面
    if (VITE_HIDE_HOME === "true" && to.fullPath === "/welcome") {
      next({ path: "/error/404" });
    }
    if (_from?.name) {
      // name为超链接
      if (externalLink) {
        openLink(to?.name as string);
        NProgress.done();
      } else {
        toCorrectRoute();
      }
    } else {
      // 刷新
      if (
        usePermissionStoreHook().wholeMenus.length === 0 &&
        to.path !== "/login"
      ) {
        initRouter().then((router: Router) => {
          console.log("初始化动态路由");
          if (!useMultiTagsStoreHook().getMultiTagsCache) {
            const { path } = to;
            const route = findRouteByPath(
              path,
              router.options.routes[0].children
            );
            getTopMenu(true);
            // query、params模式路由传参数的标签页不在此处处理
            if (route && route.meta?.title) {
              if (isAllEmpty(route.parentId) && route.meta?.backstage) {
                // 此处为动态顶级路由（目录）
                const { path, name, meta } = route.children[0];
                useMultiTagsStoreHook().handleTags("push", {
                  path,
                  name,
                  meta
                });
              } else {
                const { path, name, meta } = route;
                useMultiTagsStoreHook().handleTags("push", {
                  path,
                  name,
                  meta
                });
              }
            }
          }
          // 确保动态路由完全加入路由列表并且不影响静态路由（注意：动态路由刷新时router.beforeEach可能会触发两次，第一次触发动态路由还未完全添加，第二次动态路由才完全添加到路由列表，如果需要在router.beforeEach做一些判断可以在to.name存在的条件下去判断，这样就只会触发一次）
          if (isAllEmpty(to.name)) router.push(to.fullPath);
        });
      }
      toCorrectRoute();
    }
  } else {
    if (to.path !== "/login") {
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        removeToken();
        next({ path: "/login" });
      }
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

// ─── 子系统路由注入 ───
import { getSubsystemRoutes } from "@bit-labs.cn/owl-ui/subsystem/registry";

/**
 * 将已注册子系统的静态路由注入到 router 实例和菜单数据中。
 * 必须在 `registerSubsystems()` 之后、`router.isReady()` 之前调用。
 *
 * 处理逻辑与框架 handleAsyncRoutes 保持一致：
 *   1. 保持原始层级合并到 constantMenus（供侧边栏菜单渲染）
 *   2. 拍平为一维后逐条注入 "/" 根路由的 children（供 vue-router 匹配）
 */
export function applySubsystemRoutes() {
  const subsystemRoutes = getSubsystemRoutes();
  if (!subsystemRoutes.length) return;

  const allRoutes = ascending(subsystemRoutes.flat(Infinity));

  // 1. 保持原始层级合并到 constantMenus（菜单渲染用）
  allRoutes.forEach(route => constantMenus.push(route));

  // 2. 拍平后注入 "/" 根路由，与 handleAsyncRoutes 使用相同的注入方式
  const flattened = formatFlatteningRoutes(cloneDeep(allRoutes));

  flattened.forEach((v: RouteRecordRaw) => {
    // 跳过子系统自身的根路由（path "/"），避免无 component 的中间层导致子页无 Layout
    if (v.path === "/") return;

    // meta.noLayout：新窗口/全屏页，作为顶级路由注入，不经过根 Layout
    if ((v.meta as any)?.noLayout) {
      if (router.hasRoute(v?.name as string)) return;
      router.addRoute(v);
      return;
    }

    if (
      router.options.routes[0].children.findIndex(
        value => value.path === v.path
      ) !== -1
    ) {
      return;
    }

    // 父级目录路由（有 children、component 是 Layout）去掉 component，
    // 避免与 "/" 根路由的 Layout 产生双重嵌套
    if (v.children?.length) {
      delete v.component;
    }

    router.options.routes[0].children.push(v);
    ascending(router.options.routes[0].children);
    if (!router.hasRoute(v?.name as string)) router.addRoute(v);
    const flattenRouters: any = router.getRoutes().find(n => n.path === "/");
    router.addRoute(flattenRouters);
  });

  // 3. 同步更新 permission store 的 constantMenus
  try {
    usePermissionStoreHook().constantMenus = constantMenus;
  } catch {
    // store 尚未初始化时忽略，后续 handleWholeMenus 会使用最新的 constantMenus
  }
}

export default router;
