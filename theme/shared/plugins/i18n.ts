// 多组件库的国际化和本地项目国际化兼容
import { type I18n, createI18n } from "vue-i18n";
import type { App, WritableComputedRef } from "vue";
import { platformConfig } from "@bit-labs.cn/owl-ui/config";
import { storageLocal } from "@pureadmin/utils";

// element-plus国际化
import enLocale from "element-plus/es/locale/lang/en";
import zhLocale from "element-plus/es/locale/lang/zh-cn";

const siphonI18n = (function () {
  // 仅初始化一次国际化配置。插件在 theme/shared/plugins，文案在包根 locales。
  let cache = Object.fromEntries(
    Object.entries(
      import.meta.glob("../../../locales/*.y(a)?ml", { eager: true })
    ).map(([key, value]: any) => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i)[1];
      return [matched, value.default];
    })
  );
  return (prefix = "zh-CN") => {
    return cache[prefix] ?? {};
  };
})();

export const localesConfigs = {
  zh: {
    ...siphonI18n("zh-CN"),
    ...zhLocale
  },
  en: {
    ...siphonI18n("en"),
    ...enLocale
  }
};

/**
 * 国际化转换工具函数（自动读取根目录locales文件夹下文件进行国际化匹配）
 * @param message message
 * @returns 转化后的message
 */
export function transformI18n(message: any = ""): string {
  if (!message) {
    return "";
  }

  // 处理存储动态路由的title,格式 {zh:"",en:""}
  if (typeof message === "object") {
    const locale: string | WritableComputedRef<string> | any =
      i18n.global.locale;
    return message[locale?.value] ?? "";
  }

  // 交给 vue-i18n 判断词条是否存在：编译后的消息节点在开发/构建下结构不同，
  // 自行展开 key 会在生产构建里判错，导致界面显示原始 key。
  return i18n.global.te(message as string)
    ? i18n.global.t(message as string)
    : message;
}

/** 此函数只是配合i18n Ally插件来进行国际化智能提示，并无实际意义（只对提示起作用）；实现位于核心层，供路由复用 */
export { $t } from "@bit-labs.cn/owl-ui/core/utils/i18nKey";

export const i18n: I18n = createI18n({
  legacy: false,
  locale:
    storageLocal().getItem<StorageConfigs>(
      `${platformConfig.storageNamespace()}locale`
    )?.locale ?? "zh",
  fallbackLocale: "en",
  messages: localesConfigs
});

export function useI18n(app: App) {
  app.use(i18n);
}
