import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface SingleSignOn {
    label: string;
    icon: IconDefinition;
    code: SingleSignOnEnum;
    classes?: string[];
}

export enum SingleSignOnEnum {
    GOOGLE,
    FACEBOOK,
}
