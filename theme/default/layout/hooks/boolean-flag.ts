import { ref, type Ref } from "vue";

/** 一个可切换的布尔值。在组件 setup 里 new 出来使用。 */
export class BooleanFlag {
  readonly value: Ref<boolean>;

  constructor(initialValue = false) {
    this.value = ref(initialValue);
  }

  set(next: boolean): void {
    this.value.value = next;
  }

  setTrue(): void {
    this.set(true);
  }

  setFalse(): void {
    this.set(false);
  }

  toggle(): void {
    this.set(!this.value.value);
  }
}
