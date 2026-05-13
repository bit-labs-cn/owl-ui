/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { isAllEmpty } from "@pureadmin/utils";
import { useNav } from "@bit-labs.cn/owl-ui/layout/hooks/useNav";
import { transformI18n } from "@bit-labs.cn/owl-ui/plugins/i18n";
import LaySearch from "../lay-search/index.vue";
import LayNotice from "../lay-notice/index.vue";
import { ref, toRaw, watch, onMounted, nextTick } from "vue";
import { useRenderIcon } from "@bit-labs.cn/owl-ui/components/ReIcon/src/hooks";
import { getParentPaths, findRouteByPath } from "@bit-labs.cn/owl-ui/router/utils";
import { useTranslationLang } from "../../hooks/useTranslationLang";
import { usePermissionStoreHook } from "@bit-labs.cn/owl-ui/store/modules/permission";
import LaySidebarExtraIcon from "../lay-sidebar/components/SidebarExtraIcon.vue";
import LaySidebarFullScreen from "../lay-sidebar/components/SidebarFullScreen.vue";
import GlobalizationIcon from "@bit-labs.cn/owl-ui/assets/svg/globalization.svg?component";
import LogoutCircleRLine from "@iconify-icons/ri/logout-circle-r-line";
import Setting from "@iconify-icons/ri/settings-3-line";
import Check from "@iconify-icons/ep/check";
const menuRef = ref();
const defaultActive = ref(null);
const { t, route, locale, translationCh, translationEn } = useTranslationLang(menuRef);
const { device, logout, onPanel, resolvePath, username, userAvatar, getDivStyle, avatarsStyle, getDropdownItemStyle, getDropdownItemClass } = useNav();
function getDefaultActive(routePath) {
    const wholeMenus = usePermissionStoreHook().wholeMenus;
    /** 当前路由的父级路径 */
    const parentRoutes = getParentPaths(routePath, wholeMenus)[0];
    defaultActive.value = !isAllEmpty(route.meta?.activePath)
        ? route.meta.activePath
        : findRouteByPath(parentRoutes, wholeMenus)?.children[0]?.path;
}
onMounted(() => {
    getDefaultActive(route.path);
});
nextTick(() => {
    menuRef.value?.handleResize();
});
watch(() => [route.path, usePermissionStoreHook().wholeMenus], () => {
    getDefaultActive(route.path);
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['el-dropdown-menu__item']} */ ;
if (__VLS_ctx.device !== 'mobile') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "horizontal-header" },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vLoading, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.usePermissionStoreHook().wholeMenus.length === 0) }, null, null);
    /** @type {__VLS_StyleScopedClasses['horizontal-header']} */ ;
    let __VLS_0;
    /** @ts-ignore @type { | typeof __VLS_components.elMenu | typeof __VLS_components.ElMenu | typeof __VLS_components['el-menu'] | typeof __VLS_components.elMenu | typeof __VLS_components.ElMenu | typeof __VLS_components['el-menu']} */
    elMenu;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        ref: "menuRef",
        router: true,
        mode: "horizontal",
        popperClass: "pure-scrollbar",
        ...{ class: "horizontal-header-menu" },
        defaultActive: (__VLS_ctx.defaultActive),
    }));
    const __VLS_2 = __VLS_1({
        ref: "menuRef",
        router: true,
        mode: "horizontal",
        popperClass: "pure-scrollbar",
        ...{ class: "horizontal-header-menu" },
        defaultActive: (__VLS_ctx.defaultActive),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5 = {};
    /** @type {__VLS_StyleScopedClasses['horizontal-header-menu']} */ ;
    const { default: __VLS_7 } = __VLS_3.slots;
    for (const [route] of __VLS_vFor((__VLS_ctx.usePermissionStoreHook().wholeMenus))) {
        let __VLS_8;
        /** @ts-ignore @type { | typeof __VLS_components.elMenuItem | typeof __VLS_components.ElMenuItem | typeof __VLS_components['el-menu-item'] | typeof __VLS_components.elMenuItem | typeof __VLS_components.ElMenuItem | typeof __VLS_components['el-menu-item']} */
        elMenuItem;
        // @ts-ignore
        const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
            key: (route.path),
            index: (__VLS_ctx.resolvePath(route) || route.redirect),
        }));
        const __VLS_10 = __VLS_9({
            key: (route.path),
            index: (__VLS_ctx.resolvePath(route) || route.redirect),
        }, ...__VLS_functionalComponentArgsRest(__VLS_9));
        const { default: __VLS_13 } = __VLS_11.slots;
        {
            const { title: __VLS_14 } = __VLS_11.slots;
            if (__VLS_ctx.toRaw(route.meta.icon)) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: (['sub-menu-icon', route.meta.icon]) },
                });
                /** @type {__VLS_StyleScopedClasses['sub-menu-icon']} */ ;
                const __VLS_15 = (__VLS_ctx.useRenderIcon(route.meta && __VLS_ctx.toRaw(route.meta.icon)));
                // @ts-ignore
                const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({}));
                const __VLS_17 = __VLS_16({}, ...__VLS_functionalComponentArgsRest(__VLS_16));
            }
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ style: (__VLS_ctx.getDivStyle) },
            });
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "select-none" },
            });
            /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
            (__VLS_ctx.transformI18n(route.meta.title));
            const __VLS_20 = LaySidebarExtraIcon;
            // @ts-ignore
            const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({
                extraIcon: (route.meta.extraIcon),
            }));
            const __VLS_22 = __VLS_21({
                extraIcon: (route.meta.extraIcon),
            }, ...__VLS_functionalComponentArgsRest(__VLS_21));
            // @ts-ignore
            [device, vLoading, usePermissionStoreHook, usePermissionStoreHook, defaultActive, resolvePath, toRaw, toRaw, useRenderIcon, getDivStyle, transformI18n,];
        }
        // @ts-ignore
        [];
        var __VLS_11;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_3;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "horizontal-header-right" },
    });
    /** @type {__VLS_StyleScopedClasses['horizontal-header-right']} */ ;
    const __VLS_25 = LaySearch;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
        id: "header-search",
    }));
    const __VLS_27 = __VLS_26({
        id: "header-search",
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    let __VLS_30;
    /** @ts-ignore @type { | typeof __VLS_components.elDropdown | typeof __VLS_components.ElDropdown | typeof __VLS_components['el-dropdown'] | typeof __VLS_components.elDropdown | typeof __VLS_components.ElDropdown | typeof __VLS_components['el-dropdown']} */
    elDropdown;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
        id: "header-translation",
        trigger: "click",
    }));
    const __VLS_32 = __VLS_31({
        id: "header-translation",
        trigger: "click",
    }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    const { default: __VLS_35 } = __VLS_33.slots;
    let __VLS_36;
    /** @ts-ignore @type { | typeof __VLS_components.GlobalizationIcon} */
    GlobalizationIcon;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
        ...{ class: "navbar-bg-hover w-[40px] h-[48px] p-[11px] cursor-pointer outline-none" },
    }));
    const __VLS_38 = __VLS_37({
        ...{ class: "navbar-bg-hover w-[40px] h-[48px] p-[11px] cursor-pointer outline-none" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    /** @type {__VLS_StyleScopedClasses['navbar-bg-hover']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-[40px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-[48px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-[11px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
    {
        const { dropdown: __VLS_41 } = __VLS_33.slots;
        let __VLS_42;
        /** @ts-ignore @type { | typeof __VLS_components.elDropdownMenu | typeof __VLS_components.ElDropdownMenu | typeof __VLS_components['el-dropdown-menu'] | typeof __VLS_components.elDropdownMenu | typeof __VLS_components.ElDropdownMenu | typeof __VLS_components['el-dropdown-menu']} */
        elDropdownMenu;
        // @ts-ignore
        const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
            ...{ class: "translation" },
        }));
        const __VLS_44 = __VLS_43({
            ...{ class: "translation" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_43));
        /** @type {__VLS_StyleScopedClasses['translation']} */ ;
        const { default: __VLS_47 } = __VLS_45.slots;
        let __VLS_48;
        /** @ts-ignore @type { | typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem | typeof __VLS_components['el-dropdown-item'] | typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem | typeof __VLS_components['el-dropdown-item']} */
        elDropdownItem;
        // @ts-ignore
        const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
            ...{ 'onClick': {} },
            ...{ style: (__VLS_ctx.getDropdownItemStyle(__VLS_ctx.locale, 'zh')) },
            ...{ class: (['dark:!text-white', __VLS_ctx.getDropdownItemClass(__VLS_ctx.locale, 'zh')]) },
        }));
        const __VLS_50 = __VLS_49({
            ...{ 'onClick': {} },
            ...{ style: (__VLS_ctx.getDropdownItemStyle(__VLS_ctx.locale, 'zh')) },
            ...{ class: (['dark:!text-white', __VLS_ctx.getDropdownItemClass(__VLS_ctx.locale, 'zh')]) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_49));
        let __VLS_53;
        const __VLS_54 = ({ click: {} },
            { onClick: (__VLS_ctx.translationCh) });
        /** @type {__VLS_StyleScopedClasses['dark:!text-white']} */ ;
        const { default: __VLS_55 } = __VLS_51.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "check-zh" },
        });
        __VLS_asFunctionalDirective(__VLS_directives.vShow, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.locale === 'zh') }, null, null);
        /** @type {__VLS_StyleScopedClasses['check-zh']} */ ;
        let __VLS_56;
        /** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
        IconifyIconOffline;
        // @ts-ignore
        const __VLS_57 = __VLS_asFunctionalComponent1(__VLS_56, new __VLS_56({
            icon: (__VLS_ctx.Check),
        }));
        const __VLS_58 = __VLS_57({
            icon: (__VLS_ctx.Check),
        }, ...__VLS_functionalComponentArgsRest(__VLS_57));
        // @ts-ignore
        [getDropdownItemStyle, locale, locale, locale, getDropdownItemClass, translationCh, Check,];
        var __VLS_51;
        var __VLS_52;
        let __VLS_61;
        /** @ts-ignore @type { | typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem | typeof __VLS_components['el-dropdown-item'] | typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem | typeof __VLS_components['el-dropdown-item']} */
        elDropdownItem;
        // @ts-ignore
        const __VLS_62 = __VLS_asFunctionalComponent1(__VLS_61, new __VLS_61({
            ...{ 'onClick': {} },
            ...{ style: (__VLS_ctx.getDropdownItemStyle(__VLS_ctx.locale, 'en')) },
            ...{ class: (['dark:!text-white', __VLS_ctx.getDropdownItemClass(__VLS_ctx.locale, 'en')]) },
        }));
        const __VLS_63 = __VLS_62({
            ...{ 'onClick': {} },
            ...{ style: (__VLS_ctx.getDropdownItemStyle(__VLS_ctx.locale, 'en')) },
            ...{ class: (['dark:!text-white', __VLS_ctx.getDropdownItemClass(__VLS_ctx.locale, 'en')]) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_62));
        let __VLS_66;
        const __VLS_67 = ({ click: {} },
            { onClick: (__VLS_ctx.translationEn) });
        /** @type {__VLS_StyleScopedClasses['dark:!text-white']} */ ;
        const { default: __VLS_68 } = __VLS_64.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "check-en" },
        });
        __VLS_asFunctionalDirective(__VLS_directives.vShow, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.locale === 'en') }, null, null);
        /** @type {__VLS_StyleScopedClasses['check-en']} */ ;
        let __VLS_69;
        /** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
        IconifyIconOffline;
        // @ts-ignore
        const __VLS_70 = __VLS_asFunctionalComponent1(__VLS_69, new __VLS_69({
            icon: (__VLS_ctx.Check),
        }));
        const __VLS_71 = __VLS_70({
            icon: (__VLS_ctx.Check),
        }, ...__VLS_functionalComponentArgsRest(__VLS_70));
        // @ts-ignore
        [getDropdownItemStyle, locale, locale, locale, getDropdownItemClass, Check, translationEn,];
        var __VLS_64;
        var __VLS_65;
        // @ts-ignore
        [];
        var __VLS_45;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_33;
    const __VLS_74 = LaySidebarFullScreen;
    // @ts-ignore
    const __VLS_75 = __VLS_asFunctionalComponent1(__VLS_74, new __VLS_74({
        id: "full-screen",
    }));
    const __VLS_76 = __VLS_75({
        id: "full-screen",
    }, ...__VLS_functionalComponentArgsRest(__VLS_75));
    const __VLS_79 = LayNotice;
    // @ts-ignore
    const __VLS_80 = __VLS_asFunctionalComponent1(__VLS_79, new __VLS_79({
        id: "header-notice",
    }));
    const __VLS_81 = __VLS_80({
        id: "header-notice",
    }, ...__VLS_functionalComponentArgsRest(__VLS_80));
    let __VLS_84;
    /** @ts-ignore @type { | typeof __VLS_components.elDropdown | typeof __VLS_components.ElDropdown | typeof __VLS_components['el-dropdown'] | typeof __VLS_components.elDropdown | typeof __VLS_components.ElDropdown | typeof __VLS_components['el-dropdown']} */
    elDropdown;
    // @ts-ignore
    const __VLS_85 = __VLS_asFunctionalComponent1(__VLS_84, new __VLS_84({
        trigger: "click",
    }));
    const __VLS_86 = __VLS_85({
        trigger: "click",
    }, ...__VLS_functionalComponentArgsRest(__VLS_85));
    const { default: __VLS_89 } = __VLS_87.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "el-dropdown-link navbar-bg-hover select-none" },
    });
    /** @type {__VLS_StyleScopedClasses['el-dropdown-link']} */ ;
    /** @type {__VLS_StyleScopedClasses['navbar-bg-hover']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
        src: (__VLS_ctx.userAvatar),
        ...{ style: (__VLS_ctx.avatarsStyle) },
    });
    if (__VLS_ctx.username) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "dark:text-white" },
        });
        /** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
        (__VLS_ctx.username);
    }
    {
        const { dropdown: __VLS_90 } = __VLS_87.slots;
        let __VLS_91;
        /** @ts-ignore @type { | typeof __VLS_components.elDropdownMenu | typeof __VLS_components.ElDropdownMenu | typeof __VLS_components['el-dropdown-menu'] | typeof __VLS_components.elDropdownMenu | typeof __VLS_components.ElDropdownMenu | typeof __VLS_components['el-dropdown-menu']} */
        elDropdownMenu;
        // @ts-ignore
        const __VLS_92 = __VLS_asFunctionalComponent1(__VLS_91, new __VLS_91({
            ...{ class: "logout" },
        }));
        const __VLS_93 = __VLS_92({
            ...{ class: "logout" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_92));
        /** @type {__VLS_StyleScopedClasses['logout']} */ ;
        const { default: __VLS_96 } = __VLS_94.slots;
        let __VLS_97;
        /** @ts-ignore @type { | typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem | typeof __VLS_components['el-dropdown-item'] | typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem | typeof __VLS_components['el-dropdown-item']} */
        elDropdownItem;
        // @ts-ignore
        const __VLS_98 = __VLS_asFunctionalComponent1(__VLS_97, new __VLS_97({
            ...{ 'onClick': {} },
        }));
        const __VLS_99 = __VLS_98({
            ...{ 'onClick': {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_98));
        let __VLS_102;
        const __VLS_103 = ({ click: {} },
            { onClick: (__VLS_ctx.logout) });
        const { default: __VLS_104 } = __VLS_100.slots;
        let __VLS_105;
        /** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
        IconifyIconOffline;
        // @ts-ignore
        const __VLS_106 = __VLS_asFunctionalComponent1(__VLS_105, new __VLS_105({
            icon: (__VLS_ctx.LogoutCircleRLine),
            ...{ style: {} },
        }));
        const __VLS_107 = __VLS_106({
            icon: (__VLS_ctx.LogoutCircleRLine),
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_106));
        (__VLS_ctx.t("buttons.pureLoginOut"));
        // @ts-ignore
        [userAvatar, avatarsStyle, username, username, logout, LogoutCircleRLine, t,];
        var __VLS_100;
        var __VLS_101;
        // @ts-ignore
        [];
        var __VLS_94;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_87;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ onClick: (__VLS_ctx.onPanel) },
        ...{ class: "set-icon navbar-bg-hover" },
        title: (__VLS_ctx.t('buttons.pureOpenSystemSet')),
    });
    /** @type {__VLS_StyleScopedClasses['set-icon']} */ ;
    /** @type {__VLS_StyleScopedClasses['navbar-bg-hover']} */ ;
    let __VLS_110;
    /** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
    IconifyIconOffline;
    // @ts-ignore
    const __VLS_111 = __VLS_asFunctionalComponent1(__VLS_110, new __VLS_110({
        icon: (__VLS_ctx.Setting),
    }));
    const __VLS_112 = __VLS_111({
        icon: (__VLS_ctx.Setting),
    }, ...__VLS_functionalComponentArgsRest(__VLS_111));
}
// @ts-ignore
var __VLS_6 = __VLS_5;
// @ts-ignore
[t, onPanel, Setting,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=NavMix.vue.js.map