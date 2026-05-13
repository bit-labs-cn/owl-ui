/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { useNav } from "@bit-labs.cn/owl-ui/layout/hooks/useNav";
import LaySearch from "../lay-search/index.vue";
import LayNotice from "../lay-notice/index.vue";
import LayNavMix from "../lay-sidebar/NavMix.vue";
import { useTranslationLang } from "@bit-labs.cn/owl-ui/layout/hooks/useTranslationLang";
import LaySidebarFullScreen from "../lay-sidebar/components/SidebarFullScreen.vue";
import LaySidebarBreadCrumb from "../lay-sidebar/components/SidebarBreadCrumb.vue";
import LaySidebarTopCollapse from "../lay-sidebar/components/SidebarTopCollapse.vue";
import GlobalizationIcon from "@bit-labs.cn/owl-ui/assets/svg/globalization.svg?component";
import LogoutCircleRLine from "@iconify-icons/ri/logout-circle-r-line";
import Setting from "@iconify-icons/ri/settings-3-line";
import Check from "@iconify-icons/ep/check";
const { layout, device, logout, onPanel, pureApp, username, userAvatar, avatarsStyle, toggleSideBar, getDropdownItemStyle, getDropdownItemClass } = useNav();
const { t, locale, translationCh, translationEn } = useTranslationLang();
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['el-dropdown-menu__item']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "navbar bg-[#fff] shadow-sm shadow-[rgba(0,21,41,0.08)]" },
});
/** @type {__VLS_StyleScopedClasses['navbar']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#fff]']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-[rgba(0,21,41,0.08)]']} */ ;
if (__VLS_ctx.device === 'mobile') {
    const __VLS_0 = LaySidebarTopCollapse;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        ...{ 'onToggleClick': {} },
        ...{ class: "hamburger-container" },
        isActive: (__VLS_ctx.pureApp.sidebar.opened),
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onToggleClick': {} },
        ...{ class: "hamburger-container" },
        isActive: (__VLS_ctx.pureApp.sidebar.opened),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_5;
    const __VLS_6 = ({ toggleClick: {} },
        { onToggleClick: (__VLS_ctx.toggleSideBar) });
    /** @type {__VLS_StyleScopedClasses['hamburger-container']} */ ;
    var __VLS_3;
    var __VLS_4;
}
if (__VLS_ctx.layout !== 'mix' && __VLS_ctx.device !== 'mobile') {
    const __VLS_7 = LaySidebarBreadCrumb;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        ...{ class: "breadcrumb-container" },
    }));
    const __VLS_9 = __VLS_8({
        ...{ class: "breadcrumb-container" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    /** @type {__VLS_StyleScopedClasses['breadcrumb-container']} */ ;
}
if (__VLS_ctx.layout === 'mix') {
    const __VLS_12 = LayNavMix;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({}));
    const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
}
if (__VLS_ctx.layout === 'vertical') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "vertical-header-right" },
    });
    /** @type {__VLS_StyleScopedClasses['vertical-header-right']} */ ;
    const __VLS_17 = LaySearch;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
        id: "header-search",
    }));
    const __VLS_19 = __VLS_18({
        id: "header-search",
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    let __VLS_22;
    /** @ts-ignore @type { | typeof __VLS_components.elDropdown | typeof __VLS_components.ElDropdown | typeof __VLS_components['el-dropdown'] | typeof __VLS_components.elDropdown | typeof __VLS_components.ElDropdown | typeof __VLS_components['el-dropdown']} */
    elDropdown;
    // @ts-ignore
    const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({
        id: "header-translation",
        trigger: "click",
    }));
    const __VLS_24 = __VLS_23({
        id: "header-translation",
        trigger: "click",
    }, ...__VLS_functionalComponentArgsRest(__VLS_23));
    const { default: __VLS_27 } = __VLS_25.slots;
    let __VLS_28;
    /** @ts-ignore @type { | typeof __VLS_components.GlobalizationIcon} */
    GlobalizationIcon;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28({
        ...{ class: "navbar-bg-hover w-[40px] h-[48px] p-[11px] cursor-pointer outline-none" },
    }));
    const __VLS_30 = __VLS_29({
        ...{ class: "navbar-bg-hover w-[40px] h-[48px] p-[11px] cursor-pointer outline-none" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    /** @type {__VLS_StyleScopedClasses['navbar-bg-hover']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-[40px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-[48px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-[11px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
    {
        const { dropdown: __VLS_33 } = __VLS_25.slots;
        let __VLS_34;
        /** @ts-ignore @type { | typeof __VLS_components.elDropdownMenu | typeof __VLS_components.ElDropdownMenu | typeof __VLS_components['el-dropdown-menu'] | typeof __VLS_components.elDropdownMenu | typeof __VLS_components.ElDropdownMenu | typeof __VLS_components['el-dropdown-menu']} */
        elDropdownMenu;
        // @ts-ignore
        const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
            ...{ class: "translation" },
        }));
        const __VLS_36 = __VLS_35({
            ...{ class: "translation" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_35));
        /** @type {__VLS_StyleScopedClasses['translation']} */ ;
        const { default: __VLS_39 } = __VLS_37.slots;
        let __VLS_40;
        /** @ts-ignore @type { | typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem | typeof __VLS_components['el-dropdown-item'] | typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem | typeof __VLS_components['el-dropdown-item']} */
        elDropdownItem;
        // @ts-ignore
        const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({
            ...{ 'onClick': {} },
            ...{ style: (__VLS_ctx.getDropdownItemStyle(__VLS_ctx.locale, 'zh')) },
            ...{ class: (['dark:!text-white', __VLS_ctx.getDropdownItemClass(__VLS_ctx.locale, 'zh')]) },
        }));
        const __VLS_42 = __VLS_41({
            ...{ 'onClick': {} },
            ...{ style: (__VLS_ctx.getDropdownItemStyle(__VLS_ctx.locale, 'zh')) },
            ...{ class: (['dark:!text-white', __VLS_ctx.getDropdownItemClass(__VLS_ctx.locale, 'zh')]) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_41));
        let __VLS_45;
        const __VLS_46 = ({ click: {} },
            { onClick: (__VLS_ctx.translationCh) });
        /** @type {__VLS_StyleScopedClasses['dark:!text-white']} */ ;
        const { default: __VLS_47 } = __VLS_43.slots;
        let __VLS_48;
        /** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
        IconifyIconOffline;
        // @ts-ignore
        const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
            ...{ class: "check-zh" },
            icon: (__VLS_ctx.Check),
        }));
        const __VLS_50 = __VLS_49({
            ...{ class: "check-zh" },
            icon: (__VLS_ctx.Check),
        }, ...__VLS_functionalComponentArgsRest(__VLS_49));
        __VLS_asFunctionalDirective(__VLS_directives.vShow, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.locale === 'zh') }, null, null);
        /** @type {__VLS_StyleScopedClasses['check-zh']} */ ;
        // @ts-ignore
        [device, device, pureApp, toggleSideBar, layout, layout, layout, getDropdownItemStyle, locale, locale, locale, getDropdownItemClass, translationCh, Check,];
        var __VLS_43;
        var __VLS_44;
        let __VLS_53;
        /** @ts-ignore @type { | typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem | typeof __VLS_components['el-dropdown-item'] | typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem | typeof __VLS_components['el-dropdown-item']} */
        elDropdownItem;
        // @ts-ignore
        const __VLS_54 = __VLS_asFunctionalComponent1(__VLS_53, new __VLS_53({
            ...{ 'onClick': {} },
            ...{ style: (__VLS_ctx.getDropdownItemStyle(__VLS_ctx.locale, 'en')) },
            ...{ class: (['dark:!text-white', __VLS_ctx.getDropdownItemClass(__VLS_ctx.locale, 'en')]) },
        }));
        const __VLS_55 = __VLS_54({
            ...{ 'onClick': {} },
            ...{ style: (__VLS_ctx.getDropdownItemStyle(__VLS_ctx.locale, 'en')) },
            ...{ class: (['dark:!text-white', __VLS_ctx.getDropdownItemClass(__VLS_ctx.locale, 'en')]) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_54));
        let __VLS_58;
        const __VLS_59 = ({ click: {} },
            { onClick: (__VLS_ctx.translationEn) });
        /** @type {__VLS_StyleScopedClasses['dark:!text-white']} */ ;
        const { default: __VLS_60 } = __VLS_56.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "check-en" },
        });
        __VLS_asFunctionalDirective(__VLS_directives.vShow, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.locale === 'en') }, null, null);
        /** @type {__VLS_StyleScopedClasses['check-en']} */ ;
        let __VLS_61;
        /** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
        IconifyIconOffline;
        // @ts-ignore
        const __VLS_62 = __VLS_asFunctionalComponent1(__VLS_61, new __VLS_61({
            icon: (__VLS_ctx.Check),
        }));
        const __VLS_63 = __VLS_62({
            icon: (__VLS_ctx.Check),
        }, ...__VLS_functionalComponentArgsRest(__VLS_62));
        // @ts-ignore
        [getDropdownItemStyle, locale, locale, locale, getDropdownItemClass, Check, translationEn,];
        var __VLS_56;
        var __VLS_57;
        // @ts-ignore
        [];
        var __VLS_37;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_25;
    const __VLS_66 = LaySidebarFullScreen;
    // @ts-ignore
    const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
        id: "full-screen",
    }));
    const __VLS_68 = __VLS_67({
        id: "full-screen",
    }, ...__VLS_functionalComponentArgsRest(__VLS_67));
    const __VLS_71 = LayNotice;
    // @ts-ignore
    const __VLS_72 = __VLS_asFunctionalComponent1(__VLS_71, new __VLS_71({
        id: "header-notice",
    }));
    const __VLS_73 = __VLS_72({
        id: "header-notice",
    }, ...__VLS_functionalComponentArgsRest(__VLS_72));
    let __VLS_76;
    /** @ts-ignore @type { | typeof __VLS_components.elDropdown | typeof __VLS_components.ElDropdown | typeof __VLS_components['el-dropdown'] | typeof __VLS_components.elDropdown | typeof __VLS_components.ElDropdown | typeof __VLS_components['el-dropdown']} */
    elDropdown;
    // @ts-ignore
    const __VLS_77 = __VLS_asFunctionalComponent1(__VLS_76, new __VLS_76({
        trigger: "click",
    }));
    const __VLS_78 = __VLS_77({
        trigger: "click",
    }, ...__VLS_functionalComponentArgsRest(__VLS_77));
    const { default: __VLS_81 } = __VLS_79.slots;
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
        const { dropdown: __VLS_82 } = __VLS_79.slots;
        let __VLS_83;
        /** @ts-ignore @type { | typeof __VLS_components.elDropdownMenu | typeof __VLS_components.ElDropdownMenu | typeof __VLS_components['el-dropdown-menu'] | typeof __VLS_components.elDropdownMenu | typeof __VLS_components.ElDropdownMenu | typeof __VLS_components['el-dropdown-menu']} */
        elDropdownMenu;
        // @ts-ignore
        const __VLS_84 = __VLS_asFunctionalComponent1(__VLS_83, new __VLS_83({
            ...{ class: "logout" },
        }));
        const __VLS_85 = __VLS_84({
            ...{ class: "logout" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_84));
        /** @type {__VLS_StyleScopedClasses['logout']} */ ;
        const { default: __VLS_88 } = __VLS_86.slots;
        let __VLS_89;
        /** @ts-ignore @type { | typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem | typeof __VLS_components['el-dropdown-item'] | typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem | typeof __VLS_components['el-dropdown-item']} */
        elDropdownItem;
        // @ts-ignore
        const __VLS_90 = __VLS_asFunctionalComponent1(__VLS_89, new __VLS_89({
            ...{ 'onClick': {} },
        }));
        const __VLS_91 = __VLS_90({
            ...{ 'onClick': {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_90));
        let __VLS_94;
        const __VLS_95 = ({ click: {} },
            { onClick: (__VLS_ctx.logout) });
        const { default: __VLS_96 } = __VLS_92.slots;
        let __VLS_97;
        /** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
        IconifyIconOffline;
        // @ts-ignore
        const __VLS_98 = __VLS_asFunctionalComponent1(__VLS_97, new __VLS_97({
            icon: (__VLS_ctx.LogoutCircleRLine),
            ...{ style: {} },
        }));
        const __VLS_99 = __VLS_98({
            icon: (__VLS_ctx.LogoutCircleRLine),
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_98));
        (__VLS_ctx.t("buttons.pureLoginOut"));
        // @ts-ignore
        [userAvatar, avatarsStyle, username, username, logout, LogoutCircleRLine, t,];
        var __VLS_92;
        var __VLS_93;
        // @ts-ignore
        [];
        var __VLS_86;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_79;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ onClick: (__VLS_ctx.onPanel) },
        ...{ class: "set-icon navbar-bg-hover" },
        title: (__VLS_ctx.t('buttons.pureOpenSystemSet')),
    });
    /** @type {__VLS_StyleScopedClasses['set-icon']} */ ;
    /** @type {__VLS_StyleScopedClasses['navbar-bg-hover']} */ ;
    let __VLS_102;
    /** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
    IconifyIconOffline;
    // @ts-ignore
    const __VLS_103 = __VLS_asFunctionalComponent1(__VLS_102, new __VLS_102({
        icon: (__VLS_ctx.Setting),
    }));
    const __VLS_104 = __VLS_103({
        icon: (__VLS_ctx.Setting),
    }, ...__VLS_functionalComponentArgsRest(__VLS_103));
}
// @ts-ignore
[t, onPanel, Setting,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=index.vue.js.map