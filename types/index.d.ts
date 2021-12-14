import _Vue from "vue";

import {
    GovConfig,
    DialogProgrammatic,
    ModalProgrammatic,
    LoadingProgrammatic,
    ToastProgrammatic,
    SnackbarProgrammatic,
    NotificationProgrammatic,
    ConfigProgrammatic } from "./components";

// Adds Gov method signatures to Vue instance (ie this.$gov.dialog)
declare module 'vue/types/vue' {
    interface Vue {
        $gov: GovNamespace
    }
}

export declare type GovNamespace = {
    dialog: typeof DialogProgrammatic,
    loading: typeof LoadingProgrammatic,
    modal: typeof ModalProgrammatic,
    snackbar: typeof SnackbarProgrammatic,
    toast: typeof ToastProgrammatic,
    notification: typeof NotificationProgrammatic

}

declare const _default: {
    install(Vue: typeof _Vue, config: GovConfig): void;
};

export {
    DialogProgrammatic,
    LoadingProgrammatic,
    ModalProgrammatic,
    SnackbarProgrammatic,
    ToastProgrammatic,
    NotificationProgrammatic,
    ConfigProgrammatic
}

export default _default;
