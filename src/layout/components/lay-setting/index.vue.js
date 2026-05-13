/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, unref, watch, reactive, computed, nextTick, onUnmounted, onBeforeMount } from "vue";
import { useI18n } from "vue-i18n";
import { emitter } from "@bit-labs.cn/owl-ui/utils/mitt";
import LayPanel from "../lay-panel/index.vue";
import { useNav } from "@bit-labs.cn/owl-ui/layout/hooks/useNav";
import { useAppStoreHook } from "@bit-labs.cn/owl-ui/store/modules/app";
import { useMultiTagsStoreHook } from "@bit-labs.cn/owl-ui/store/modules/multiTags";
import Segmented from "@bit-labs.cn/owl-ui/components/ReSegmented";
import { useDataThemeChange } from "@bit-labs.cn/owl-ui/layout/hooks/useDataThemeChange";
import { useDark, useGlobal, debounce, isNumber } from "@pureadmin/utils";
import Check from "@iconify-icons/ep/check";
import LeftArrow from "@iconify-icons/ri/arrow-left-s-line";
import RightArrow from "@iconify-icons/ri/arrow-right-s-line";
import DayIcon from "@bit-labs.cn/owl-ui/assets/svg/day.svg?component";
import DarkIcon from "@bit-labs.cn/owl-ui/assets/svg/dark.svg?component";
import SystemIcon from "@bit-labs.cn/owl-ui/assets/svg/system.svg?component";
const { t } = useI18n();
const { device } = useNav();
const { isDark } = useDark();
const { $storage } = useGlobal();
const mixRef = ref();
const verticalRef = ref();
const horizontalRef = ref();
const { dataTheme, overallStyle, layoutTheme, themeColors, toggleClass, dataThemeChange, setLayoutThemeColor } = useDataThemeChange();
/* body添加layout属性，作用于src/style/sidebar.scss */
if (unref(layoutTheme)) {
    const layout = unref(layoutTheme).layout;
    const theme = unref(layoutTheme).theme;
    document.documentElement.setAttribute("data-theme", theme);
    setLayoutModel(layout);
}
/** 默认灵动模式 */
const markValue = ref($storage.configure?.showModel ?? "smart");
const logoVal = ref($storage.configure?.showLogo ?? true);
const settings = reactive({
    greyVal: $storage.configure.grey,
    weakVal: $storage.configure.weak,
    tabsVal: $storage.configure.hideTabs,
    showLogo: $storage.configure.showLogo,
    showModel: $storage.configure.showModel,
    hideFooter: $storage.configure.hideFooter,
    multiTagsCache: $storage.configure.multiTagsCache,
    stretch: $storage.configure.stretch
});
const getThemeColorStyle = computed(() => {
    return color => {
        return { background: color };
    };
});
/** 当网页整体为暗色风格时不显示亮白色主题配色切换选项 */
const showThemeColors = computed(() => {
    return themeColor => {
        return themeColor === "light" && isDark.value ? false : true;
    };
});
function storageConfigureChange(key, val) {
    const storageConfigure = $storage.configure;
    storageConfigure[key] = val;
    $storage.configure = storageConfigure;
}
/** 灰色模式设置 */
const greyChange = (value) => {
    const htmlEl = document.querySelector("html");
    toggleClass(settings.greyVal, "html-grey", htmlEl);
    storageConfigureChange("grey", value);
};
/** 色弱模式设置 */
const weekChange = (value) => {
    const htmlEl = document.querySelector("html");
    toggleClass(settings.weakVal, "html-weakness", htmlEl);
    storageConfigureChange("weak", value);
};
/** 隐藏标签页设置 */
const tagsChange = () => {
    const showVal = settings.tabsVal;
    storageConfigureChange("hideTabs", showVal);
    emitter.emit("tagViewsChange", showVal);
};
/** 隐藏页脚设置 */
const hideFooterChange = () => {
    const hideFooter = settings.hideFooter;
    storageConfigureChange("hideFooter", hideFooter);
};
/** 标签页持久化设置 */
const multiTagsCacheChange = () => {
    const multiTagsCache = settings.multiTagsCache;
    storageConfigureChange("multiTagsCache", multiTagsCache);
    useMultiTagsStoreHook().multiTagsCacheChange(multiTagsCache);
};
function onChange({ option }) {
    const { value } = option;
    markValue.value = value;
    storageConfigureChange("showModel", value);
    emitter.emit("tagViewsShowModel", value);
}
/** 侧边栏Logo */
function logoChange() {
    unref(logoVal)
        ? storageConfigureChange("showLogo", true)
        : storageConfigureChange("showLogo", false);
    emitter.emit("logoChange", unref(logoVal));
}
function setFalse(Doms) {
    Doms.forEach(v => {
        toggleClass(false, "is-select", unref(v));
    });
}
/** 页宽 */
const stretchTypeOptions = computed(() => {
    return [
        {
            label: t("panel.pureStretchFixed"),
            tip: t("panel.pureStretchFixedTip"),
            value: "fixed"
        },
        {
            label: t("panel.pureStretchCustom"),
            tip: t("panel.pureStretchCustomTip"),
            value: "custom"
        }
    ];
});
const setStretch = value => {
    settings.stretch = value;
    storageConfigureChange("stretch", value);
};
const stretchTypeChange = ({ option }) => {
    const { value } = option;
    value === "custom" ? setStretch(1440) : setStretch(false);
};
/** 主题色 激活选择项 */
const getThemeColor = computed(() => {
    return current => {
        if (current === layoutTheme.value.theme &&
            layoutTheme.value.theme !== "light") {
            return "#fff";
        }
        else if (current === layoutTheme.value.theme &&
            layoutTheme.value.theme === "light") {
            return "#1d2b45";
        }
        else {
            return "transparent";
        }
    };
});
const pClass = computed(() => {
    return ["mb-[12px]", "font-medium", "text-sm", "dark:text-white"];
});
const themeOptions = computed(() => {
    return [
        {
            label: t("panel.pureOverallStyleLight"),
            icon: DayIcon,
            theme: "light",
            tip: t("panel.pureOverallStyleLightTip"),
            iconAttrs: { fill: isDark.value ? "#fff" : "#000" }
        },
        {
            label: t("panel.pureOverallStyleDark"),
            icon: DarkIcon,
            theme: "dark",
            tip: t("panel.pureOverallStyleDarkTip"),
            iconAttrs: { fill: isDark.value ? "#fff" : "#000" }
        },
        {
            label: t("panel.pureOverallStyleSystem"),
            icon: SystemIcon,
            theme: "system",
            tip: t("panel.pureOverallStyleSystemTip"),
            iconAttrs: { fill: isDark.value ? "#fff" : "#000" }
        }
    ];
});
const markOptions = computed(() => {
    return [
        {
            label: t("panel.pureTagsStyleSmart"),
            tip: t("panel.pureTagsStyleSmartTip"),
            value: "smart"
        },
        {
            label: t("panel.pureTagsStyleCard"),
            tip: t("panel.pureTagsStyleCardTip"),
            value: "card"
        },
        {
            label: t("panel.pureTagsStyleChrome"),
            tip: t("panel.pureTagsStyleChromeTip"),
            value: "chrome"
        }
    ];
});
/** 设置导航模式 */
function setLayoutModel(layout) {
    layoutTheme.value.layout = layout;
    window.document.body.setAttribute("layout", layout);
    $storage.layout = {
        layout,
        theme: layoutTheme.value.theme,
        darkMode: $storage.layout?.darkMode,
        sidebarStatus: $storage.layout?.sidebarStatus,
        epThemeColor: $storage.layout?.epThemeColor,
        themeColor: $storage.layout?.themeColor,
        overallStyle: $storage.layout?.overallStyle,
        loginBgTheme: $storage.layout?.loginBgTheme,
        loginUiVariant: $storage.layout?.loginUiVariant
    };
    useAppStoreHook().setLayout(layout);
}
watch($storage, ({ layout }) => {
    switch (layout["layout"]) {
        case "vertical":
            toggleClass(true, "is-select", unref(verticalRef));
            debounce(setFalse([horizontalRef]), 50);
            debounce(setFalse([mixRef]), 50);
            break;
        case "horizontal":
            toggleClass(true, "is-select", unref(horizontalRef));
            debounce(setFalse([verticalRef]), 50);
            debounce(setFalse([mixRef]), 50);
            break;
        case "mix":
            toggleClass(true, "is-select", unref(mixRef));
            debounce(setFalse([verticalRef]), 50);
            debounce(setFalse([horizontalRef]), 50);
            break;
    }
});
const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
/** 根据操作系统主题设置平台整体风格 */
function updateTheme() {
    if (overallStyle.value !== "system")
        return;
    if (mediaQueryList.matches) {
        dataTheme.value = true;
    }
    else {
        dataTheme.value = false;
    }
    dataThemeChange(overallStyle.value);
}
function removeMatchMedia() {
    mediaQueryList.removeEventListener("change", updateTheme);
}
/** 监听操作系统主题改变 */
function watchSystemThemeChange() {
    updateTheme();
    removeMatchMedia();
    mediaQueryList.addEventListener("change", updateTheme);
}
onBeforeMount(() => {
    /* 初始化系统配置 */
    nextTick(() => {
        watchSystemThemeChange();
        settings.greyVal &&
            document.querySelector("html")?.classList.add("html-grey");
        settings.weakVal &&
            document.querySelector("html")?.classList.add("html-weakness");
        settings.tabsVal && tagsChange();
        settings.hideFooter && hideFooterChange();
    });
});
onUnmounted(() => removeMatchMedia);
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['el-switch__core']} */ ;
const __VLS_0 = LayPanel || LayPanel;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "p-5" },
});
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: (__VLS_ctx.pClass) },
});
(__VLS_ctx.t("panel.pureOverallStyle"));
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.Segmented} */
Segmented;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    ...{ 'onChange': {} },
    resize: true,
    ...{ class: "select-none" },
    modelValue: (__VLS_ctx.overallStyle === 'system' ? 2 : __VLS_ctx.dataTheme ? 1 : 0),
    options: (__VLS_ctx.themeOptions),
}));
const __VLS_9 = __VLS_8({
    ...{ 'onChange': {} },
    resize: true,
    ...{ class: "select-none" },
    modelValue: (__VLS_ctx.overallStyle === 'system' ? 2 : __VLS_ctx.dataTheme ? 1 : 0),
    options: (__VLS_ctx.themeOptions),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
let __VLS_12;
const __VLS_13 = ({ change: {} },
    { onChange: (theme => {
            theme.index === 1 && theme.index !== 2
                ? (__VLS_ctx.dataTheme = true)
                : (__VLS_ctx.dataTheme = false);
            __VLS_ctx.overallStyle = theme.option.theme;
            __VLS_ctx.dataThemeChange(theme.option.theme);
            theme.index === 2 && __VLS_ctx.watchSystemThemeChange();
        }) });
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
var __VLS_10;
var __VLS_11;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: (['mt-5', __VLS_ctx.pClass]) },
});
/** @type {__VLS_StyleScopedClasses['mt-5']} */ ;
(__VLS_ctx.t("panel.pureThemeColor"));
__VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ...{ class: "theme-color" },
});
/** @type {__VLS_StyleScopedClasses['theme-color']} */ ;
for (const [item, index] of __VLS_vFor((__VLS_ctx.themeColors))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.setLayoutThemeColor(item.themeColor);
                // @ts-ignore
                [pClass, pClass, t, t, overallStyle, overallStyle, dataTheme, dataTheme, dataTheme, themeOptions, dataThemeChange, watchSystemThemeChange, themeColors, setLayoutThemeColor,];
            } },
        key: (index),
        ...{ style: (__VLS_ctx.getThemeColorStyle(item.color)) },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vShow, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showThemeColors(item.themeColor)) }, null, null);
    let __VLS_14;
    /** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
    elIcon;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
        ...{ style: {} },
        size: (17),
        color: (__VLS_ctx.getThemeColor(item.themeColor)),
    }));
    const __VLS_16 = __VLS_15({
        ...{ style: {} },
        size: (17),
        color: (__VLS_ctx.getThemeColor(item.themeColor)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    const { default: __VLS_19 } = __VLS_17.slots;
    let __VLS_20;
    /** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
    IconifyIconOffline;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({
        icon: (__VLS_ctx.Check),
    }));
    const __VLS_22 = __VLS_21({
        icon: (__VLS_ctx.Check),
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    // @ts-ignore
    [getThemeColorStyle, showThemeColors, getThemeColor, Check,];
    var __VLS_17;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: (['mt-5', __VLS_ctx.pClass]) },
});
/** @type {__VLS_StyleScopedClasses['mt-5']} */ ;
(__VLS_ctx.t("panel.pureLayoutModel"));
__VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ...{ class: "pure-theme" },
});
/** @type {__VLS_StyleScopedClasses['pure-theme']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.setLayoutModel('vertical');
            // @ts-ignore
            [pClass, t, setLayoutModel,];
        } },
    ref: "verticalRef",
    ...{ class: (__VLS_ctx.layoutTheme.layout === 'vertical' ? 'is-select' : '') },
});
__VLS_asFunctionalDirective(__VLS_directives.vTippy, {})(null, { ...__VLS_directiveBindingRestFields, value: ({
        content: __VLS_ctx.t('panel.pureVerticalTip'),
        zIndex: 41000
    }) }, null, null);
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({});
if (__VLS_ctx.device !== 'mobile') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.device !== 'mobile'))
                    return;
                __VLS_ctx.setLayoutModel('horizontal');
                // @ts-ignore
                [t, setLayoutModel, layoutTheme, vTippy, device,];
            } },
        ref: "horizontalRef",
        ...{ class: (__VLS_ctx.layoutTheme.layout === 'horizontal' ? 'is-select' : '') },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vTippy, {})(null, { ...__VLS_directiveBindingRestFields, value: ({
            content: __VLS_ctx.t('panel.pureHorizontalTip'),
            zIndex: 41000
        }) }, null, null);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({});
}
if (__VLS_ctx.device !== 'mobile') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.device !== 'mobile'))
                    return;
                __VLS_ctx.setLayoutModel('mix');
                // @ts-ignore
                [t, setLayoutModel, layoutTheme, vTippy, device,];
            } },
        ref: "mixRef",
        ...{ class: (__VLS_ctx.layoutTheme.layout === 'mix' ? 'is-select' : '') },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vTippy, {})(null, { ...__VLS_directiveBindingRestFields, value: ({
            content: __VLS_ctx.t('panel.pureMixTip'),
            zIndex: 41000
        }) }, null, null);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({});
}
if (__VLS_ctx.useAppStoreHook().getViewportWidth > 1280) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: (['mt-5', __VLS_ctx.pClass]) },
    });
    /** @type {__VLS_StyleScopedClasses['mt-5']} */ ;
    (__VLS_ctx.t("panel.pureStretch"));
    let __VLS_25;
    /** @ts-ignore @type { | typeof __VLS_components.Segmented} */
    Segmented;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
        ...{ 'onChange': {} },
        resize: true,
        ...{ class: "mb-2 select-none" },
        modelValue: (__VLS_ctx.isNumber(__VLS_ctx.settings.stretch) ? 1 : 0),
        options: (__VLS_ctx.stretchTypeOptions),
    }));
    const __VLS_27 = __VLS_26({
        ...{ 'onChange': {} },
        resize: true,
        ...{ class: "mb-2 select-none" },
        modelValue: (__VLS_ctx.isNumber(__VLS_ctx.settings.stretch) ? 1 : 0),
        options: (__VLS_ctx.stretchTypeOptions),
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    let __VLS_30;
    const __VLS_31 = ({ change: {} },
        { onChange: (__VLS_ctx.stretchTypeChange) });
    /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    var __VLS_28;
    var __VLS_29;
    if (__VLS_ctx.isNumber(__VLS_ctx.settings.stretch)) {
        let __VLS_32;
        /** @ts-ignore @type { | typeof __VLS_components.elInputNumber | typeof __VLS_components.ElInputNumber | typeof __VLS_components['el-input-number']} */
        elInputNumber;
        // @ts-ignore
        const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
            ...{ 'onChange': {} },
            modelValue: __VLS_ctx.settings.stretch,
            min: (1280),
            max: (1600),
            controlsPosition: "right",
        }));
        const __VLS_34 = __VLS_33({
            ...{ 'onChange': {} },
            modelValue: __VLS_ctx.settings.stretch,
            min: (1280),
            max: (1600),
            controlsPosition: "right",
        }, ...__VLS_functionalComponentArgsRest(__VLS_33));
        let __VLS_37;
        const __VLS_38 = ({ change: {} },
            { onChange: (value => __VLS_ctx.setStretch(value)) });
        var __VLS_35;
        var __VLS_36;
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.useAppStoreHook().getViewportWidth > 1280))
                        return;
                    if (!!(__VLS_ctx.isNumber(__VLS_ctx.settings.stretch)))
                        return;
                    __VLS_ctx.setStretch(!__VLS_ctx.settings.stretch);
                    // @ts-ignore
                    [pClass, t, t, layoutTheme, vTippy, useAppStoreHook, isNumber, isNumber, settings, settings, settings, settings, stretchTypeOptions, stretchTypeChange, setStretch, setStretch,];
                } },
            ...{ class: "bg-transparent flex-c w-full h-20 rounded-md border border-[var(--pure-border-color)]" },
        });
        __VLS_asFunctionalDirective(__VLS_directives.vRipple, {})(null, { ...__VLS_directiveBindingRestFields, value: ({ class: 'text-gray-300' }) }, null, null);
        /** @type {__VLS_StyleScopedClasses['bg-transparent']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex-c']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-20']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-[var(--pure-border-color)]']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex-bc transition-all duration-300" },
            ...{ class: ([__VLS_ctx.settings.stretch ? 'w-[24%]' : 'w-[50%]']) },
            ...{ style: {} },
        });
        /** @type {__VLS_StyleScopedClasses['flex-bc']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
        /** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
        let __VLS_39;
        /** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
        IconifyIconOffline;
        // @ts-ignore
        const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
            icon: (__VLS_ctx.settings.stretch ? __VLS_ctx.RightArrow : __VLS_ctx.LeftArrow),
            height: "20",
        }));
        const __VLS_41 = __VLS_40({
            icon: (__VLS_ctx.settings.stretch ? __VLS_ctx.RightArrow : __VLS_ctx.LeftArrow),
            height: "20",
        }, ...__VLS_functionalComponentArgsRest(__VLS_40));
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "flex-grow border-b border-dashed" },
            ...{ style: {} },
        });
        /** @type {__VLS_StyleScopedClasses['flex-grow']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-b']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-dashed']} */ ;
        let __VLS_44;
        /** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
        IconifyIconOffline;
        // @ts-ignore
        const __VLS_45 = __VLS_asFunctionalComponent1(__VLS_44, new __VLS_44({
            icon: (__VLS_ctx.settings.stretch ? __VLS_ctx.LeftArrow : __VLS_ctx.RightArrow),
            height: "20",
        }));
        const __VLS_46 = __VLS_45({
            icon: (__VLS_ctx.settings.stretch ? __VLS_ctx.LeftArrow : __VLS_ctx.RightArrow),
            height: "20",
        }, ...__VLS_functionalComponentArgsRest(__VLS_45));
    }
}
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: (['mt-4', __VLS_ctx.pClass]) },
});
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
(__VLS_ctx.t("panel.pureTagsStyle"));
let __VLS_49;
/** @ts-ignore @type { | typeof __VLS_components.Segmented} */
Segmented;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent1(__VLS_49, new __VLS_49({
    ...{ 'onChange': {} },
    resize: true,
    ...{ class: "select-none" },
    modelValue: (__VLS_ctx.markValue === 'smart' ? 0 : __VLS_ctx.markValue === 'card' ? 1 : 2),
    options: (__VLS_ctx.markOptions),
}));
const __VLS_51 = __VLS_50({
    ...{ 'onChange': {} },
    resize: true,
    ...{ class: "select-none" },
    modelValue: (__VLS_ctx.markValue === 'smart' ? 0 : __VLS_ctx.markValue === 'card' ? 1 : 2),
    options: (__VLS_ctx.markOptions),
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
let __VLS_54;
const __VLS_55 = ({ change: {} },
    { onChange: (__VLS_ctx.onChange) });
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
var __VLS_52;
var __VLS_53;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "mt-5 font-medium text-sm dark:text-white" },
});
/** @type {__VLS_StyleScopedClasses['mt-5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
(__VLS_ctx.t("panel.pureInterfaceDisplay"));
__VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ...{ class: "setting" },
});
/** @type {__VLS_StyleScopedClasses['setting']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "dark:text-white" },
});
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
(__VLS_ctx.t("panel.pureGreyModel"));
let __VLS_56;
/** @ts-ignore @type { | typeof __VLS_components.elSwitch | typeof __VLS_components.ElSwitch | typeof __VLS_components['el-switch']} */
elSwitch;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent1(__VLS_56, new __VLS_56({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.settings.greyVal),
    inlinePrompt: true,
    activeText: (__VLS_ctx.t('buttons.pureOpenText')),
    inactiveText: (__VLS_ctx.t('buttons.pureCloseText')),
}));
const __VLS_58 = __VLS_57({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.settings.greyVal),
    inlinePrompt: true,
    activeText: (__VLS_ctx.t('buttons.pureOpenText')),
    inactiveText: (__VLS_ctx.t('buttons.pureCloseText')),
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
let __VLS_61;
const __VLS_62 = ({ change: {} },
    { onChange: (__VLS_ctx.greyChange) });
var __VLS_59;
var __VLS_60;
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "dark:text-white" },
});
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
(__VLS_ctx.t("panel.pureWeakModel"));
let __VLS_63;
/** @ts-ignore @type { | typeof __VLS_components.elSwitch | typeof __VLS_components.ElSwitch | typeof __VLS_components['el-switch']} */
elSwitch;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.settings.weakVal),
    inlinePrompt: true,
    activeText: (__VLS_ctx.t('buttons.pureOpenText')),
    inactiveText: (__VLS_ctx.t('buttons.pureCloseText')),
}));
const __VLS_65 = __VLS_64({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.settings.weakVal),
    inlinePrompt: true,
    activeText: (__VLS_ctx.t('buttons.pureOpenText')),
    inactiveText: (__VLS_ctx.t('buttons.pureCloseText')),
}, ...__VLS_functionalComponentArgsRest(__VLS_64));
let __VLS_68;
const __VLS_69 = ({ change: {} },
    { onChange: (__VLS_ctx.weekChange) });
var __VLS_66;
var __VLS_67;
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "dark:text-white" },
});
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
(__VLS_ctx.t("panel.pureHiddenTags"));
let __VLS_70;
/** @ts-ignore @type { | typeof __VLS_components.elSwitch | typeof __VLS_components.ElSwitch | typeof __VLS_components['el-switch']} */
elSwitch;
// @ts-ignore
const __VLS_71 = __VLS_asFunctionalComponent1(__VLS_70, new __VLS_70({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.settings.tabsVal),
    inlinePrompt: true,
    activeText: (__VLS_ctx.t('buttons.pureOpenText')),
    inactiveText: (__VLS_ctx.t('buttons.pureCloseText')),
}));
const __VLS_72 = __VLS_71({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.settings.tabsVal),
    inlinePrompt: true,
    activeText: (__VLS_ctx.t('buttons.pureOpenText')),
    inactiveText: (__VLS_ctx.t('buttons.pureCloseText')),
}, ...__VLS_functionalComponentArgsRest(__VLS_71));
let __VLS_75;
const __VLS_76 = ({ change: {} },
    { onChange: (__VLS_ctx.tagsChange) });
var __VLS_73;
var __VLS_74;
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "dark:text-white" },
});
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
(__VLS_ctx.t("panel.pureHiddenFooter"));
let __VLS_77;
/** @ts-ignore @type { | typeof __VLS_components.elSwitch | typeof __VLS_components.ElSwitch | typeof __VLS_components['el-switch']} */
elSwitch;
// @ts-ignore
const __VLS_78 = __VLS_asFunctionalComponent1(__VLS_77, new __VLS_77({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.settings.hideFooter),
    inlinePrompt: true,
    activeText: (__VLS_ctx.t('buttons.pureOpenText')),
    inactiveText: (__VLS_ctx.t('buttons.pureCloseText')),
}));
const __VLS_79 = __VLS_78({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.settings.hideFooter),
    inlinePrompt: true,
    activeText: (__VLS_ctx.t('buttons.pureOpenText')),
    inactiveText: (__VLS_ctx.t('buttons.pureCloseText')),
}, ...__VLS_functionalComponentArgsRest(__VLS_78));
let __VLS_82;
const __VLS_83 = ({ change: {} },
    { onChange: (__VLS_ctx.hideFooterChange) });
var __VLS_80;
var __VLS_81;
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "dark:text-white" },
});
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
let __VLS_84;
/** @ts-ignore @type { | typeof __VLS_components.elSwitch | typeof __VLS_components.ElSwitch | typeof __VLS_components['el-switch']} */
elSwitch;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent1(__VLS_84, new __VLS_84({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.logoVal),
    inlinePrompt: true,
    activeValue: (true),
    inactiveValue: (false),
    activeText: (__VLS_ctx.t('buttons.pureOpenText')),
    inactiveText: (__VLS_ctx.t('buttons.pureCloseText')),
}));
const __VLS_86 = __VLS_85({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.logoVal),
    inlinePrompt: true,
    activeValue: (true),
    inactiveValue: (false),
    activeText: (__VLS_ctx.t('buttons.pureOpenText')),
    inactiveText: (__VLS_ctx.t('buttons.pureCloseText')),
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
let __VLS_89;
const __VLS_90 = ({ change: {} },
    { onChange: (__VLS_ctx.logoChange) });
var __VLS_87;
var __VLS_88;
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "dark:text-white" },
});
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
(__VLS_ctx.t("panel.pureMultiTagsCache"));
let __VLS_91;
/** @ts-ignore @type { | typeof __VLS_components.elSwitch | typeof __VLS_components.ElSwitch | typeof __VLS_components['el-switch']} */
elSwitch;
// @ts-ignore
const __VLS_92 = __VLS_asFunctionalComponent1(__VLS_91, new __VLS_91({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.settings.multiTagsCache),
    inlinePrompt: true,
    activeText: (__VLS_ctx.t('buttons.pureOpenText')),
    inactiveText: (__VLS_ctx.t('buttons.pureCloseText')),
}));
const __VLS_93 = __VLS_92({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.settings.multiTagsCache),
    inlinePrompt: true,
    activeText: (__VLS_ctx.t('buttons.pureOpenText')),
    inactiveText: (__VLS_ctx.t('buttons.pureCloseText')),
}, ...__VLS_functionalComponentArgsRest(__VLS_92));
let __VLS_96;
const __VLS_97 = ({ change: {} },
    { onChange: (__VLS_ctx.multiTagsCacheChange) });
var __VLS_94;
var __VLS_95;
// @ts-ignore
[pClass, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, settings, settings, settings, settings, settings, settings, settings, settings, vRipple, RightArrow, RightArrow, LeftArrow, LeftArrow, markValue, markValue, markOptions, onChange, greyChange, weekChange, tagsChange, hideFooterChange, logoVal, logoChange, multiTagsCacheChange,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=index.vue.js.map