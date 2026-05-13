/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { getConfig } from "@bit-labs.cn/owl-ui/config";
import { posix } from "path-browserify";
import { ReText } from "@bit-labs.cn/owl-ui/components/ReText";
import { useNav } from "@bit-labs.cn/owl-ui/layout/hooks/useNav";
import { transformI18n } from "@bit-labs.cn/owl-ui/plugins/i18n";
import SidebarLinkItem from "./SidebarLinkItem.vue";
import SidebarExtraIcon from "./SidebarExtraIcon.vue";
import { useRenderIcon } from "@bit-labs.cn/owl-ui/components/ReIcon/src/hooks";
import { ref, toRaw, computed, useAttrs } from "vue";
import ArrowUp from "@iconify-icons/ep/arrow-up-bold";
import EpArrowDown from "@iconify-icons/ep/arrow-down-bold";
import ArrowLeft from "@iconify-icons/ep/arrow-left-bold";
import ArrowRight from "@iconify-icons/ep/arrow-right-bold";
const attrs = useAttrs();
const { layout, isCollapse, tooltipEffect, getDivStyle } = useNav();
const props = defineProps({
    item: {
        type: Object
    },
    isNest: {
        type: Boolean,
        default: false
    },
    basePath: {
        type: String,
        default: ""
    }
});
const getNoDropdownStyle = computed(() => {
    return {
        width: "100%",
        display: "flex",
        alignItems: "center"
    };
});
const getSubMenuIconStyle = computed(() => {
    return {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: layout.value === "horizontal"
            ? "0 5px 0 0"
            : isCollapse.value
                ? "0 auto"
                : "0 5px 0 0"
    };
});
const expandCloseIcon = computed(() => {
    if (!getConfig()?.MenuArrowIconNoTransition)
        return "";
    return {
        "expand-close-icon": useRenderIcon(EpArrowDown),
        "expand-open-icon": useRenderIcon(ArrowUp),
        "collapse-close-icon": useRenderIcon(ArrowRight),
        "collapse-open-icon": useRenderIcon(ArrowLeft)
    };
});
const onlyOneChild = ref(null);
function hasOneShowingChild(children = [], parent) {
    const showingChildren = children.filter((item) => {
        onlyOneChild.value = item;
        return true;
    });
    if (showingChildren[0]?.meta?.showParent) {
        return false;
    }
    if (showingChildren.length === 1) {
        return true;
    }
    if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
        return true;
    }
    return false;
}
function resolvePath(routePath) {
    const httpReg = /^http(s?):\/\//;
    if (httpReg.test(routePath) || httpReg.test(props.basePath)) {
        return routePath || props.basePath;
    }
    else {
        return posix.resolve(props.basePath, routePath);
    }
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
if (__VLS_ctx.hasOneShowingChild(__VLS_ctx.item.children, __VLS_ctx.item) &&
    (!__VLS_ctx.onlyOneChild.children || __VLS_ctx.onlyOneChild.noShowingChildren)) {
    const __VLS_0 = SidebarLinkItem || SidebarLinkItem;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        to: (__VLS_ctx.item),
    }));
    const __VLS_2 = __VLS_1({
        to: (__VLS_ctx.item),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5 = {};
    const { default: __VLS_6 } = __VLS_3.slots;
    let __VLS_7;
    /** @ts-ignore @type { | typeof __VLS_components.elMenuItem | typeof __VLS_components.ElMenuItem | typeof __VLS_components['el-menu-item'] | typeof __VLS_components.elMenuItem | typeof __VLS_components.ElMenuItem | typeof __VLS_components['el-menu-item']} */
    elMenuItem;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        index: (__VLS_ctx.resolvePath(__VLS_ctx.onlyOneChild.path)),
        ...{ class: ({ 'submenu-title-noDropdown': !__VLS_ctx.isNest }) },
        ...{ style: (__VLS_ctx.getNoDropdownStyle) },
        ...(__VLS_ctx.attrs),
    }));
    const __VLS_9 = __VLS_8({
        index: (__VLS_ctx.resolvePath(__VLS_ctx.onlyOneChild.path)),
        ...{ class: ({ 'submenu-title-noDropdown': !__VLS_ctx.isNest }) },
        ...{ style: (__VLS_ctx.getNoDropdownStyle) },
        ...(__VLS_ctx.attrs),
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    /** @type {__VLS_StyleScopedClasses['submenu-title-noDropdown']} */ ;
    const { default: __VLS_12 } = __VLS_10.slots;
    if (__VLS_ctx.toRaw(__VLS_ctx.item.meta.icon)) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "sub-menu-icon" },
            ...{ style: (__VLS_ctx.getSubMenuIconStyle) },
        });
        /** @type {__VLS_StyleScopedClasses['sub-menu-icon']} */ ;
        const __VLS_13 = (__VLS_ctx.useRenderIcon(__VLS_ctx.toRaw(__VLS_ctx.onlyOneChild.meta.icon) ||
            (__VLS_ctx.item.meta && __VLS_ctx.toRaw(__VLS_ctx.item.meta.icon))));
        // @ts-ignore
        const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({}));
        const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
    }
    if ((!__VLS_ctx.item?.meta.icon &&
        __VLS_ctx.isCollapse &&
        __VLS_ctx.layout === 'vertical' &&
        __VLS_ctx.item?.pathList?.length === 1) ||
        (!__VLS_ctx.onlyOneChild.meta.icon &&
            __VLS_ctx.isCollapse &&
            __VLS_ctx.layout === 'mix' &&
            __VLS_ctx.item?.pathList?.length === 2)) {
        let __VLS_18;
        /** @ts-ignore @type { | typeof __VLS_components.elText | typeof __VLS_components.ElText | typeof __VLS_components['el-text'] | typeof __VLS_components.elText | typeof __VLS_components.ElText | typeof __VLS_components['el-text']} */
        elText;
        // @ts-ignore
        const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
            truncated: true,
            ...{ class: "!w-full !pl-4 !text-inherit" },
        }));
        const __VLS_20 = __VLS_19({
            truncated: true,
            ...{ class: "!w-full !pl-4 !text-inherit" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_19));
        /** @type {__VLS_StyleScopedClasses['!w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['!pl-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['!text-inherit']} */ ;
        const { default: __VLS_23 } = __VLS_21.slots;
        (__VLS_ctx.transformI18n(__VLS_ctx.onlyOneChild.meta.title));
        // @ts-ignore
        [hasOneShowingChild, item, item, item, item, item, item, item, item, item, onlyOneChild, onlyOneChild, onlyOneChild, onlyOneChild, onlyOneChild, onlyOneChild, resolvePath, isNest, getNoDropdownStyle, attrs, toRaw, toRaw, toRaw, getSubMenuIconStyle, useRenderIcon, isCollapse, isCollapse, layout, layout, transformI18n,];
        var __VLS_21;
    }
    {
        const { title: __VLS_24 } = __VLS_10.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ style: (__VLS_ctx.getDivStyle) },
        });
        let __VLS_25;
        /** @ts-ignore @type { | typeof __VLS_components.ReText | typeof __VLS_components.ReText} */
        ReText;
        // @ts-ignore
        const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
            tippyProps: ({
                offset: [0, -10],
                theme: __VLS_ctx.tooltipEffect
            }),
            ...{ class: "!w-full !text-inherit" },
        }));
        const __VLS_27 = __VLS_26({
            tippyProps: ({
                offset: [0, -10],
                theme: __VLS_ctx.tooltipEffect
            }),
            ...{ class: "!w-full !text-inherit" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_26));
        /** @type {__VLS_StyleScopedClasses['!w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['!text-inherit']} */ ;
        const { default: __VLS_30 } = __VLS_28.slots;
        (__VLS_ctx.transformI18n(__VLS_ctx.onlyOneChild.meta.title));
        // @ts-ignore
        [onlyOneChild, transformI18n, getDivStyle, tooltipEffect,];
        var __VLS_28;
        const __VLS_31 = SidebarExtraIcon;
        // @ts-ignore
        const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
            extraIcon: (__VLS_ctx.onlyOneChild.meta.extraIcon),
        }));
        const __VLS_33 = __VLS_32({
            extraIcon: (__VLS_ctx.onlyOneChild.meta.extraIcon),
        }, ...__VLS_functionalComponentArgsRest(__VLS_32));
        // @ts-ignore
        [onlyOneChild,];
    }
    // @ts-ignore
    [];
    var __VLS_10;
    // @ts-ignore
    [];
    var __VLS_3;
}
else {
    let __VLS_36;
    /** @ts-ignore @type { | typeof __VLS_components.elSubMenu | typeof __VLS_components.ElSubMenu | typeof __VLS_components['el-sub-menu'] | typeof __VLS_components.elSubMenu | typeof __VLS_components.ElSubMenu | typeof __VLS_components['el-sub-menu']} */
    elSubMenu;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
        ref: "subMenu",
        teleported: true,
        index: (__VLS_ctx.resolvePath(__VLS_ctx.item.path)),
        ...(__VLS_ctx.expandCloseIcon),
    }));
    const __VLS_38 = __VLS_37({
        ref: "subMenu",
        teleported: true,
        index: (__VLS_ctx.resolvePath(__VLS_ctx.item.path)),
        ...(__VLS_ctx.expandCloseIcon),
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    var __VLS_41 = {};
    const { default: __VLS_43 } = __VLS_39.slots;
    {
        const { title: __VLS_44 } = __VLS_39.slots;
        if (__VLS_ctx.toRaw(__VLS_ctx.item.meta.icon)) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ style: (__VLS_ctx.getSubMenuIconStyle) },
                ...{ class: "sub-menu-icon" },
            });
            /** @type {__VLS_StyleScopedClasses['sub-menu-icon']} */ ;
            const __VLS_45 = (__VLS_ctx.useRenderIcon(__VLS_ctx.item.meta && __VLS_ctx.toRaw(__VLS_ctx.item.meta.icon)));
            // @ts-ignore
            const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({}));
            const __VLS_47 = __VLS_46({}, ...__VLS_functionalComponentArgsRest(__VLS_46));
        }
        if (__VLS_ctx.layout === 'mix' && __VLS_ctx.toRaw(__VLS_ctx.item.meta.icon)
            ? !__VLS_ctx.isCollapse || __VLS_ctx.item?.pathList?.length !== 2
            : !(__VLS_ctx.layout === 'vertical' &&
                __VLS_ctx.isCollapse &&
                __VLS_ctx.toRaw(__VLS_ctx.item.meta.icon) &&
                __VLS_ctx.item.parentId === null)) {
            let __VLS_50;
            /** @ts-ignore @type { | typeof __VLS_components.ReText | typeof __VLS_components.ReText} */
            ReText;
            // @ts-ignore
            const __VLS_51 = __VLS_asFunctionalComponent1(__VLS_50, new __VLS_50({
                tippyProps: ({
                    offset: [0, -10],
                    theme: __VLS_ctx.tooltipEffect
                }),
                ...{ class: ({
                        '!w-full': true,
                        '!text-inherit': true,
                        '!pl-4': __VLS_ctx.layout !== 'horizontal' &&
                            __VLS_ctx.isCollapse &&
                            !__VLS_ctx.toRaw(__VLS_ctx.item.meta.icon) &&
                            __VLS_ctx.item.parentId === null
                    }) },
            }));
            const __VLS_52 = __VLS_51({
                tippyProps: ({
                    offset: [0, -10],
                    theme: __VLS_ctx.tooltipEffect
                }),
                ...{ class: ({
                        '!w-full': true,
                        '!text-inherit': true,
                        '!pl-4': __VLS_ctx.layout !== 'horizontal' &&
                            __VLS_ctx.isCollapse &&
                            !__VLS_ctx.toRaw(__VLS_ctx.item.meta.icon) &&
                            __VLS_ctx.item.parentId === null
                    }) },
            }, ...__VLS_functionalComponentArgsRest(__VLS_51));
            /** @type {__VLS_StyleScopedClasses['!w-full']} */ ;
            /** @type {__VLS_StyleScopedClasses['!text-inherit']} */ ;
            /** @type {__VLS_StyleScopedClasses['!pl-4']} */ ;
            const { default: __VLS_55 } = __VLS_53.slots;
            (__VLS_ctx.transformI18n(__VLS_ctx.item.meta.title));
            // @ts-ignore
            [item, item, item, item, item, item, item, item, item, item, item, resolvePath, toRaw, toRaw, toRaw, toRaw, toRaw, getSubMenuIconStyle, useRenderIcon, isCollapse, isCollapse, isCollapse, layout, layout, layout, transformI18n, tooltipEffect, expandCloseIcon,];
            var __VLS_53;
        }
        if (!__VLS_ctx.isCollapse) {
            const __VLS_56 = SidebarExtraIcon;
            // @ts-ignore
            const __VLS_57 = __VLS_asFunctionalComponent1(__VLS_56, new __VLS_56({
                extraIcon: (__VLS_ctx.item.meta.extraIcon),
            }));
            const __VLS_58 = __VLS_57({
                extraIcon: (__VLS_ctx.item.meta.extraIcon),
            }, ...__VLS_functionalComponentArgsRest(__VLS_57));
        }
        // @ts-ignore
        [item, isCollapse,];
    }
    for (const [child] of __VLS_vFor((__VLS_ctx.item.children))) {
        let __VLS_61;
        /** @ts-ignore @type { | typeof __VLS_components.sidebarItem | typeof __VLS_components.SidebarItem | typeof __VLS_components['sidebar-item']} */
        sidebarItem;
        // @ts-ignore
        const __VLS_62 = __VLS_asFunctionalComponent1(__VLS_61, new __VLS_61({
            key: (child.path),
            isNest: (true),
            item: (child),
            basePath: (__VLS_ctx.resolvePath(child.path)),
            ...{ class: "nest-menu" },
        }));
        const __VLS_63 = __VLS_62({
            key: (child.path),
            isNest: (true),
            item: (child),
            basePath: (__VLS_ctx.resolvePath(child.path)),
            ...{ class: "nest-menu" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_62));
        /** @type {__VLS_StyleScopedClasses['nest-menu']} */ ;
        // @ts-ignore
        [item, resolvePath,];
    }
    // @ts-ignore
    [];
    var __VLS_39;
}
// @ts-ignore
var __VLS_42 = __VLS_41;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    props: {
        item: {
            type: Object
        },
        isNest: {
            type: Boolean,
            default: false
        },
        basePath: {
            type: String,
            default: ""
        }
    },
});
export default {};
//# sourceMappingURL=SidebarItem.vue.js.map