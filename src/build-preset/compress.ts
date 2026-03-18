import { isArray } from "@pureadmin/utils";
import compressPlugin from "vite-plugin-compression";
import type { Plugin } from "vite";
import type { ViteCompression } from "./types.ts";

export const configCompressPlugin = (
  compress: ViteCompression
): Plugin | Plugin[] | null => {
  if (compress === "none") return null;

  const gz = {
    ext: ".gz",
    threshold: 0,
    filter: () => true,
    deleteOriginFile: false
  };
  const br = {
    ext: ".br",
    algorithm: "brotliCompress" as const,
    threshold: 0,
    filter: () => true,
    deleteOriginFile: false
  };

  const codeList = [
    { key: "gzip", value: gz },
    { key: "brotli", value: br },
    { key: "both", value: [gz, br] }
  ];

  const plugins: Plugin[] = [];

  codeList.forEach(item => {
    if (!compress.includes(item.key)) return;
    const clear = compress.includes("clear");

    if (isArray(item.value)) {
      item.value.forEach(valueItem => {
        plugins.push(
          compressPlugin(
            clear ? Object.assign(valueItem, { deleteOriginFile: true }) : valueItem
          )
        );
      });
    } else {
      plugins.push(
        compressPlugin(
          clear ? Object.assign(item.value, { deleteOriginFile: true }) : item.value
        )
      );
    }
  });

  return plugins;
};
