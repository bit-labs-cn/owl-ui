/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { match } from "pinyin-pro";
import { useI18n } from "vue-i18n";
import { getConfig } from "@bit-labs.cn/owl-ui/config";
import { useRouter } from "vue-router";
import SearchResult from "./SearchResult.vue";
import SearchFooter from "./SearchFooter.vue";
import { useNav } from "@bit-labs.cn/owl-ui/layout/hooks/useNav";
import { transformI18n } from "@bit-labs.cn/owl-ui/plugins/i18n";
import SearchHistory from "./SearchHistory.vue";
import { ref, computed, shallowRef, watch } from "vue";
import { useDebounceFn, onKeyStroke } from "@vueuse/core";
import { usePermissionStoreHook } from "@bit-labs.cn/owl-ui/store/modules/permission";
import { cloneDeep, isAllEmpty, storageLocal } from "@pureadmin/utils";
import SearchIcon from "@iconify-icons/ri/search-line";
const { device } = useNav();
const emit = defineEmits();
const props = withDefaults(defineProps(), {});
const router = useRouter();
const { t, locale } = useI18n();
const HISTORY_TYPE = "history";
const COLLECT_TYPE = "collect";
const LOCALEHISTORYKEY = "menu-search-history";
const LOCALECOLLECTKEY = "menu-search-collect";
const keyword = ref("");
const resultRef = ref();
const historyRef = ref();
const scrollbarRef = ref();
const activePath = ref("");
const historyPath = ref("");
const resultOptions = shallowRef([]);
const historyOptions = shallowRef([]);
const handleSearch = useDebounceFn(search, 300);
const historyNum = getConfig().MenuSearchHistory;
const inputRef = ref(null);
/** 菜单树形结构 */
const menusData = computed(() => {
    return cloneDeep(usePermissionStoreHook().wholeMenus);
});
const show = computed({
    get() {
        return props.value;
    },
    set(val) {
        emit("update:value", val);
    }
});
watch(() => props.value, newValue => {
    if (newValue)
        getHistory();
});
const showSearchResult = computed(() => {
    return keyword.value && resultOptions.value.length > 0;
});
const showSearchHistory = computed(() => {
    return !keyword.value && historyOptions.value.length > 0;
});
const showEmpty = computed(() => {
    return ((!keyword.value && historyOptions.value.length === 0) ||
        (keyword.value && resultOptions.value.length === 0));
});
function getStorageItem(key) {
    return storageLocal().getItem(key) || [];
}
function setStorageItem(key, value) {
    storageLocal().setItem(key, value);
}
/** 将菜单树形结构扁平化为一维数组，用于菜单查询 */
function flatTree(arr) {
    const res = [];
    function deep(arr) {
        arr.forEach(item => {
            res.push(item);
            item.children && deep(item.children);
        });
    }
    deep(arr);
    return res;
}
/** 查询 */
function search() {
    const flatMenusData = flatTree(menusData.value);
    resultOptions.value = flatMenusData.filter(menu => keyword.value
        ? transformI18n(menu.meta?.title)
            .toLocaleLowerCase()
            .includes(keyword.value.toLocaleLowerCase().trim()) ||
            (locale.value === "zh" &&
                !isAllEmpty(match(transformI18n(menu.meta?.title).toLocaleLowerCase(), keyword.value.toLocaleLowerCase().trim())))
        : false);
    activePath.value =
        resultOptions.value?.length > 0 ? resultOptions.value[0].path : "";
}
function handleClose() {
    show.value = false;
    /** 延时处理防止用户看到某些操作 */
    setTimeout(() => {
        resultOptions.value = [];
        historyPath.value = "";
        keyword.value = "";
    }, 200);
}
function scrollTo(index) {
    const ref = resultOptions.value.length ? resultRef.value : historyRef.value;
    const scrollTop = ref.handleScroll(index);
    scrollbarRef.value.setScrollTop(scrollTop);
}
/** 获取当前选项和路径 */
function getCurrentOptionsAndPath() {
    const isResultOptions = resultOptions.value.length > 0;
    const options = isResultOptions ? resultOptions.value : historyOptions.value;
    const currentPath = isResultOptions ? activePath.value : historyPath.value;
    return { options, currentPath, isResultOptions };
}
/** 更新路径并滚动到指定项 */
function updatePathAndScroll(newIndex, isResultOptions) {
    if (isResultOptions) {
        activePath.value = resultOptions.value[newIndex].path;
    }
    else {
        historyPath.value = historyOptions.value[newIndex].path;
    }
    scrollTo(newIndex);
}
/** key up */
function handleUp() {
    const { options, currentPath, isResultOptions } = getCurrentOptionsAndPath();
    if (options.length === 0)
        return;
    const index = options.findIndex(item => item.path === currentPath);
    const prevIndex = (index - 1 + options.length) % options.length;
    updatePathAndScroll(prevIndex, isResultOptions);
}
/** key down */
function handleDown() {
    const { options, currentPath, isResultOptions } = getCurrentOptionsAndPath();
    if (options.length === 0)
        return;
    const index = options.findIndex(item => item.path === currentPath);
    const nextIndex = (index + 1) % options.length;
    updatePathAndScroll(nextIndex, isResultOptions);
}
/** key enter */
function handleEnter() {
    const { options, currentPath, isResultOptions } = getCurrentOptionsAndPath();
    if (options.length === 0 || currentPath === "")
        return;
    const index = options.findIndex(item => item.path === currentPath);
    if (index === -1)
        return;
    if (isResultOptions) {
        saveHistory();
    }
    else {
        updateHistory();
    }
    router.push(options[index].path);
    handleClose();
}
/** 删除历史记录 */
function handleDelete(item) {
    const key = item.type === HISTORY_TYPE ? LOCALEHISTORYKEY : LOCALECOLLECTKEY;
    let list = getStorageItem(key);
    list = list.filter(listItem => listItem.path !== item.path);
    setStorageItem(key, list);
    getHistory();
}
/** 收藏历史记录 */
function handleCollect(item) {
    let searchHistoryList = getStorageItem(LOCALEHISTORYKEY);
    let searchCollectList = getStorageItem(LOCALECOLLECTKEY);
    searchHistoryList = searchHistoryList.filter(historyItem => historyItem.path !== item.path);
    setStorageItem(LOCALEHISTORYKEY, searchHistoryList);
    if (!searchCollectList.some(collectItem => collectItem.path === item.path)) {
        searchCollectList.unshift({ ...item, type: COLLECT_TYPE });
        setStorageItem(LOCALECOLLECTKEY, searchCollectList);
    }
    getHistory();
}
/** 存储搜索记录 */
function saveHistory() {
    const { path, meta } = resultOptions.value.find(item => item.path === activePath.value);
    const searchHistoryList = getStorageItem(LOCALEHISTORYKEY);
    const searchCollectList = getStorageItem(LOCALECOLLECTKEY);
    const isCollected = searchCollectList.some(item => item.path === path);
    const existingIndex = searchHistoryList.findIndex(item => item.path === path);
    if (!isCollected) {
        if (existingIndex !== -1)
            searchHistoryList.splice(existingIndex, 1);
        if (searchHistoryList.length >= historyNum)
            searchHistoryList.pop();
        searchHistoryList.unshift({ path, meta, type: HISTORY_TYPE });
        storageLocal().setItem(LOCALEHISTORYKEY, searchHistoryList);
    }
}
/** 更新存储的搜索记录 */
function updateHistory() {
    let searchHistoryList = getStorageItem(LOCALEHISTORYKEY);
    const historyIndex = searchHistoryList.findIndex(item => item.path === historyPath.value);
    if (historyIndex !== -1) {
        const [historyItem] = searchHistoryList.splice(historyIndex, 1);
        searchHistoryList.unshift(historyItem);
        setStorageItem(LOCALEHISTORYKEY, searchHistoryList);
    }
}
/** 获取本地历史记录 */
function getHistory() {
    const searchHistoryList = getStorageItem(LOCALEHISTORYKEY);
    const searchCollectList = getStorageItem(LOCALECOLLECTKEY);
    historyOptions.value = [...searchHistoryList, ...searchCollectList];
    historyPath.value = historyOptions.value[0]?.path;
}
/** 拖拽改变收藏顺序 */
function handleDrag(item) {
    const searchCollectList = getStorageItem(LOCALECOLLECTKEY);
    const [reorderedItem] = searchCollectList.splice(item.oldIndex, 1);
    searchCollectList.splice(item.newIndex, 0, reorderedItem);
    storageLocal().setItem(LOCALECOLLECTKEY, searchCollectList);
    historyOptions.value = [
        ...getStorageItem(LOCALEHISTORYKEY),
        ...getStorageItem(LOCALECOLLECTKEY)
    ];
    historyPath.value = reorderedItem.path;
}
onKeyStroke("Enter", handleEnter);
onKeyStroke("ArrowUp", handleUp);
onKeyStroke("ArrowDown", handleDown);
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
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog'] | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog']} */
elDialog;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onOpened': {} },
    ...{ 'onClosed': {} },
    modelValue: (__VLS_ctx.show),
    top: "5vh",
    ...{ class: "pure-search-dialog" },
    showClose: (false),
    width: (__VLS_ctx.device === 'mobile' ? '80vw' : '40vw'),
    beforeClose: (__VLS_ctx.handleClose),
    ...{ style: ({
            borderRadius: '6px'
        }) },
    appendToBody: true,
}));
const __VLS_2 = __VLS_1({
    ...{ 'onOpened': {} },
    ...{ 'onClosed': {} },
    modelValue: (__VLS_ctx.show),
    top: "5vh",
    ...{ class: "pure-search-dialog" },
    showClose: (false),
    width: (__VLS_ctx.device === 'mobile' ? '80vw' : '40vw'),
    beforeClose: (__VLS_ctx.handleClose),
    ...{ style: ({
            borderRadius: '6px'
        }) },
    appendToBody: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ opened: {} },
    { onOpened: (...[$event]) => {
            __VLS_ctx.inputRef.focus();
            // @ts-ignore
            [show, device, handleClose, inputRef,];
        } });
const __VLS_7 = ({ closed: {} },
    { onClosed: (...[$event]) => {
            __VLS_ctx.inputRef.blur();
            // @ts-ignore
            [inputRef,];
        } });
var __VLS_8 = {};
/** @type {__VLS_StyleScopedClasses['pure-search-dialog']} */ ;
const { default: __VLS_9 } = __VLS_3.slots;
let __VLS_10;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input'] | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent1(__VLS_10, new __VLS_10({
    ...{ 'onInput': {} },
    ref: "inputRef",
    modelValue: (__VLS_ctx.keyword),
    size: "large",
    clearable: true,
    placeholder: (__VLS_ctx.t('search.purePlaceholder')),
}));
const __VLS_12 = __VLS_11({
    ...{ 'onInput': {} },
    ref: "inputRef",
    modelValue: (__VLS_ctx.keyword),
    size: "large",
    clearable: true,
    placeholder: (__VLS_ctx.t('search.purePlaceholder')),
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
let __VLS_15;
const __VLS_16 = ({ input: {} },
    { onInput: (__VLS_ctx.handleSearch) });
var __VLS_17 = {};
const { default: __VLS_19 } = __VLS_13.slots;
{
    const { prefix: __VLS_20 } = __VLS_13.slots;
    let __VLS_21;
    /** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
    IconifyIconOffline;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({
        icon: (__VLS_ctx.SearchIcon),
        ...{ class: "text-primary w-[24px] h-[24px]" },
    }));
    const __VLS_23 = __VLS_22({
        icon: (__VLS_ctx.SearchIcon),
        ...{ class: "text-primary w-[24px] h-[24px]" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    /** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-[24px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-[24px]']} */ ;
    // @ts-ignore
    [keyword, t, handleSearch, SearchIcon,];
}
// @ts-ignore
[];
var __VLS_13;
var __VLS_14;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "search-content" },
});
/** @type {__VLS_StyleScopedClasses['search-content']} */ ;
let __VLS_26;
/** @ts-ignore @type { | typeof __VLS_components.elScrollbar | typeof __VLS_components.ElScrollbar | typeof __VLS_components['el-scrollbar'] | typeof __VLS_components.elScrollbar | typeof __VLS_components.ElScrollbar | typeof __VLS_components['el-scrollbar']} */
elScrollbar;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({
    ref: "scrollbarRef",
    maxHeight: "calc(90vh - 140px)",
}));
const __VLS_28 = __VLS_27({
    ref: "scrollbarRef",
    maxHeight: "calc(90vh - 140px)",
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
var __VLS_31 = {};
const { default: __VLS_33 } = __VLS_29.slots;
if (__VLS_ctx.showEmpty) {
    let __VLS_34;
    /** @ts-ignore @type { | typeof __VLS_components.elEmpty | typeof __VLS_components.ElEmpty | typeof __VLS_components['el-empty']} */
    elEmpty;
    // @ts-ignore
    const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
        description: (__VLS_ctx.t('search.pureEmpty')),
    }));
    const __VLS_36 = __VLS_35({
        description: (__VLS_ctx.t('search.pureEmpty')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_35));
}
if (__VLS_ctx.showSearchHistory) {
    const __VLS_39 = SearchHistory;
    // @ts-ignore
    const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
        ...{ 'onClick': {} },
        ...{ 'onDelete': {} },
        ...{ 'onCollect': {} },
        ...{ 'onDrag': {} },
        ref: "historyRef",
        value: (__VLS_ctx.historyPath),
        options: (__VLS_ctx.historyOptions),
    }));
    const __VLS_41 = __VLS_40({
        ...{ 'onClick': {} },
        ...{ 'onDelete': {} },
        ...{ 'onCollect': {} },
        ...{ 'onDrag': {} },
        ref: "historyRef",
        value: (__VLS_ctx.historyPath),
        options: (__VLS_ctx.historyOptions),
    }, ...__VLS_functionalComponentArgsRest(__VLS_40));
    let __VLS_44;
    const __VLS_45 = ({ click: {} },
        { onClick: (__VLS_ctx.handleEnter) });
    const __VLS_46 = ({ delete: {} },
        { onDelete: (__VLS_ctx.handleDelete) });
    const __VLS_47 = ({ collect: {} },
        { onCollect: (__VLS_ctx.handleCollect) });
    const __VLS_48 = ({ drag: {} },
        { onDrag: (__VLS_ctx.handleDrag) });
    var __VLS_49 = {};
    var __VLS_42;
    var __VLS_43;
}
if (__VLS_ctx.showSearchResult) {
    const __VLS_51 = SearchResult;
    // @ts-ignore
    const __VLS_52 = __VLS_asFunctionalComponent1(__VLS_51, new __VLS_51({
        ...{ 'onClick': {} },
        ref: "resultRef",
        value: (__VLS_ctx.activePath),
        options: (__VLS_ctx.resultOptions),
    }));
    const __VLS_53 = __VLS_52({
        ...{ 'onClick': {} },
        ref: "resultRef",
        value: (__VLS_ctx.activePath),
        options: (__VLS_ctx.resultOptions),
    }, ...__VLS_functionalComponentArgsRest(__VLS_52));
    let __VLS_56;
    const __VLS_57 = ({ click: {} },
        { onClick: (__VLS_ctx.handleEnter) });
    var __VLS_58 = {};
    var __VLS_54;
    var __VLS_55;
}
// @ts-ignore
[t, showEmpty, showSearchHistory, historyPath, historyOptions, handleEnter, handleEnter, handleDelete, handleCollect, handleDrag, showSearchResult, activePath, resultOptions,];
var __VLS_29;
{
    const { footer: __VLS_60 } = __VLS_3.slots;
    const __VLS_61 = SearchFooter;
    // @ts-ignore
    const __VLS_62 = __VLS_asFunctionalComponent1(__VLS_61, new __VLS_61({
        total: (__VLS_ctx.resultOptions.length),
    }));
    const __VLS_63 = __VLS_62({
        total: (__VLS_ctx.resultOptions.length),
    }, ...__VLS_functionalComponentArgsRest(__VLS_62));
    // @ts-ignore
    [resultOptions,];
}
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
// @ts-ignore
var __VLS_18 = __VLS_17, __VLS_32 = __VLS_31, __VLS_50 = __VLS_49, __VLS_59 = __VLS_58;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
//# sourceMappingURL=SearchModal.vue.js.map