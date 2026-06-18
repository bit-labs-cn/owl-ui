import { ref } from "vue";
import { getConfig } from "@bit-labs.cn/owl-ui/config";
import { useLayout } from "./useLayout";
import { removeToken } from "@bit-labs.cn/owl-ui/utils/auth";
import { routerArrays } from "@bit-labs.cn/owl-ui/layout/types";
import { router, resetRouter } from "@bit-labs.cn/owl-ui/router";
import type { themeColorsType } from "../types";
import { useAppStoreHook } from "@bit-labs.cn/owl-ui/store/modules/app";
import { useEpThemeStoreHook } from "@bit-labs.cn/owl-ui/store/modules/epTheme";
import { useMultiTagsStoreHook } from "@bit-labs.cn/owl-ui/store/modules/multiTags";
import { darken, lighten, useGlobal, storageLocal } from "@pureadmin/utils";

export function useDataThemeChange() {
  const { layoutTheme, layout } = useLayout();
  const themeColors = ref<Array<themeColorsType>>([
    /* Cloud Dancer Minimal */
    { color: "#ffffff", themeColor: "clean", title: "白色极简" },
    /* SaaS Indigo */
    { color: "#6366f1", themeColor: "tech", title: "科技互联网" },
    /* Fintech Navy Trust */
    { color: "#1e40af", themeColor: "finance", title: "金融科技" },
    /* Clinical Teal */
    { color: "#0d9488", themeColor: "healthcare", title: "医疗健康" },
    /* Scholar Violet */
    { color: "#7c3aed", themeColor: "education", title: "教育培训" },
    /* Warm Coral Commerce */
    { color: "#ea580c", themeColor: "ecommerce", title: "电商零售" },
    /* Supply Chain Slate Blue */
    { color: "#2563eb", themeColor: "logistics", title: "物流供应链" },
    /* Industrial Steel */
    { color: "#4a6fa5", themeColor: "manufacturing", title: "制造工业" },
    /* Mist Blue Luxe */
    { color: "#5b8dae", themeColor: "realestate", title: "房地产" },
    /* Eco Emerald */
    { color: "#059669", themeColor: "energy", title: "能源环保" }
  ]);

  const { $storage } = useGlobal<GlobalPropertiesApi>();
  const dataTheme = ref<boolean>($storage?.layout?.darkMode);
  const overallStyle = ref<string>($storage?.layout?.overallStyle);
  const body = document.documentElement as HTMLElement;

  function toggleClass(flag: boolean, clsName: string, target?: HTMLElement) {
    const targetEl = target || document.body;
    let { className } = targetEl;
    className = className.replace(clsName, "").trim();
    targetEl.className = flag ? `${className} ${clsName}` : className;
  }

  /** 设置导航主题色 */
  function setLayoutThemeColor(
    theme = getConfig().Theme ?? "clean",
    isClick = true
  ) {
    layoutTheme.value.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    // 如果非isClick，保留之前的themeColor
    const storageThemeColor = $storage.layout.themeColor;
    $storage.layout = {
      layout: layout.value,
      theme,
      darkMode: dataTheme.value,
      sidebarStatus: $storage.layout?.sidebarStatus,
      epThemeColor: $storage.layout?.epThemeColor,
      themeColor: isClick ? theme : storageThemeColor,
      overallStyle: overallStyle.value
    };

    // Fallback map for old theme keys to new industry keys
    const legacyMap: Record<string, string> = {
      light: "clean",
      default: "tech",
      saucePurple: "education",
      pink: "healthcare",
      dusk: "ecommerce",
      volcano: "logistics",
      mingQing: "energy",
      auroraGreen: "realestate"
    };
    const resolvedTheme = legacyMap[theme] || theme;

    if (resolvedTheme === "clean") {
      setEpThemeColor(getConfig().EpThemeColor);
    } else {
      const colors = themeColors.value.find(v => v.themeColor === resolvedTheme);
      if (colors) {
        setEpThemeColor(colors.color);
      } else {
        setEpThemeColor(getConfig().EpThemeColor);
      }
    }
  }

  function setPropertyPrimary(mode: string, i: number, color: string) {
    document.documentElement.style.setProperty(
      `--el-color-primary-${mode}-${i}`,
      dataTheme.value ? darken(color, i / 10) : lighten(color, i / 10)
    );
  }

  /** 设置 `element-plus` 主题色 */
  const setEpThemeColor = (color: string) => {
    useEpThemeStoreHook().setEpThemeColor(color);
    document.documentElement.style.setProperty("--el-color-primary", color);
    for (let i = 1; i <= 2; i++) {
      setPropertyPrimary("dark", i, color);
    }
    for (let i = 1; i <= 9; i++) {
      setPropertyPrimary("light", i, color);
    }
  };

  /** 浅色、深色整体风格切换 */
  function dataThemeChange(overall?: string) {
    overallStyle.value = overall;
    if (useEpThemeStoreHook().epTheme === "clean" && dataTheme.value) {
      setLayoutThemeColor("tech", false);
    } else {
      setLayoutThemeColor(useEpThemeStoreHook().epTheme, false);
    }

    if (dataTheme.value) {
      document.documentElement.classList.add("dark");
    } else {
      if ($storage.layout.themeColor === "clean") {
        setLayoutThemeColor("clean", false);
      }
      document.documentElement.classList.remove("dark");
    }
  }

  /** 清空缓存并返回登录页 */
  function onReset() {
    removeToken();
    storageLocal().clear();
    const { Grey, Weak, MultiTagsCache, EpThemeColor, Layout } = getConfig();
    useAppStoreHook().setLayout(Layout);
    setEpThemeColor(EpThemeColor);
    useMultiTagsStoreHook().multiTagsCacheChange(MultiTagsCache);
    toggleClass(Grey, "html-grey", document.querySelector("html"));
    toggleClass(Weak, "html-weakness", document.querySelector("html"));
    router.push("/login");
    useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
    resetRouter();
  }

  return {
    body,
    dataTheme,
    overallStyle,
    layoutTheme,
    themeColors,
    onReset,
    toggleClass,
    dataThemeChange,
    setEpThemeColor,
    setLayoutThemeColor
  };
}
