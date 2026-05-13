/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, markRaw } from "vue";
import { useDark, randomGradient } from "./utils";
import WelcomeTable from "./components/table/index.vue";
import { ReNormalCountTo } from "@bit-labs.cn/owl-ui/components/ReCountTo";
import { useRenderFlicker } from "@bit-labs.cn/owl-ui/components/ReFlicker";
import { ChartBar, ChartLine, ChartRound } from "./components/charts";
import Segmented from "@bit-labs.cn/owl-ui/components/ReSegmented";
import { chartData, barChartData, progressData, latestNewsData } from "./data";
defineOptions({
    name: "Welcome"
});
const { isDark } = useDark();
let curWeek = ref(1); // 0上周、1本周
const optionsBasis = [
    {
        label: "上周"
    },
    {
        label: "本周"
    }
];
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components['el-row'] | typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components['el-row']} */
elRow;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    gutter: (24),
    justify: "space-around",
}));
const __VLS_2 = __VLS_1({
    gutter: (24),
    justify: "space-around",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
for (const [item, index] of __VLS_vFor((__VLS_ctx.chartData))) {
    let __VLS_6;
    /** @ts-ignore @type { | typeof __VLS_components.reCol | typeof __VLS_components.ReCol | typeof __VLS_components['re-col'] | typeof __VLS_components.reCol | typeof __VLS_components.ReCol | typeof __VLS_components['re-col']} */
    reCol;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        key: (index),
        ...{ class: "mb-[18px]" },
        value: (6),
        md: (12),
        sm: (12),
        xs: (24),
        initial: ({
            opacity: 0,
            y: 100
        }),
        enter: ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 80 * (index + 1)
            }
        }),
    }));
    const __VLS_8 = __VLS_7({
        key: (index),
        ...{ class: "mb-[18px]" },
        value: (6),
        md: (12),
        sm: (12),
        xs: (24),
        initial: ({
            opacity: 0,
            y: 100
        }),
        enter: ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 80 * (index + 1)
            }
        }),
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    __VLS_asFunctionalDirective(__VLS_directives.vMotion, {})(null, { ...__VLS_directiveBindingRestFields, }, null, null);
    /** @type {__VLS_StyleScopedClasses['mb-[18px]']} */ ;
    const { default: __VLS_11 } = __VLS_9.slots;
    let __VLS_12;
    /** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
    elCard;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
        ...{ class: "line-card" },
        shadow: "never",
    }));
    const __VLS_14 = __VLS_13({
        ...{ class: "line-card" },
        shadow: "never",
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    /** @type {__VLS_StyleScopedClasses['line-card']} */ ;
    const { default: __VLS_17 } = __VLS_15.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex justify-between" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-md font-medium" },
    });
    /** @type {__VLS_StyleScopedClasses['text-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    (item.name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-8 h-8 flex justify-center items-center rounded-md" },
        ...{ style: ({
                backgroundColor: __VLS_ctx.isDark ? 'transparent' : item.bgColor
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['w-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
    let __VLS_18;
    /** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
    IconifyIconOffline;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
        icon: (item.icon),
        color: (item.color),
        width: "18",
    }));
    const __VLS_20 = __VLS_19({
        icon: (item.icon),
        color: (item.color),
        width: "18",
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex justify-between items-start mt-3" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-start']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-1/2" },
    });
    /** @type {__VLS_StyleScopedClasses['w-1/2']} */ ;
    let __VLS_23;
    /** @ts-ignore @type { | typeof __VLS_components.ReNormalCountTo} */
    ReNormalCountTo;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
        duration: (item.duration),
        fontSize: ('1.6em'),
        startVal: (100),
        endVal: (item.value),
    }));
    const __VLS_25 = __VLS_24({
        duration: (item.duration),
        fontSize: ('1.6em'),
        startVal: (100),
        endVal: (item.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_24));
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "font-medium text-green-500" },
    });
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-green-500']} */ ;
    (item.percent);
    if (item.data.length > 1) {
        let __VLS_28;
        /** @ts-ignore @type { | typeof __VLS_components.ChartLine} */
        ChartLine;
        // @ts-ignore
        const __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28({
            ...{ class: "!w-1/2" },
            color: (item.color),
            data: (item.data),
        }));
        const __VLS_30 = __VLS_29({
            ...{ class: "!w-1/2" },
            color: (item.color),
            data: (item.data),
        }, ...__VLS_functionalComponentArgsRest(__VLS_29));
        /** @type {__VLS_StyleScopedClasses['!w-1/2']} */ ;
    }
    else {
        let __VLS_33;
        /** @ts-ignore @type { | typeof __VLS_components.ChartRound} */
        ChartRound;
        // @ts-ignore
        const __VLS_34 = __VLS_asFunctionalComponent1(__VLS_33, new __VLS_33({
            ...{ class: "!w-1/2" },
        }));
        const __VLS_35 = __VLS_34({
            ...{ class: "!w-1/2" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_34));
        /** @type {__VLS_StyleScopedClasses['!w-1/2']} */ ;
    }
    // @ts-ignore
    [chartData, vMotion, isDark,];
    var __VLS_15;
    // @ts-ignore
    [];
    var __VLS_9;
    // @ts-ignore
    [];
}
let __VLS_38;
/** @ts-ignore @type { | typeof __VLS_components.reCol | typeof __VLS_components.ReCol | typeof __VLS_components['re-col'] | typeof __VLS_components.reCol | typeof __VLS_components.ReCol | typeof __VLS_components['re-col']} */
reCol;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({
    ...{ class: "mb-[18px]" },
    value: (18),
    xs: (24),
    initial: ({
        opacity: 0,
        y: 100
    }),
    enter: ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 400
        }
    }),
}));
const __VLS_40 = __VLS_39({
    ...{ class: "mb-[18px]" },
    value: (18),
    xs: (24),
    initial: ({
        opacity: 0,
        y: 100
    }),
    enter: ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 400
        }
    }),
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
__VLS_asFunctionalDirective(__VLS_directives.vMotion, {})(null, { ...__VLS_directiveBindingRestFields, }, null, null);
/** @type {__VLS_StyleScopedClasses['mb-[18px]']} */ ;
const { default: __VLS_43 } = __VLS_41.slots;
let __VLS_44;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent1(__VLS_44, new __VLS_44({
    ...{ class: "bar-card" },
    shadow: "never",
}));
const __VLS_46 = __VLS_45({
    ...{ class: "bar-card" },
    shadow: "never",
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
/** @type {__VLS_StyleScopedClasses['bar-card']} */ ;
const { default: __VLS_49 } = __VLS_47.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-md font-medium" },
});
/** @type {__VLS_StyleScopedClasses['text-md']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
let __VLS_50;
/** @ts-ignore @type { | typeof __VLS_components.Segmented} */
Segmented;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent1(__VLS_50, new __VLS_50({
    modelValue: (__VLS_ctx.curWeek),
    options: (__VLS_ctx.optionsBasis),
}));
const __VLS_52 = __VLS_51({
    modelValue: (__VLS_ctx.curWeek),
    options: (__VLS_ctx.optionsBasis),
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex justify-between items-start mt-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
let __VLS_55;
/** @ts-ignore @type { | typeof __VLS_components.ChartBar} */
ChartBar;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent1(__VLS_55, new __VLS_55({
    requireData: (__VLS_ctx.barChartData[__VLS_ctx.curWeek].requireData),
    questionData: (__VLS_ctx.barChartData[__VLS_ctx.curWeek].questionData),
}));
const __VLS_57 = __VLS_56({
    requireData: (__VLS_ctx.barChartData[__VLS_ctx.curWeek].requireData),
    questionData: (__VLS_ctx.barChartData[__VLS_ctx.curWeek].questionData),
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
// @ts-ignore
[vMotion, curWeek, curWeek, curWeek, optionsBasis, barChartData, barChartData,];
var __VLS_47;
// @ts-ignore
[];
var __VLS_41;
let __VLS_60;
/** @ts-ignore @type { | typeof __VLS_components.reCol | typeof __VLS_components.ReCol | typeof __VLS_components['re-col'] | typeof __VLS_components.reCol | typeof __VLS_components.ReCol | typeof __VLS_components['re-col']} */
reCol;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({
    ...{ class: "mb-[18px]" },
    value: (6),
    xs: (24),
    initial: ({
        opacity: 0,
        y: 100
    }),
    enter: ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 480
        }
    }),
}));
const __VLS_62 = __VLS_61({
    ...{ class: "mb-[18px]" },
    value: (6),
    xs: (24),
    initial: ({
        opacity: 0,
        y: 100
    }),
    enter: ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 480
        }
    }),
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
__VLS_asFunctionalDirective(__VLS_directives.vMotion, {})(null, { ...__VLS_directiveBindingRestFields, }, null, null);
/** @type {__VLS_StyleScopedClasses['mb-[18px]']} */ ;
const { default: __VLS_65 } = __VLS_63.slots;
let __VLS_66;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
    shadow: "never",
}));
const __VLS_68 = __VLS_67({
    shadow: "never",
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
const { default: __VLS_71 } = __VLS_69.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-md font-medium" },
});
/** @type {__VLS_StyleScopedClasses['text-md']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
for (const [item, index] of __VLS_vFor((__VLS_ctx.progressData))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (index),
        ...{ class: ([
                'flex',
                'justify-between',
                'items-start',
                index === 0 ? 'mt-8' : 'mt-[2.15rem]'
            ]) },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-start']} */ ;
    let __VLS_72;
    /** @ts-ignore @type { | typeof __VLS_components.elProgress | typeof __VLS_components.ElProgress | typeof __VLS_components['el-progress']} */
    elProgress;
    // @ts-ignore
    const __VLS_73 = __VLS_asFunctionalComponent1(__VLS_72, new __VLS_72({
        textInside: (true),
        percentage: (item.percentage),
        strokeWidth: (21),
        color: (item.color),
        striped: true,
        stripedFlow: true,
        duration: (item.duration),
    }));
    const __VLS_74 = __VLS_73({
        textInside: (true),
        percentage: (item.percentage),
        strokeWidth: (21),
        color: (item.color),
        striped: true,
        stripedFlow: true,
        duration: (item.duration),
    }, ...__VLS_functionalComponentArgsRest(__VLS_73));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-nowrap ml-2 text-text_color_regular text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['text-nowrap']} */ ;
    /** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-text_color_regular']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    (item.week);
    // @ts-ignore
    [vMotion, progressData,];
}
// @ts-ignore
[];
var __VLS_69;
// @ts-ignore
[];
var __VLS_63;
let __VLS_77;
/** @ts-ignore @type { | typeof __VLS_components.reCol | typeof __VLS_components.ReCol | typeof __VLS_components['re-col'] | typeof __VLS_components.reCol | typeof __VLS_components.ReCol | typeof __VLS_components['re-col']} */
reCol;
// @ts-ignore
const __VLS_78 = __VLS_asFunctionalComponent1(__VLS_77, new __VLS_77({
    ...{ class: "mb-[18px]" },
    value: (18),
    xs: (24),
    initial: ({
        opacity: 0,
        y: 100
    }),
    enter: ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 560
        }
    }),
}));
const __VLS_79 = __VLS_78({
    ...{ class: "mb-[18px]" },
    value: (18),
    xs: (24),
    initial: ({
        opacity: 0,
        y: 100
    }),
    enter: ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 560
        }
    }),
}, ...__VLS_functionalComponentArgsRest(__VLS_78));
__VLS_asFunctionalDirective(__VLS_directives.vMotion, {})(null, { ...__VLS_directiveBindingRestFields, }, null, null);
/** @type {__VLS_StyleScopedClasses['mb-[18px]']} */ ;
const { default: __VLS_82 } = __VLS_80.slots;
let __VLS_83;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_84 = __VLS_asFunctionalComponent1(__VLS_83, new __VLS_83({
    shadow: "never",
    ...{ class: "h-[580px]" },
}));
const __VLS_85 = __VLS_84({
    shadow: "never",
    ...{ class: "h-[580px]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_84));
/** @type {__VLS_StyleScopedClasses['h-[580px]']} */ ;
const { default: __VLS_88 } = __VLS_86.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-md font-medium" },
});
/** @type {__VLS_StyleScopedClasses['text-md']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
const __VLS_89 = WelcomeTable;
// @ts-ignore
const __VLS_90 = __VLS_asFunctionalComponent1(__VLS_89, new __VLS_89({
    ...{ class: "mt-3" },
}));
const __VLS_91 = __VLS_90({
    ...{ class: "mt-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_90));
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
// @ts-ignore
[vMotion,];
var __VLS_86;
// @ts-ignore
[];
var __VLS_80;
let __VLS_94;
/** @ts-ignore @type { | typeof __VLS_components.reCol | typeof __VLS_components.ReCol | typeof __VLS_components['re-col'] | typeof __VLS_components.reCol | typeof __VLS_components.ReCol | typeof __VLS_components['re-col']} */
reCol;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent1(__VLS_94, new __VLS_94({
    ...{ class: "mb-[18px]" },
    value: (6),
    xs: (24),
    initial: ({
        opacity: 0,
        y: 100
    }),
    enter: ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 640
        }
    }),
}));
const __VLS_96 = __VLS_95({
    ...{ class: "mb-[18px]" },
    value: (6),
    xs: (24),
    initial: ({
        opacity: 0,
        y: 100
    }),
    enter: ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 640
        }
    }),
}, ...__VLS_functionalComponentArgsRest(__VLS_95));
__VLS_asFunctionalDirective(__VLS_directives.vMotion, {})(null, { ...__VLS_directiveBindingRestFields, }, null, null);
/** @type {__VLS_StyleScopedClasses['mb-[18px]']} */ ;
const { default: __VLS_99 } = __VLS_97.slots;
let __VLS_100;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_101 = __VLS_asFunctionalComponent1(__VLS_100, new __VLS_100({
    shadow: "never",
}));
const __VLS_102 = __VLS_101({
    shadow: "never",
}, ...__VLS_functionalComponentArgsRest(__VLS_101));
const { default: __VLS_105 } = __VLS_103.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-md font-medium" },
});
/** @type {__VLS_StyleScopedClasses['text-md']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
let __VLS_106;
/** @ts-ignore @type { | typeof __VLS_components.elScrollbar | typeof __VLS_components.ElScrollbar | typeof __VLS_components['el-scrollbar'] | typeof __VLS_components.elScrollbar | typeof __VLS_components.ElScrollbar | typeof __VLS_components['el-scrollbar']} */
elScrollbar;
// @ts-ignore
const __VLS_107 = __VLS_asFunctionalComponent1(__VLS_106, new __VLS_106({
    maxHeight: "504",
    ...{ class: "mt-3" },
}));
const __VLS_108 = __VLS_107({
    maxHeight: "504",
    ...{ class: "mt-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_107));
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
const { default: __VLS_111 } = __VLS_109.slots;
let __VLS_112;
/** @ts-ignore @type { | typeof __VLS_components.elTimeline | typeof __VLS_components.ElTimeline | typeof __VLS_components['el-timeline'] | typeof __VLS_components.elTimeline | typeof __VLS_components.ElTimeline | typeof __VLS_components['el-timeline']} */
elTimeline;
// @ts-ignore
const __VLS_113 = __VLS_asFunctionalComponent1(__VLS_112, new __VLS_112({}));
const __VLS_114 = __VLS_113({}, ...__VLS_functionalComponentArgsRest(__VLS_113));
const { default: __VLS_117 } = __VLS_115.slots;
for (const [item, index] of __VLS_vFor((__VLS_ctx.latestNewsData))) {
    let __VLS_118;
    /** @ts-ignore @type { | typeof __VLS_components.elTimelineItem | typeof __VLS_components.ElTimelineItem | typeof __VLS_components['el-timeline-item'] | typeof __VLS_components.elTimelineItem | typeof __VLS_components.ElTimelineItem | typeof __VLS_components['el-timeline-item']} */
    elTimelineItem;
    // @ts-ignore
    const __VLS_119 = __VLS_asFunctionalComponent1(__VLS_118, new __VLS_118({
        key: (index),
        center: true,
        placement: "top",
        icon: (__VLS_ctx.markRaw(__VLS_ctx.useRenderFlicker({
            background: __VLS_ctx.randomGradient({
                randomizeHue: true
            })
        }))),
        timestamp: (item.date),
    }));
    const __VLS_120 = __VLS_119({
        key: (index),
        center: true,
        placement: "top",
        icon: (__VLS_ctx.markRaw(__VLS_ctx.useRenderFlicker({
            background: __VLS_ctx.randomGradient({
                randomizeHue: true
            })
        }))),
        timestamp: (item.date),
    }, ...__VLS_functionalComponentArgsRest(__VLS_119));
    const { default: __VLS_123 } = __VLS_121.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-text_color_regular text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['text-text_color_regular']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    (`新增 ${item.requiredNumber} 条问题，${item.resolveNumber} 条已解决`);
    // @ts-ignore
    [vMotion, latestNewsData, markRaw, useRenderFlicker, randomGradient,];
    var __VLS_121;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_115;
// @ts-ignore
[];
var __VLS_109;
// @ts-ignore
[];
var __VLS_103;
// @ts-ignore
[];
var __VLS_97;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=index.vue.js.map