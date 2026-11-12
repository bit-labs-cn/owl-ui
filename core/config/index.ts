import axios from "axios";
import type { App } from "vue";

/** 平台配置。启动时从 platform-config.json 读入，之后按路径取值。 */
export class PlatformConfig {
  private values: Record<string, any> = {};

  get(key?: string): PlatformConfigs {
    if (typeof key !== "string" || !key) return this.values;
    const segments = key.split(".");
    let current: any = this.values;
    for (const segment of segments) {
      if (current && typeof current[segment] !== "undefined") {
        current = current[segment];
      } else {
        return null as unknown as PlatformConfigs;
      }
    }
    return current;
  }

  set(next?: unknown): void {
    this.values = Object.assign(this.values, next);
  }

  storageNamespace(): string {
    return this.get().ResponsiveStorageNameSpace;
  }

  /** 读取 public/platform-config.json，并挂到应用的全局属性上。 */
  async load(app: App): Promise<PlatformConfigs | undefined> {
    const publicPath = import.meta.env.VITE_PUBLIC_PATH ?? "";
    app.config.globalProperties.$config = this.get();
    try {
      const { data } = await axios({
        method: "get",
        url: `${publicPath}platform-config.json`
      });
      const current = app.config.globalProperties.$config;
      if (app && current && typeof data === "object") {
        const merged = Object.assign(current, data);
        app.config.globalProperties.$config = merged;
        this.set(merged);
        return merged;
      }
      return current;
    } catch {
      throw "请在public文件夹下添加platform-config.json配置文件";
    }
  }
}

export const platformConfig = new PlatformConfig();
