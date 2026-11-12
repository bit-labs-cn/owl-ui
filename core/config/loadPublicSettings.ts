import { http } from "@bit-labs.cn/owl-ui/utils/http";
import { rememberSettings } from "@bit-labs.cn/owl-ui/config/settings";

type PublicSettingGroup = {
  key?: string;
  items?: Array<{ key?: string; value?: string }>;
  groups?: PublicSettingGroup[];
};

type PublicSettingSubsystem = {
  name?: string;
  groups?: PublicSettingGroup[];
};

/** 读取公开配置并写入缓存。失败时保持现有外观。 */
export async function loadPublicSettings() {
  try {
    const res = await http.request<{ data?: { subsystems?: PublicSettingSubsystem[] } }>(
      "get",
      "/api/v1/setting/public",
      {},
      { silentMessage: true, silentError: true }
    );
    rememberSettings(indexPublicSettings(res.data?.subsystems), "merge");
  } catch {
    // 公开配置读不到时沿用平台配置和内置标志。
  }
}

function indexPublicSettings(subsystems: PublicSettingSubsystem[] | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  for (const subsystem of subsystems ?? []) {
    if (!subsystem.name) continue;
    collect(out, subsystem.name, subsystem.groups);
  }
  return out;
}

function collect(out: Record<string, string>, prefix: string, groups: PublicSettingGroup[] | undefined) {
  for (const group of groups ?? []) {
    if (!group.key) continue;
    const path = `${prefix}.${group.key}`;
    for (const item of group.items ?? []) {
      if (!item.key) continue;
      out[`${path}.${item.key}`] = item.value ?? "";
    }
    collect(out, path, group.groups);
  }
}
