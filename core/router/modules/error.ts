import { $t } from "@bit-labs.cn/owl-ui/core/utils/i18nKey";
import { uiKitRegistry } from "@bit-labs.cn/owl-ui/core/ui-kit";

export default {
  path: "/error",
  redirect: "/error/403",
  meta: {
    icon: "ri:information-line",
    showLink: false,
    title: $t("menus.pureAbnormal"),
    rank: 9
  },
  children: [
    {
      path: "/error/403",
      name: "403",
      component: uiKitRegistry.routeComponent("error403"),
      meta: {
        title: $t("menus.pureFourZeroOne")
      }
    },
    {
      path: "/error/404",
      name: "404",
      component: uiKitRegistry.routeComponent("error404"),
      meta: {
        title: $t("menus.pureFourZeroFour")
      }
    },
    {
      path: "/error/500",
      name: "500",
      component: uiKitRegistry.routeComponent("error500"),
      meta: {
        title: $t("menus.pureFive")
      }
    }
  ]
} satisfies RouteConfigsTable;
