/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { useI18n } from "vue-i18n";
import MenuFold from "@iconify-icons/ri/menu-fold-fill";
import MenuUnfold from "@iconify-icons/ri/menu-unfold-fill";
const __VLS_props = withDefaults(defineProps(), {
    isActive: false
});
const { t } = useI18n();
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
    ...{ class: "px-3 mr-1 navbar-bg-hover" },
    title: (__VLS_ctx.isActive ? __VLS_ctx.t('buttons.pureClickCollapse') : __VLS_ctx.t('buttons.pureClickExpand')),
});
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-bg-hover']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
IconifyIconOffline;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    icon: (__VLS_ctx.isActive ? __VLS_ctx.MenuFold : __VLS_ctx.MenuUnfold),
    ...{ class: "inline-block align-middle hover:text-primary dark:hover:!text-white" },
}));
const __VLS_2 = __VLS_1({
    icon: (__VLS_ctx.isActive ? __VLS_ctx.MenuFold : __VLS_ctx.MenuUnfold),
    ...{ class: "inline-block align-middle hover:text-primary dark:hover:!text-white" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['align-middle']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:hover:!text-white']} */ ;
// @ts-ignore
[toggleClick, isActive, isActive, t, t, MenuFold, MenuUnfold,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
//# sourceMappingURL=SidebarTopCollapse.vue.js.map