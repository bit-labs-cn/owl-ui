/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, computed } from "vue";
import { useDark, useECharts } from "@pureadmin/utils";
const { isDark } = useDark();
const theme = computed(() => (isDark.value ? "dark" : "light"));
const chartRef = ref();
const { setOptions } = useECharts(chartRef, {
    theme,
    renderer: "svg"
});
setOptions({
    container: ".line-card",
    title: {
        text: "100%",
        left: "47%",
        top: "30%",
        textAlign: "center",
        textStyle: {
            fontSize: "16",
            fontWeight: 600
        }
    },
    polar: {
        radius: ["100%", "90%"],
        center: ["50%", "50%"]
    },
    angleAxis: {
        max: 100,
        show: false
    },
    radiusAxis: {
        type: "category",
        show: true,
        axisLabel: {
            show: false
        },
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        }
    },
    series: [
        {
            type: "bar",
            roundCap: true,
            barWidth: 2,
            showBackground: true,
            backgroundStyle: {
                color: "#dfe7ef"
            },
            data: [100],
            coordinateSystem: "polar",
            color: "#7846e5",
            itemStyle: {
                shadowBlur: 2,
                shadowColor: "#7846e5",
                shadowOffsetX: 0,
                shadowOffsetY: 0
            }
        }
    ]
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ref: "chartRef",
    ...{ style: {} },
});
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=ChartRound.vue.js.map