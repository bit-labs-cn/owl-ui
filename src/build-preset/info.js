import gradient from "gradient-string";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
import boxen from "boxen";
import { getPackageSize } from "./size.ts";
dayjs.extend(duration);
const welcomeMessage = gradient(["cyan", "magenta"]).multiline("您好! 欢迎使用 pure-admin 开源项目\n我们为您精心准备了下面两个贴心的保姆级文档\nhttps://pure-admin.cn\nhttps://pure-admin-utils.netlify.app");
const boxenOptions = {
    padding: 0.5,
    borderColor: "cyan",
    borderStyle: "round"
};
export function viteBuildInfo() {
    let config;
    let startTime;
    let endTime;
    let outDir = "dist";
    return {
        name: "vite:buildInfo",
        configResolved(resolvedConfig) {
            config = resolvedConfig;
            outDir = resolvedConfig.build?.outDir ?? "dist";
        },
        buildStart() {
            console.log(boxen(welcomeMessage, boxenOptions));
            if (config.command === "build") {
                startTime = dayjs(new Date());
            }
        },
        closeBundle() {
            if (config.command !== "build")
                return;
            endTime = dayjs(new Date());
            getPackageSize({
                folder: outDir,
                callback: size => {
                    console.log(boxen(gradient(["cyan", "magenta"]).multiline(`🎉 恭喜打包完成（总用时${dayjs
                        .duration(endTime.diff(startTime))
                        .format("mm分ss秒")}，打包后的大小为${size}）`), boxenOptions));
                }
            });
        }
    };
}
//# sourceMappingURL=info.js.map