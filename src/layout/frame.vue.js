/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { ref, unref, watch, onMounted, nextTick } from "vue";
defineOptions({
    name: "LayFrame"
});
const props = defineProps();
const { t } = useI18n();
const loading = ref(true);
const currentRoute = useRoute();
const frameSrc = ref("");
const frameRef = ref(null);
if (unref(currentRoute.meta)?.frameSrc) {
    frameSrc.value = unref(currentRoute.meta)?.frameSrc;
}
unref(currentRoute.meta)?.frameLoading === false && hideLoading();
function hideLoading() {
    loading.value = false;
}
function init() {
    nextTick(() => {
        const iframe = unref(frameRef);
        if (!iframe)
            return;
        const _frame = iframe;
        if (_frame.attachEvent) {
            _frame.attachEvent("onload", () => {
                hideLoading();
            });
        }
        else {
            iframe.onload = () => {
                hideLoading();
            };
        }
    });
}
watch(() => currentRoute.fullPath, path => {
    if (currentRoute.name === "Redirect" &&
        path.includes(props.frameInfo?.fullPath)) {
        frameSrc.value = path; // redirect时，置换成任意值，待重定向后 重新赋值
        loading.value = true;
    }
    // 重新赋值
    if (props.frameInfo?.fullPath === path) {
        frameSrc.value = props.frameInfo?.frameSrc;
    }
});
onMounted(() => {
    init();
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "frame" },
    'element-loading-text': (__VLS_ctx.t('status.pureLoad')),
});
__VLS_asFunctionalDirective(__VLS_directives.vLoading, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
/** @type {__VLS_StyleScopedClasses['frame']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.iframe)({
    ref: "frameRef",
    src: (__VLS_ctx.frameSrc),
    ...{ class: "frame-iframe" },
});
/** @type {__VLS_StyleScopedClasses['frame-iframe']} */ ;
// @ts-ignore
[t, vLoading, loading, frameSrc,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
//# sourceMappingURL=frame.vue.js.map