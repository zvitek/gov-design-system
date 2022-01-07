export interface ButtonProps {
    label?: string;
    loading?: boolean;
    rounded?: boolean;
    outlined?: boolean;
    focused?: boolean;
    inverted?: boolean;
    hovered?: boolean;
    active?: boolean;
    'native-type'?: string;
    'tag'?: 'button' | 'a' | 'input' | 'router-link' | 'nuxt-link' | string;
}
