import { isFunction } from "@pureadmin/utils";
import { ElMessage } from "element-plus";
import type {
  MessageAdapter,
  MessageBody,
  MessageParams
} from "@bit-labs.cn/owl-ui/core/utils/message";

/** Element Plus 消息实现，供核心层通过适配器调用 */
export const elementMessageAdapter: MessageAdapter = (
  message: MessageBody,
  params?: MessageParams
) => {
  if (!params) {
    return ElMessage({
      message,
      // 全局搜 pure-message 即可知道该类的样式位置
      customClass: "pure-message"
    });
  }

  const {
    icon,
    type = "info",
    dangerouslyUseHTMLString = false,
    customClass = "antd",
    duration = 2000,
    showClose = false,
    center = false,
    offset = 20,
    appendTo = document.body,
    grouping = false,
    onClose
  } = params;

  // Element Plus 各版本对 center 等字段的类型声明不完全一致；运行时按原参数透传
  return ElMessage({
    message,
    type,
    icon,
    dangerouslyUseHTMLString,
    duration,
    showClose,
    center,
    offset,
    appendTo,
    grouping,
    customClass: customClass === "antd" ? "pure-message" : "",
    onClose: () => (isFunction(onClose) ? onClose() : null)
  } as any);
};

export const closeAllElementMessage = (): void => ElMessage.closeAll();
