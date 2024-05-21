import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    inject,
} from '@angular/core';
import { EcmSelectComponent } from '@ecm-module/common';
import { CourseService } from '../../service';
import { Observable, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SearchCourseResponse } from '../../interface';
import { PagingResponse } from 'src/app/module/common/interface/paging.interface';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'select-course',
    templateUrl: './select-course.component.html',
    standalone: true,
    imports: [EcmSelectComponent, AsyncPipe, FormsModule],
})
export class SelectCourseComponent implements OnInit {
    @Input() courseId: number;
    @Output() change = new EventEmitter<number>();

    private readonly courseService = inject(CourseService);

    public $course: Observable<SearchCourseResponse[]>;

    public ngOnInit(): void {
        this.$course = this.courseService
            .searchCourse({
                data: {
                    status: 1,
                },
            })
            .pipe(map((x: PagingResponse<SearchCourseResponse>) => x.items));
    }

    public ngOnChange(event): void {
        console.log(event);
    }
}
