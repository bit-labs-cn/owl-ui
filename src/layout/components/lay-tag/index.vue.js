/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { $t } from "@bit-labs.cn/owl-ui/plugins/i18n";
import { emitter } from "@bit-labs.cn/owl-ui/utils/mitt";
import { useTags } from "../../hooks/useTag";
import { routerArrays } from "@bit-labs.cn/owl-ui/layout/types";
import { onClickOutside } from "@vueuse/core";
import TagChrome from "./components/TagChrome.vue";
import { handleAliveRoute, getTopMenu } from "@bit-labs.cn/owl-ui/router/utils";
import { useSettingStoreHook } from "@bit-labs.cn/owl-ui/store/modules/settings";
import { useMultiTagsStoreHook } from "@bit-labs.cn/owl-ui/store/modules/multiTags";
import { usePermissionStoreHook } from "@bit-labs.cn/owl-ui/store/modules/permission";
import { ref, watch, unref, toRaw, nextTick, onBeforeUnmount } from "vue";
import { delay, isEqual, isAllEmpty, useResizeObserver } from "@pureadmin/utils";
import ExitFullscreen from "@iconify-icons/ri/fullscreen-exit-fill";
import Fullscreen from "@iconify-icons/ri/fullscreen-fill";
import ArrowDown from "@iconify-icons/ri/arrow-down-s-line";
import ArrowRightSLine from "@iconify-icons/ri/arrow-right-s-line";
import ArrowLeftSLine from "@iconify-icons/ri/arrow-left-s-line";
const { Close, route, router, visible, showTags, instance, multiTags, tagsViews, buttonTop, buttonLeft, showModel, translateX, isFixedTag, pureSetting, activeIndex, getTabStyle, isScrolling, iconIsActive, linkIsActive, currentSelect, scheduleIsActive, getContextMenuStyle, closeMenu, onMounted, onMouseenter, onMouseleave, transformI18n, onContentFullScreen } = useTags();
const tabDom = ref();
const containerDom = ref();
const scrollbarDom = ref();
const contextmenuRef = ref();
const isShowArrow = ref(false);
const topPath = getTopMenu()?.path;
const { VITE_HIDE_HOME } = import.meta.env;
const fixedTags = [
    ...routerArrays,
    ...usePermissionStoreHook().flatteningRoutes.filter(v => v?.meta?.fixedTag)
];
const dynamicTagView = async () => {
    await nextTick();
    const index = multiTags.value.findIndex(item => {
        if (!isAllEmpty(route.query)) {
            return isEqual(route.query, item.query);
        }
        else if (!isAllEmpty(route.params)) {
            return isEqual(route.params, item.params);
        }
        else {
            return route.path === item.path;
        }
    });
    moveToView(index);
};
const moveToView = async (index) => {
    await nextTick();
    const tabNavPadding = 10;
    if (!instance.refs["dynamic" + index])
        return;
    const tabItemEl = instance.refs["dynamic" + index][0];
    const tabItemElOffsetLeft = tabItemEl?.offsetLeft;
    const tabItemOffsetWidth = tabItemEl?.offsetWidth;
    // 标签页导航栏可视长度（不包含溢出部分）
    const scrollbarDomWidth = scrollbarDom.value
        ? scrollbarDom.value?.offsetWidth
        : 0;
    // 已有标签页总长度（包含溢出部分）
    const tabDomWidth = tabDom.value ? tabDom.value?.offsetWidth : 0;
    scrollbarDomWidth <= tabDomWidth
        ? (isShowArrow.value = true)
        : (isShowArrow.value = false);
    if (tabDomWidth < scrollbarDomWidth || tabItemElOffsetLeft === 0) {
        translateX.value = 0;
    }
    else if (tabItemElOffsetLeft < -translateX.value) {
        // 标签在可视区域左侧
        translateX.value = -tabItemElOffsetLeft + tabNavPadding;
    }
    else if (tabItemElOffsetLeft > -translateX.value &&
        tabItemElOffsetLeft + tabItemOffsetWidth <
            -translateX.value + scrollbarDomWidth) {
        // 标签在可视区域
        translateX.value = Math.min(0, scrollbarDomWidth -
            tabItemOffsetWidth -
            tabItemElOffsetLeft -
            tabNavPadding);
    }
    else {
        // 标签在可视区域右侧
        translateX.value = -(tabItemElOffsetLeft -
            (scrollbarDomWidth - tabNavPadding - tabItemOffsetWidth));
    }
};
const handleScroll = (offset) => {
    const scrollbarDomWidth = scrollbarDom.value
        ? scrollbarDom.value?.offsetWidth
        : 0;
    const tabDomWidth = tabDom.value ? tabDom.value.offsetWidth : 0;
    if (offset > 0) {
        translateX.value = Math.min(0, translateX.value + offset);
    }
    else {
        if (scrollbarDomWidth < tabDomWidth) {
            if (translateX.value >= -(tabDomWidth - scrollbarDomWidth)) {
                translateX.value = Math.max(translateX.value + offset, scrollbarDomWidth - tabDomWidth);
            }
        }
        else {
            translateX.value = 0;
        }
    }
    isScrolling.value = false;
};
const handleWheel = (event) => {
    isScrolling.value = true;
    const scrollIntensity = Math.abs(event.deltaX) + Math.abs(event.deltaY);
    let offset = 0;
    if (event.deltaX < 0) {
        offset = scrollIntensity > 0 ? scrollIntensity : 100;
    }
    else {
        offset = scrollIntensity > 0 ? -scrollIntensity : -100;
    }
    smoothScroll(offset);
};
const smoothScroll = (offset) => {
    // 每帧滚动的距离
    const scrollAmount = 20;
    let remaining = Math.abs(offset);
    const scrollStep = () => {
        const scrollOffset = Math.sign(offset) * Math.min(scrollAmount, remaining);
        handleScroll(scrollOffset);
        remaining -= Math.abs(scrollOffset);
        if (remaining > 0) {
            requestAnimationFrame(scrollStep);
        }
    };
    requestAnimationFrame(scrollStep);
};
function dynamicRouteTag(value) {
    const hasValue = multiTags.value.some(item => {
        return item.path === value;
    });
    function concatPath(arr, value) {
        if (!hasValue) {
            arr.forEach((arrItem) => {
                if (arrItem.path === value) {
                    useMultiTagsStoreHook().handleTags("push", {
                        path: value,
                        meta: arrItem.meta,
                        name: arrItem.name
                    });
                }
                else {
                    if (arrItem.children && arrItem.children.length > 0) {
                        concatPath(arrItem.children, value);
                    }
                }
            });
        }
    }
    concatPath(router.options.routes, value);
}
/** 刷新路由 */
function onFresh() {
    const { fullPath, query } = unref(route);
    router.replace({
        path: "/redirect" + fullPath,
        query
    });
    handleAliveRoute(route, "refresh");
}
function deleteDynamicTag(obj, current, tag) {
    const valueIndex = multiTags.value.findIndex((item) => {
        if (item.query) {
            if (item.path === obj.path) {
                return item.query === obj.query;
            }
        }
        else if (item.params) {
            if (item.path === obj.path) {
                return item.params === obj.params;
            }
        }
        else {
            return item.path === obj.path;
        }
    });
    const spliceRoute = (startIndex, length, other) => {
        if (other) {
            useMultiTagsStoreHook().handleTags("equal", [
                VITE_HIDE_HOME === "false" ? fixedTags : toRaw(getTopMenu()),
                obj
            ].flat());
        }
        else {
            useMultiTagsStoreHook().handleTags("splice", "", {
                startIndex,
                length
            });
        }
        dynamicTagView();
    };
    if (tag === "other") {
        spliceRoute(1, 1, true);
    }
    else if (tag === "left") {
        spliceRoute(fixedTags.length, valueIndex - 1, true);
    }
    else if (tag === "right") {
        spliceRoute(valueIndex + 1, multiTags.value.length);
    }
    else {
        // 从当前匹配到的路径中删除
        spliceRoute(valueIndex, 1);
    }
    const newRoute = useMultiTagsStoreHook().handleTags("slice");
    if (current === route.path) {
        // 如果删除当前激活tag就自动切换到最后一个tag
        if (tag === "left")
            return;
        if (newRoute[0]?.query) {
            router.push({ name: newRoute[0].name, query: newRoute[0].query });
        }
        else if (newRoute[0]?.params) {
            router.push({ name: newRoute[0].name, params: newRoute[0].params });
        }
        else {
            router.push({ path: newRoute[0].path });
        }
    }
    else {
        if (!multiTags.value.length)
            return;
        if (multiTags.value.some(item => item.path === route.path))
            return;
        if (newRoute[0]?.query) {
            router.push({ name: newRoute[0].name, query: newRoute[0].query });
        }
        else if (newRoute[0]?.params) {
            router.push({ name: newRoute[0].name, params: newRoute[0].params });
        }
        else {
            router.push({ path: newRoute[0].path });
        }
    }
}
function deleteMenu(item, tag) {
    deleteDynamicTag(item, item.path, tag);
    handleAliveRoute(route);
}
function onClickDrop(key, item, selectRoute) {
    if (item && item.disabled)
        return;
    let selectTagRoute;
    if (selectRoute) {
        selectTagRoute = {
            path: selectRoute.path,
            meta: selectRoute.meta,
            name: selectRoute.name,
            query: selectRoute?.query,
            params: selectRoute?.params
        };
    }
    else {
        selectTagRoute = { path: route.path, meta: route.meta };
    }
    // 当前路由信息
    switch (key) {
        case 0:
            // 刷新路由
            onFresh();
            break;
        case 1:
            // 关闭当前标签页
            deleteMenu(selectTagRoute);
            break;
        case 2:
            // 关闭左侧标签页
            deleteMenu(selectTagRoute, "left");
            break;
        case 3:
            // 关闭右侧标签页
            deleteMenu(selectTagRoute, "right");
            break;
        case 4:
            // 关闭其他标签页
            deleteMenu(selectTagRoute, "other");
            break;
        case 5:
            // 关闭全部标签页
            useMultiTagsStoreHook().handleTags("splice", "", {
                startIndex: fixedTags.length,
                length: multiTags.value.length
            });
            router.push(topPath);
            // router.push(fixedTags[fixedTags.length - 1]?.path);
            handleAliveRoute(route);
            break;
        case 6:
            // 内容区全屏
            onContentFullScreen();
            setTimeout(() => {
                if (pureSetting.hiddenSideBar) {
                    tagsViews[6].icon = ExitFullscreen;
                    tagsViews[6].text = $t("buttons.pureContentExitFullScreen");
                }
                else {
                    tagsViews[6].icon = Fullscreen;
                    tagsViews[6].text = $t("buttons.pureContentFullScreen");
                }
            }, 100);
            break;
    }
    setTimeout(() => {
        showMenuModel(route.fullPath, route.query);
    });
}
function handleCommand(command) {
    const { key, item } = command;
    onClickDrop(key, item);
}
/** 触发右键中菜单的点击事件 */
function selectTag(key, item) {
    closeMenu();
    onClickDrop(key, item, currentSelect.value);
}
function showMenus(value) {
    Array.of(1, 2, 3, 4, 5).forEach(v => {
        tagsViews[v].show = value;
    });
}
function disabledMenus(value, fixedTag = false) {
    Array.of(1, 2, 3, 4, 5).forEach(v => {
        tagsViews[v].disabled = value;
    });
    if (fixedTag) {
        tagsViews[2].show = false;
        tagsViews[2].disabled = true;
    }
}
/** 检查当前右键的菜单两边是否存在别的菜单，如果左侧的菜单是顶级菜单，则不显示关闭左侧标签页，如果右侧没有菜单，则不显示关闭右侧标签页 */
function showMenuModel(currentPath, query = {}, refresh = false) {
    const allRoute = multiTags.value;
    const routeLength = multiTags.value.length;
    let currentIndex = -1;
    if (isAllEmpty(query)) {
        currentIndex = allRoute.findIndex(v => v.path === currentPath);
    }
    else {
        currentIndex = allRoute.findIndex(v => isEqual(v.query, query));
    }
    function fixedTagDisabled() {
        if (allRoute[currentIndex]?.meta?.fixedTag) {
            Array.of(1, 2, 3, 4, 5).forEach(v => {
                tagsViews[v].disabled = true;
            });
        }
    }
    showMenus(true);
    if (refresh) {
        tagsViews[0].show = true;
    }
    /**
     * currentIndex为1时，左侧的菜单顶级菜单，则不显示关闭左侧标签页
     * 如果currentIndex等于routeLength-1，右侧没有菜单，则不显示关闭右侧标签页
     */
    if (currentIndex === 1 && routeLength !== 2) {
        // 左侧的菜单是顶级菜单，右侧存在别的菜单
        tagsViews[2].show = false;
        Array.of(1, 3, 4, 5).forEach(v => {
            tagsViews[v].disabled = false;
        });
        tagsViews[2].disabled = true;
        fixedTagDisabled();
    }
    else if (currentIndex === 1 && routeLength === 2) {
        disabledMenus(false);
        // 左侧的菜单是顶级菜单，右侧不存在别的菜单
        Array.of(2, 3, 4).forEach(v => {
            tagsViews[v].show = false;
            tagsViews[v].disabled = true;
        });
        fixedTagDisabled();
    }
    else if (routeLength - 1 === currentIndex && currentIndex !== 0) {
        // 当前路由是所有路由中的最后一个
        tagsViews[3].show = false;
        Array.of(1, 2, 4, 5).forEach(v => {
            tagsViews[v].disabled = false;
        });
        tagsViews[3].disabled = true;
        if (allRoute[currentIndex - 1]?.meta?.fixedTag) {
            tagsViews[2].show = false;
            tagsViews[2].disabled = true;
        }
        fixedTagDisabled();
    }
    else if (currentIndex === 0 || currentPath === `/redirect${topPath}`) {
        // 当前路由为顶级菜单
        disabledMenus(true);
    }
    else {
        disabledMenus(false, allRoute[currentIndex - 1]?.meta?.fixedTag);
        fixedTagDisabled();
    }
}
function openMenu(tag, e) {
    closeMenu();
    if (tag.path === topPath || tag?.meta?.fixedTag) {
        // 右键菜单为顶级菜单或拥有 fixedTag 属性，只显示刷新
        showMenus(false);
        tagsViews[0].show = true;
    }
    else if (route.path !== tag.path && route.name !== tag.name) {
        // 右键菜单不匹配当前路由，隐藏刷新
        tagsViews[0].show = false;
        showMenuModel(tag.path, tag.query);
    }
    else if (multiTags.value.length === 2 && route.path !== tag.path) {
        showMenus(true);
        // 只有两个标签时不显示关闭其他标签页
        tagsViews[4].show = false;
    }
    else if (route.path === tag.path) {
        // 右键当前激活的菜单
        showMenuModel(tag.path, tag.query, true);
    }
    currentSelect.value = tag;
    const menuMinWidth = 140;
    const offsetLeft = unref(containerDom).getBoundingClientRect().left;
    const offsetWidth = unref(containerDom).offsetWidth;
    const maxLeft = offsetWidth - menuMinWidth;
    const left = e.clientX - offsetLeft + 5;
    if (left > maxLeft) {
        buttonLeft.value = maxLeft;
    }
    else {
        buttonLeft.value = left;
    }
    useSettingStoreHook().hiddenSideBar
        ? (buttonTop.value = e.clientY)
        : (buttonTop.value = e.clientY - 40);
    nextTick(() => {
        visible.value = true;
    });
}
/** 触发tags标签切换 */
function tagOnClick(item) {
    const { name, path } = item;
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
onClickOutside(contextmenuRef, closeMenu, {
    detectIframe: true
});
watch(route, () => {
    activeIndex.value = -1;
    dynamicTagView();
});
onMounted(() => {
    if (!instance)
        return;
    // 根据当前路由初始化操作标签页的禁用状态
    showMenuModel(route.fullPath);
    // 触发隐藏标签页
    emitter.on("tagViewsChange", (key) => {
        if (unref(showTags) === key)
            return;
        showTags.value = key;
    });
    // 改变标签风格
    emitter.on("tagViewsShowModel", key => {
        showModel.value = key;
    });
    //  接收侧边栏切换传递过来的参数
    emitter.on("changLayoutRoute", indexPath => {
        dynamicRouteTag(indexPath);
        setTimeout(() => {
            showMenuModel(indexPath);
        });
    });
    useResizeObserver(scrollbarDom, dynamicTagView);
    delay().then(() => dynamicTagView());
});
onBeforeUnmount(() => {
    // 解绑`tagViewsChange`、`tagViewsShowModel`、`changLayoutRoute`公共事件，防止多次触发
    emitter.off("tagViewsChange");
    emitter.off("tagViewsShowModel");
    emitter.off("changLayoutRoute");
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
if (!__VLS_ctx.showTags) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ref: "containerDom",
        ...{ class: "tags-view" },
    });
    /** @type {__VLS_StyleScopedClasses['tags-view']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "arrow-left" },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vShow, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.isShowArrow) }, null, null);
    /** @type {__VLS_StyleScopedClasses['arrow-left']} */ ;
    let __VLS_0;
    /** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
    IconifyIconOffline;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        ...{ 'onClick': {} },
        icon: (__VLS_ctx.ArrowLeftSLine),
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onClick': {} },
        icon: (__VLS_ctx.ArrowLeftSLine),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_5;
    const __VLS_6 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(!__VLS_ctx.showTags))
                    return;
                __VLS_ctx.handleScroll(200);
                // @ts-ignore
                [showTags, isShowArrow, ArrowLeftSLine, handleScroll,];
            } });
    var __VLS_3;
    var __VLS_4;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onWheel: (__VLS_ctx.handleWheel) },
        ref: "scrollbarDom",
        ...{ class: "scroll-container" },
        ...{ class: (__VLS_ctx.showModel === 'chrome' && 'chrome-scroll-container') },
    });
    /** @type {__VLS_StyleScopedClasses['scroll-container']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ref: "tabDom",
        ...{ class: "tab select-none" },
        ...{ style: (__VLS_ctx.getTabStyle) },
    });
    /** @type {__VLS_StyleScopedClasses['tab']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    for (const [item, index] of __VLS_vFor((__VLS_ctx.multiTags))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ onContextmenu: (...[$event]) => {
                    if (!(!__VLS_ctx.showTags))
                        return;
                    __VLS_ctx.openMenu(item, $event);
                    // @ts-ignore
                    [handleWheel, showModel, getTabStyle, multiTags, openMenu,];
                } },
            ...{ onMouseenter: (...[$event]) => {
                    if (!(!__VLS_ctx.showTags))
                        return;
                    __VLS_ctx.onMouseenter(index);
                    // @ts-ignore
                    [onMouseenter,];
                } },
            ...{ onMouseleave: (...[$event]) => {
                    if (!(!__VLS_ctx.showTags))
                        return;
                    __VLS_ctx.onMouseleave(index);
                    // @ts-ignore
                    [onMouseleave,];
                } },
            ...{ onClick: (...[$event]) => {
                    if (!(!__VLS_ctx.showTags))
                        return;
                    __VLS_ctx.tagOnClick(item);
                    // @ts-ignore
                    [tagOnClick,];
                } },
            ref: ('dynamic' + index),
            key: (index),
            ...{ class: ([
                    'scroll-item is-closable',
                    __VLS_ctx.linkIsActive(item),
                    __VLS_ctx.showModel === 'chrome' && 'chrome-item',
                    __VLS_ctx.isFixedTag(item) && 'fixed-tag'
                ]) },
        });
        /** @type {__VLS_StyleScopedClasses['scroll-item']} */ ;
        /** @type {__VLS_StyleScopedClasses['is-closable']} */ ;
        if (__VLS_ctx.showModel !== 'chrome') {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "tag-title dark:!text-text_color_primary dark:hover:!text-primary" },
            });
            /** @type {__VLS_StyleScopedClasses['tag-title']} */ ;
            /** @type {__VLS_StyleScopedClasses['dark:!text-text_color_primary']} */ ;
            /** @type {__VLS_StyleScopedClasses['dark:hover:!text-primary']} */ ;
            (__VLS_ctx.transformI18n(item.meta.title));
            if (__VLS_ctx.isFixedTag(item)
                ? false
                : __VLS_ctx.iconIsActive(item, index) ||
                    (index === __VLS_ctx.activeIndex && index !== 0)) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                    ...{ onClick: (...[$event]) => {
                            if (!(!__VLS_ctx.showTags))
                                return;
                            if (!(__VLS_ctx.showModel !== 'chrome'))
                                return;
                            if (!(__VLS_ctx.isFixedTag(item)
                                ? false
                                : __VLS_ctx.iconIsActive(item, index) ||
                                    (index === __VLS_ctx.activeIndex && index !== 0)))
                                return;
                            __VLS_ctx.deleteMenu(item);
                            // @ts-ignore
                            [showModel, showModel, linkIsActive, isFixedTag, isFixedTag, transformI18n, iconIsActive, activeIndex, deleteMenu,];
                        } },
                    ...{ class: "el-icon-close" },
                });
                /** @type {__VLS_StyleScopedClasses['el-icon-close']} */ ;
                let __VLS_7;
                /** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
                IconifyIconOffline;
                // @ts-ignore
                const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
                    icon: (__VLS_ctx.Close),
                }));
                const __VLS_9 = __VLS_8({
                    icon: (__VLS_ctx.Close),
                }, ...__VLS_functionalComponentArgsRest(__VLS_8));
            }
            if (__VLS_ctx.showModel !== 'card') {
                __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
                    ref: ('schedule' + index),
                    ...{ class: ([__VLS_ctx.scheduleIsActive(item)]) },
                });
            }
        }
        else {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "chrome-tab" },
            });
            /** @type {__VLS_StyleScopedClasses['chrome-tab']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "chrome-tab__bg" },
            });
            /** @type {__VLS_StyleScopedClasses['chrome-tab__bg']} */ ;
            const __VLS_12 = TagChrome;
            // @ts-ignore
            const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({}));
            const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "tag-title" },
            });
            /** @type {__VLS_StyleScopedClasses['tag-title']} */ ;
            (__VLS_ctx.transformI18n(item.meta.title));
            if (__VLS_ctx.isFixedTag(item) ? false : index !== 0) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                    ...{ onClick: (...[$event]) => {
                            if (!(!__VLS_ctx.showTags))
                                return;
                            if (!!(__VLS_ctx.showModel !== 'chrome'))
                                return;
                            if (!(__VLS_ctx.isFixedTag(item) ? false : index !== 0))
                                return;
                            __VLS_ctx.deleteMenu(item);
                            // @ts-ignore
                            [showModel, isFixedTag, transformI18n, deleteMenu, Close, scheduleIsActive,];
                        } },
                    ...{ class: "chrome-close-btn" },
                });
                /** @type {__VLS_StyleScopedClasses['chrome-close-btn']} */ ;
                let __VLS_17;
                /** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
                IconifyIconOffline;
                // @ts-ignore
                const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
                    icon: (__VLS_ctx.Close),
                }));
                const __VLS_19 = __VLS_18({
                    icon: (__VLS_ctx.Close),
                }, ...__VLS_functionalComponentArgsRest(__VLS_18));
            }
            __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
                ...{ class: "chrome-tab-divider" },
            });
            /** @type {__VLS_StyleScopedClasses['chrome-tab-divider']} */ ;
        }
        // @ts-ignore
        [Close,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "arrow-right" },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vShow, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.isShowArrow) }, null, null);
    /** @type {__VLS_StyleScopedClasses['arrow-right']} */ ;
    let __VLS_22;
    /** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
    IconifyIconOffline;
    // @ts-ignore
    const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({
        ...{ 'onClick': {} },
        icon: (__VLS_ctx.ArrowRightSLine),
    }));
    const __VLS_24 = __VLS_23({
        ...{ 'onClick': {} },
        icon: (__VLS_ctx.ArrowRightSLine),
    }, ...__VLS_functionalComponentArgsRest(__VLS_23));
    let __VLS_27;
    const __VLS_28 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(!__VLS_ctx.showTags))
                    return;
                __VLS_ctx.handleScroll(-200);
                // @ts-ignore
                [isShowArrow, handleScroll, ArrowRightSLine,];
            } });
    var __VLS_25;
    var __VLS_26;
    let __VLS_29;
    /** @ts-ignore @type { | typeof __VLS_components.transition | typeof __VLS_components.Transition | typeof __VLS_components.transition | typeof __VLS_components.Transition} */
    transition;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
        name: "el-zoom-in-top",
    }));
    const __VLS_31 = __VLS_30({
        name: "el-zoom-in-top",
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    const { default: __VLS_34 } = __VLS_32.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
        ref: "contextmenuRef",
        key: (Math.random()),
        ...{ style: (__VLS_ctx.getContextMenuStyle) },
        ...{ class: "contextmenu" },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vShow, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.visible) }, null, null);
    /** @type {__VLS_StyleScopedClasses['contextmenu']} */ ;
    for (const [item, key] of __VLS_vFor((__VLS_ctx.tagsViews.slice(0, 6)))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (key),
            ...{ style: {} },
        });
        if (item.show) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
                ...{ onClick: (...[$event]) => {
                        if (!(!__VLS_ctx.showTags))
                            return;
                        if (!(item.show))
                            return;
                        __VLS_ctx.selectTag(key, item);
                        // @ts-ignore
                        [getContextMenuStyle, visible, tagsViews, selectTag,];
                    } },
            });
            let __VLS_35;
            /** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
            IconifyIconOffline;
            // @ts-ignore
            const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
                icon: (item.icon),
            }));
            const __VLS_37 = __VLS_36({
                icon: (item.icon),
            }, ...__VLS_functionalComponentArgsRest(__VLS_36));
            (__VLS_ctx.transformI18n(item.text));
        }
        // @ts-ignore
        [transformI18n,];
    }
    // @ts-ignore
    [];
    var __VLS_32;
    let __VLS_40;
    /** @ts-ignore @type { | typeof __VLS_components.elDropdown | typeof __VLS_components.ElDropdown | typeof __VLS_components['el-dropdown'] | typeof __VLS_components.elDropdown | typeof __VLS_components.ElDropdown | typeof __VLS_components['el-dropdown']} */
    elDropdown;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({
        ...{ 'onCommand': {} },
        trigger: "click",
        placement: "bottom-end",
    }));
    const __VLS_42 = __VLS_41({
        ...{ 'onCommand': {} },
        trigger: "click",
        placement: "bottom-end",
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    let __VLS_45;
    const __VLS_46 = ({ command: {} },
        { onCommand: (__VLS_ctx.handleCommand) });
    const { default: __VLS_47 } = __VLS_43.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "arrow-down" },
    });
    /** @type {__VLS_StyleScopedClasses['arrow-down']} */ ;
    let __VLS_48;
    /** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
    IconifyIconOffline;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
        icon: (__VLS_ctx.ArrowDown),
        ...{ class: "dark:text-white" },
    }));
    const __VLS_50 = __VLS_49({
        icon: (__VLS_ctx.ArrowDown),
        ...{ class: "dark:text-white" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    /** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
    {
        const { dropdown: __VLS_53 } = __VLS_43.slots;
        let __VLS_54;
        /** @ts-ignore @type { | typeof __VLS_components.elDropdownMenu | typeof __VLS_components.ElDropdownMenu | typeof __VLS_components['el-dropdown-menu'] | typeof __VLS_components.elDropdownMenu | typeof __VLS_components.ElDropdownMenu | typeof __VLS_components['el-dropdown-menu']} */
        elDropdownMenu;
        // @ts-ignore
        const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({}));
        const __VLS_56 = __VLS_55({}, ...__VLS_functionalComponentArgsRest(__VLS_55));
        const { default: __VLS_59 } = __VLS_57.slots;
        for (const [item, key] of __VLS_vFor((__VLS_ctx.tagsViews))) {
            let __VLS_60;
            /** @ts-ignore @type { | typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem | typeof __VLS_components['el-dropdown-item'] | typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem | typeof __VLS_components['el-dropdown-item']} */
            elDropdownItem;
            // @ts-ignore
            const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({
                key: (key),
                command: ({ key, item }),
                divided: (item.divided),
                disabled: (item.disabled),
            }));
            const __VLS_62 = __VLS_61({
                key: (key),
                command: ({ key, item }),
                divided: (item.divided),
                disabled: (item.disabled),
            }, ...__VLS_functionalComponentArgsRest(__VLS_61));
            const { default: __VLS_65 } = __VLS_63.slots;
            let __VLS_66;
            /** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
            IconifyIconOffline;
            // @ts-ignore
            const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
                icon: (item.icon),
            }));
            const __VLS_68 = __VLS_67({
                icon: (item.icon),
            }, ...__VLS_functionalComponentArgsRest(__VLS_67));
            (__VLS_ctx.transformI18n(item.text));
            // @ts-ignore
            [transformI18n, tagsViews, handleCommand, ArrowDown,];
            var __VLS_63;
            // @ts-ignore
            [];
        }
        // @ts-ignore
        [];
        var __VLS_57;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_43;
    var __VLS_44;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=index.vue.js.map