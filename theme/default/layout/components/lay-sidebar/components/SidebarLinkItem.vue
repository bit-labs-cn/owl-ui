<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { isUrl } from "@pureadmin/utils";
import { menuType } from "@bit-labs.cn/owl-ui/layout/types";
import {
  getCurrentSubApp,
  isSubAppPortalEnabled
} from "@bit-labs.cn/owl-ui/router/subAppPortal";

const props = defineProps<{
  to: menuType;
}>();

const router = useRouter();
const isExternalLink = computed(() => isUrl(props.to.name));
const shouldOpenInNewTab = computed(
  () => isExternalLink.value || props.to.meta?.target === "_blank",
);

function getRouteLocation(item: menuType) {
  // 仅传递 vue-router 支持的标准 location 字段，避免把菜单扩展字段传进去导致解析报错
  if (item.path) return { path: item.path };
  if (item.name) return { name: item.name as string };
  return { path: "/" };
}

/** 新窗口不带会话里的子系统，地址栏带上 app，否则会被送回切换页。 */
function withCurrentApp(href: string) {
  if (!isSubAppPortalEnabled()) return href;
  const app = getCurrentSubApp();
  if (!app) return href;
  const url = new URL(href, window.location.origin + window.location.pathname);
  url.searchParams.set("app", app);
  return url.toString();
}

const getLinkProps = (item: menuType) => {
  if (isExternalLink.value) {
    return {
      href: item.name,
      target: "_blank",
      rel: "noopener",
    };
  }
  const routeLocation = getRouteLocation(item);
  if (item.meta?.target === "_blank") {
    let href = item.path || "/";
    try {
      href = router.resolve(routeLocation as any).href;
    } catch {
      // 动态路由尚未注入完成时，降级使用 path，避免首次登录阶段抛 No match
    }
    return {
      href: withCurrentApp(href),
      target: "_blank",
      rel: "noopener",
    };
  }
  return {
    to: routeLocation,
  };
};
</script>

<template>
  <component
    :is="shouldOpenInNewTab ? 'a' : 'router-link'"
    v-bind="getLinkProps(to)"
  >
    <slot />
  </component>
</template>
