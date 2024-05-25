import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'discount',
    standalone: true,
})
export class DiscountPipe implements PipeTransform {
    transform(value: number, discount: number) {
        return ((100 - discount) / 100) * value;
    }
}
