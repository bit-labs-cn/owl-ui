/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { transformI18n } from "@bit-labs.cn/owl-ui/plugins/i18n";
import { useResizeObserver } from "@pureadmin/utils";
import { useEpThemeStoreHook } from "@bit-labs.cn/owl-ui/store/modules/epTheme";
import { useRenderIcon } from "@bit-labs.cn/owl-ui/components/ReIcon/src/hooks";
import { ref, computed, getCurrentInstance, onMounted } from "vue";
import EnterOutlined from "@bit-labs.cn/owl-ui/assets/svg/enter_outlined.svg?component";
const resultRef = ref();
const innerHeight = ref();
const emit = defineEmits();
const instance = getCurrentInstance();
const props = withDefaults(defineProps(), {});
const itemStyle = computed(() => {
    return item => {
        return {
            background: item?.path === active.value ? useEpThemeStoreHook().epThemeColor : "",
            color: item.path === active.value ? "#fff" : "",
            fontSize: item.path === active.value ? "16px" : "14px"
        };
    };
});
const active = computed({
    get() {
        return props.value;
    },
    set(val) {
        emit("update:value", val);
    }
});
/** 鼠标移入 */
async function handleMouse(item) {
    active.value = item.path;
}
function handleTo() {
    emit("enter");
}
function resizeResult() {
    // el-scrollbar max-height="calc(90vh - 140px)"
    innerHeight.value = window.innerHeight - window.innerHeight / 10 - 140;
}
useResizeObserver(resultRef, resizeResult);
function handleScroll(index) {
    const curInstance = instance?.proxy?.$refs[`resultItemRef${index}`];
    if (!curInstance)
        return 0;
    const curRef = curInstance[0];
    const scrollTop = curRef.offsetTop + 128; // 128 两个result-item（56px+56px=112px）高度加上下margin（8px+8px=16px）
    return scrollTop > innerHeight.value ? scrollTop - innerHeight.value : 0;
}
onMounted(() => {
    resizeResult();
});
const __VLS_exposed = { handleScroll };
defineExpose(__VLS_exposed);
const __VLS_defaults = {};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ref: "resultRef",
    ...{ class: "result" },
});
/** @type {__VLS_StyleScopedClasses['result']} */ ;
for (const [item, index] of __VLS_vFor((__VLS_ctx.options))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (__VLS_ctx.handleTo) },
        ...{ onMouseenter: (...[$event]) => {
                __VLS_ctx.handleMouse(item);
                // @ts-ignore
                [options, handleTo, handleMouse,];
            } },
        key: (item.path),
        ref: ('resultItemRef' + index),
        ...{ class: "result-item dark:bg-[#1d1d1d]" },
        ...{ style: (__VLS_ctx.itemStyle(item)) },
    });
    /** @type {__VLS_StyleScopedClasses['result-item']} */ ;
    /** @type {__VLS_StyleScopedClasses['dark:bg-[#1d1d1d]']} */ ;
    const __VLS_0 = (__VLS_ctx.useRenderIcon(item.meta?.icon));
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "result-item-title" },
    });
    /** @type {__VLS_StyleScopedClasses['result-item-title']} */ ;
    (__VLS_ctx.transformI18n(item.meta?.title));
    let __VLS_5;
    /** @ts-ignore @type { | typeof __VLS_components.EnterOutlined} */
    EnterOutlined;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({}));
    const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
    // @ts-ignore
    [itemStyle, useRenderIcon, transformI18n,];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    setup: () => __VLS_exposed,
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
//# sourceMappingURL=SearchResult.vue.js.map