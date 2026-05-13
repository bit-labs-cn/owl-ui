/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import Sortable from "sortablejs";
import { useI18n } from "vue-i18n";
import SearchHistoryItem from "./SearchHistoryItem.vue";
import { useEpThemeStoreHook } from "@bit-labs.cn/owl-ui/store/modules/epTheme";
import { useResizeObserver, isArray, delay } from "@pureadmin/utils";
import { ref, watch, nextTick, computed, getCurrentInstance } from "vue";
const historyRef = ref();
const innerHeight = ref();
/** 判断是否停止鼠标移入事件处理 */
const stopMouseEvent = ref(false);
const { t } = useI18n();
const emit = defineEmits();
const instance = getCurrentInstance();
const props = withDefaults(defineProps(), {});
const itemStyle = computed(() => {
    return item => {
        return {
            background: item?.path === active.value ? useEpThemeStoreHook().epThemeColor : "",
            color: item.path === active.value ? "#fff" : "",
            fontSize: item.path === active.value ? "16px" : "14px"
        };
    };
});
const titleStyle = computed(() => {
    return {
        color: useEpThemeStoreHook().epThemeColor,
        fontWeight: 500
    };
});
const active = computed({
    get() {
        return props.value;
    },
    set(val) {
        emit("update:value", val);
    }
});
watch(() => props.value, newValue => {
    if (newValue) {
        if (stopMouseEvent.value) {
            delay(100).then(() => (stopMouseEvent.value = false));
        }
    }
});
const historyList = computed(() => {
    return props.options.filter(item => item.type === "history");
});
const collectList = computed(() => {
    return props.options.filter(item => item.type === "collect");
});
function handleCollect(item) {
    emit("collect", item);
}
function handleDelete(item) {
    stopMouseEvent.value = true;
    emit("delete", item);
}
/** 鼠标移入 */
async function handleMouse(item) {
    if (!stopMouseEvent.value)
        active.value = item.path;
}
function handleTo() {
    emit("enter");
}
function resizeResult() {
    // el-scrollbar max-height="calc(90vh - 140px)"
    innerHeight.value = window.innerHeight - window.innerHeight / 10 - 140;
}
useResizeObserver(historyRef, resizeResult);
function handleScroll(index) {
    const curInstance = instance?.proxy?.$refs[`historyItemRef${index}`];
    if (!curInstance)
        return 0;
    const curRef = isArray(curInstance)
        ? curInstance[0]
        : curInstance;
    const scrollTop = curRef.offsetTop + 128; // 128 两个history-item（56px+56px=112px）高度加上下margin（8px+8px=16px）
    return scrollTop > innerHeight.value ? scrollTop - innerHeight.value : 0;
}
const handleChangeIndex = (evt) => {
    emit("drag", { oldIndex: evt.oldIndex, newIndex: evt.newIndex });
};
let sortableInstance = null;
watch(collectList, val => {
    if (val.length > 1) {
        nextTick(() => {
            const wrapper = document.querySelector(".collect-container");
            if (!wrapper || sortableInstance)
                return;
            sortableInstance = Sortable.create(wrapper, {
                animation: 160,
                onStart: event => {
                    event.item.style.cursor = "move";
                },
                onEnd: event => {
                    event.item.style.cursor = "pointer";
                },
                onUpdate: handleChangeIndex
            });
            resizeResult();
        });
    }
}, { deep: true, immediate: true });
const __VLS_exposed = { handleScroll };
defineExpose(__VLS_exposed);
const __VLS_defaults = {};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ref: "historyRef",
    ...{ class: "history" },
});
/** @type {__VLS_StyleScopedClasses['history']} */ ;
if (__VLS_ctx.historyList.length) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ style: (__VLS_ctx.titleStyle) },
    });
    (__VLS_ctx.t("search.pureHistory"));
    for (const [item, index] of __VLS_vFor((__VLS_ctx.historyList))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ onClick: (__VLS_ctx.handleTo) },
            ...{ onMouseenter: (...[$event]) => {
                    if (!(__VLS_ctx.historyList.length))
                        return;
                    __VLS_ctx.handleMouse(item);
                    // @ts-ignore
                    [historyList, historyList, titleStyle, t, handleTo, handleMouse,];
                } },
            key: (item.path),
            ref: ('historyItemRef' + index),
            ...{ class: "history-item dark:bg-[#1d1d1d]" },
            ...{ style: (__VLS_ctx.itemStyle(item)) },
        });
        /** @type {__VLS_StyleScopedClasses['history-item']} */ ;
        /** @type {__VLS_StyleScopedClasses['dark:bg-[#1d1d1d]']} */ ;
        const __VLS_0 = SearchHistoryItem;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
            ...{ 'onDeleteItem': {} },
            ...{ 'onCollectItem': {} },
            item: (item),
        }));
        const __VLS_2 = __VLS_1({
            ...{ 'onDeleteItem': {} },
            ...{ 'onCollectItem': {} },
            item: (item),
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        let __VLS_5;
        const __VLS_6 = ({ deleteItem: {} },
            { onDeleteItem: (__VLS_ctx.handleDelete) });
        const __VLS_7 = ({ collectItem: {} },
            { onCollectItem: (__VLS_ctx.handleCollect) });
        var __VLS_3;
        var __VLS_4;
        // @ts-ignore
        [itemStyle, handleDelete, handleCollect,];
    }
}
if (__VLS_ctx.collectList.length) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ style: (__VLS_ctx.titleStyle) },
    });
    (`${__VLS_ctx.t("search.pureCollect")}${__VLS_ctx.collectList.length > 1 ? __VLS_ctx.t("search.pureDragSort") : ""}`);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "collect-container" },
    });
    /** @type {__VLS_StyleScopedClasses['collect-container']} */ ;
    for (const [item, index] of __VLS_vFor((__VLS_ctx.collectList))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ onClick: (__VLS_ctx.handleTo) },
            ...{ onMouseenter: (...[$event]) => {
                    if (!(__VLS_ctx.collectList.length))
                        return;
                    __VLS_ctx.handleMouse(item);
                    // @ts-ignore
                    [titleStyle, t, t, handleTo, handleMouse, collectList, collectList, collectList,];
                } },
            key: (item.path),
            ref: ('historyItemRef' + (index + __VLS_ctx.historyList.length)),
            ...{ class: "history-item dark:bg-[#1d1d1d]" },
            ...{ style: (__VLS_ctx.itemStyle(item)) },
        });
        /** @type {__VLS_StyleScopedClasses['history-item']} */ ;
        /** @type {__VLS_StyleScopedClasses['dark:bg-[#1d1d1d]']} */ ;
        const __VLS_8 = SearchHistoryItem;
        // @ts-ignore
        const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
            ...{ 'onDeleteItem': {} },
            item: (item),
        }));
        const __VLS_10 = __VLS_9({
            ...{ 'onDeleteItem': {} },
            item: (item),
        }, ...__VLS_functionalComponentArgsRest(__VLS_9));
        let __VLS_13;
        const __VLS_14 = ({ deleteItem: {} },
            { onDeleteItem: (__VLS_ctx.handleDelete) });
        var __VLS_11;
        var __VLS_12;
        // @ts-ignore
        [historyList, itemStyle, handleDelete,];
    }
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    setup: () => __VLS_exposed,
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
//# sourceMappingURL=SearchHistory.vue.js.map