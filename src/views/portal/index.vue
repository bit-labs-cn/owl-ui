<script setup lang="ts">
defineOptions({
  name: "SubAppPortal"
});
</script>

<template>
  <div class="subapp-portal-tip">
    <p>已开启子系统切换，尚未提供切换页面。</p>
    <p>请把切换页挂到自己的路由上，进入子系统时携带 app 名称。</p>
  </div>
</template>

<style scoped>
.subapp-portal-tip {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 8px;
  color: var(--el-text-color-regular, #606266);
  font-size: 14px;
}

.subapp-portal-tip p {
  margin: 0;
}
</style>
