/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { defineComponent } from "vue";
import { ElConfigProvider } from "element-plus";
import { ReDialog } from "@bit-labs.cn/owl-ui/components/ReDialog";
import en from "element-plus/es/locale/lang/en";
import zhCn from "element-plus/es/locale/lang/zh-cn";
export default {};
;
const __VLS_ctx = {};
const __VLS_componentsOption = {
    [ElConfigProvider.name]: ElConfigProvider,
    ReDialog
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elConfigProvider | typeof __VLS_components.ElConfigProvider | typeof __VLS_components['el-config-provider'] | typeof __VLS_components.elConfigProvider | typeof __VLS_components.ElConfigProvider | typeof __VLS_components['el-config-provider']} */
elConfigProvider;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    locale: (__VLS_ctx.currentLocale),
}));
const __VLS_2 = __VLS_1({
    locale: (__VLS_ctx.currentLocale),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.routerView | typeof __VLS_components.RouterView | typeof __VLS_components['router-view']} */
routerView;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({}));
const __VLS_9 = __VLS_8({}, ...__VLS_functionalComponentArgsRest(__VLS_8));
let __VLS_12;
/** @ts-ignore @type { | typeof __VLS_components.ReDialog} */
ReDialog;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({}));
const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
// @ts-ignore
[currentLocale,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = defineComponent({
    name: "app",
    components: {
        [ElConfigProvider.name]: ElConfigProvider,
        ReDialog
    },
    computed: {
        currentLocale() {
            return this.$storage.locale?.locale === "zh" ? zhCn : en;
        }
    }
});
//# sourceMappingURL=App.vue.js.map