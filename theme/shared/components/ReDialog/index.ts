import { ref, type Ref } from "vue";
import reDialog from "./index.vue";
import { useTimeoutFn } from "@vueuse/core";
import { withInstall } from "@pureadmin/utils";
import type { DialogOptions } from "./type";

export type { EventType, ArgsType, DialogProps, ButtonProps, DialogOptions } from "./type";

/** 全局弹窗列表。打开、关闭和改标题都在这一个对象上。 */
export class DialogService {
  readonly dialogs: Ref<DialogOptions[]> = ref([]);

  open(options: DialogOptions): void {
    const show = () => {
      this.dialogs.value.push(Object.assign(options, { visible: true }));
    };
    if (options?.openDelay) {
      useTimeoutFn(show, options.openDelay);
      return;
    }
    show();
  }

  close(options: DialogOptions, index: number, args?: any): void {
    this.dialogs.value[index].visible = false;
    options.closeCallBack && options.closeCallBack({ options, index, args });
    const closeDelay = options?.closeDelay ?? 200;
    useTimeoutFn(() => {
      this.dialogs.value.splice(index, 1);
    }, closeDelay);
  }

  update(value: any, key = "title", index = 0): void {
    this.dialogs.value[index][key] = value;
  }

  closeAll(): void {
    this.dialogs.value = [];
  }
}

export const dialogService = new DialogService();
export const ReDialog = withInstall(reDialog);
