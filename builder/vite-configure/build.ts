import { pathResolve } from "@bit-labs.cn/owl-ui/build-preset";

export const build = () => {
  console.log("meta.url", import.meta.url);
  const mainHtml = pathResolve("../index.html", import.meta.url);
  console.log("输入文件:", { mainHtml });
  return {
    // es2015 会把 class fields 等降译并注入 helper；mapbox-gl 等库的
    // Web Worker 与主线程共享代码时拿不到这些 helper，生产环境报
    // ReferenceError（如 qn is not defined）。es2022 保留原生语法。
    target: "es2022",
    sourcemap: false,
    chunkSizeWarningLimit: 4000,
    rollupOptions: {
      input: {
        main: mainHtml,
      },
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]"
      }
    }
  }
};