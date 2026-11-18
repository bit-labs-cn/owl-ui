<script setup lang="ts">
import { subsystemRegistry } from "@bit-labs.cn/owl-ui/core/subsystem";

const slots = subsystemRegistry.layoutSlots();
</script>

<template>
  <component :is="slots.header1" v-if="slots.header1" />
  <component :is="slots.header2" v-if="slots.header2" />
  <component :is="slots.header3" v-if="slots.header3" />
</template>
