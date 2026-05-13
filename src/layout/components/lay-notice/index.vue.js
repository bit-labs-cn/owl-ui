/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { useI18n } from "vue-i18n";
import { ref, computed } from "vue";
import { noticesData } from "./data";
import NoticeList from "./components/NoticeList.vue";
import BellIcon from "@iconify-icons/ep/bell";
const { t } = useI18n();
const noticesNum = ref(0);
const notices = ref(noticesData);
const activeKey = ref(noticesData[0]?.key);
notices.value.map(v => (noticesNum.value += v.list.length));
const getLabel = computed(() => item => t(item.name) + (item.list.length > 0 ? `(${item.list.length})` : ""));
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['el-tabs__nav-wrap']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elDropdown | typeof __VLS_components.ElDropdown | typeof __VLS_components['el-dropdown'] | typeof __VLS_components.elDropdown | typeof __VLS_components.ElDropdown | typeof __VLS_components['el-dropdown']} */
elDropdown;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    trigger: "click",
    placement: "bottom-end",
}));
const __VLS_2 = __VLS_1({
    trigger: "click",
    placement: "bottom-end",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: ([
            'dropdown-badge',
            'navbar-bg-hover',
            'select-none',
            Number(__VLS_ctx.noticesNum) !== 0 && 'mr-[10px]'
        ]) },
});
/** @type {__VLS_StyleScopedClasses['dropdown-badge']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-bg-hover']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.elBadge | typeof __VLS_components.ElBadge | typeof __VLS_components['el-badge'] | typeof __VLS_components.elBadge | typeof __VLS_components.ElBadge | typeof __VLS_components['el-badge']} */
elBadge;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    value: (Number(__VLS_ctx.noticesNum) === 0 ? '' : __VLS_ctx.noticesNum),
    max: (99),
}));
const __VLS_9 = __VLS_8({
    value: (Number(__VLS_ctx.noticesNum) === 0 ? '' : __VLS_ctx.noticesNum),
    max: (99),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const { default: __VLS_12 } = __VLS_10.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "header-notice-icon" },
});
/** @type {__VLS_StyleScopedClasses['header-notice-icon']} */ ;
let __VLS_13;
/** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
IconifyIconOffline;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    icon: (__VLS_ctx.BellIcon),
}));
const __VLS_15 = __VLS_14({
    icon: (__VLS_ctx.BellIcon),
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
// @ts-ignore
[noticesNum, noticesNum, noticesNum, BellIcon,];
var __VLS_10;
{
    const { dropdown: __VLS_18 } = __VLS_3.slots;
    let __VLS_19;
    /** @ts-ignore @type { | typeof __VLS_components.elDropdownMenu | typeof __VLS_components.ElDropdownMenu | typeof __VLS_components['el-dropdown-menu'] | typeof __VLS_components.elDropdownMenu | typeof __VLS_components.ElDropdownMenu | typeof __VLS_components['el-dropdown-menu']} */
    elDropdownMenu;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({}));
    const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
    const { default: __VLS_24 } = __VLS_22.slots;
    let __VLS_25;
    /** @ts-ignore @type { | typeof __VLS_components.elTabs | typeof __VLS_components.ElTabs | typeof __VLS_components['el-tabs'] | typeof __VLS_components.elTabs | typeof __VLS_components.ElTabs | typeof __VLS_components['el-tabs']} */
    elTabs;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
        modelValue: (__VLS_ctx.activeKey),
        stretch: (true),
        ...{ class: "dropdown-tabs" },
        ...{ style: ({ width: __VLS_ctx.notices.length === 0 ? '200px' : '330px' }) },
    }));
    const __VLS_27 = __VLS_26({
        modelValue: (__VLS_ctx.activeKey),
        stretch: (true),
        ...{ class: "dropdown-tabs" },
        ...{ style: ({ width: __VLS_ctx.notices.length === 0 ? '200px' : '330px' }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    /** @type {__VLS_StyleScopedClasses['dropdown-tabs']} */ ;
    const { default: __VLS_30 } = __VLS_28.slots;
    if (__VLS_ctx.notices.length === 0) {
        let __VLS_31;
        /** @ts-ignore @type { | typeof __VLS_components.elEmpty | typeof __VLS_components.ElEmpty | typeof __VLS_components['el-empty']} */
        elEmpty;
        // @ts-ignore
        const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
            description: (__VLS_ctx.t('status.pureNoMessage')),
            imageSize: (60),
        }));
        const __VLS_33 = __VLS_32({
            description: (__VLS_ctx.t('status.pureNoMessage')),
            imageSize: (60),
        }, ...__VLS_functionalComponentArgsRest(__VLS_32));
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        for (const [item] of __VLS_vFor((__VLS_ctx.notices))) {
            let __VLS_36;
            /** @ts-ignore @type { | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane'] | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane']} */
            elTabPane;
            // @ts-ignore
            const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
                label: (__VLS_ctx.getLabel(item)),
                name: (`${item.key}`),
                key: (item.key),
            }));
            const __VLS_38 = __VLS_37({
                label: (__VLS_ctx.getLabel(item)),
                name: (`${item.key}`),
                key: (item.key),
            }, ...__VLS_functionalComponentArgsRest(__VLS_37));
            const { default: __VLS_41 } = __VLS_39.slots;
            let __VLS_42;
            /** @ts-ignore @type { | typeof __VLS_components.elScrollbar | typeof __VLS_components.ElScrollbar | typeof __VLS_components['el-scrollbar'] | typeof __VLS_components.elScrollbar | typeof __VLS_components.ElScrollbar | typeof __VLS_components['el-scrollbar']} */
            elScrollbar;
            // @ts-ignore
            const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
                maxHeight: "330px",
            }));
            const __VLS_44 = __VLS_43({
                maxHeight: "330px",
            }, ...__VLS_functionalComponentArgsRest(__VLS_43));
            const { default: __VLS_47 } = __VLS_45.slots;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "noticeList-container" },
            });
            /** @type {__VLS_StyleScopedClasses['noticeList-container']} */ ;
            const __VLS_48 = NoticeList;
            // @ts-ignore
            const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
                list: (item.list),
                emptyText: (item.emptyText),
            }));
            const __VLS_50 = __VLS_49({
                list: (item.list),
                emptyText: (item.emptyText),
            }, ...__VLS_functionalComponentArgsRest(__VLS_49));
            // @ts-ignore
            [activeKey, notices, notices, notices, t, getLabel,];
            var __VLS_45;
            // @ts-ignore
            [];
            var __VLS_39;
            // @ts-ignore
            [];
        }
    }
    // @ts-ignore
    [];
    var __VLS_28;
    // @ts-ignore
    [];
    var __VLS_22;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=index.vue.js.map