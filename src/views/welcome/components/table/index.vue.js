/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { useColumns } from "./columns";
import { useRenderIcon } from "@bit-labs.cn/owl-ui/components/ReIcon/src/hooks";
const { loading, columns, dataList, pagination, Empty, onCurrentChange } = useColumns();
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.pureTable | typeof __VLS_components.PureTable | typeof __VLS_components['pure-table'] | typeof __VLS_components.pureTable | typeof __VLS_components.PureTable | typeof __VLS_components['pure-table']} */
pureTable;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onPageCurrentChange': {} },
    rowKey: "id",
    alignWhole: "center",
    showOverflowTooltip: true,
    loading: (__VLS_ctx.loading),
    loadingConfig: ({ background: 'transparent' }),
    data: (__VLS_ctx.dataList.slice((__VLS_ctx.pagination.currentPage - 1) * __VLS_ctx.pagination.pageSize, __VLS_ctx.pagination.currentPage * __VLS_ctx.pagination.pageSize)),
    columns: (__VLS_ctx.columns),
    pagination: (__VLS_ctx.pagination),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onPageCurrentChange': {} },
    rowKey: "id",
    alignWhole: "center",
    showOverflowTooltip: true,
    loading: (__VLS_ctx.loading),
    loadingConfig: ({ background: 'transparent' }),
    data: (__VLS_ctx.dataList.slice((__VLS_ctx.pagination.currentPage - 1) * __VLS_ctx.pagination.pageSize, __VLS_ctx.pagination.currentPage * __VLS_ctx.pagination.pageSize)),
    columns: (__VLS_ctx.columns),
    pagination: (__VLS_ctx.pagination),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ pageCurrentChange: {} },
    { onPageCurrentChange: (__VLS_ctx.onCurrentChange) });
var __VLS_7 = {};
const { default: __VLS_8 } = __VLS_3.slots;
{
    const { empty: __VLS_9 } = __VLS_3.slots;
    let __VLS_10;
    /** @ts-ignore @type { | typeof __VLS_components.elEmpty | typeof __VLS_components.ElEmpty | typeof __VLS_components['el-empty'] | typeof __VLS_components.elEmpty | typeof __VLS_components.ElEmpty | typeof __VLS_components['el-empty']} */
    elEmpty;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent1(__VLS_10, new __VLS_10({
        description: "暂无数据",
        imageSize: (60),
    }));
    const __VLS_12 = __VLS_11({
        description: "暂无数据",
        imageSize: (60),
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    const { default: __VLS_15 } = __VLS_13.slots;
    {
        const { image: __VLS_16 } = __VLS_13.slots;
        let __VLS_17;
        /** @ts-ignore @type { | typeof __VLS_components.Empty} */
        Empty;
        // @ts-ignore
        const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({}));
        const __VLS_19 = __VLS_18({}, ...__VLS_functionalComponentArgsRest(__VLS_18));
        // @ts-ignore
        [loading, dataList, pagination, pagination, pagination, pagination, pagination, columns, onCurrentChange,];
    }
    // @ts-ignore
    [];
    var __VLS_13;
    // @ts-ignore
    [];
}
{
    const { operation: __VLS_22 } = __VLS_3.slots;
    const [{ row }] = __VLS_vSlot(__VLS_22);
    let __VLS_23;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
        plain: true,
        circle: true,
        size: "small",
        title: (`查看序号为${row.id}的详情`),
        icon: (__VLS_ctx.useRenderIcon('ri:search-line')),
    }));
    const __VLS_25 = __VLS_24({
        plain: true,
        circle: true,
        size: "small",
        title: (`查看序号为${row.id}的详情`),
        icon: (__VLS_ctx.useRenderIcon('ri:search-line')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_24));
    // @ts-ignore
    [useRenderIcon,];
}
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=index.vue.js.map