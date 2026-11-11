<script setup lang="ts">
defineOptions({
  name: "OwlLoading"
});

withDefaults(
  defineProps<{
    /** 0 到 100。到 100 时百分比显示为「完成」 */
    percent?: number;
    title?: string;
    message?: string;
    phase?: string;
    footer?: string;
  }>(),
  {
    percent: 0,
    title: "正在打开系统",
    message: "正在建立安全连接",
    phase: "连接",
    footer: ""
  }
);

function shownPercent(value: number) {
  const next = Math.max(0, Math.min(100, value));
  return next >= 100 ? "完成" : `${Math.round(next)}%`;
}

function dialProgress(value: number) {
  return Math.max(0, Math.min(100, value));
}
</script>

<template>
  <div class="owl-loading" role="status" aria-live="polite">
    <div class="owl-loading__ambient" />
    <main class="owl-loading__content">
      <div class="owl-loading__dial" :style="{ '--p': dialProgress(percent) }">
        <div class="owl-loading__face">
          <span class="owl-loading__percent">{{ shownPercent(percent) }}</span>
          <p class="owl-loading__message">{{ message }}</p>
        </div>
      </div>
      <h1 class="owl-loading__title">{{ title }}</h1>
    </main>
  </div>
</template>

<style scoped>
.owl-loading {
  --ink: #172b4d;
  --muted: #6d7f99;
  --primary: #2f6fe0;
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  overflow: hidden;
  color: var(--ink);
  background:
    radial-gradient(circle at 50% 46%, #ffffff 0%, #f4f7fb 26%, #e6eef8 100%);
  font-family:
    Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
    "Microsoft YaHei", sans-serif;
}

.owl-loading__ambient {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: radial-gradient(
    circle at 50% 46%,
    rgba(47, 111, 224, 0.08),
    transparent 34%
  );
}

.owl-loading__content {
  width: min(440px, calc(100vw - 48px));
  text-align: center;
  animation: owl-loading-in 0.7s ease both;
}

.owl-loading__dial {
  display: grid;
  place-items: center;
  width: 228px;
  height: 228px;
  margin: 0 auto 28px;
  border-radius: 50%;
  background: conic-gradient(
    from -90deg,
    var(--primary) calc(var(--p) * 1%),
    #c5d4e6 0
  );
  box-shadow:
    0 0 0 16px rgba(47, 111, 224, 0.06),
    0 22px 48px rgba(23, 43, 77, 0.08);
}

.owl-loading__face {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 184px;
  height: 184px;
  padding: 28px;
  border-radius: 50%;
  background: #f7f9fc;
}

.owl-loading__percent {
  color: var(--ink);
  font-size: 48px;
  font-weight: 650;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.04em;
  line-height: 1;
}

.owl-loading__message {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.45;
  text-align: center;
}

.owl-loading__title {
  margin: 0;
  color: #243957;
  font-size: 20px;
  font-weight: 650;
  line-height: 1.45;
  letter-spacing: 0.2px;
  text-wrap: balance;
}

@keyframes owl-loading-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .owl-loading__content {
    animation: none;
  }
}
</style>
