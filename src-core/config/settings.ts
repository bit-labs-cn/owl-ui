import { getConfig } from "@bit-labs.cn/owl-ui/config";
import { reactive } from "vue";

const cached = reactive<Record<string, string>>({});

/** 写入已经摊平的配置。merge 只覆盖这次带来的路径；replace 换成整份。 */
export function rememberSettings(values: Record<string, string> | undefined, mode: "merge" | "replace") {
  const next = values ?? {};
  if (mode === "replace") {
    for (const key of Object.keys(cached)) {
      if (!(key in next)) delete cached[key];
    }
  }
  Object.assign(cached, next);
  syncDocumentTitle();
}

/**
 * 用「子系统.分组.配置键」取值，例如 settingValue("admin.site.siteName")。
 * 有二级分组时是 settingValue("admin.parent.child.item")。还没有这项时返回空字符串。
 */
export function settingValue(path: string): string {
  return cached[path] ?? "";
}

/** 侧栏和浏览器标题用的名称。没单独指定时用平台配置。 */
export function settingSiteTitle(): string {
  const name = settingValue("admin.site.siteName").trim();
  if (name) return name;
  const title = getConfig()?.Title;
  return typeof title === "string" ? title : "";
}

function syncDocumentTitle() {
  const next = settingSiteTitle();
  if (!next || typeof document === "undefined") return;
  const current = document.title;
  const mark = " | ";
  const at = current.lastIndexOf(mark);
  if (at >= 0) {
    document.title = current.slice(0, at) + mark + next;
  }
}
