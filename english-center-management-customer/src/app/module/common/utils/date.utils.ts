import { formatDate as formatDateAngular } from '@angular/common';

export function formatDate(
    value: string | number | Date,
    format = 'dd/MM/yyyy HH:mm:ss',
): string {
    return formatDateAngular(value, format, 'en_US');
}
