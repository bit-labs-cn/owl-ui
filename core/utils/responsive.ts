// 响应式storage
import type { App } from "vue";
import Storage from "responsive-storage";
import { routerArrays } from "@bit-labs.cn/owl-ui/layout/types";
import { responsiveStorageNameSpace } from "@bit-labs.cn/owl-ui/config";
import {
  createDefaultLayoutStorage,
  normalizeLayoutStorage
} from "@bit-labs.cn/owl-ui/layout/utils/resolveLayoutTheme";

export const injectResponsiveStorage = (app: App, config: PlatformConfigs) => {
  const nameSpace = responsiveStorageNameSpace();
  const storedLayout = Storage.getData("layout", nameSpace);
  const configObj = Object.assign(
    {
      // 国际化 默认中文zh
      locale: Storage.getData("locale", nameSpace) ?? {
        locale: config.Locale ?? "zh"
      },
      // layout模式以及主题
      layout: storedLayout
        ? normalizeLayoutStorage(storedLayout, config)
        : createDefaultLayoutStorage(config),
      // 系统配置-界面显示
      configure: Storage.getData("configure", nameSpace) ?? {
        grey: config.Grey ?? false,
        weak: config.Weak ?? false,
        hideTabs: config.HideTabs ?? false,
        hideFooter: config.HideFooter ?? true,
        showLogo: config.ShowLogo ?? true,
        showModel: config.ShowModel ?? "smart",
        multiTagsCache: config.MultiTagsCache ?? false,
        stretch: config.Stretch ?? false
      }
    },
    config.MultiTagsCache
      ? {
          // 默认显示顶级菜单tag
          tags: Storage.getData("tags", nameSpace) ?? routerArrays
        }
      : {}
  );

  app.use(Storage, { nameSpace, memory: configObj });
};
