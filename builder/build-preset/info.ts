import type { Plugin } from "vite";
import gradient from "gradient-string";
import dayjs, { type Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration.js";
import boxen, { type Options as BoxenOptions } from "boxen";
import { DirectorySize } from "./directory-size.ts";

dayjs.extend(duration);

const welcomeMessage = gradient(["cyan", "magenta"]).multiline(
  "您好！欢迎使用比特实验室 owl 框架体系 \n官网  https://www.bit-labs.cn\n博客  https://blog.bit-labs.cn"
);

const boxenOptions: BoxenOptions = {
  padding: 0.5,
  borderColor: "cyan",
  borderStyle: "round"
};

/** 一次构建的计时和体积汇报。构造时得到 Vite 插件。 */
export class BuildInfo {
  readonly plugin: Plugin;
  private command = "";
  private startTime: Dayjs | undefined;
  private outDir = "dist";

  constructor() {
    this.plugin = {
      name: "vite:buildInfo",
      configResolved: resolvedConfig => {
        this.command = resolvedConfig.command;
        this.outDir = resolvedConfig.build?.outDir ?? "dist";
      },
      buildStart: () => {
        console.log(boxen(welcomeMessage, boxenOptions));
        if (this.command === "build") {
          this.startTime = dayjs(new Date());
        }
      },
      closeBundle: () => {
        if (this.command !== "build" || !this.startTime) return;
        const elapsed = dayjs(new Date()).diff(this.startTime);
        new DirectorySize(this.outDir, true).measureTotalSize(totalSize => {
          console.log(
            boxen(
              gradient(["cyan", "magenta"]).multiline(
                `🎉 恭喜打包完成（总用时${dayjs
                  .duration(elapsed)
                  .format("mm分ss秒")}，打包后的大小为${totalSize}）`
              ),
              boxenOptions
            )
          );
        });
      }
    };
  }
}
