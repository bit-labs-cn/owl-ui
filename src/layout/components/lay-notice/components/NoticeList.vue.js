/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import NoticeItem from "./NoticeItem.vue";
import { transformI18n } from "@bit-labs.cn/owl-ui/plugins/i18n";
const __VLS_props = defineProps({
    list: {
        type: Array,
        default: () => []
    },
    emptyText: {
        type: String,
        default: ""
    }
});
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
if (__VLS_ctx.list.length) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    for (const [item, index] of __VLS_vFor((__VLS_ctx.list))) {
        const __VLS_0 = NoticeItem;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
            key: (index),
            noticeItem: (item),
        }));
        const __VLS_2 = __VLS_1({
            key: (index),
            noticeItem: (item),
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        // @ts-ignore
        [list, list,];
    }
}
else {
    let __VLS_5;
    /** @ts-ignore @type { | typeof __VLS_components.elEmpty | typeof __VLS_components.ElEmpty | typeof __VLS_components['el-empty']} */
    elEmpty;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
        description: (__VLS_ctx.transformI18n(__VLS_ctx.emptyText)),
    }));
    const __VLS_7 = __VLS_6({
        description: (__VLS_ctx.transformI18n(__VLS_ctx.emptyText)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    var __VLS_10 = {};
    var __VLS_8;
}
// @ts-ignore
[transformI18n, emptyText,];
const __VLS_export = (await import('vue')).defineComponent({
    props: {
        list: {
            type: Array,
            default: () => []
        },
        emptyText: {
            type: String,
            default: ""
        }
    },
});
export default {};
//# sourceMappingURL=NoticeList.vue.js.map