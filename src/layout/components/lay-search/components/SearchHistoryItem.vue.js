/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { transformI18n } from "@bit-labs.cn/owl-ui/plugins/i18n";
import { useRenderIcon } from "@bit-labs.cn/owl-ui/components/ReIcon/src/hooks";
import StarIcon from "@iconify-icons/ep/star";
import CloseIcon from "@iconify-icons/ep/close";
const emit = defineEmits();
const __VLS_props = withDefaults(defineProps(), {});
function handleCollect(item) {
    emit("collectItem", item);
}
function handleDelete(item) {
    emit("deleteItem", item);
}
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
const __VLS_0 = (__VLS_ctx.useRenderIcon(__VLS_ctx.item.meta?.icon));
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "history-item-title" },
});
/** @type {__VLS_StyleScopedClasses['history-item-title']} */ ;
(__VLS_ctx.transformI18n(__VLS_ctx.item.meta?.title));
let __VLS_5;
/** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
IconifyIconOffline;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.StarIcon),
    ...{ class: "w-[18px] h-[18px] mr-2 hover:text-[#d7d5d4]" },
}));
const __VLS_7 = __VLS_6({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.StarIcon),
    ...{ class: "w-[18px] h-[18px] mr-2 hover:text-[#d7d5d4]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
let __VLS_10;
const __VLS_11 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.handleCollect(__VLS_ctx.item);
            // @ts-ignore
            [useRenderIcon, item, item, item, transformI18n, StarIcon, handleCollect,];
        } });
__VLS_asFunctionalDirective(__VLS_directives.vShow, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.item.type === 'history') }, null, null);
/** @type {__VLS_StyleScopedClasses['w-[18px]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[18px]']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-[#d7d5d4]']} */ ;
var __VLS_8;
var __VLS_9;
let __VLS_12;
/** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
IconifyIconOffline;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.CloseIcon),
    ...{ class: "w-[18px] h-[18px] hover:text-[#d7d5d4] cursor-pointer" },
}));
const __VLS_14 = __VLS_13({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.CloseIcon),
    ...{ class: "w-[18px] h-[18px] hover:text-[#d7d5d4] cursor-pointer" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
let __VLS_17;
const __VLS_18 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.handleDelete(__VLS_ctx.item);
            // @ts-ignore
            [item, item, CloseIcon, handleDelete,];
        } });
/** @type {__VLS_StyleScopedClasses['w-[18px]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[18px]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-[#d7d5d4]']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
var __VLS_15;
var __VLS_16;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
//# sourceMappingURL=SearchHistoryItem.vue.js.map