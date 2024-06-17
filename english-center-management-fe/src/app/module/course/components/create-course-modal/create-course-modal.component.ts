import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
    DestroyService,
    ModalWrapperComponent,
    NotifierService,
} from '@ecm-module/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { SearchCourseResponse } from '../../interface';
import { CourseService } from '../../service';
import { CreateCourseFormComponent } from '../course-form/course-form.component';

@Component({
    selector: 'create-course-modal',
    templateUrl: './create-course-modal.component.html',
    standalone: true,
    imports: [
        CreateCourseFormComponent,
        TranslateModule,
        ModalWrapperComponent,
    ],
    providers: [DestroyService],
})
export class CreateCourseModal {
    public formGroup: FormGroup;
    public course: SearchCourseResponse;
    public avatarFile: File;

    private readonly activeModal = inject(NgbActiveModal);
    private readonly courseService = inject(CourseService);
    private readonly destroyService = inject(DestroyService);
    private readonly notifierService = inject(NotifierService);

    public onSaveClassRoom() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.invalid) {
            return;
        }
        const course = {
            ...this.formGroup.getRawValue(),
            avatarFile: this.avatarFile,
        };
        if (this.course) {
            this.courseService
                .updateCourse({
                    ...course,
                    id: this.course.id,
                })
                .pipe(takeUntil(this.destroyService.$destroy))
                .subscribe((res) => {
                    this.notifierService
                        .success('Cập nhật khóa học thành công')
                        .then((x) => {
                            if (x.isConfirmed) {
                                this.activeModal.close(course);
                            }
                        });
                });
        } else {
            this.courseService
                .createCourse(course)
                .pipe(takeUntil(this.destroyService.$destroy))
                .subscribe((res) => {
                    this.notifierService
                        .success('Tạo khóa học thành công')
                        .then((x) => {
                            if (x.isConfirmed) {
                                this.activeModal.close(course);
                            }
                        });
                });
        }
    }
}
