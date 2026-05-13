/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, watch } from "vue";
import { useNav } from "@bit-labs.cn/owl-ui/layout/hooks/useNav";
const screenIcon = ref();
const { toggle, isFullscreen, Fullscreen, ExitFullscreen } = useNav();
isFullscreen.value = !!(document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement);
watch(isFullscreen, full => {
    screenIcon.value = full ? ExitFullscreen : Fullscreen;
}, {
    immediate: true
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ onClick: (__VLS_ctx.toggle) },
    ...{ class: "fullscreen-icon navbar-bg-hover" },
});
/** @type {__VLS_StyleScopedClasses['fullscreen-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-bg-hover']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
IconifyIconOffline;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    icon: (__VLS_ctx.screenIcon),
}));
const __VLS_2 = __VLS_1({
    icon: (__VLS_ctx.screenIcon),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
// @ts-ignore
[toggle, screenIcon,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=SidebarFullScreen.vue.js.map