/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, computed } from "vue";
import { animates } from "./animate";
import { cloneDeep } from "@pureadmin/utils";
defineOptions({
    name: "ReAnimateSelector"
});
const __VLS_props = defineProps({
    placeholder: {
        type: String,
        default: "请选择动画"
    }
});
const inputValue = defineModel({ type: String });
const searchVal = ref();
const animatesList = ref(animates);
const copyAnimatesList = cloneDeep(animatesList);
const animateClass = computed(() => {
    return [
        "mt-1",
        "flex",
        "border",
        "w-[130px]",
        "h-[100px]",
        "items-center",
        "cursor-pointer",
        "transition-all",
        "justify-center",
        "border-[#e5e7eb]",
        "hover:text-primary",
        "hover:duration-[700ms]"
    ];
});
const animateStyle = computed(() => (i) => inputValue.value === i
    ? {
        borderColor: "var(--el-color-primary)",
        color: "var(--el-color-primary)"
    }
    : "");
function onChangeIcon(animate) {
    inputValue.value = animate;
}
function onClear() {
    inputValue.value = "";
}
function filterMethod(value) {
    searchVal.value = value;
    animatesList.value = copyAnimatesList.value.filter((i) => i.includes(value));
}
const animateMap = ref({});
function onMouseEnter(index) {
    animateMap.value[index] = animateMap.value[index]?.loading
        ? Object.assign({}, animateMap.value[index], {
            loading: false
        })
        : Object.assign({}, animateMap.value[index], {
            loading: true
        });
}
function onMouseleave() {
    animateMap.value = {};
}
let __VLS_modelEmit;
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
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select'] | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select']} */
elSelect;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClear': {} },
    clearable: true,
    filterable: true,
    placeholder: (__VLS_ctx.placeholder),
    popperClass: "pure-animate-popper",
    modelValue: (__VLS_ctx.inputValue),
    filterMethod: (__VLS_ctx.filterMethod),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClear': {} },
    clearable: true,
    filterable: true,
    placeholder: (__VLS_ctx.placeholder),
    popperClass: "pure-animate-popper",
    modelValue: (__VLS_ctx.inputValue),
    filterMethod: (__VLS_ctx.filterMethod),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ clear: {} },
    { onClear: (__VLS_ctx.onClear) });
var __VLS_7 = {};
const { default: __VLS_8 } = __VLS_3.slots;
{
    const { empty: __VLS_9 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-[280px]" },
    });
    /** @type {__VLS_StyleScopedClasses['w-[280px]']} */ ;
    let __VLS_10;
    /** @ts-ignore @type { | typeof __VLS_components.elScrollbar | typeof __VLS_components.ElScrollbar | typeof __VLS_components['el-scrollbar'] | typeof __VLS_components.elScrollbar | typeof __VLS_components.ElScrollbar | typeof __VLS_components['el-scrollbar']} */
    elScrollbar;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent1(__VLS_10, new __VLS_10({
        noresize: true,
        height: "212px",
        viewStyle: ({ overflow: 'hidden' }),
        ...{ class: "border-t border-[#e5e7eb]" },
    }));
    const __VLS_12 = __VLS_11({
        noresize: true,
        height: "212px",
        viewStyle: ({ overflow: 'hidden' }),
        ...{ class: "border-t border-[#e5e7eb]" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    /** @type {__VLS_StyleScopedClasses['border-t']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-[#e5e7eb]']} */ ;
    const { default: __VLS_15 } = __VLS_13.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
        ...{ class: "flex flex-wrap justify-around mb-1" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-around']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
    for (const [animate, index] of __VLS_vFor((__VLS_ctx.animatesList))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            ...{ onMouseenter: (...[$event]) => {
                    __VLS_ctx.onMouseEnter(index);
                    // @ts-ignore
                    [placeholder, inputValue, filterMethod, onClear, animatesList, onMouseEnter,];
                } },
            ...{ onMouseleave: (__VLS_ctx.onMouseleave) },
            ...{ onClick: (...[$event]) => {
                    __VLS_ctx.onChangeIcon(animate);
                    // @ts-ignore
                    [onMouseleave, onChangeIcon,];
                } },
            key: (index),
            ...{ class: (__VLS_ctx.animateClass) },
            ...{ style: (__VLS_ctx.animateStyle(animate)) },
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({
            ...{ class: ([
                    `animate__animated animate__${__VLS_ctx.animateMap[index]?.loading
                        ? animate + ' animate__infinite'
                        : ''} `
                ]) },
        });
        (animate);
        // @ts-ignore
        [animateClass, animateStyle, animateMap,];
    }
    let __VLS_16;
    /** @ts-ignore @type { | typeof __VLS_components.elEmpty | typeof __VLS_components.ElEmpty | typeof __VLS_components['el-empty']} */
    elEmpty;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
        description: (`${__VLS_ctx.searchVal} 动画不存在`),
        imageSize: (60),
    }));
    const __VLS_18 = __VLS_17({
        description: (`${__VLS_ctx.searchVal} 动画不存在`),
        imageSize: (60),
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    __VLS_asFunctionalDirective(__VLS_directives.vShow, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.animatesList.length === 0) }, null, null);
    // @ts-ignore
    [animatesList, searchVal,];
    var __VLS_13;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    props: {
        ...{},
        ...{
            placeholder: {
                type: String,
                default: "请选择动画"
            }
        },
    },
});
export default {};
//# sourceMappingURL=index.vue.js.map