<script setup lang="ts">
import { platformConfig } from "@bit-labs.cn/owl-ui/config";
import { frameRegistry } from "@bit-labs.cn/owl-ui/layout/hooks/frame-registry";
import { useMultiTagsStoreHook } from "@bit-labs.cn/owl-ui/store/modules/multiTags";
import { type Component, shallowRef, watch, computed } from "vue";
import { type RouteRecordRaw, RouteLocationNormalizedLoaded } from "vue-router";

const props = defineProps<{
  currRoute: RouteLocationNormalizedLoaded;
  currComp: Component;
}>();

const compList = shallowRef([]);

const keep = computed(() => {
  return (
    platformConfig.get().KeepAlive &&
    props.currRoute.meta?.keepAlive &&
    !!props.currRoute.meta?.frameSrc
  );
});
// 避免重新渲染 LayFrame
const normalComp = computed(() => !keep.value && props.currComp);

watch(useMultiTagsStoreHook().multiTags, (tags: any) => {
  if (!Array.isArray(tags) || !keep.value) {
    return;
  }
  const iframeTags = tags.filter(i => i.meta?.frameSrc);
  // tags必须是小于MAP，才是做了关闭动作，因为MAP插入的顺序在tags变化后发生
  if (iframeTags.length < frameRegistry.frames.size) {
    for (const i of frameRegistry.frames.keys()) {
      if (!tags.some(s => s.path === i)) {
        frameRegistry.forget(i);
        compList.value = frameRegistry.list();
      }
    }
  }
});

watch(
  () => props.currRoute.fullPath,
  path => {
    const multiTags = useMultiTagsStoreHook().multiTags as RouteRecordRaw[];
    const iframeTags = multiTags.filter(i => i.meta?.frameSrc);
    if (keep.value) {
      if (iframeTags.length !== frameRegistry.frames.size) {
        const sameKey = [...frameRegistry.frames.keys()].find(i => path === i);
        if (!sameKey) {
          // 添加缓存
          frameRegistry.remember(path, props.currComp);
        }
      }
    }

    if (frameRegistry.frames.size > 0) {
      compList.value = frameRegistry.list();
    }
  },
  {
    immediate: true
  }
);
</script>
<template>
  <template v-for="[fullPath, Comp] in compList" :key="fullPath">
    <div v-show="fullPath === currRoute.fullPath" class="w-full h-full">
      <slot
        :fullPath="fullPath"
        :Comp="Comp"
        :frameInfo="{ frameSrc: currRoute.meta?.frameSrc, fullPath }"
      />
    </div>
  </template>
  <div v-show="!keep" class="w-full h-full">
    <slot :Comp="normalComp" :fullPath="currRoute.fullPath" frameInfo />
  </div>
</template>
