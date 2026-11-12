import { $t } from "@bit-labs.cn/owl-ui/core/utils/i18nKey";
import { uiKitRegistry } from "@bit-labs.cn/owl-ui/core/ui-kit";

const { VITE_HIDE_HOME } = import.meta.env;
const Layout = uiKitRegistry.layoutComponent();

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
      component: uiKitRegistry.routeComponent("welcome"),
      meta: {
        title: $t("menus.pureHome"),
        showLink: VITE_HIDE_HOME === "true" ? false : true
      }
    }
  ]
} satisfies RouteConfigsTable;
