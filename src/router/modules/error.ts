import { $t } from "@bit-labs.cn/owl-ui/plugins/i18n";

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
      component: () => import("@bit-labs.cn/owl-ui/views/error/403.vue"),
      meta: {
        title: $t("menus.pureFourZeroOne")
      }
    },
    {
      path: "/error/404",
      name: "404",
      component: () => import("@bit-labs.cn/owl-ui/views/error/404.vue"),
      meta: {
        title: $t("menus.pureFourZeroFour")
      }
    },
    {
      path: "/error/500",
      name: "500",
      component: () => import("@bit-labs.cn/owl-ui/views/error/500.vue"),
      meta: {
        title: $t("menus.pureFive")
      }
    }
  ]
} satisfies RouteConfigsTable;
