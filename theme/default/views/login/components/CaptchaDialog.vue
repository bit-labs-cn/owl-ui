<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { Click, Rotate, Slide } from "go-captcha-vue";
import "go-captcha-vue/dist/style.css";
import {
  userAPI,
  type LoginCaptchaAnswer,
  type SlideCaptchaData
} from "@bit-labs.cn/owl-ui/api/user";

defineOptions({
  name: "CaptchaDialog"
});

const props = defineProps<{
  visible: boolean;
  captchaType: string;
}>();

const emit = defineEmits<{
  "update:visible": [value: boolean];
  confirm: [payload: LoginCaptchaAnswer];
  close: [];
}>();

const captchaId = ref("");
const captchaRenderKey = ref(0);
const loading = ref(false);

const slideData = reactive({
  thumbX: 0,
  thumbY: 0,
  thumbWidth: 0,
  thumbHeight: 0,
  image: "",
  thumb: ""
});

const imageData = reactive({
  image: "",
  thumb: ""
});

const resolvedType = computed(() => props.captchaType || "slide");

/**
 * 必须用组件真实宽高，禁止再用 CSS transform:scale。
 * scale 只放大画面不放大坐标系，会导致滑块与拼图错位。
 * 尺寸与 go-captcha 默认 / 后端出图一致（300×220）。
 */
const slideConfig = {
  title: "请拖动滑块完成验证",
  width: 300,
  height: 220
};

const clickConfig = {
  title: "请依次点击图中的文字",
  width: 300,
  height: 220
};

const rotateConfig = {
  title: "请旋转图片至正确角度",
  width: 300,
  height: 220
};

function toDataUri(base64: string) {
  if (!base64) return "";
  if (base64.startsWith("data:")) return base64;
  return `data:image/png;base64,${base64}`;
}

function resetData() {
  captchaId.value = "";
  slideData.thumbX = 0;
  slideData.thumbY = 0;
  slideData.thumbWidth = 0;
  slideData.thumbHeight = 0;
  slideData.image = "";
  slideData.thumb = "";
  imageData.image = "";
  imageData.thumb = "";
}

async function loadCaptcha() {
  if (loading.value) return;
  captchaRenderKey.value += 1;
  resetData();
  loading.value = true;
  try {
    const res = await userAPI.generateCaptcha();
    if (!res?.success || !res.data) return;
    const data = res.data;
    captchaId.value = data.captchaId;

    if (resolvedType.value === "slide") {
      const slide = data as SlideCaptchaData;
      slideData.thumbX = 0;
      slideData.thumbY = slide.tileY;
      slideData.thumbWidth = slide.tileWidth;
      slideData.thumbHeight = slide.tileHeight;
      slideData.image = toDataUri(slide.masterImage);
      slideData.thumb = toDataUri(slide.tileImage);
      return;
    }

    imageData.image = toDataUri(data.masterImage);
    imageData.thumb = toDataUri(data.thumbImage ?? "");
  } finally {
    loading.value = false;
  }
}

function handleClose() {
  emit("update:visible", false);
  emit("close");
}

function emitConfirm(payload: Omit<LoginCaptchaAnswer, "captchaId">) {
  if (!captchaId.value) return false;
  emit("confirm", { captchaId: captchaId.value, ...payload });
  return true;
}

const commonEvents = {
  refresh: () => loadCaptcha(),
  close: () => handleClose()
};

const slideEvents = {
  ...commonEvents,
  confirm: (point: { x: number; y: number }) =>
    emitConfirm({ x: point.x, y: point.y })
};

const clickEvents = {
  ...commonEvents,
  confirm: (dots: Array<{ index: number; x: number; y: number }>) =>
    emitConfirm({
      points: dots.map(dot => ({
        index: dot.index - 1,
        x: dot.x,
        y: dot.y
      }))
    })
};

const rotateEvents = {
  ...commonEvents,
  confirm: (angle: number) => emitConfirm({ angle })
};

watch(
  () => [props.visible, props.captchaType] as const,
  ([visible]) => {
    if (visible) {
      loadCaptcha();
    }
  }
);

defineExpose({
  refresh: loadCaptcha
});
</script>

<template>
  <el-dialog
    :model-value="visible"
    title="安全验证"
    width="340px"
    class="captcha-verify-dialog"
    align-center
    append-to-body
    destroy-on-close
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <div v-loading="loading" class="captcha-dialog-body">
      <Slide
        v-if="resolvedType === 'slide'"
        :key="`slide-${captchaRenderKey}`"
        :config="slideConfig"
        :data="slideData"
        :events="slideEvents"
      />
      <Click
        v-else-if="resolvedType === 'click'"
        :key="`click-${captchaRenderKey}`"
        :config="clickConfig"
        :data="imageData"
        :events="clickEvents"
      />
      <Rotate
        v-else-if="resolvedType === 'rotate'"
        :key="`rotate-${captchaRenderKey}`"
        :config="rotateConfig"
        :data="imageData"
        :events="rotateEvents"
      />
      <div v-else class="captcha-unsupported">
        不支持的验证码类型：{{ resolvedType }}
      </div>
    </div>
  </el-dialog>
</template>

<style scoped>
.captcha-dialog-body {
  display: flex;
  justify-content: center;
  min-height: 0;
}

.captcha-unsupported {
  padding: 24px 0;
  text-align: center;
  color: var(--el-text-color-secondary);
}
</style>

<style>
.captcha-verify-dialog.el-dialog {
  width: 340px !important;
  max-width: calc(100vw - 48px);
  margin: 0 !important;
}

.captcha-verify-dialog .el-dialog__header {
  padding: 12px 16px 0 !important;
}

.captcha-verify-dialog .el-dialog__body {
  /* 去掉底部大块留白 */
  padding: 4px 12px 8px !important;
}

.captcha-verify-dialog .go-captcha.gc-wrapper {
  padding: 4px 8px 0 !important;
  box-shadow: none;
}

.captcha-verify-dialog .go-captcha .gc-footer {
  height: 40px;
  padding-top: 6px;
  box-sizing: border-box;
}

.el-overlay-dialog:has(.captcha-verify-dialog) {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
