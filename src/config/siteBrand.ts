import { getConfig } from "@bit-labs.cn/owl-ui/config";
import { reactive } from "vue";

const subsystemAdmin = "admin";
const keySiteName = "siteName";
const keySiteLogo = "siteLogo";
const keyCopyright = "copyright";

/** 公开系统配置里的站点外观。空字符串表示沿用平台配置或内置文案。 */
const brand = reactive({
  name: "",
  logo: "",
  copyright: ""
});

type PublicGroup = {
  items?: Array<{ key: string; value: string }>;
  groups?: PublicGroup[];
};

type PublicSiteView = {
  subsystems?: Array<{
    name: string;
    groups?: PublicGroup[];
  }>;
};

function visitPublicItems(groups: PublicGroup[] | undefined, visit: (key: string, value: string) => void) {
  for (const group of groups ?? []) {
    for (const item of group.items ?? []) visit(item.key, item.value?.trim() ?? "");
    visitPublicItems(group.groups, visit);
  }
}

/** 用公开配置覆盖站点名称、标志和版权信息。 */
export function applyPublicSite(view: PublicSiteView | null | undefined) {
  let name = "";
  let logo = "";
  let copyright = "";
  for (const subsystem of view?.subsystems ?? []) {
    if (subsystem.name !== subsystemAdmin) continue;
    visitPublicItems(subsystem.groups, (key, value) => {
      if (key === keySiteName) name = value;
      if (key === keySiteLogo) logo = usableLogo(value);
      if (key === keyCopyright) copyright = value;
    });
  }
  brand.name = name;
  brand.logo = logo;
  brand.copyright = copyright;
  syncDocumentTitle();
}

/** 侧栏和浏览器标题用的名称。没单独指定时用平台配置。 */
export function siteTitle(): string {
  if (brand.name) return brand.name;
  const title = getConfig()?.Title;
  return typeof title === "string" ? title : "";
}

/** 是否在系统配置里写了站点名称。 */
export function hasSiteName(): boolean {
  return brand.name !== "";
}

/** 侧栏标志。不是 base64 图片时沿用内置 logo.png。 */
export function siteLogoURL(): string {
  return brand.logo || defaultLogo();
}

/** 页脚版权。空字符串表示继续用内置的 Copyright 行。 */
export function siteCopyright(): string {
  return brand.copyright;
}

function usableLogo(value: string): string {
  if (/^data:image\/(png|jpeg|gif|webp);base64,/.test(value)) return value;
  return "";
}

function defaultLogo(): string {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.replace(/\/?$/, "/")}logo.png`;
}

function syncDocumentTitle() {
  const next = siteTitle();
  if (!next || typeof document === "undefined") return;
  const current = document.title;
  const mark = " | ";
  const at = current.lastIndexOf(mark);
  if (at >= 0) {
    document.title = current.slice(0, at) + mark + next;
  }
}
