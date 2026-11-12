import compressPlugin from "vite-plugin-compression";
import type { Plugin } from "vite";
import type { ViteCompression } from "./types.ts";

interface CompressProfile {
  ext: string;
  threshold: number;
  filter: () => boolean;
  deleteOriginFile: boolean;
  algorithm?: "brotliCompress";
}

interface CompressChoice {
  key: string;
  profiles: CompressProfile[];
}

/** 按压缩模式组装 vite-plugin-compression。每次构造都用新的配置，避免改到上一次的结果。 */
export class CompressionPlan {
  readonly plugins: Plugin[] | null;

  constructor(mode: ViteCompression) {
    if (mode === "none") {
      this.plugins = null;
      return;
    }

    const clear = mode.includes("clear");
    const plugins: Plugin[] = [];
    for (const choice of CompressionPlan.choices()) {
      if (!mode.includes(choice.key)) continue;
      for (const profile of choice.profiles) {
        const options = clear ? { ...profile, deleteOriginFile: true } : profile;
        plugins.push(compressPlugin(options) as unknown as Plugin);
      }
    }
    this.plugins = plugins;
  }

  private static choices(): CompressChoice[] {
    const gzip = (): CompressProfile => ({
      ext: ".gz",
      threshold: 0,
      filter: () => true,
      deleteOriginFile: false
    });
    const brotli = (): CompressProfile => ({
      ext: ".br",
      algorithm: "brotliCompress",
      threshold: 0,
      filter: () => true,
      deleteOriginFile: false
    });
    return [
      { key: "gzip", profiles: [gzip()] },
      { key: "brotli", profiles: [brotli()] },
      { key: "both", profiles: [gzip(), brotli()] }
    ];
  }
}
