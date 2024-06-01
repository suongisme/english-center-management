import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'discount',
    standalone: true,
})
export class DiscountPipe implements PipeTransform {
    transform(value: number, discount: number) {
        if (discount === 0) return null;
        return (discount / 100) * value;
    }
}
