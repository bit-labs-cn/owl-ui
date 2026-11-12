import type { BuildPresetEnv, ViteCompression } from "./types.ts";

/** 把 Vite 读到的环境变量收成一份业务配置，并把字符串写回 process.env。 */
export class BuildEnv implements BuildPresetEnv {
  VITE_BASE_URL = "";
  VITE_HTTP_TIMEOUT = 60_000;
  VITE_PORT = 8848;
  VITE_PUBLIC_PATH = "";
  VITE_ROUTER_HISTORY = "";
  VITE_CDN = false;
  VITE_HIDE_HOME = "false";
  VITE_COMPRESSION: ViteCompression = "none";
  [key: string]: unknown;

  constructor(
    envConf: Record<string, string>,
    defaults: Partial<BuildPresetEnv> = {}
  ) {
    Object.assign(this, defaults);

    for (const envName of Object.keys(envConf)) {
      let realValue: unknown = envConf[envName].replace(/\\n/g, "\n");
      realValue =
        realValue === "true" ? true : realValue === "false" ? false : realValue;

      if (envName === "VITE_PORT" || envName === "VITE_HTTP_TIMEOUT") {
        realValue = Number(realValue);
      }

      this[envName] = realValue;
      BuildEnv.writeProcessEnv(envName, realValue);
    }
  }

  private static writeProcessEnv(envName: string, realValue: unknown): void {
    if (typeof realValue === "string") {
      process.env[envName] = realValue;
      return;
    }
    if (typeof realValue === "object" && realValue !== null) {
      process.env[envName] = JSON.stringify(realValue);
    }
  }
}
