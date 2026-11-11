import { settingSiteTitle, settingValue } from "@bit-labs.cn/owl-ui/config/settings";

/** 侧栏和浏览器标题用的名称。没单独指定时用平台配置。 */
export function siteTitle(): string {
  return settingSiteTitle();
}

/** 是否在系统配置里写了站点名称。 */
export function hasSiteName(): boolean {
  return settingValue("admin.site.siteName").trim() !== "";
}

/** 侧栏标志。不是 base64 图片时沿用内置 logo.png。 */
export function siteLogoURL(): string {
  return usableLogo(settingValue("admin.site.siteLogo").trim()) || defaultLogo();
}

/** 页脚版权。空字符串表示继续用内置的 Copyright 行。 */
export function siteCopyright(): string {
  return settingValue("admin.site.copyright").trim();
}

function usableLogo(value: string): string {
  if (/^data:image\/(png|jpeg|gif|webp);base64,/.test(value)) return value;
  return "";
}

function defaultLogo(): string {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.replace(/\/?$/, "/")}logo.png`;
}
