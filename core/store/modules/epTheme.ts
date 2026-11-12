import { defineStore } from "pinia";
import {
  store,
  platformConfig,
  storageLocal
} from "../utils";
import { resolveLayoutTheme } from "@bit-labs.cn/owl-ui/layout/utils/resolveLayoutTheme";

export const useEpThemeStore = defineStore({
  id: "pure-epTheme",
  state: () => ({
    epThemeColor:
      storageLocal().getItem<StorageConfigs>(
        `${platformConfig.storageNamespace()}layout`
      )?.epThemeColor ?? platformConfig.get().EpThemeColor,
    epTheme: resolveLayoutTheme(
      storageLocal().getItem<StorageConfigs>(
        `${platformConfig.storageNamespace()}layout`
      )?.theme ?? platformConfig.get().Theme ?? "clean"
    )
  }),
  getters: {
    getEpThemeColor(state) {
      return state.epThemeColor;
    },
    /** 用于mix导航模式下hamburger-svg的fill属性 */
    fill(state) {
      if (state.epTheme === "clean") {
        return "#409eff";
      } else {
        return "#fff";
      }
    }
  },
  actions: {
    setEpThemeColor(newColor: string): void {
      const layout = storageLocal().getItem<StorageConfigs>(
        `${platformConfig.storageNamespace()}layout`
      );
      this.epTheme = layout?.theme;
      this.epThemeColor = newColor;
      if (!layout) return;
      layout.epThemeColor = newColor;
      storageLocal().setItem(`${platformConfig.storageNamespace()}layout`, layout);
    }
  }
});

export function useEpThemeStoreHook() {
  return useEpThemeStore(store);
}
