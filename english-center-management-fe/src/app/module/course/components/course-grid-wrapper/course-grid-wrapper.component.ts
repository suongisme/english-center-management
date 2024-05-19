import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CourseGridComponent } from '../course-grid/course-grid.component';
import { SearchCourseResponse } from '../../interface';
import { CreateCourseModal } from '../create-course-modal/create-course-modal.component';

@Component({
    selector: 'course-grid-wrapper',
    templateUrl: './course-grid-wrapper.component.html',
    standalone: true,
    imports: [CourseGridComponent, TranslateModule, FontAwesomeModule],
})
export class CourseGridWrapperComponent {
    @Input() courses: SearchCourseResponse[];

    @Output() createNew = new EventEmitter();

    private readonly modalService = inject(NgbModal);

    public openAddCourseModal(): void {
        this.modalService
            .open(CreateCourseModal, {
                size: 'xl',
                centered: true,
            })
            .closed.subscribe((res) => {
                if (res) this.createNew.emit();
            });
    }

    public afterUpdateClassRoom(): void {
        this.createNew.emit();
    }
}
