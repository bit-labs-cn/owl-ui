/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed } from "vue";
import { useRouter } from "vue-router";
import { isUrl } from "@pureadmin/utils";
const props = defineProps();
const router = useRouter();
const isExternalLink = computed(() => isUrl(props.to.name));
const shouldOpenInNewTab = computed(() => isExternalLink.value || props.to.meta?.target === "_blank");
function getRouteLocation(item) {
    // 仅传递 vue-router 支持的标准 location 字段，避免把菜单扩展字段传进去导致解析报错
    if (item.path)
        return { path: item.path };
    if (item.name)
        return { name: item.name };
    return { path: "/" };
}
const getLinkProps = (item) => {
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
            href = router.resolve(routeLocation).href;
        }
        catch {
            // 动态路由尚未注入完成时，降级使用 path，避免首次登录阶段抛 No match
        }
        return {
            href,
            target: "_blank",
            rel: "noopener",
        };
    }
    return {
        to: routeLocation,
    };
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
const __VLS_0 = (__VLS_ctx.shouldOpenInNewTab ? 'a' : 'router-link');
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...(__VLS_ctx.getLinkProps(__VLS_ctx.to)),
}));
const __VLS_2 = __VLS_1({
    ...(__VLS_ctx.getLinkProps(__VLS_ctx.to)),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
var __VLS_7 = {};
// @ts-ignore
[shouldOpenInNewTab, getLinkProps, to,];
var __VLS_3;
// @ts-ignore
var __VLS_8 = __VLS_7;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=SidebarLinkItem.vue.js.map