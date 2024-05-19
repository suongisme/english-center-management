import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'addHour',
    standalone: true,
})
export class AddTimePipe implements PipeTransform {
    transform(value: string, arg: number) {
        const [hours, minute] = value.split(':');
        return `${+hours + arg}:${minute}`;
    }
}
