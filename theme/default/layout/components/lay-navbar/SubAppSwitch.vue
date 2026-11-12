<script setup lang="ts">
import { isSubAppPortalEnabled } from "@bit-labs.cn/owl-ui/router/subAppPortal";
import { leaveSubApp } from "@bit-labs.cn/owl-ui/router/utils";
import HomeFilled from "@iconify-icons/ep/home-filled";

const enabled = isSubAppPortalEnabled();

function backToPortal() {
  void leaveSubApp();
}
</script>

<template>
  <button
    v-if="enabled"
    type="button"
    class="subapp-switch select-none"
    title="主页"
    @click="backToPortal"
  >
    <IconifyIconOffline :icon="HomeFilled" />
    <span>主页</span>
  </button>
</template>

<style scoped>
.subapp-switch {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 28px;
  margin-right: 4px;
  padding: 0 10px 0 8px;
  font-size: 13px;
  line-height: 1;
  color: var(--el-color-primary);
  cursor: pointer;
  background: var(--el-color-primary-light-9);
  border: 0;
  border-radius: 14px;
}

.subapp-switch:hover {
  color: var(--el-color-primary);
  background: var(--el-color-primary-light-8);
}

.subapp-switch :deep(svg) {
  width: 14px;
  height: 14px;
}
</style>
