import { $t } from "@bit-labs.cn/owl-ui/core/utils/i18nKey";
import { uiKitRegistry } from "@bit-labs.cn/owl-ui/core/ui-kit";

const Layout = uiKitRegistry.layoutComponent();

export default [
  {
    path: "/login",
    name: "Login",
    component: uiKitRegistry.routeComponent("login"),
    meta: {
      title: $t("menus.pureLogin"),
      showLink: false,
      rank: 101
    }
  },
  {
    path: "/unauthorized",
    name: "Unauthorized",
    component: uiKitRegistry.routeComponent("unauthorized"),
    meta: {
      title: "系统未授权",
      showLink: false,
      rank: 103
    }
  },
  {
    path: "/redirect",
    component: Layout,
    meta: {
      title: $t("status.pureLoad"),
      showLink: false,
      rank: 102
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        name: "Redirect",
        component: uiKitRegistry.routeComponent("redirect")
      }
    ]
  }
] satisfies Array<RouteConfigsTable>;
