import _Vue from "vue";

// Component base definition
export class GovComponent extends _Vue {
    // Simple catch-all to allow any prop/type
    //@ts-ignore
    [key: string]: any
}

export declare type GovConfig = {
    defaultContainerElement?: string,
    defaultIconPack?: string;
    defaultIconComponent?: string;
    defaultLocale?: undefined | string | string[],
    defaultLinkTags?: string[];
    customIconPacks?: any;
};

export declare const ConfigProgrammatic: {
    getOptions: () => GovConfig
    setOptions: (params: GovConfig) => any
}
