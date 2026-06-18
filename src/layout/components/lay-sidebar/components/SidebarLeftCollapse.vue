<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useGlobal } from "@pureadmin/utils";
import { useNav } from "@bit-labs.cn/owl-ui/layout/hooks/useNav";

import MenuFold from "@iconify-icons/ri/menu-fold-fill";

interface Props {
  isActive: boolean;
}

withDefaults(defineProps<Props>(), {
  isActive: false
});

const { t } = useI18n();
const { tooltipEffect } = useNav();

const iconClass = computed(() => {
  return [
    "w-[16px]",
    "h-[16px]",
    "inline-block",
    "align-middle",
    "cursor-pointer",
    "duration-[100ms]"
  ];
});

const { $storage } = useGlobal<GlobalPropertiesApi>();
const themeColor = computed(() => $storage.layout?.themeColor);

const emit = defineEmits<{
  (e: "toggleClick"): void;
}>();

const toggleClick = () => {
  emit("toggleClick");
};
</script>

<template>
  <div class="left-collapse">
    <IconifyIconOffline
      v-tippy="{
        content: isActive
          ? t('buttons.pureClickCollapse')
          : t('buttons.pureClickExpand'),
        theme: tooltipEffect,
        hideOnClick: 'toggle',
        placement: 'right'
      }"
      :icon="MenuFold"
      :class="[iconClass, themeColor === 'clean' ? '' : 'text-primary']"
      :style="{ transform: isActive ? 'none' : 'rotateY(180deg)' }"
      @click="toggleClick"
    />
  </div>
</template>

<style lang="scss" scoped>
.left-collapse {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 40px;
  padding: 0 12px;
  cursor: pointer;
  background: var(--pure-theme-menu-bg);
  border-top: 1px solid rgba(0, 0, 0, 0.04);
}
</style>
