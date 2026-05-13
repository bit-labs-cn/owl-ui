/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, nextTick } from "vue";
import { useNav } from "@bit-labs.cn/owl-ui/layout/hooks/useNav";
import { deviceDetection } from "@pureadmin/utils";
const __VLS_props = defineProps({
    noticeItem: {
        type: Object,
        default: () => { }
    }
});
const titleRef = ref(null);
const titleTooltip = ref(false);
const descriptionRef = ref(null);
const descriptionTooltip = ref(false);
const { tooltipEffect } = useNav();
const isMobile = deviceDetection();
function hoverTitle() {
    nextTick(() => {
        titleRef.value?.scrollWidth > titleRef.value?.clientWidth
            ? (titleTooltip.value = true)
            : (titleTooltip.value = false);
    });
}
function hoverDescription(event, description) {
    // currentWidth 为文本在页面中所占的宽度，创建标签，加入到页面，获取currentWidth ,最后在移除
    const tempTag = document.createElement("span");
    tempTag.innerText = description;
    tempTag.className = "getDescriptionWidth";
    document.querySelector("body").appendChild(tempTag);
    const currentWidth = document.querySelector(".getDescriptionWidth").offsetWidth;
    document.querySelector(".getDescriptionWidth").remove();
    // cellWidth为容器的宽度
    const cellWidth = event.target.offsetWidth;
    // 当文本宽度大于容器宽度两倍时，代表文本显示超过两行
    currentWidth > 2 * cellWidth
        ? (descriptionTooltip.value = true)
        : (descriptionTooltip.value = false);
}
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['notice-text-description']} */ ;
/** @type {__VLS_StyleScopedClasses['notice-text-datetime']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "notice-container border-b-[1px] border-solid border-[#f0f0f0] dark:border-[#303030]" },
});
/** @type {__VLS_StyleScopedClasses['notice-container']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b-[1px]']} */ ;
/** @type {__VLS_StyleScopedClasses['border-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[#f0f0f0]']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:border-[#303030]']} */ ;
if (__VLS_ctx.noticeItem.avatar) {
    let __VLS_0;
    /** @ts-ignore @type { | typeof __VLS_components.elAvatar | typeof __VLS_components.ElAvatar | typeof __VLS_components['el-avatar']} */
    elAvatar;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        size: (30),
        src: (__VLS_ctx.noticeItem.avatar),
        ...{ class: "notice-container-avatar" },
    }));
    const __VLS_2 = __VLS_1({
        size: (30),
        src: (__VLS_ctx.noticeItem.avatar),
        ...{ class: "notice-container-avatar" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    /** @type {__VLS_StyleScopedClasses['notice-container-avatar']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "notice-container-text" },
});
/** @type {__VLS_StyleScopedClasses['notice-container-text']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "notice-text-title text-[#000000d9] dark:text-white" },
});
/** @type {__VLS_StyleScopedClasses['notice-text-title']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#000000d9]']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
let __VLS_5;
/** @ts-ignore @type { | typeof __VLS_components.elTooltip | typeof __VLS_components.ElTooltip | typeof __VLS_components['el-tooltip'] | typeof __VLS_components.elTooltip | typeof __VLS_components.ElTooltip | typeof __VLS_components['el-tooltip']} */
elTooltip;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
    popperClass: "notice-title-popper",
    effect: (__VLS_ctx.tooltipEffect),
    disabled: (!__VLS_ctx.titleTooltip),
    content: (__VLS_ctx.noticeItem.title),
    placement: "top-start",
    enterable: (!__VLS_ctx.isMobile),
}));
const __VLS_7 = __VLS_6({
    popperClass: "notice-title-popper",
    effect: (__VLS_ctx.tooltipEffect),
    disabled: (!__VLS_ctx.titleTooltip),
    content: (__VLS_ctx.noticeItem.title),
    placement: "top-start",
    enterable: (!__VLS_ctx.isMobile),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_10 } = __VLS_8.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onMouseover: (__VLS_ctx.hoverTitle) },
    ref: "titleRef",
    ...{ class: "notice-title-content" },
});
/** @type {__VLS_StyleScopedClasses['notice-title-content']} */ ;
(__VLS_ctx.noticeItem.title);
// @ts-ignore
[noticeItem, noticeItem, noticeItem, noticeItem, tooltipEffect, titleTooltip, isMobile, hoverTitle,];
var __VLS_8;
if (__VLS_ctx.noticeItem?.extra) {
    let __VLS_11;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
        type: (__VLS_ctx.noticeItem?.status),
        size: "small",
        ...{ class: "notice-title-extra" },
    }));
    const __VLS_13 = __VLS_12({
        type: (__VLS_ctx.noticeItem?.status),
        size: "small",
        ...{ class: "notice-title-extra" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    /** @type {__VLS_StyleScopedClasses['notice-title-extra']} */ ;
    const { default: __VLS_16 } = __VLS_14.slots;
    (__VLS_ctx.noticeItem?.extra);
    // @ts-ignore
    [noticeItem, noticeItem, noticeItem,];
    var __VLS_14;
}
let __VLS_17;
/** @ts-ignore @type { | typeof __VLS_components.elTooltip | typeof __VLS_components.ElTooltip | typeof __VLS_components['el-tooltip'] | typeof __VLS_components.elTooltip | typeof __VLS_components.ElTooltip | typeof __VLS_components['el-tooltip']} */
elTooltip;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
    popperClass: "notice-title-popper",
    effect: (__VLS_ctx.tooltipEffect),
    disabled: (!__VLS_ctx.descriptionTooltip),
    content: (__VLS_ctx.noticeItem.description),
    placement: "top-start",
}));
const __VLS_19 = __VLS_18({
    popperClass: "notice-title-popper",
    effect: (__VLS_ctx.tooltipEffect),
    disabled: (!__VLS_ctx.descriptionTooltip),
    content: (__VLS_ctx.noticeItem.description),
    placement: "top-start",
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
const { default: __VLS_22 } = __VLS_20.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onMouseover: (...[$event]) => {
            __VLS_ctx.hoverDescription($event, __VLS_ctx.noticeItem.description);
            // @ts-ignore
            [noticeItem, noticeItem, tooltipEffect, descriptionTooltip, hoverDescription,];
        } },
    ref: "descriptionRef",
    ...{ class: "notice-text-description" },
});
/** @type {__VLS_StyleScopedClasses['notice-text-description']} */ ;
(__VLS_ctx.noticeItem.description);
// @ts-ignore
[noticeItem,];
var __VLS_20;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "notice-text-datetime text-[#00000073] dark:text-white" },
});
/** @type {__VLS_StyleScopedClasses['notice-text-datetime']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#00000073]']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
(__VLS_ctx.noticeItem.datetime);
// @ts-ignore
[noticeItem,];
const __VLS_export = (await import('vue')).defineComponent({
    props: {
        noticeItem: {
            type: Object,
            default: () => { }
        }
    },
});
export default {};
//# sourceMappingURL=NoticeItem.vue.js.map