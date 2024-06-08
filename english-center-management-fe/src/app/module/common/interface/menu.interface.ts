import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface Menu {
    title?: string;
    icon: IconDefinition;
    label: string;
    role?: string[];
    link?: string;
    collapse?: boolean;
    children?: Menu[];
}
