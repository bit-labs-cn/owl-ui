<script lang="ts" setup>
import { computed } from "vue";
import { siteCopyright, siteTitle } from "@bit-labs.cn/owl-ui/config/siteBrand";

const copyright = computed(() => siteCopyright());
const title = computed(() => siteTitle());
</script>

<template>
  <footer
    class="layout-footer text-[rgba(0,0,0,0.6)] dark:text-[rgba(220,220,242,0.8)]"
  >
    <template v-if="copyright">{{ copyright }}</template>
    <template v-else>
      Copyright © 2020-present bit-labs.cn (比特实验室)
      <a
        class="hover:text-primary"
        href="https://github.com/pure-admin"
        target="_blank"
      >
        &nbsp;{{ title }}
      </a>
    </template>
  </footer>
</template>

<style lang="scss" scoped>
.layout-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 16px 8px;
  font-size: 14px;
  text-align: center;
}
</style>
