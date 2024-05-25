import { Component, Input } from '@angular/core';
import { CourseItem } from '../../interface';
import { DiscountPipe, MoneyPipe } from '@ecm-module/common';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'course-item',
    templateUrl: './course-item.component.html',
    standalone: true,
    imports: [MoneyPipe, DiscountPipe, NgIf, RouterLink],
})
export class CourseItemComponent {
    @Input({ required: true }) item: CourseItem;
}
