/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { useI18n } from "vue-i18n";
import { useNav } from "@bit-labs.cn/owl-ui/layout/hooks/useNav";
import MdiKeyboardEsc from "@bit-labs.cn/owl-ui/assets/svg/keyboard_esc.svg?component";
import EnterOutlined from "@bit-labs.cn/owl-ui/assets/svg/enter_outlined.svg?component";
import ArrowUpLine from "@iconify-icons/ri/arrow-up-line";
import ArrowDownLine from "@iconify-icons/ri/arrow-down-line";
const __VLS_props = withDefaults(defineProps(), {
    total: 0
});
const { t } = useI18n();
const { device } = useNav();
const __VLS_defaults = {
    total: 0
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "search-footer text-[#333] dark:text-white" },
});
/** @type {__VLS_StyleScopedClasses['search-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#333]']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "search-footer-item" },
});
/** @type {__VLS_StyleScopedClasses['search-footer-item']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.EnterOutlined} */
EnterOutlined;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ class: "icon" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "icon" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
(__VLS_ctx.t("buttons.pureConfirm"));
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "search-footer-item" },
});
/** @type {__VLS_StyleScopedClasses['search-footer-item']} */ ;
let __VLS_5;
/** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
IconifyIconOffline;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
    icon: (__VLS_ctx.ArrowUpLine),
    ...{ class: "icon" },
}));
const __VLS_7 = __VLS_6({
    icon: (__VLS_ctx.ArrowUpLine),
    ...{ class: "icon" },
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
let __VLS_10;
/** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
IconifyIconOffline;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent1(__VLS_10, new __VLS_10({
    icon: (__VLS_ctx.ArrowDownLine),
    ...{ class: "icon" },
}));
const __VLS_12 = __VLS_11({
    icon: (__VLS_ctx.ArrowDownLine),
    ...{ class: "icon" },
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
(__VLS_ctx.t("buttons.pureSwitch"));
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "search-footer-item" },
});
/** @type {__VLS_StyleScopedClasses['search-footer-item']} */ ;
let __VLS_15;
/** @ts-ignore @type { | typeof __VLS_components.MdiKeyboardEsc} */
MdiKeyboardEsc;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
    ...{ class: "icon" },
}));
const __VLS_17 = __VLS_16({
    ...{ class: "icon" },
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
(__VLS_ctx.t("buttons.pureClose"));
if (__VLS_ctx.device !== 'mobile' && __VLS_ctx.total > 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "search-footer-total" },
    });
    /** @type {__VLS_StyleScopedClasses['search-footer-total']} */ ;
    (`${__VLS_ctx.t("search.pureTotal")} ${__VLS_ctx.total}`);
}
// @ts-ignore
[t, t, t, t, ArrowUpLine, ArrowDownLine, device, total, total,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
//# sourceMappingURL=SearchFooter.vue.js.map