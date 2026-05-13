<script setup lang="ts">
import { computed } from "vue";
import heroDeep from "./heroes/deep-space-hero.svg?url";
import heroHud from "./heroes/hud-grid-hero.svg?url";
import heroAmber from "./heroes/amber-corp-hero.svg?url";

const props = defineProps<{
  theme: "deepSpace" | "hudGrid" | "amberCorp";
}>();

const heroUrlMap = {
  deepSpace: heroDeep,
  hudGrid: heroHud,
  amberCorp: heroAmber
} as const;

const heroStyle = computed(() => ({
  backgroundImage: `url(${heroUrlMap[props.theme]})`
}));
</script>

<template>
  <div class="login-fullbg__base" />
  <div class="login-fullbg__hero" :style="heroStyle" />
  <div class="login-fullbg__veil" />
  <div class="login-fullbg__grid" />
  <div class="login-fullbg__glow" />
  <div class="login-fullbg__scan" />
</template>
