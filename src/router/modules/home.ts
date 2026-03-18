import { $t } from "@bit-labs.cn/owl-ui/plugins/i18n";
import { fa } from "element-plus/es/locale/index.mjs";
const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import("@bit-labs.cn/owl-ui/layout/index.vue");

export default {
  path: "/",
  name: "Home",
  component: Layout,
  redirect: "/welcome",
  meta: {
    icon: "ep:home-filled",
    title: $t("menus.pureHome"),
    rank: 0
  },
  children: [
    {
      path: "/welcome",
      name: "Welcome",
      component: () => import("@bit-labs.cn/owl-ui/views/welcome/index.vue"),
      meta: {
        title: $t("menus.pureHome"),
        showLink: VITE_HIDE_HOME === "true" ? false : true
      }
    }
  ]
} satisfies RouteConfigsTable;
