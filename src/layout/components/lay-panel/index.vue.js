/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { useI18n } from "vue-i18n";
import { emitter } from "@bit-labs.cn/owl-ui/utils/mitt";
import { onClickOutside } from "@vueuse/core";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useDataThemeChange } from "@bit-labs.cn/owl-ui/layout/hooks/useDataThemeChange";
import CloseIcon from "@iconify-icons/ep/close";
const target = ref(null);
const show = ref(false);
const iconClass = computed(() => {
    return [
        "w-[22px]",
        "h-[22px]",
        "flex",
        "justify-center",
        "items-center",
        "outline-none",
        "rounded-[4px]",
        "cursor-pointer",
        "transition-colors",
        "hover:bg-[#0000000f]",
        "dark:hover:bg-[#ffffff1f]",
        "dark:hover:text-[#ffffffd9]"
    ];
});
const { t } = useI18n();
const { onReset } = useDataThemeChange();
onClickOutside(target, (event) => {
    if (event.clientX > target.value.offsetLeft)
        return;
    show.value = false;
});
onMounted(() => {
    emitter.on("openPanel", () => {
        show.value = true;
    });
});
onBeforeUnmount(() => {
    // 解绑`openPanel`公共事件，防止多次触发
    emitter.off("openPanel");
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['right-panel-background']} */ ;
/** @type {__VLS_StyleScopedClasses['right-panel']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: ({ show: __VLS_ctx.show }) },
});
/** @type {__VLS_StyleScopedClasses['show']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "right-panel-background" },
});
/** @type {__VLS_StyleScopedClasses['right-panel-background']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ref: "target",
    ...{ class: "right-panel bg-bg_color" },
});
/** @type {__VLS_StyleScopedClasses['right-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-bg_color']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "project-configuration border-b-[1px] border-solid border-[var(--pure-border-color)]" },
});
/** @type {__VLS_StyleScopedClasses['project-configuration']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b-[1px]']} */ ;
/** @type {__VLS_StyleScopedClasses['border-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[var(--pure-border-color)]']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({
    ...{ class: "dark:text-white" },
});
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
(__VLS_ctx.t("panel.pureSystemSet"));
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: (__VLS_ctx.iconClass) },
});
__VLS_asFunctionalDirective(__VLS_directives.vTippy, {})(null, { ...__VLS_directiveBindingRestFields, value: ({
        content: __VLS_ctx.t('panel.pureCloseSystemSet'),
        placement: 'bottom-start',
        zIndex: 41000
    }) }, null, null);
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
IconifyIconOffline;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    ...{ class: "dark:text-white" },
    width: "18px",
    height: "18px",
    icon: (__VLS_ctx.CloseIcon),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    ...{ class: "dark:text-white" },
    width: "18px",
    height: "18px",
    icon: (__VLS_ctx.CloseIcon),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.show = !__VLS_ctx.show;
            // @ts-ignore
            [show, show, show, t, t, iconClass, vTippy, CloseIcon,];
        } });
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
var __VLS_3;
var __VLS_4;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.elScrollbar | typeof __VLS_components.ElScrollbar | typeof __VLS_components['el-scrollbar'] | typeof __VLS_components.elScrollbar | typeof __VLS_components.ElScrollbar | typeof __VLS_components['el-scrollbar']} */
elScrollbar;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({}));
const __VLS_9 = __VLS_8({}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const { default: __VLS_12 } = __VLS_10.slots;
var __VLS_13 = {};
// @ts-ignore
[];
var __VLS_10;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex justify-end p-3 border-t-[1px] border-solid border-[var(--pure-border-color)]" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t-[1px]']} */ ;
/** @type {__VLS_StyleScopedClasses['border-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[var(--pure-border-color)]']} */ ;
let __VLS_15;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
    ...{ 'onClick': {} },
    type: "danger",
    text: true,
    bg: true,
}));
const __VLS_17 = __VLS_16({
    ...{ 'onClick': {} },
    type: "danger",
    text: true,
    bg: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
let __VLS_20;
const __VLS_21 = ({ click: {} },
    { onClick: (__VLS_ctx.onReset) });
__VLS_asFunctionalDirective(__VLS_directives.vTippy, {})(null, { ...__VLS_directiveBindingRestFields, value: ({
        content: __VLS_ctx.t('panel.pureClearCacheAndToLogin'),
        placement: 'left-start',
        zIndex: 41000
    }) }, null, null);
const { default: __VLS_22 } = __VLS_18.slots;
(__VLS_ctx.t("panel.pureClearCache"));
// @ts-ignore
[t, t, vTippy, onReset,];
var __VLS_18;
var __VLS_19;
// @ts-ignore
var __VLS_14 = __VLS_13;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({});
const __VLS_export = {};
export default {};
//# sourceMappingURL=index.vue.js.map