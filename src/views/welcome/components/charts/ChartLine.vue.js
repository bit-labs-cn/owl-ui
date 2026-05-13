/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, computed } from "vue";
import { useDark, useECharts } from "@pureadmin/utils";
const props = defineProps({
    data: {
        type: Array,
        default: () => []
    },
    color: {
        type: String,
        default: "#41b6ff"
    }
});
const { isDark } = useDark();
const theme = computed(() => (isDark.value ? "dark" : "light"));
const chartRef = ref();
const { setOptions } = useECharts(chartRef, {
    theme,
    renderer: "svg"
});
setOptions({
    container: ".line-card",
    xAxis: {
        type: "category",
        show: false,
        data: props.data
    },
    grid: {
        top: "15px",
        bottom: 0,
        left: 0,
        right: 0
    },
    yAxis: {
        show: false,
        type: "value"
    },
    series: [
        {
            data: props.data,
            type: "line",
            symbol: "none",
            smooth: true,
            color: props.color,
            lineStyle: {
                shadowOffsetY: 3,
                shadowBlur: 7,
                shadowColor: props.color
            }
        }
    ]
});
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ref: "chartRef",
    ...{ style: {} },
});
const __VLS_export = (await import('vue')).defineComponent({
    props: {
        data: {
            type: Array,
            default: () => []
        },
        color: {
            type: String,
            default: "#41b6ff"
        }
    },
});
export default {};
//# sourceMappingURL=ChartLine.vue.js.map