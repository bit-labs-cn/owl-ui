/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { getConfig } from "@bit-labs.cn/owl-ui/config";
import { useMultiFrame } from "@bit-labs.cn/owl-ui/layout/hooks/useMultiFrame";
import { useMultiTagsStoreHook } from "@bit-labs.cn/owl-ui/store/modules/multiTags";
import { shallowRef, watch, computed } from "vue";
const props = defineProps();
const compList = shallowRef([]);
const { setMap, getMap, MAP, delMap } = useMultiFrame();
const keep = computed(() => {
    return (getConfig().KeepAlive &&
        props.currRoute.meta?.keepAlive &&
        !!props.currRoute.meta?.frameSrc);
});
// 避免重新渲染 LayFrame
const normalComp = computed(() => !keep.value && props.currComp);
watch(useMultiTagsStoreHook().multiTags, (tags) => {
    if (!Array.isArray(tags) || !keep.value) {
        return;
    }
    const iframeTags = tags.filter(i => i.meta?.frameSrc);
    // tags必须是小于MAP，才是做了关闭动作，因为MAP插入的顺序在tags变化后发生
    if (iframeTags.length < MAP.size) {
        for (const i of MAP.keys()) {
            if (!tags.some(s => s.path === i)) {
                delMap(i);
                compList.value = getMap();
            }
        }
    }
});
watch(() => props.currRoute.fullPath, path => {
    const multiTags = useMultiTagsStoreHook().multiTags;
    const iframeTags = multiTags.filter(i => i.meta?.frameSrc);
    if (keep.value) {
        if (iframeTags.length !== MAP.size) {
            const sameKey = [...MAP.keys()].find(i => path === i);
            if (!sameKey) {
                // 添加缓存
                setMap(path, props.currComp);
            }
        }
    }
    if (MAP.size > 0) {
        compList.value = getMap();
    }
}, {
    immediate: true
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
for (const [[fullPath, Comp]] of __VLS_vFor((__VLS_ctx.compList))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-full h-full" },
        key: (fullPath),
    });
    __VLS_asFunctionalDirective(__VLS_directives.vShow, {})(null, { ...__VLS_directiveBindingRestFields, value: (fullPath === __VLS_ctx.currRoute.fullPath) }, null, null);
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    var __VLS_0 = {
        fullPath: (fullPath),
        Comp: (Comp),
        frameInfo: ({ frameSrc: __VLS_ctx.currRoute.meta?.frameSrc, fullPath }),
    };
    // @ts-ignore
    [compList, currRoute, currRoute,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full h-full" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow, {})(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.keep) }, null, null);
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
var __VLS_2 = {
    Comp: (__VLS_ctx.normalComp),
    fullPath: (__VLS_ctx.currRoute.fullPath),
    frameInfo: true,
};
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_3 = __VLS_2;
// @ts-ignore
[currRoute, keep, normalComp,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=index.vue.js.map