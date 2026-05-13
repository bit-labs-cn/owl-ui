/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { h, onMounted, ref, useSlots } from "vue";
import { useTippy } from "vue-tippy";
defineOptions({
    name: "ReText"
});
const props = defineProps({
    // 行数
    lineClamp: {
        type: [String, Number]
    },
    tippyProps: {
        type: Object,
        default: () => ({})
    }
});
const $slots = useSlots();
const textRef = ref();
const tippyFunc = ref();
const isTextEllipsis = (el) => {
    if (!props.lineClamp) {
        // 单行省略判断
        return el.scrollWidth > el.clientWidth;
    }
    else {
        // 多行省略判断
        return el.scrollHeight > el.clientHeight;
    }
};
const getTippyProps = () => ({
    content: h($slots.content || $slots.default),
    ...props.tippyProps
});
function handleHover(event) {
    if (isTextEllipsis(event.target)) {
        tippyFunc.value.setProps(getTippyProps());
        tippyFunc.value.enable();
    }
    else {
        tippyFunc.value.disable();
    }
}
onMounted(() => {
    tippyFunc.value = useTippy(textRef.value?.$el, getTippyProps());
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
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elText | typeof __VLS_components.ElText | typeof __VLS_components['el-text'] | typeof __VLS_components.elText | typeof __VLS_components.ElText | typeof __VLS_components['el-text']} */
elText;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onMouseover': {} },
    ...({
        truncated: !__VLS_ctx.lineClamp,
        lineClamp: __VLS_ctx.lineClamp,
        ...__VLS_ctx.$attrs
    }),
    ref: "textRef",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onMouseover': {} },
    ...({
        truncated: !__VLS_ctx.lineClamp,
        lineClamp: __VLS_ctx.lineClamp,
        ...__VLS_ctx.$attrs
    }),
    ref: "textRef",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ mouseover: {} },
    { onMouseover: (__VLS_ctx.handleHover) });
var __VLS_7 = {};
const { default: __VLS_9 } = __VLS_3.slots;
var __VLS_10 = {};
// @ts-ignore
[lineClamp, lineClamp, $attrs, handleHover,];
var __VLS_3;
var __VLS_4;
// @ts-ignore
var __VLS_8 = __VLS_7, __VLS_11 = __VLS_10;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    props: {
        // 行数
        lineClamp: {
            type: [String, Number]
        },
        tippyProps: {
            type: Object,
            default: () => ({})
        }
    },
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=index.vue.js.map