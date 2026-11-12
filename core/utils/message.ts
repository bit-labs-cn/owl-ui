import type { VNode } from "vue";

type messageStyle = "el" | "antd";
type messageTypes = "info" | "success" | "warning" | "error";

export interface MessageParams {
  /** 消息类型，可选 `info` 、`success` 、`warning` 、`error` ，默认 `info` */
  type?: messageTypes;
  /** 自定义图标，该属性会覆盖 `type` 的图标 */
  icon?: any;
  /** 是否将 `message` 属性作为 `HTML` 片段处理，默认 `false` */
  dangerouslyUseHTMLString?: boolean;
  /** 消息风格，可选 `el` 、`antd` ，默认 `antd` */
  customClass?: messageStyle;
  /** 显示时间，单位为毫秒。设为 `0` 则不会自动关闭 */
  duration?: number;
  /** 是否显示关闭按钮，默认值 `false` */
  showClose?: boolean;
  /** 文字是否居中，默认值 `false` */
  center?: boolean;
  /** `Message` 距离窗口顶部的偏移量，默认 `20` */
  offset?: number;
  /** 设置组件的根元素，默认 `document.body` */
  appendTo?: string | HTMLElement;
  /** 合并内容相同的消息，不支持 `VNode` 类型的消息，默认值 `false` */
  grouping?: boolean;
  /** 关闭时的回调函数, 参数为被关闭的 `message` 实例 */
  onClose?: Function | null;
}

export type MessageBody = string | VNode | (() => VNode);

export interface MessageHandler {
  close: () => void;
}

export type MessageAdapter = (
  message: MessageBody,
  params?: MessageParams
) => MessageHandler;

const fallbackAdapter: MessageAdapter = (msg, params) => {
  const text = typeof msg === "string" ? msg : "";
  console.warn(`[owl-ui:message]${params?.type ? `[${params.type}]` : ""}`, text);
  return { close: () => undefined };
};

let adapter: MessageAdapter = fallbackAdapter;
let closeAllHandler: (() => void) | null = null;

/**
 * UI 层注册消息实现（通常是 Element Plus 的 ElMessage）。
 * 核心层不直接依赖任何组件库。
 */
export function registerMessageAdapter(
  fn: MessageAdapter,
  closeAll?: () => void
): void {
  adapter = fn;
  closeAllHandler = closeAll ?? null;
}

/** `Message` 消息提示函数 */
export const message: MessageAdapter = (msg, params) => adapter(msg, params);

/** 关闭所有 `Message` 消息提示 */
export function closeAllMessage(): void {
  closeAllHandler?.();
}
