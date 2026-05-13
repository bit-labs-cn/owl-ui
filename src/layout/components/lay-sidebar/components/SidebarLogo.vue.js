/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { getTopMenu } from "@bit-labs.cn/owl-ui/router/utils";
import { useNav } from "@bit-labs.cn/owl-ui/layout/hooks/useNav";
const __VLS_props = defineProps({
    collapse: Boolean
});
const { title, getLogo } = useNav();
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
    ...{ class: "sidebar-logo-container" },
    ...{ class: ({ collapses: __VLS_ctx.collapse }) },
});
/** @type {__VLS_StyleScopedClasses['sidebar-logo-container']} */ ;
/** @type {__VLS_StyleScopedClasses['collapses']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.transition | typeof __VLS_components.Transition | typeof __VLS_components.transition | typeof __VLS_components.Transition} */
transition;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    name: "sidebarLogoFade",
}));
const __VLS_2 = __VLS_1({
    name: "sidebarLogoFade",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
if (__VLS_ctx.collapse) {
    let __VLS_6;
    /** @ts-ignore @type { | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link'] | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link']} */
    routerLink;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        key: "collapse",
        title: (__VLS_ctx.title),
        ...{ class: "sidebar-logo-link" },
        to: (__VLS_ctx.getTopMenu()?.path ?? '/'),
    }));
    const __VLS_8 = __VLS_7({
        key: "collapse",
        title: (__VLS_ctx.title),
        ...{ class: "sidebar-logo-link" },
        to: (__VLS_ctx.getTopMenu()?.path ?? '/'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    /** @type {__VLS_StyleScopedClasses['sidebar-logo-link']} */ ;
    const { default: __VLS_11 } = __VLS_9.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
        src: (__VLS_ctx.getLogo()),
        alt: "logo",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "sidebar-title" },
    });
    /** @type {__VLS_StyleScopedClasses['sidebar-title']} */ ;
    (__VLS_ctx.title);
    // @ts-ignore
    [collapse, collapse, title, title, getTopMenu, getLogo,];
    var __VLS_9;
}
else {
    let __VLS_12;
    /** @ts-ignore @type { | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link'] | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link']} */
    routerLink;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
        key: "expand",
        title: (__VLS_ctx.title),
        ...{ class: "sidebar-logo-link" },
        to: (__VLS_ctx.getTopMenu()?.path ?? '/'),
    }));
    const __VLS_14 = __VLS_13({
        key: "expand",
        title: (__VLS_ctx.title),
        ...{ class: "sidebar-logo-link" },
        to: (__VLS_ctx.getTopMenu()?.path ?? '/'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    /** @type {__VLS_StyleScopedClasses['sidebar-logo-link']} */ ;
    const { default: __VLS_17 } = __VLS_15.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
        src: (__VLS_ctx.getLogo()),
        alt: "logo",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "sidebar-title" },
    });
    /** @type {__VLS_StyleScopedClasses['sidebar-title']} */ ;
    (__VLS_ctx.title);
    // @ts-ignore
    [title, title, getTopMenu, getLogo,];
    var __VLS_15;
}
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    props: {
        collapse: Boolean
    },
});
export default {};
//# sourceMappingURL=SidebarLogo.vue.js.map