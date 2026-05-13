/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { toRaw } from "vue";
import { useRenderIcon } from "@bit-labs.cn/owl-ui/components/ReIcon/src/hooks";
const __VLS_props = defineProps({
    extraIcon: {
        type: String,
        default: ""
    }
});
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
if (__VLS_ctx.extraIcon) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex justify-center items-center" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    const __VLS_0 = (__VLS_ctx.useRenderIcon(__VLS_ctx.toRaw(__VLS_ctx.extraIcon)));
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        ...{ class: "w-[30px] h-[30px]" },
    }));
    const __VLS_2 = __VLS_1({
        ...{ class: "w-[30px] h-[30px]" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    /** @type {__VLS_StyleScopedClasses['w-[30px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-[30px]']} */ ;
}
// @ts-ignore
[extraIcon, extraIcon, useRenderIcon, toRaw,];
const __VLS_export = (await import('vue')).defineComponent({
    props: {
        extraIcon: {
            type: String,
            default: ""
        }
    },
});
export default {};
//# sourceMappingURL=SidebarExtraIcon.vue.js.map