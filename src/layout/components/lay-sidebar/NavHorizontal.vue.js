/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { emitter } from "@bit-labs.cn/owl-ui/utils/mitt";
import { useNav } from "@bit-labs.cn/owl-ui/layout/hooks/useNav";
import LaySearch from "../lay-search/index.vue";
import LayNotice from "../lay-notice/index.vue";
import { responsiveStorageNameSpace } from "@bit-labs.cn/owl-ui/config";
import { ref, nextTick, computed, onMounted } from "vue";
import { storageLocal, isAllEmpty } from "@pureadmin/utils";
import { useTranslationLang } from "../../hooks/useTranslationLang";
import { usePermissionStoreHook } from "@bit-labs.cn/owl-ui/store/modules/permission";
import LaySidebarItem from "../lay-sidebar/components/SidebarItem.vue";
import LaySidebarFullScreen from "../lay-sidebar/components/SidebarFullScreen.vue";
import GlobalizationIcon from "@bit-labs.cn/owl-ui/assets/svg/globalization.svg?component";
import LogoutCircleRLine from "@iconify-icons/ri/logout-circle-r-line";
import Setting from "@iconify-icons/ri/settings-3-line";
import Check from "@iconify-icons/ep/check";
const menuRef = ref();
const showLogo = ref(storageLocal().getItem(`${responsiveStorageNameSpace()}configure`)?.showLogo ?? true);
const { t, route, locale, translationCh, translationEn } = useTranslationLang(menuRef);
const { title, logout, onPanel, getLogo, username, userAvatar, backTopMenu, avatarsStyle, getDropdownItemStyle, getDropdownItemClass } = useNav();
const defaultActive = computed(() => !isAllEmpty(route.meta?.activePath) ? route.meta.activePath : route.path);
nextTick(() => {
    menuRef.value?.handleResize();
});
onMounted(() => {
    emitter.on("logoChange", key => {
        showLogo.value = key;
    });
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['el-dropdown-menu__item']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "horizontal-header" },
});
__VLS_asFunctionalDirective(__VLS_directives.vLoading, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.usePermissionStoreHook().wholeMenus.length === 0) }, null, null);
/** @type {__VLS_StyleScopedClasses['horizontal-header']} */ ;
if (__VLS_ctx.showLogo) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (__VLS_ctx.backTopMenu) },
        ...{ class: "horizontal-header-left" },
    });
    /** @type {__VLS_StyleScopedClasses['horizontal-header-left']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
        src: (__VLS_ctx.getLogo()),
        alt: "logo",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.title);
}
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elMenu | typeof __VLS_components.ElMenu | typeof __VLS_components['el-menu'] | typeof __VLS_components.elMenu | typeof __VLS_components.ElMenu | typeof __VLS_components['el-menu']} */
elMenu;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ref: "menuRef",
    mode: "horizontal",
    popperClass: "pure-scrollbar",
    ...{ class: "horizontal-header-menu" },
    defaultActive: (__VLS_ctx.defaultActive),
}));
const __VLS_2 = __VLS_1({
    ref: "menuRef",
    mode: "horizontal",
    popperClass: "pure-scrollbar",
    ...{ class: "horizontal-header-menu" },
    defaultActive: (__VLS_ctx.defaultActive),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
/** @type {__VLS_StyleScopedClasses['horizontal-header-menu']} */ ;
const { default: __VLS_7 } = __VLS_3.slots;
for (const [route] of __VLS_vFor((__VLS_ctx.usePermissionStoreHook().wholeMenus))) {
    const __VLS_8 = LaySidebarItem;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
        key: (route.path),
        item: (route),
        basePath: (route.path),
    }));
    const __VLS_10 = __VLS_9({
        key: (route.path),
        item: (route),
        basePath: (route.path),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    // @ts-ignore
    [vLoading, usePermissionStoreHook, usePermissionStoreHook, showLogo, backTopMenu, getLogo, title, defaultActive,];
}
// @ts-ignore
[];
var __VLS_3;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "horizontal-header-right" },
});
/** @type {__VLS_StyleScopedClasses['horizontal-header-right']} */ ;
const __VLS_13 = LaySearch;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    id: "header-search",
}));
const __VLS_15 = __VLS_14({
    id: "header-search",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
let __VLS_18;
/** @ts-ignore @type { | typeof __VLS_components.elDropdown | typeof __VLS_components.ElDropdown | typeof __VLS_components['el-dropdown'] | typeof __VLS_components.elDropdown | typeof __VLS_components.ElDropdown | typeof __VLS_components['el-dropdown']} */
elDropdown;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    id: "header-translation",
    trigger: "click",
}));
const __VLS_20 = __VLS_19({
    id: "header-translation",
    trigger: "click",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
const { default: __VLS_23 } = __VLS_21.slots;
let __VLS_24;
/** @ts-ignore @type { | typeof __VLS_components.GlobalizationIcon} */
GlobalizationIcon;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
    ...{ class: "navbar-bg-hover w-[40px] h-[48px] p-[11px] cursor-pointer outline-none" },
}));
const __VLS_26 = __VLS_25({
    ...{ class: "navbar-bg-hover w-[40px] h-[48px] p-[11px] cursor-pointer outline-none" },
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
/** @type {__VLS_StyleScopedClasses['navbar-bg-hover']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[40px]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[48px]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-[11px]']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
{
    const { dropdown: __VLS_29 } = __VLS_21.slots;
    let __VLS_30;
    /** @ts-ignore @type { | typeof __VLS_components.elDropdownMenu | typeof __VLS_components.ElDropdownMenu | typeof __VLS_components['el-dropdown-menu'] | typeof __VLS_components.elDropdownMenu | typeof __VLS_components.ElDropdownMenu | typeof __VLS_components['el-dropdown-menu']} */
    elDropdownMenu;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
        ...{ class: "translation" },
    }));
    const __VLS_32 = __VLS_31({
        ...{ class: "translation" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    /** @type {__VLS_StyleScopedClasses['translation']} */ ;
    const { default: __VLS_35 } = __VLS_33.slots;
    let __VLS_36;
    /** @ts-ignore @type { | typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem | typeof __VLS_components['el-dropdown-item'] | typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem | typeof __VLS_components['el-dropdown-item']} */
    elDropdownItem;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
        ...{ 'onClick': {} },
        ...{ style: (__VLS_ctx.getDropdownItemStyle(__VLS_ctx.locale, 'zh')) },
        ...{ class: (['dark:!text-white', __VLS_ctx.getDropdownItemClass(__VLS_ctx.locale, 'zh')]) },
    }));
    const __VLS_38 = __VLS_37({
        ...{ 'onClick': {} },
        ...{ style: (__VLS_ctx.getDropdownItemStyle(__VLS_ctx.locale, 'zh')) },
        ...{ class: (['dark:!text-white', __VLS_ctx.getDropdownItemClass(__VLS_ctx.locale, 'zh')]) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    let __VLS_41;
    const __VLS_42 = ({ click: {} },
        { onClick: (__VLS_ctx.translationCh) });
    /** @type {__VLS_StyleScopedClasses['dark:!text-white']} */ ;
    const { default: __VLS_43 } = __VLS_39.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "check-zh" },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vShow, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.locale === 'zh') }, null, null);
    /** @type {__VLS_StyleScopedClasses['check-zh']} */ ;
    let __VLS_44;
    /** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
    IconifyIconOffline;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent1(__VLS_44, new __VLS_44({
        icon: (__VLS_ctx.Check),
    }));
    const __VLS_46 = __VLS_45({
        icon: (__VLS_ctx.Check),
    }, ...__VLS_functionalComponentArgsRest(__VLS_45));
    // @ts-ignore
    [getDropdownItemStyle, locale, locale, locale, getDropdownItemClass, translationCh, Check,];
    var __VLS_39;
    var __VLS_40;
    let __VLS_49;
    /** @ts-ignore @type { | typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem | typeof __VLS_components['el-dropdown-item'] | typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem | typeof __VLS_components['el-dropdown-item']} */
    elDropdownItem;
    // @ts-ignore
    const __VLS_50 = __VLS_asFunctionalComponent1(__VLS_49, new __VLS_49({
        ...{ 'onClick': {} },
        ...{ style: (__VLS_ctx.getDropdownItemStyle(__VLS_ctx.locale, 'en')) },
        ...{ class: (['dark:!text-white', __VLS_ctx.getDropdownItemClass(__VLS_ctx.locale, 'en')]) },
    }));
    const __VLS_51 = __VLS_50({
        ...{ 'onClick': {} },
        ...{ style: (__VLS_ctx.getDropdownItemStyle(__VLS_ctx.locale, 'en')) },
        ...{ class: (['dark:!text-white', __VLS_ctx.getDropdownItemClass(__VLS_ctx.locale, 'en')]) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_50));
    let __VLS_54;
    const __VLS_55 = ({ click: {} },
        { onClick: (__VLS_ctx.translationEn) });
    /** @type {__VLS_StyleScopedClasses['dark:!text-white']} */ ;
    const { default: __VLS_56 } = __VLS_52.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "check-en" },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vShow, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.locale === 'en') }, null, null);
    /** @type {__VLS_StyleScopedClasses['check-en']} */ ;
    let __VLS_57;
    /** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
    IconifyIconOffline;
    // @ts-ignore
    const __VLS_58 = __VLS_asFunctionalComponent1(__VLS_57, new __VLS_57({
        icon: (__VLS_ctx.Check),
    }));
    const __VLS_59 = __VLS_58({
        icon: (__VLS_ctx.Check),
    }, ...__VLS_functionalComponentArgsRest(__VLS_58));
    // @ts-ignore
    [getDropdownItemStyle, locale, locale, locale, getDropdownItemClass, Check, translationEn,];
    var __VLS_52;
    var __VLS_53;
    // @ts-ignore
    [];
    var __VLS_33;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_21;
const __VLS_62 = LaySidebarFullScreen;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent1(__VLS_62, new __VLS_62({
    id: "full-screen",
}));
const __VLS_64 = __VLS_63({
    id: "full-screen",
}, ...__VLS_functionalComponentArgsRest(__VLS_63));
const __VLS_67 = LayNotice;
// @ts-ignore
const __VLS_68 = __VLS_asFunctionalComponent1(__VLS_67, new __VLS_67({
    id: "header-notice",
}));
const __VLS_69 = __VLS_68({
    id: "header-notice",
}, ...__VLS_functionalComponentArgsRest(__VLS_68));
let __VLS_72;
/** @ts-ignore @type { | typeof __VLS_components.elDropdown | typeof __VLS_components.ElDropdown | typeof __VLS_components['el-dropdown'] | typeof __VLS_components.elDropdown | typeof __VLS_components.ElDropdown | typeof __VLS_components['el-dropdown']} */
elDropdown;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent1(__VLS_72, new __VLS_72({
    trigger: "click",
}));
const __VLS_74 = __VLS_73({
    trigger: "click",
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
const { default: __VLS_77 } = __VLS_75.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "el-dropdown-link navbar-bg-hover" },
});
/** @type {__VLS_StyleScopedClasses['el-dropdown-link']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-bg-hover']} */ ;
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
    const { dropdown: __VLS_78 } = __VLS_75.slots;
    let __VLS_79;
    /** @ts-ignore @type { | typeof __VLS_components.elDropdownMenu | typeof __VLS_components.ElDropdownMenu | typeof __VLS_components['el-dropdown-menu'] | typeof __VLS_components.elDropdownMenu | typeof __VLS_components.ElDropdownMenu | typeof __VLS_components['el-dropdown-menu']} */
    elDropdownMenu;
    // @ts-ignore
    const __VLS_80 = __VLS_asFunctionalComponent1(__VLS_79, new __VLS_79({
        ...{ class: "logout" },
    }));
    const __VLS_81 = __VLS_80({
        ...{ class: "logout" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_80));
    /** @type {__VLS_StyleScopedClasses['logout']} */ ;
    const { default: __VLS_84 } = __VLS_82.slots;
    let __VLS_85;
    /** @ts-ignore @type { | typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem | typeof __VLS_components['el-dropdown-item'] | typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem | typeof __VLS_components['el-dropdown-item']} */
    elDropdownItem;
    // @ts-ignore
    const __VLS_86 = __VLS_asFunctionalComponent1(__VLS_85, new __VLS_85({
        ...{ 'onClick': {} },
    }));
    const __VLS_87 = __VLS_86({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_86));
    let __VLS_90;
    const __VLS_91 = ({ click: {} },
        { onClick: (__VLS_ctx.logout) });
    const { default: __VLS_92 } = __VLS_88.slots;
    let __VLS_93;
    /** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
    IconifyIconOffline;
    // @ts-ignore
    const __VLS_94 = __VLS_asFunctionalComponent1(__VLS_93, new __VLS_93({
        icon: (__VLS_ctx.LogoutCircleRLine),
        ...{ style: {} },
    }));
    const __VLS_95 = __VLS_94({
        icon: (__VLS_ctx.LogoutCircleRLine),
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_94));
    (__VLS_ctx.t("buttons.pureLoginOut"));
    // @ts-ignore
    [userAvatar, avatarsStyle, username, username, logout, LogoutCircleRLine, t,];
    var __VLS_88;
    var __VLS_89;
    // @ts-ignore
    [];
    var __VLS_82;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_75;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ onClick: (__VLS_ctx.onPanel) },
    ...{ class: "set-icon navbar-bg-hover" },
    title: (__VLS_ctx.t('buttons.pureOpenSystemSet')),
});
/** @type {__VLS_StyleScopedClasses['set-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-bg-hover']} */ ;
let __VLS_98;
/** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
IconifyIconOffline;
// @ts-ignore
const __VLS_99 = __VLS_asFunctionalComponent1(__VLS_98, new __VLS_98({
    icon: (__VLS_ctx.Setting),
}));
const __VLS_100 = __VLS_99({
    icon: (__VLS_ctx.Setting),
}, ...__VLS_functionalComponentArgsRest(__VLS_99));
// @ts-ignore
var __VLS_6 = __VLS_5;
// @ts-ignore
[t, onPanel, Setting,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=NavHorizontal.vue.js.map