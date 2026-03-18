import { $t } from "@bit-labs.cn/owl-ui/plugins/i18n";
const Layout = () => import("@bit-labs.cn/owl-ui/layout/index.vue");

export default [
  {
    path: "/login",
    name: "Login",
    component: () => import("@bit-labs.cn/owl-ui/views/login/index.vue"),
    meta: {
      title: $t("menus.pureLogin"),
      showLink: false,
      rank: 101
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
        component: () => import("@bit-labs.cn/owl-ui/layout/redirect.vue")
      }
    ]
  }
] satisfies Array<RouteConfigsTable>;
