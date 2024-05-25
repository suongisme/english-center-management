import { Component, Input } from '@angular/core';
import { CourseItem } from '../../interface';
import { CourseItemComponent } from '../course-item/course-item.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'course-item-container',
    templateUrl: './course-item-container.component.html',
    standalone: true,
    imports: [CourseItemComponent, NgFor],
})
export class CourseItemContainerComponent {
    @Input({ required: true }) data: CourseItem[];

    trackBy(index: number, data: CourseItem): number {
        return data.id;
    }
}
