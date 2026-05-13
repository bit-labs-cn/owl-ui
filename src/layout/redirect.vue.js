/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { unref } from "vue";
import { useRouter } from "vue-router";
defineOptions({
    name: "Redirect"
});
const { currentRoute, replace } = useRouter();
const { params, query } = unref(currentRoute);
const { path } = params;
const _path = Array.isArray(path) ? path.join("/") : path;
replace({
    path: "/" + _path,
    query
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({});
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=redirect.vue.js.map