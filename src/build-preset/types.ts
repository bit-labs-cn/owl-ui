export type ViteCompression =
  | "none"
  | "gzip"
  | "brotli"
  | "both"
  | "gzip-clear"
  | "brotli-clear"
  | "both-clear";

export interface BuildPresetEnv {
  /** 接口基础地址（开发代理 target / 前端 axios baseURL） */
  VITE_BASE_URL: string;
  VITE_PORT: number;
  VITE_PUBLIC_PATH: string;
  VITE_ROUTER_HISTORY: string;
  VITE_CDN: boolean;
  VITE_HIDE_HOME: string;
  VITE_COMPRESSION: ViteCompression;
  [key: string]: unknown;
}
