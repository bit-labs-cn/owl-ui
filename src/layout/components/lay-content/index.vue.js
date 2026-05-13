/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { useI18n } from "vue-i18n";
import LayFrame from "../lay-frame/index.vue";
import LayFooter from "../lay-footer/index.vue";
import { useTags } from "@bit-labs.cn/owl-ui/layout/hooks/useTag";
import { useGlobal, isNumber } from "@pureadmin/utils";
import BackTopIcon from "@bit-labs.cn/owl-ui/assets/svg/back_top.svg?component";
import { h, computed, Transition, defineComponent } from "vue";
import { usePermissionStoreHook } from "@bit-labs.cn/owl-ui/store/modules/permission";
const props = defineProps({
    fixedHeader: Boolean
});
const { t } = useI18n();
const { showModel } = useTags();
const { $storage, $config } = useGlobal();
const isKeepAlive = computed(() => {
    return $config?.KeepAlive;
});
const transitions = computed(() => {
    return route => {
        return route.meta.transition;
    };
});
const hideTabs = computed(() => {
    return $storage?.configure.hideTabs;
});
const hideFooter = computed(() => {
    return $storage?.configure.hideFooter;
});
const stretch = computed(() => {
    return $storage?.configure.stretch;
});
const layout = computed(() => {
    return $storage?.layout.layout === "vertical";
});
const getMainWidth = computed(() => {
    return isNumber(stretch.value)
        ? stretch.value + "px"
        : stretch.value
            ? "1440px"
            : "100%";
});
const getSectionStyle = computed(() => {
    return [
        hideTabs.value && layout ? "padding-top: 48px;" : "",
        !hideTabs.value && layout
            ? showModel.value == "chrome"
                ? "padding-top: 85px;"
                : "padding-top: 81px;"
            : "",
        hideTabs.value && !layout.value ? "padding-top: 48px;" : "",
        !hideTabs.value && !layout.value
            ? showModel.value == "chrome"
                ? "padding-top: 85px;"
                : "padding-top: 81px;"
            : "",
        props.fixedHeader
            ? ""
            : `padding-top: 0;${hideTabs.value
                ? "min-height: calc(100vh - 48px);"
                : "min-height: calc(100vh - 86px);"}`
    ];
});
const transitionMain = defineComponent({
    props: {
        route: {
            type: undefined,
            required: true
        }
    },
    render() {
        const transitionName = transitions.value(this.route)?.name || "fade-transform";
        const enterTransition = transitions.value(this.route)?.enterTransition;
        const leaveTransition = transitions.value(this.route)?.leaveTransition;
        return h(Transition, {
            name: enterTransition ? "pure-classes-transition" : transitionName,
            enterActiveClass: enterTransition
                ? `animate__animated ${enterTransition}`
                : undefined,
            leaveActiveClass: leaveTransition
                ? `animate__animated ${leaveTransition}`
                : undefined,
            mode: "out-in",
            appear: true
        }, {
            default: () => [this.$slots.default()]
        });
    }
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
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: ([__VLS_ctx.fixedHeader ? 'app-main' : 'app-main-nofixed-header']) },
    ...{ style: (__VLS_ctx.getSectionStyle) },
});
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.routerView | typeof __VLS_components.RouterView | typeof __VLS_components['router-view'] | typeof __VLS_components.routerView | typeof __VLS_components.RouterView | typeof __VLS_components['router-view']} */
routerView;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
{
    const { default: __VLS_6 } = __VLS_3.slots;
    const [{ Component, route }] = __VLS_vSlot(__VLS_6);
    const __VLS_7 = LayFrame || LayFrame;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        currComp: (Component),
        currRoute: (route),
    }));
    const __VLS_9 = __VLS_8({
        currComp: (Component),
        currRoute: (route),
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    const { default: __VLS_12 } = __VLS_10.slots;
    {
        const { default: __VLS_13 } = __VLS_10.slots;
        const [{ Comp, fullPath, frameInfo }] = __VLS_vSlot(__VLS_13);
        if (__VLS_ctx.fixedHeader) {
            let __VLS_14;
            /** @ts-ignore @type { | typeof __VLS_components.elScrollbar | typeof __VLS_components.ElScrollbar | typeof __VLS_components['el-scrollbar'] | typeof __VLS_components.elScrollbar | typeof __VLS_components.ElScrollbar | typeof __VLS_components['el-scrollbar']} */
            elScrollbar;
            // @ts-ignore
            const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
                wrapStyle: ({
                    display: 'flex',
                    'flex-wrap': 'wrap',
                    'max-width': __VLS_ctx.getMainWidth,
                    margin: '0 auto',
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                }),
                viewStyle: ({
                    display: 'flex',
                    flex: 'auto',
                    overflow: 'hidden',
                    'flex-direction': 'column'
                }),
            }));
            const __VLS_16 = __VLS_15({
                wrapStyle: ({
                    display: 'flex',
                    'flex-wrap': 'wrap',
                    'max-width': __VLS_ctx.getMainWidth,
                    margin: '0 auto',
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                }),
                viewStyle: ({
                    display: 'flex',
                    flex: 'auto',
                    overflow: 'hidden',
                    'flex-direction': 'column'
                }),
            }, ...__VLS_functionalComponentArgsRest(__VLS_15));
            const { default: __VLS_19 } = __VLS_17.slots;
            let __VLS_20;
            /** @ts-ignore @type { | typeof __VLS_components.elBacktop | typeof __VLS_components.ElBacktop | typeof __VLS_components['el-backtop'] | typeof __VLS_components.elBacktop | typeof __VLS_components.ElBacktop | typeof __VLS_components['el-backtop']} */
            elBacktop;
            // @ts-ignore
            const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({
                title: (__VLS_ctx.t('buttons.pureBackTop')),
                target: ".app-main .el-scrollbar__wrap",
            }));
            const __VLS_22 = __VLS_21({
                title: (__VLS_ctx.t('buttons.pureBackTop')),
                target: ".app-main .el-scrollbar__wrap",
            }, ...__VLS_functionalComponentArgsRest(__VLS_21));
            const { default: __VLS_25 } = __VLS_23.slots;
            let __VLS_26;
            /** @ts-ignore @type { | typeof __VLS_components.BackTopIcon} */
            BackTopIcon;
            // @ts-ignore
            const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({}));
            const __VLS_28 = __VLS_27({}, ...__VLS_functionalComponentArgsRest(__VLS_27));
            // @ts-ignore
            [fixedHeader, fixedHeader, getSectionStyle, getMainWidth, t,];
            var __VLS_23;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "grow" },
            });
            /** @type {__VLS_StyleScopedClasses['grow']} */ ;
            let __VLS_31;
            /** @ts-ignore @type { | typeof __VLS_components.transitionMain | typeof __VLS_components.TransitionMain | typeof __VLS_components.transitionMain | typeof __VLS_components.TransitionMain} */
            transitionMain;
            // @ts-ignore
            const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
                route: (route),
            }));
            const __VLS_33 = __VLS_32({
                route: (route),
            }, ...__VLS_functionalComponentArgsRest(__VLS_32));
            const { default: __VLS_36 } = __VLS_34.slots;
            if (__VLS_ctx.isKeepAlive) {
                let __VLS_37;
                /** @ts-ignore @type { | typeof __VLS_components.keepAlive | typeof __VLS_components.KeepAlive | typeof __VLS_components['keep-alive'] | typeof __VLS_components.keepAlive | typeof __VLS_components.KeepAlive | typeof __VLS_components['keep-alive']} */
                keepAlive;
                // @ts-ignore
                const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({
                    include: (__VLS_ctx.usePermissionStoreHook().cachePageList),
                }));
                const __VLS_39 = __VLS_38({
                    include: (__VLS_ctx.usePermissionStoreHook().cachePageList),
                }, ...__VLS_functionalComponentArgsRest(__VLS_38));
                const { default: __VLS_42 } = __VLS_40.slots;
                const __VLS_43 = (Comp);
                // @ts-ignore
                const __VLS_44 = __VLS_asFunctionalComponent1(__VLS_43, new __VLS_43({
                    key: (fullPath),
                    frameInfo: (frameInfo),
                    ...{ class: "main-content" },
                }));
                const __VLS_45 = __VLS_44({
                    key: (fullPath),
                    frameInfo: (frameInfo),
                    ...{ class: "main-content" },
                }, ...__VLS_functionalComponentArgsRest(__VLS_44));
                /** @type {__VLS_StyleScopedClasses['main-content']} */ ;
                // @ts-ignore
                [isKeepAlive, usePermissionStoreHook,];
                var __VLS_40;
            }
            else {
                const __VLS_48 = (Comp);
                // @ts-ignore
                const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
                    key: (fullPath),
                    frameInfo: (frameInfo),
                    ...{ class: "main-content" },
                }));
                const __VLS_50 = __VLS_49({
                    key: (fullPath),
                    frameInfo: (frameInfo),
                    ...{ class: "main-content" },
                }, ...__VLS_functionalComponentArgsRest(__VLS_49));
                /** @type {__VLS_StyleScopedClasses['main-content']} */ ;
            }
            // @ts-ignore
            [];
            var __VLS_34;
            if (!__VLS_ctx.hideFooter) {
                const __VLS_53 = LayFooter;
                // @ts-ignore
                const __VLS_54 = __VLS_asFunctionalComponent1(__VLS_53, new __VLS_53({}));
                const __VLS_55 = __VLS_54({}, ...__VLS_functionalComponentArgsRest(__VLS_54));
            }
            // @ts-ignore
            [hideFooter,];
            var __VLS_17;
        }
        else {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "grow" },
            });
            /** @type {__VLS_StyleScopedClasses['grow']} */ ;
            let __VLS_58;
            /** @ts-ignore @type { | typeof __VLS_components.transitionMain | typeof __VLS_components.TransitionMain | typeof __VLS_components.transitionMain | typeof __VLS_components.TransitionMain} */
            transitionMain;
            // @ts-ignore
            const __VLS_59 = __VLS_asFunctionalComponent1(__VLS_58, new __VLS_58({
                route: (route),
            }));
            const __VLS_60 = __VLS_59({
                route: (route),
            }, ...__VLS_functionalComponentArgsRest(__VLS_59));
            const { default: __VLS_63 } = __VLS_61.slots;
            if (__VLS_ctx.isKeepAlive) {
                let __VLS_64;
                /** @ts-ignore @type { | typeof __VLS_components.keepAlive | typeof __VLS_components.KeepAlive | typeof __VLS_components['keep-alive'] | typeof __VLS_components.keepAlive | typeof __VLS_components.KeepAlive | typeof __VLS_components['keep-alive']} */
                keepAlive;
                // @ts-ignore
                const __VLS_65 = __VLS_asFunctionalComponent1(__VLS_64, new __VLS_64({
                    include: (__VLS_ctx.usePermissionStoreHook().cachePageList),
                }));
                const __VLS_66 = __VLS_65({
                    include: (__VLS_ctx.usePermissionStoreHook().cachePageList),
                }, ...__VLS_functionalComponentArgsRest(__VLS_65));
                const { default: __VLS_69 } = __VLS_67.slots;
                const __VLS_70 = (Comp);
                // @ts-ignore
                const __VLS_71 = __VLS_asFunctionalComponent1(__VLS_70, new __VLS_70({
                    key: (fullPath),
                    frameInfo: (frameInfo),
                    ...{ class: "main-content" },
                }));
                const __VLS_72 = __VLS_71({
                    key: (fullPath),
                    frameInfo: (frameInfo),
                    ...{ class: "main-content" },
                }, ...__VLS_functionalComponentArgsRest(__VLS_71));
                /** @type {__VLS_StyleScopedClasses['main-content']} */ ;
                // @ts-ignore
                [isKeepAlive, usePermissionStoreHook,];
                var __VLS_67;
            }
            else {
                const __VLS_75 = (Comp);
                // @ts-ignore
                const __VLS_76 = __VLS_asFunctionalComponent1(__VLS_75, new __VLS_75({
                    key: (fullPath),
                    frameInfo: (frameInfo),
                    ...{ class: "main-content" },
                }));
                const __VLS_77 = __VLS_76({
                    key: (fullPath),
                    frameInfo: (frameInfo),
                    ...{ class: "main-content" },
                }, ...__VLS_functionalComponentArgsRest(__VLS_76));
                /** @type {__VLS_StyleScopedClasses['main-content']} */ ;
            }
            // @ts-ignore
            [];
            var __VLS_61;
        }
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_10;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_3;
if (!__VLS_ctx.hideFooter && !__VLS_ctx.fixedHeader) {
    const __VLS_80 = LayFooter;
    // @ts-ignore
    const __VLS_81 = __VLS_asFunctionalComponent1(__VLS_80, new __VLS_80({}));
    const __VLS_82 = __VLS_81({}, ...__VLS_functionalComponentArgsRest(__VLS_81));
}
// @ts-ignore
[fixedHeader, hideFooter,];
const __VLS_export = (await import('vue')).defineComponent({
    props: {
        fixedHeader: Boolean
    },
});
export default {};
//# sourceMappingURL=index.vue.js.map