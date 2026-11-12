
import { type UserConfigExport, type ConfigEnv, loadEnv } from "vite";
import { join } from "node:path";
import {
  BuildEnv,
  BuildInfo,
  defaultOptimizeInclude,
  defaultOptimizeExclude,
} from "@bit-labs.cn/owl-ui/build-preset";

import { debugServer } from "./vite-configure/server";
import {root, projectRoot, alias} from "./vite-configure/bootstrap";
import { build } from "./vite-configure/build";
import { plugins } from "./vite-configure/plugins";
import { owlBuilderProjectPlugin } from "./vite-configure/project-plugin";

export default async ({ mode }: ConfigEnv): Promise<UserConfigExport> => {
 
  const { VITE_PORT, VITE_COMPRESSION, VITE_PUBLIC_PATH, VITE_BASE_URL} = new BuildEnv(
    loadEnv(mode, projectRoot)
  );

  const outDir = process.env.VITE_APP_OUT_DIR || join(projectRoot, "dist");

  return {
    base: VITE_PUBLIC_PATH,
    root,
    envDir: projectRoot,
    publicDir: join(projectRoot, "public"),
    resolve: {
      dedupe: ["vue", "vue-router"],
      alias
    },

    plugins: [
      owlBuilderProjectPlugin({ projectRoot }),
      new BuildInfo().plugin,
      ...plugins(VITE_COMPRESSION)
    ],
    optimizeDeps: {
      include: [
        ...defaultOptimizeInclude,
        "@vue-flow/core",
        "@vue-flow/background",
        "@vue-flow/controls",
        "@vue-flow/minimap",
        "three"
      ],
      exclude: defaultOptimizeExclude
    },
    server: debugServer(VITE_BASE_URL, VITE_PORT),
    build: {
      ...build(),
      outDir,
      emptyOutDir: true
    }
  }
};
