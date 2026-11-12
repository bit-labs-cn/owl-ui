/**
 * 仅用于 i18n Ally 等工具的键名提示，本身不参与翻译。
 * 核心层不能依赖 UI 层的 i18n 实现，因此这里只保留恒等函数。
 */
export const $t = (key: string) => key;
