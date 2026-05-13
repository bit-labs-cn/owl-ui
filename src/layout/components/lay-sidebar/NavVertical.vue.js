/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { useRoute } from "vue-router";
import { emitter } from "@bit-labs.cn/owl-ui/utils/mitt";
import { useNav } from "@bit-labs.cn/owl-ui/layout/hooks/useNav";
import { responsiveStorageNameSpace } from "@bit-labs.cn/owl-ui/config";
import { storageLocal, isAllEmpty } from "@pureadmin/utils";
import { findRouteByPath, getParentPaths } from "@bit-labs.cn/owl-ui/router/utils";
import { usePermissionStoreHook } from "@bit-labs.cn/owl-ui/store/modules/permission";
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import LaySidebarLogo from "../lay-sidebar/components/SidebarLogo.vue";
import LaySidebarItem from "../lay-sidebar/components/SidebarItem.vue";
import LaySidebarLeftCollapse from "../lay-sidebar/components/SidebarLeftCollapse.vue";
import LaySidebarCenterCollapse from "../lay-sidebar/components/SidebarCenterCollapse.vue";
const route = useRoute();
const isShow = ref(false);
const showLogo = ref(storageLocal().getItem(`${responsiveStorageNameSpace()}configure`)?.showLogo ?? true);
const { device, pureApp, isCollapse, tooltipEffect, menuSelect, toggleSideBar } = useNav();
const subMenuData = ref([]);
const menuData = computed(() => {
    return pureApp.layout === "mix" && device.value !== "mobile"
        ? subMenuData.value
        : usePermissionStoreHook().wholeMenus;
});
const loading = computed(() => pureApp.layout === "mix" ? false : menuData.value.length === 0 ? true : false);
const defaultActive = computed(() => !isAllEmpty(route.meta?.activePath) ? route.meta.activePath : route.path);
function getSubMenuData() {
    let path = "";
    path = defaultActive.value;
    subMenuData.value = [];
    // path的上级路由组成的数组
    const parentPathArr = getParentPaths(path, usePermissionStoreHook().wholeMenus);
    // 当前路由的父级路由信息
    const parenetRoute = findRouteByPath(parentPathArr[0] || path, usePermissionStoreHook().wholeMenus);
    if (!parenetRoute?.children)
        return;
    subMenuData.value = parenetRoute?.children;
}
watch(() => [route.path, usePermissionStoreHook().wholeMenus], () => {
    if (route.path.includes("/redirect"))
        return;
    getSubMenuData();
    menuSelect(route.path);
});
onMounted(() => {
    getSubMenuData();
    emitter.on("logoChange", key => {
        showLogo.value = key;
    });
});
onBeforeUnmount(() => {
    // 解绑`logoChange`公共事件，防止多次触发
    emitter.off("logoChange");
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onMouseenter: (...[$event]) => {
            __VLS_ctx.isShow = true;
            // @ts-ignore
            [isShow,];
        } },
    ...{ onMouseleave: (...[$event]) => {
            __VLS_ctx.isShow = false;
            // @ts-ignore
            [isShow,];
        } },
    ...{ class: (['sidebar-container', __VLS_ctx.showLogo ? 'has-logo' : 'no-logo']) },
});
__VLS_asFunctionalDirective(__VLS_directives.vLoading, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
/** @type {__VLS_StyleScopedClasses['sidebar-container']} */ ;
if (__VLS_ctx.showLogo) {
    const __VLS_0 = LaySidebarLogo;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        collapse: (__VLS_ctx.isCollapse),
    }));
    const __VLS_2 = __VLS_1({
        collapse: (__VLS_ctx.isCollapse),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
let __VLS_5;
/** @ts-ignore @type { | typeof __VLS_components.elScrollbar | typeof __VLS_components.ElScrollbar | typeof __VLS_components['el-scrollbar'] | typeof __VLS_components.elScrollbar | typeof __VLS_components.ElScrollbar | typeof __VLS_components['el-scrollbar']} */
elScrollbar;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
    wrapClass: "scrollbar-wrapper",
    ...{ class: ([__VLS_ctx.device === 'mobile' ? 'mobile' : 'pc']) },
}));
const __VLS_7 = __VLS_6({
    wrapClass: "scrollbar-wrapper",
    ...{ class: ([__VLS_ctx.device === 'mobile' ? 'mobile' : 'pc']) },
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_10 } = __VLS_8.slots;
let __VLS_11;
/** @ts-ignore @type { | typeof __VLS_components.elMenu | typeof __VLS_components.ElMenu | typeof __VLS_components['el-menu'] | typeof __VLS_components.elMenu | typeof __VLS_components.ElMenu | typeof __VLS_components['el-menu']} */
elMenu;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
    uniqueOpened: true,
    mode: "vertical",
    popperClass: "pure-scrollbar",
    ...{ class: "outer-most select-none" },
    collapse: (__VLS_ctx.isCollapse),
    collapseTransition: (false),
    popperEffect: (__VLS_ctx.tooltipEffect),
    defaultActive: (__VLS_ctx.defaultActive),
}));
const __VLS_13 = __VLS_12({
    uniqueOpened: true,
    mode: "vertical",
    popperClass: "pure-scrollbar",
    ...{ class: "outer-most select-none" },
    collapse: (__VLS_ctx.isCollapse),
    collapseTransition: (false),
    popperEffect: (__VLS_ctx.tooltipEffect),
    defaultActive: (__VLS_ctx.defaultActive),
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
/** @type {__VLS_StyleScopedClasses['outer-most']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
const { default: __VLS_16 } = __VLS_14.slots;
for (const [routes] of __VLS_vFor((__VLS_ctx.menuData))) {
    const __VLS_17 = LaySidebarItem;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
        key: (routes.path),
        item: (routes),
        basePath: (routes.path),
        ...{ class: "outer-most select-none" },
    }));
    const __VLS_19 = __VLS_18({
        key: (routes.path),
        item: (routes),
        basePath: (routes.path),
        ...{ class: "outer-most select-none" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    /** @type {__VLS_StyleScopedClasses['outer-most']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    // @ts-ignore
    [showLogo, showLogo, vLoading, loading, isCollapse, isCollapse, device, tooltipEffect, defaultActive, menuData,];
}
// @ts-ignore
[];
var __VLS_14;
// @ts-ignore
[];
var __VLS_8;
if (__VLS_ctx.device !== 'mobile' && (__VLS_ctx.isShow || __VLS_ctx.isCollapse)) {
    const __VLS_22 = LaySidebarCenterCollapse;
    // @ts-ignore
    const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({
        ...{ 'onToggleClick': {} },
        isActive: (__VLS_ctx.pureApp.sidebar.opened),
    }));
    const __VLS_24 = __VLS_23({
        ...{ 'onToggleClick': {} },
        isActive: (__VLS_ctx.pureApp.sidebar.opened),
    }, ...__VLS_functionalComponentArgsRest(__VLS_23));
    let __VLS_27;
    const __VLS_28 = ({ toggleClick: {} },
        { onToggleClick: (__VLS_ctx.toggleSideBar) });
    var __VLS_25;
    var __VLS_26;
}
if (__VLS_ctx.device !== 'mobile') {
    const __VLS_29 = LaySidebarLeftCollapse;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
        ...{ 'onToggleClick': {} },
        isActive: (__VLS_ctx.pureApp.sidebar.opened),
    }));
    const __VLS_31 = __VLS_30({
        ...{ 'onToggleClick': {} },
        isActive: (__VLS_ctx.pureApp.sidebar.opened),
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    let __VLS_34;
    const __VLS_35 = ({ toggleClick: {} },
        { onToggleClick: (__VLS_ctx.toggleSideBar) });
    var __VLS_32;
    var __VLS_33;
}
// @ts-ignore
[isShow, isCollapse, device, device, pureApp, pureApp, toggleSideBar, toggleSideBar,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=NavVertical.vue.js.map