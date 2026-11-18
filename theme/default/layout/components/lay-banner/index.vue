<script setup lang="ts">
import { subsystemRegistry } from "@bit-labs.cn/owl-ui/core/subsystem";

const slots = subsystemRegistry.layoutSlots();
</script>

<template>
  <div v-if="slots.banner" class="lay-banner">
    <component :is="slots.banner" />
  </div>
</template>
