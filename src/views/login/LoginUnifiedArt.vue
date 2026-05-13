<script setup lang="ts">
defineProps<{
  theme: "deepSpace" | "hudGrid" | "amberCorp";
}>();
</script>

<template>
  <div class="login-unified-art" :class="'login-unified-art--' + theme">
    <div class="login-unified-art__glow" aria-hidden="true" />
    <div class="login-unified-art__swell login-unified-art__swell--a" aria-hidden="true" />
    <div class="login-unified-art__swell login-unified-art__swell--b" aria-hidden="true" />
    <div class="login-unified-art__arc login-unified-art__arc--1" aria-hidden="true" />
    <div class="login-unified-art__arc login-unified-art__arc--2" aria-hidden="true" />
    <div class="login-unified-art__arc login-unified-art__arc--3" aria-hidden="true" />
    <div class="login-unified-art__ribbon" aria-hidden="true" />
    <div class="login-unified-art__dots" aria-hidden="true">
      <span /><span /><span />
    </div>
  </div>
</template>

<style scoped>
.login-unified-art {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

.login-unified-art--deepSpace {
  background: linear-gradient(155deg, #e0f2fe 0%, #bae6fd 42%, #7dd3fc 100%);
}

.login-unified-art--hudGrid {
  background: linear-gradient(155deg, #ccfbf1 0%, #99f6e4 42%, #5eead4 100%);
}

.login-unified-art--amberCorp {
  background: linear-gradient(155deg, #fef9c3 0%, #fde68a 38%, #fcd34d 100%);
}

.login-unified-art__glow {
  position: absolute;
  inset: -30% -40% auto -25%;
  height: 85%;
  background: radial-gradient(
    closest-side,
    rgba(255, 255, 255, 0.55),
    rgba(255, 255, 255, 0) 72%
  );
  opacity: 0.65;
  pointer-events: none;
}

.login-unified-art__swell {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(0.5px);
}

.login-unified-art__swell--a {
  width: 140%;
  height: 72%;
  left: -35%;
  top: -8%;
  background: radial-gradient(
    ellipse 80% 60% at 50% 50%,
    rgba(255, 255, 255, 0.38) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  opacity: 0.85;
}

.login-unified-art__swell--b {
  width: 95%;
  height: 55%;
  right: -28%;
  bottom: -12%;
  background: radial-gradient(
    ellipse 70% 55% at 60% 45%,
    rgba(255, 255, 255, 0.32) 0%,
    rgba(255, 255, 255, 0) 68%
  );
  opacity: 0.75;
}

.login-unified-art__arc {
  position: absolute;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.42);
  box-shadow: inset 0 0 24px rgba(255, 255, 255, 0.2);
  pointer-events: none;
}

.login-unified-art__arc--1 {
  width: min(420px, 95vw);
  height: min(420px, 95vw);
  right: -18%;
  top: 6%;
  border-color: rgba(255, 255, 255, 0.38);
  border-bottom-color: transparent;
  border-left-color: transparent;
  transform: rotate(-18deg);
  opacity: 0.7;
}

.login-unified-art__arc--2 {
  width: min(280px, 70vw);
  height: min(280px, 70vw);
  right: 8%;
  bottom: 12%;
  border-width: 3px;
  border-color: rgba(255, 255, 255, 0.5);
  border-top-color: transparent;
  border-right-color: transparent;
  transform: rotate(42deg);
  opacity: 0.55;
}

.login-unified-art__arc--3 {
  width: min(180px, 45vw);
  height: min(180px, 45vw);
  right: 38%;
  top: 38%;
  border-width: 2px;
  border-color: rgba(255, 255, 255, 0.35);
  border-right-color: transparent;
  transform: rotate(-55deg);
  opacity: 0.45;
}

.login-unified-art__ribbon {
  position: absolute;
  left: -8%;
  bottom: 22%;
  width: 85%;
  height: 38%;
  border-radius: 50%;
  background: linear-gradient(
    105deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.22) 45%,
    rgba(255, 255, 255, 0.08) 100%
  );
  transform: rotate(-8deg) scaleY(0.35);
  opacity: 0.9;
  pointer-events: none;
}

.login-unified-art__dots {
  position: absolute;
  right: 20%;
  top: 28%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: 0.55;
}

.login-unified-art__dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.75);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.08);
}

.login-unified-art__dots span:nth-child(2) {
  margin-left: 14px;
  opacity: 0.85;
}

.login-unified-art__dots span:nth-child(3) {
  margin-left: 6px;
  opacity: 0.65;
}
</style>
