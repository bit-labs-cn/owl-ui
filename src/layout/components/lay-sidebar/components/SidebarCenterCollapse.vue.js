/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useGlobal } from "@pureadmin/utils";
import { useNav } from "@bit-labs.cn/owl-ui/layout/hooks/useNav";
import ArrowLeft from "@iconify-icons/ri/arrow-left-double-fill";
const __VLS_props = withDefaults(defineProps(), {
    isActive: false
});
const { t } = useI18n();
const { tooltipEffect } = useNav();
const iconClass = computed(() => {
    return ["w-[16px]", "h-[16px]"];
});
const { $storage } = useGlobal();
const themeColor = computed(() => $storage.layout?.themeColor);
const emit = defineEmits();
const toggleClick = () => {
    emit("toggleClick");
};
const __VLS_defaults = {
    isActive: false
};
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
    ...{ onClick: (__VLS_ctx.toggleClick) },
    ...{ class: "center-collapse" },
});
__VLS_asFunctionalDirective(__VLS_directives.vTippy, {})(null, { ...__VLS_directiveBindingRestFields, value: ({
        content: __VLS_ctx.isActive
            ? __VLS_ctx.t('buttons.pureClickCollapse')
            : __VLS_ctx.t('buttons.pureClickExpand'),
        theme: __VLS_ctx.tooltipEffect,
        hideOnClick: 'toggle',
        placement: 'right'
    }) }, null, null);
/** @type {__VLS_StyleScopedClasses['center-collapse']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
IconifyIconOffline;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    icon: (__VLS_ctx.ArrowLeft),
    ...{ class: ([__VLS_ctx.iconClass, __VLS_ctx.themeColor === 'light' ? '' : 'text-primary']) },
    ...{ style: ({ transform: __VLS_ctx.isActive ? 'none' : 'rotateY(180deg)' }) },
}));
const __VLS_2 = __VLS_1({
    icon: (__VLS_ctx.ArrowLeft),
    ...{ class: ([__VLS_ctx.iconClass, __VLS_ctx.themeColor === 'light' ? '' : 'text-primary']) },
    ...{ style: ({ transform: __VLS_ctx.isActive ? 'none' : 'rotateY(180deg)' }) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
// @ts-ignore
[toggleClick, vTippy, isActive, isActive, t, t, tooltipEffect, ArrowLeft, iconClass, themeColor,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
//# sourceMappingURL=SidebarCenterCollapse.vue.js.map