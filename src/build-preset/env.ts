import type { BuildPresetEnv } from "./types.ts";

/**
 * 将 Vite 读取到的环境变量标准化为业务配置对象，并注入 process.env
 */
export function wrapperEnv(
  envConf: Record<string, string>,
  defaults: Partial<BuildPresetEnv> = {}
): BuildPresetEnv {
  const ret: BuildPresetEnv = {
    VITE_PORT: 8848,
    VITE_PUBLIC_PATH: "",
    VITE_ROUTER_HISTORY: "",
    VITE_CDN: false,
    VITE_HIDE_HOME: "false",
    VITE_COMPRESSION: "none",
    ...defaults
  };

  for (const envName of Object.keys(envConf)) {
    let realValue: unknown = envConf[envName].replace(/\\n/g, "\n");
    realValue =
      realValue === "true"
        ? true
        : realValue === "false"
          ? false
          : realValue;

    if (envName === "VITE_PORT") {
      realValue = Number(realValue);
    }

    ret[envName] = realValue;

    if (typeof realValue === "string") {
      process.env[envName] = realValue;
    } else if (typeof realValue === "object") {
      process.env[envName] = JSON.stringify(realValue);
    }
  }

  return ret;
}
