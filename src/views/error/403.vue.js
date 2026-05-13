/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { useRouter } from "vue-router";
import noAccess from "@bit-labs.cn/owl-ui/assets/status/403.svg?component";
defineOptions({
    name: "403"
});
const router = useRouter();
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex justify-center items-center h-[640px]" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[640px]']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.noAccess | typeof __VLS_components.NoAccess} */
noAccess;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "ml-12" },
});
/** @type {__VLS_StyleScopedClasses['ml-12']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "font-medium text-4xl mb-4 dark:text-white" },
    initial: ({
        opacity: 0,
        y: 100
    }),
    enter: ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 80
        }
    }),
});
__VLS_asFunctionalDirective(__VLS_directives.vMotion, {})(null, { ...__VLS_directiveBindingRestFields, }, null, null);
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "mb-4 text-gray-500" },
    initial: ({
        opacity: 0,
        y: 100
    }),
    enter: ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 120
        }
    }),
});
__VLS_asFunctionalDirective(__VLS_directives.vMotion, {})(null, { ...__VLS_directiveBindingRestFields, }, null, null);
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
let __VLS_5;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
    ...{ 'onClick': {} },
    type: "primary",
    initial: ({
        opacity: 0,
        y: 100
    }),
    enter: ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 160
        }
    }),
}));
const __VLS_7 = __VLS_6({
    ...{ 'onClick': {} },
    type: "primary",
    initial: ({
        opacity: 0,
        y: 100
    }),
    enter: ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 160
        }
    }),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
let __VLS_10;
const __VLS_11 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.router.push('/');
            // @ts-ignore
            [vMotion, vMotion, router,];
        } });
__VLS_asFunctionalDirective(__VLS_directives.vMotion, {})(null, { ...__VLS_directiveBindingRestFields, }, null, null);
const { default: __VLS_12 } = __VLS_8.slots;
// @ts-ignore
[vMotion,];
var __VLS_8;
var __VLS_9;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=403.vue.js.map