/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { useBoolean } from "../../hooks/useBoolean";
import SearchModal from "./components/SearchModal.vue";
const { bool: show, toggle } = useBoolean();
function handleSearch() {
    toggle();
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (__VLS_ctx.handleSearch) },
    ...{ class: "search-container w-[40px] h-[48px] flex-c cursor-pointer navbar-bg-hover" },
});
/** @type {__VLS_StyleScopedClasses['search-container']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[40px]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[48px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-c']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-bg-hover']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
IconifyIconOffline;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    icon: "ri:search-line",
}));
const __VLS_2 = __VLS_1({
    icon: "ri:search-line",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const __VLS_5 = SearchModal;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
    value: (__VLS_ctx.show),
}));
const __VLS_7 = __VLS_6({
    value: (__VLS_ctx.show),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
// @ts-ignore
[handleSearch, show,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=index.vue.js.map