const LEGACY_THEME_MAP: Record<string, string> = {
  light: "clean",
  default: "ocean",
  saucePurple: "violet",
  pink: "crimson",
  dusk: "orange",
  volcano: "crimson",
  mingQing: "teal",
  auroraGreen: "emerald",
  tech: "violet",
  finance: "ocean",
  healthcare: "teal",
  education: "violet",
  ecommerce: "orange",
  logistics: "ocean",
  manufacturing: "ocean",
  realestate: "ocean",
  energy: "emerald"
};

const VALID_THEMES = new Set([
  "clean",
  "ocean",
  "violet",
  "fuchsia",
  "crimson",
  "orange",
  "amber",
  "emerald",
  "teal",
  "cyan",
  "slate",
  "coffee"
]);

/** 将旧版主题键映射为色相明确的主题键，无效值回退到白色极简 */
export function resolveLayoutTheme(theme?: string | null): string {
  if (!theme) return "clean";
  const resolved = LEGACY_THEME_MAP[theme] ?? theme;
  return VALID_THEMES.has(resolved) ? resolved : "clean";
}

export function createDefaultLayoutStorage(
  config: PlatformConfigs
): StorageConfigs {
  const theme = resolveLayoutTheme(config.Theme ?? "clean");
  return {
    layout: config.Layout ?? "vertical",
    theme,
    darkMode: config.DarkMode ?? false,
    sidebarStatus: config.SidebarStatus ?? true,
    epThemeColor: config.EpThemeColor ?? "#409EFF",
    themeColor: theme,
    overallStyle: config.OverallStyle ?? "light"
  };
}

export function normalizeLayoutStorage(
  layout: StorageConfigs,
  config?: PlatformConfigs
): StorageConfigs {
  const fallback = resolveLayoutTheme(config?.Theme ?? "clean");
  return {
    ...layout,
    theme: resolveLayoutTheme(layout?.theme ?? fallback),
    themeColor: resolveLayoutTheme(layout?.themeColor ?? fallback)
  };
}
