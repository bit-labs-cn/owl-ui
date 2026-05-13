/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import "animate.css";
// 引入 src/components/ReIcon/src/offlineIcon.ts 文件中所有使用addIcon添加过的本地图标
import "@bit-labs.cn/owl-ui/components/ReIcon/src/offlineIcon";
import { useI18n } from "vue-i18n";
import { useLayout } from "./hooks/useLayout";
import { useAppStoreHook } from "@bit-labs.cn/owl-ui/store/modules/app";
import { useSettingStoreHook } from "@bit-labs.cn/owl-ui/store/modules/settings";
import { useDataThemeChange } from "@bit-labs.cn/owl-ui/layout/hooks/useDataThemeChange";
import { h, ref, reactive, computed, onMounted, onBeforeMount, defineComponent } from "vue";
import { useDark, useGlobal, deviceDetection, useResizeObserver } from "@pureadmin/utils";
import LayTag from "./components/lay-tag/index.vue";
import LayNavbar from "./components/lay-navbar/index.vue";
import LayContent from "./components/lay-content/index.vue";
import LaySetting from "./components/lay-setting/index.vue";
import NavVertical from "./components/lay-sidebar/NavVertical.vue";
import NavHorizontal from "./components/lay-sidebar/NavHorizontal.vue";
import BackTopIcon from "@bit-labs.cn/owl-ui/assets/svg/back_top.svg?component";
const { t } = useI18n();
const appWrapperRef = ref();
const { isDark } = useDark();
const { layout } = useLayout();
const isMobile = deviceDetection();
const pureSetting = useSettingStoreHook();
const { $storage } = useGlobal();
const set = reactive({
    sidebar: computed(() => {
        return useAppStoreHook().sidebar;
    }),
    device: computed(() => {
        return useAppStoreHook().device;
    }),
    fixedHeader: computed(() => {
        return pureSetting.fixedHeader;
    }),
    classes: computed(() => {
        return {
            hideSidebar: !set.sidebar.opened,
            openSidebar: set.sidebar.opened,
            withoutAnimation: set.sidebar.withoutAnimation,
            mobile: set.device === "mobile"
        };
    }),
    hideTabs: computed(() => {
        return $storage?.configure.hideTabs;
    })
});
function setTheme(layoutModel) {
    window.document.body.setAttribute("layout", layoutModel);
    $storage.layout = {
        layout: `${layoutModel}`,
        theme: $storage.layout?.theme,
        darkMode: $storage.layout?.darkMode,
        sidebarStatus: $storage.layout?.sidebarStatus,
        epThemeColor: $storage.layout?.epThemeColor,
        themeColor: $storage.layout?.themeColor,
        overallStyle: $storage.layout?.overallStyle,
        loginBgTheme: $storage.layout?.loginBgTheme,
        loginUiVariant: $storage.layout?.loginUiVariant
    };
}
function toggle(device, bool) {
    useAppStoreHook().toggleDevice(device);
    useAppStoreHook().toggleSideBar(bool, "resize");
}
// 判断是否可自动关闭菜单栏
let isAutoCloseSidebar = true;
useResizeObserver(appWrapperRef, entries => {
    if (isMobile)
        return;
    const entry = entries[0];
    const [{ inlineSize: width, blockSize: height }] = entry.borderBoxSize;
    useAppStoreHook().setViewportSize({ width, height });
    width <= 760 ? setTheme("vertical") : setTheme(useAppStoreHook().layout);
    /** width app-wrapper类容器宽度
     * 0 < width <= 760 隐藏侧边栏
     * 760 < width <= 990 折叠侧边栏
     * width > 990 展开侧边栏
     */
    if (width > 0 && width <= 760) {
        toggle("mobile", false);
        isAutoCloseSidebar = true;
    }
    else if (width > 760 && width <= 990) {
        if (isAutoCloseSidebar) {
            toggle("desktop", false);
            isAutoCloseSidebar = false;
        }
    }
    else if (width > 990 && !set.sidebar.isClickCollapse) {
        toggle("desktop", true);
        isAutoCloseSidebar = true;
    }
    else {
        toggle("desktop", false);
        isAutoCloseSidebar = false;
    }
});
onMounted(() => {
    if (isMobile) {
        toggle("mobile", false);
    }
});
onBeforeMount(() => {
    useDataThemeChange().dataThemeChange($storage.layout?.overallStyle);
});
const LayHeader = defineComponent({
    name: "LayHeader",
    render() {
        return h("div", {
            class: { "fixed-header": set.fixedHeader },
            style: [
                set.hideTabs && layout.value.includes("horizontal")
                    ? isDark.value
                        ? "box-shadow: 0 1px 4px #0d0d0d"
                        : "box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08)"
                    : ""
            ]
        }, {
            default: () => [
                !pureSetting.hiddenSideBar &&
                    (layout.value.includes("vertical") || layout.value.includes("mix"))
                    ? h(LayNavbar)
                    : null,
                !pureSetting.hiddenSideBar && layout.value.includes("horizontal")
                    ? h(NavHorizontal)
                    : null,
                h(LayTag)
            ]
        });
    }
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ref: "appWrapperRef",
    ...{ class: (['app-wrapper', __VLS_ctx.set.classes]) },
});
/** @type {__VLS_StyleScopedClasses['app-wrapper']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.useAppStoreHook().toggleSideBar();
            // @ts-ignore
            [set, useAppStoreHook,];
        } },
    ...{ class: "app-mask" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.set.device === 'mobile' &&
        __VLS_ctx.set.sidebar.opened &&
        __VLS_ctx.layout.includes('vertical')) }, null, null);
/** @type {__VLS_StyleScopedClasses['app-mask']} */ ;
const __VLS_0 = NavVertical;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalDirective(__VLS_directives.vShow, {})(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.pureSetting.hiddenSideBar &&
        (__VLS_ctx.layout.includes('vertical') || __VLS_ctx.layout.includes('mix'))) }, null, null);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: ([
            'main-container',
            __VLS_ctx.pureSetting.hiddenSideBar ? 'main-hidden' : ''
        ]) },
});
/** @type {__VLS_StyleScopedClasses['main-container']} */ ;
if (__VLS_ctx.set.fixedHeader) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    let __VLS_5;
    /** @ts-ignore @type { | typeof __VLS_components.LayHeader} */
    LayHeader;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({}));
    const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
    const __VLS_10 = LayContent;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent1(__VLS_10, new __VLS_10({
        fixedHeader: (__VLS_ctx.set.fixedHeader),
    }));
    const __VLS_12 = __VLS_11({
        fixedHeader: (__VLS_ctx.set.fixedHeader),
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
}
else {
    let __VLS_15;
    /** @ts-ignore @type { | typeof __VLS_components.elScrollbar | typeof __VLS_components.ElScrollbar | typeof __VLS_components['el-scrollbar'] | typeof __VLS_components.elScrollbar | typeof __VLS_components.ElScrollbar | typeof __VLS_components['el-scrollbar']} */
    elScrollbar;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({}));
    const __VLS_17 = __VLS_16({}, ...__VLS_functionalComponentArgsRest(__VLS_16));
    const { default: __VLS_20 } = __VLS_18.slots;
    let __VLS_21;
    /** @ts-ignore @type { | typeof __VLS_components.elBacktop | typeof __VLS_components.ElBacktop | typeof __VLS_components['el-backtop'] | typeof __VLS_components.elBacktop | typeof __VLS_components.ElBacktop | typeof __VLS_components['el-backtop']} */
    elBacktop;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({
        title: (__VLS_ctx.t('buttons.pureBackTop')),
        target: ".main-container .el-scrollbar__wrap",
    }));
    const __VLS_23 = __VLS_22({
        title: (__VLS_ctx.t('buttons.pureBackTop')),
        target: ".main-container .el-scrollbar__wrap",
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    const { default: __VLS_26 } = __VLS_24.slots;
    let __VLS_27;
    /** @ts-ignore @type { | typeof __VLS_components.BackTopIcon} */
    BackTopIcon;
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({}));
    const __VLS_29 = __VLS_28({}, ...__VLS_functionalComponentArgsRest(__VLS_28));
    // @ts-ignore
    [set, set, set, set, layout, layout, layout, pureSetting, pureSetting, t,];
    var __VLS_24;
    let __VLS_32;
    /** @ts-ignore @type { | typeof __VLS_components.LayHeader} */
    LayHeader;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({}));
    const __VLS_34 = __VLS_33({}, ...__VLS_functionalComponentArgsRest(__VLS_33));
    const __VLS_37 = LayContent;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({
        fixedHeader: (__VLS_ctx.set.fixedHeader),
    }));
    const __VLS_39 = __VLS_38({
        fixedHeader: (__VLS_ctx.set.fixedHeader),
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    // @ts-ignore
    [set,];
    var __VLS_18;
}
const __VLS_42 = LaySetting;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({}));
const __VLS_44 = __VLS_43({}, ...__VLS_functionalComponentArgsRest(__VLS_43));
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=index.vue.js.map