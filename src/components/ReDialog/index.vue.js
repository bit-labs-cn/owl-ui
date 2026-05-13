/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Administrator/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { closeDialog, dialogStore } from "./index";
import { ref, computed } from "vue";
import { isFunction } from "@pureadmin/utils";
import Fullscreen from "@iconify-icons/ri/fullscreen-fill";
import ExitFullscreen from "@iconify-icons/ri/fullscreen-exit-fill";
defineOptions({
    name: "ReDialog"
});
const sureBtnMap = ref({});
const fullscreen = ref(false);
const footerButtons = computed(() => {
    return (options) => {
        return options?.footerButtons?.length > 0
            ? options.footerButtons
            : [
                {
                    label: "取消",
                    text: true,
                    bg: true,
                    btnClick: ({ dialog: { options, index } }) => {
                        const done = () => closeDialog(options, index, { command: "cancel" });
                        if (options?.beforeCancel && isFunction(options?.beforeCancel)) {
                            options.beforeCancel(done, { options, index });
                        }
                        else {
                            done();
                        }
                    }
                },
                {
                    label: "确定",
                    type: "primary",
                    text: true,
                    bg: true,
                    popconfirm: options?.popconfirm,
                    btnClick: ({ dialog: { options, index } }) => {
                        if (options?.sureBtnLoading) {
                            sureBtnMap.value[index] = Object.assign({}, sureBtnMap.value[index], {
                                loading: true
                            });
                        }
                        const closeLoading = () => {
                            if (options?.sureBtnLoading) {
                                sureBtnMap.value[index].loading = false;
                            }
                        };
                        const done = () => {
                            closeLoading();
                            closeDialog(options, index, { command: "sure" });
                        };
                        if (options?.beforeSure && isFunction(options?.beforeSure)) {
                            options.beforeSure(done, { options, index, closeLoading });
                        }
                        else {
                            done();
                        }
                    }
                }
            ];
    };
});
const fullscreenClass = computed(() => {
    return [
        "el-icon",
        "el-dialog__close",
        "-translate-x-2",
        "cursor-pointer",
        "hover:!text-[red]"
    ];
});
function eventsCallBack(event, options, index, isClickFullScreen = false) {
    if (!isClickFullScreen)
        fullscreen.value = options?.fullscreen ?? false;
    if (options?.[event] && isFunction(options?.[event])) {
        return options?.[event]({ options, index });
    }
}
function handleClose(options, index, args = { command: "close" }) {
    closeDialog(options, index, args);
    eventsCallBack("close", options, index);
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
for (const [options, index] of __VLS_vFor((__VLS_ctx.dialogStore))) {
    let __VLS_0;
    /** @ts-ignore @type { | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog'] | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog']} */
    elDialog;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        ...{ 'onClosed': {} },
        ...{ 'onOpened': {} },
        ...{ 'onOpenAutoFocus': {} },
        ...{ 'onCloseAutoFocus': {} },
        key: (index),
        ...(options),
        modelValue: (options.visible),
        ...{ class: "pure-dialog" },
        alignCenter: (options?.alignCenter !== false),
        fullscreen: (__VLS_ctx.fullscreen ? true : options?.fullscreen ? true : false),
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onClosed': {} },
        ...{ 'onOpened': {} },
        ...{ 'onOpenAutoFocus': {} },
        ...{ 'onCloseAutoFocus': {} },
        key: (index),
        ...(options),
        modelValue: (options.visible),
        ...{ class: "pure-dialog" },
        alignCenter: (options?.alignCenter !== false),
        fullscreen: (__VLS_ctx.fullscreen ? true : options?.fullscreen ? true : false),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_5;
    const __VLS_6 = ({ closed: {} },
        { onClosed: (...[$event]) => {
                __VLS_ctx.handleClose(options, index);
                // @ts-ignore
                [dialogStore, fullscreen, handleClose,];
            } });
    const __VLS_7 = ({ opened: {} },
        { onOpened: (...[$event]) => {
                __VLS_ctx.eventsCallBack('open', options, index);
                // @ts-ignore
                [eventsCallBack,];
            } });
    const __VLS_8 = ({ openAutoFocus: {} },
        { onOpenAutoFocus: (...[$event]) => {
                __VLS_ctx.eventsCallBack('openAutoFocus', options, index);
                // @ts-ignore
                [eventsCallBack,];
            } });
    const __VLS_9 = ({ closeAutoFocus: {} },
        { onCloseAutoFocus: (...[$event]) => {
                __VLS_ctx.eventsCallBack('closeAutoFocus', options, index);
                // @ts-ignore
                [eventsCallBack,];
            } });
    /** @type {__VLS_StyleScopedClasses['pure-dialog']} */ ;
    const { default: __VLS_10 } = __VLS_3.slots;
    if (options?.fullscreenIcon || options?.headerRenderer) {
        {
            const { header: __VLS_11 } = __VLS_3.slots;
            const [{ close, titleId, titleClass }] = __VLS_vSlot(__VLS_11);
            if (options?.fullscreenIcon) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "flex items-center justify-between" },
                });
                /** @type {__VLS_StyleScopedClasses['flex']} */ ;
                /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
                /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                    id: (titleId),
                    ...{ class: (titleClass) },
                });
                (options?.title);
                if (!options?.fullscreen) {
                    __VLS_asFunctionalElement1(__VLS_intrinsics.i, __VLS_intrinsics.i)({
                        ...{ onClick: (() => {
                                __VLS_ctx.fullscreen = !__VLS_ctx.fullscreen;
                                __VLS_ctx.eventsCallBack('fullscreenCallBack', { ...options, fullscreen: __VLS_ctx.fullscreen }, index, true);
                            }) },
                        ...{ class: (__VLS_ctx.fullscreenClass) },
                    });
                    let __VLS_12;
                    /** @ts-ignore @type { | typeof __VLS_components.IconifyIconOffline} */
                    IconifyIconOffline;
                    // @ts-ignore
                    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
                        ...{ class: "pure-dialog-svg" },
                        icon: (options?.fullscreen
                            ? __VLS_ctx.ExitFullscreen
                            : __VLS_ctx.fullscreen
                                ? __VLS_ctx.ExitFullscreen
                                : __VLS_ctx.Fullscreen),
                    }));
                    const __VLS_14 = __VLS_13({
                        ...{ class: "pure-dialog-svg" },
                        icon: (options?.fullscreen
                            ? __VLS_ctx.ExitFullscreen
                            : __VLS_ctx.fullscreen
                                ? __VLS_ctx.ExitFullscreen
                                : __VLS_ctx.Fullscreen),
                    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
                    /** @type {__VLS_StyleScopedClasses['pure-dialog-svg']} */ ;
                }
            }
            else {
                const __VLS_17 = (options?.headerRenderer({ close, titleId, titleClass }));
                // @ts-ignore
                const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({}));
                const __VLS_19 = __VLS_18({}, ...__VLS_functionalComponentArgsRest(__VLS_18));
            }
            // @ts-ignore
            [fullscreen, fullscreen, fullscreen, fullscreen, eventsCallBack, fullscreenClass, ExitFullscreen, ExitFullscreen, Fullscreen,];
        }
    }
    const __VLS_22 = (options.contentRenderer({ options, index }));
    // @ts-ignore
    const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({
        ...{ 'onClose': {} },
        ...(options?.props),
    }));
    const __VLS_24 = __VLS_23({
        ...{ 'onClose': {} },
        ...(options?.props),
    }, ...__VLS_functionalComponentArgsRest(__VLS_23));
    let __VLS_27;
    const __VLS_28 = ({ close: {} },
        { onClose: (args => __VLS_ctx.handleClose(options, index, args)) });
    var __VLS_25;
    var __VLS_26;
    if (!options?.hideFooter) {
        {
            const { footer: __VLS_29 } = __VLS_3.slots;
            if (options?.footerRenderer) {
                const __VLS_30 = (options?.footerRenderer({ options, index }));
                // @ts-ignore
                const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({}));
                const __VLS_32 = __VLS_31({}, ...__VLS_functionalComponentArgsRest(__VLS_31));
            }
            else {
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
                for (const [btn, key] of __VLS_vFor((__VLS_ctx.footerButtons(options)))) {
                    (key);
                    if (btn.popconfirm) {
                        let __VLS_35;
                        /** @ts-ignore @type { | typeof __VLS_components.elPopconfirm | typeof __VLS_components.ElPopconfirm | typeof __VLS_components['el-popconfirm'] | typeof __VLS_components.elPopconfirm | typeof __VLS_components.ElPopconfirm | typeof __VLS_components['el-popconfirm']} */
                        elPopconfirm;
                        // @ts-ignore
                        const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
                            ...{ 'onConfirm': {} },
                            ...(btn.popconfirm),
                        }));
                        const __VLS_37 = __VLS_36({
                            ...{ 'onConfirm': {} },
                            ...(btn.popconfirm),
                        }, ...__VLS_functionalComponentArgsRest(__VLS_36));
                        let __VLS_40;
                        const __VLS_41 = ({ confirm: {} },
                            { onConfirm: (...[$event]) => {
                                    if (!(!options?.hideFooter))
                                        return;
                                    if (!!(options?.footerRenderer))
                                        return;
                                    if (!(btn.popconfirm))
                                        return;
                                    btn.btnClick({
                                        dialog: { options, index },
                                        button: { btn, index: key }
                                    });
                                    // @ts-ignore
                                    [handleClose, footerButtons,];
                                } });
                        const { default: __VLS_42 } = __VLS_38.slots;
                        {
                            const { reference: __VLS_43 } = __VLS_38.slots;
                            let __VLS_44;
                            /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
                            elButton;
                            // @ts-ignore
                            const __VLS_45 = __VLS_asFunctionalComponent1(__VLS_44, new __VLS_44({
                                ...(btn),
                            }));
                            const __VLS_46 = __VLS_45({
                                ...(btn),
                            }, ...__VLS_functionalComponentArgsRest(__VLS_45));
                            const { default: __VLS_49 } = __VLS_47.slots;
                            (btn?.label);
                            // @ts-ignore
                            [];
                            var __VLS_47;
                            // @ts-ignore
                            [];
                        }
                        // @ts-ignore
                        [];
                        var __VLS_38;
                        var __VLS_39;
                    }
                    else {
                        let __VLS_50;
                        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
                        elButton;
                        // @ts-ignore
                        const __VLS_51 = __VLS_asFunctionalComponent1(__VLS_50, new __VLS_50({
                            ...{ 'onClick': {} },
                            ...(btn),
                            loading: (key === 1 && __VLS_ctx.sureBtnMap[index]?.loading),
                        }));
                        const __VLS_52 = __VLS_51({
                            ...{ 'onClick': {} },
                            ...(btn),
                            loading: (key === 1 && __VLS_ctx.sureBtnMap[index]?.loading),
                        }, ...__VLS_functionalComponentArgsRest(__VLS_51));
                        let __VLS_55;
                        const __VLS_56 = ({ click: {} },
                            { onClick: (...[$event]) => {
                                    if (!(!options?.hideFooter))
                                        return;
                                    if (!!(options?.footerRenderer))
                                        return;
                                    if (!!(btn.popconfirm))
                                        return;
                                    btn.btnClick({
                                        dialog: { options, index },
                                        button: { btn, index: key }
                                    });
                                    // @ts-ignore
                                    [sureBtnMap,];
                                } });
                        const { default: __VLS_57 } = __VLS_53.slots;
                        (btn?.label);
                        // @ts-ignore
                        [];
                        var __VLS_53;
                        var __VLS_54;
                    }
                    // @ts-ignore
                    [];
                }
            }
            // @ts-ignore
            [];
        }
    }
    // @ts-ignore
    [];
    var __VLS_3;
    var __VLS_4;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=index.vue.js.map