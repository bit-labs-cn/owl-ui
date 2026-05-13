/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { isEqual } from "@pureadmin/utils";
import { transformI18n } from "@bit-labs.cn/owl-ui/plugins/i18n";
import { useRoute, useRouter } from "vue-router";
import { ref, watch, onMounted, toRaw } from "vue";
import { getParentPaths, findRouteByPath } from "@bit-labs.cn/owl-ui/router/utils";
import { useMultiTagsStoreHook } from "@bit-labs.cn/owl-ui/store/modules/multiTags";
const route = useRoute();
const levelList = ref([]);
const router = useRouter();
const routes = router.options.routes;
const multiTags = useMultiTagsStoreHook().multiTags;
const getBreadcrumb = () => {
    // 当前路由信息
    let currentRoute;
    if (Object.keys(route.query).length > 0) {
        multiTags.forEach(item => {
            if (isEqual(route.query, item?.query)) {
                currentRoute = toRaw(item);
            }
        });
    }
    else if (Object.keys(route.params).length > 0) {
        multiTags.forEach(item => {
            if (isEqual(route.params, item?.params)) {
                currentRoute = toRaw(item);
            }
        });
    }
    else {
        currentRoute = findRouteByPath(router.currentRoute.value.path, routes);
    }
    // 当前路由的父级路径组成的数组
    const parentRoutes = getParentPaths(router.currentRoute.value.name, routes, "name");
    // 存放组成面包屑的数组
    const matched = [];
    // 获取每个父级路径对应的路由信息
    parentRoutes.forEach(path => {
        if (path !== "/")
            matched.push(findRouteByPath(path, routes));
    });
    matched.push(currentRoute);
    matched.forEach((item, index) => {
        if (currentRoute?.query || currentRoute?.params)
            return;
        if (item?.children) {
            item.children.forEach(v => {
                if (v?.meta?.title === item?.meta?.title) {
                    matched.splice(index, 1);
                }
            });
        }
    });
    levelList.value = matched.filter(item => item?.meta && item?.meta.title !== false);
};
const handleLink = item => {
    const { redirect, name, path } = item;
    if (redirect) {
        router.push(redirect);
    }
    else {
        if (name) {
            if (item.query) {
                router.push({
                    name,
                    query: item.query
                });
            }
            else if (item.params) {
                router.push({
                    name,
                    params: item.params
                });
            }
            else {
                router.push({ name });
            }
        }
        else {
            router.push({ path });
        }
    }
};
onMounted(() => {
    getBreadcrumb();
});
watch(() => route.path, () => {
    getBreadcrumb();
}, {
    deep: true
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elBreadcrumb | typeof __VLS_components.ElBreadcrumb | typeof __VLS_components['el-breadcrumb'] | typeof __VLS_components.elBreadcrumb | typeof __VLS_components.ElBreadcrumb | typeof __VLS_components['el-breadcrumb']} */
elBreadcrumb;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ class: "!leading-[50px] select-none" },
    separator: "/",
}));
const __VLS_2 = __VLS_1({
    ...{ class: "!leading-[50px] select-none" },
    separator: "/",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
/** @type {__VLS_StyleScopedClasses['!leading-[50px]']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.transitionGroup | typeof __VLS_components.TransitionGroup | typeof __VLS_components['transition-group'] | typeof __VLS_components.transitionGroup | typeof __VLS_components.TransitionGroup | typeof __VLS_components['transition-group']} */
transitionGroup;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    name: "breadcrumb",
}));
const __VLS_9 = __VLS_8({
    name: "breadcrumb",
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const { default: __VLS_12 } = __VLS_10.slots;
for (const [item] of __VLS_vFor((__VLS_ctx.levelList))) {
    let __VLS_13;
    /** @ts-ignore @type { | typeof __VLS_components.elBreadcrumbItem | typeof __VLS_components.ElBreadcrumbItem | typeof __VLS_components['el-breadcrumb-item'] | typeof __VLS_components.elBreadcrumbItem | typeof __VLS_components.ElBreadcrumbItem | typeof __VLS_components['el-breadcrumb-item']} */
    elBreadcrumbItem;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
        key: (item.path),
        ...{ class: "!inline !items-stretch" },
    }));
    const __VLS_15 = __VLS_14({
        key: (item.path),
        ...{ class: "!inline !items-stretch" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    /** @type {__VLS_StyleScopedClasses['!inline']} */ ;
    /** @type {__VLS_StyleScopedClasses['!items-stretch']} */ ;
    const { default: __VLS_18 } = __VLS_16.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.handleLink(item);
                // @ts-ignore
                [levelList, handleLink,];
            } },
    });
    (__VLS_ctx.transformI18n(item.meta.title));
    // @ts-ignore
    [transformI18n,];
    var __VLS_16;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_10;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=SidebarBreadCrumb.vue.js.map