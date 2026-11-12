<script setup lang="ts">
import { getTopMenu } from "@bit-labs.cn/owl-ui/router/utils";
import { useNav } from "@bit-labs.cn/owl-ui/layout/hooks/useNav";

defineProps({
  collapse: Boolean
});

const { title, getLogo } = useNav();
</script>

<template>
  <div class="sidebar-logo-container" :class="{ collapses: collapse }">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        :title="title"
        class="sidebar-logo-link"
        :to="getTopMenu()?.path ?? '/'"
      >
        <img :src="getLogo()" alt="logo" />
        <span class="sidebar-title">{{ title }}</span>
      </router-link>
      <router-link
        v-else
        key="expand"
        :title="title"
        class="sidebar-logo-link"
        :to="getTopMenu()?.path ?? '/'"
      >
        <img :src="getLogo()" alt="logo" />
        <span class="sidebar-title">{{ title }}</span>
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 64px;
  overflow: hidden;

  .sidebar-logo-link {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 100%;
    padding: 0 12px;

    img {
      flex: 0 0 auto;
      display: inline-block;
      height: 28px;
    }

    .sidebar-title {
      display: -webkit-box;
      flex: 1;
      min-width: 0;
      margin: 0;
      overflow: hidden;
      font-size: 14px;
      font-weight: 700;
      line-height: 18px;
      color: var(--pure-theme-sub-menu-active-text);
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      white-space: normal;
    }
  }

  &.collapses {
    .sidebar-logo-link {
      justify-content: center;
      padding: 0;
    }

    .sidebar-title {
      display: none;
    }
  }
}
</style>
