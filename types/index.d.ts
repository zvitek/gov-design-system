import _Vue from "vue";

import {
    GovConfig,
    ConfigProgrammatic } from "./components";

// Adds Gov method signatures to Vue instance (ie this.$gov.dialog)
declare module 'vue/types/vue' {
    interface Vue {
        $gov: GovNamespace
    }
}

export declare type GovNamespace = {
}

declare const _default: {
    install(Vue: typeof _Vue, config: GovConfig): void;
};

export {
    ConfigProgrammatic
}

export default _default;
