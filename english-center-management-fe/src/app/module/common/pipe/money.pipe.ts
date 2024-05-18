import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'money',
    standalone: true,
})
export class MoneyPipe implements PipeTransform {
    transform(value: any, ccy: 'VND' | 'USD') {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: ccy,
        }).format(value);
    }
}
