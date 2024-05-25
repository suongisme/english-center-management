import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ICellRendererParams } from 'ag-grid-community';
export interface ActionColumn {
    i18Key?: string;
    label?: string;
    onClick: (params: ICellRendererParams) => void;
    icon: IconDefinition;
    classes?: string;
}
