import { Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
    ButtonBackComponent,
    DestroyService,
    NotifierService,
} from '@ecm-module/common';
import {
    CreateTestingFormComponent,
    GetTestingResponse,
    TestingService,
} from '@ecm-module/testing';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'create-testing-page',
    templateUrl: './create-testing.page.html',
    standalone: true,
    imports: [CreateTestingFormComponent, ButtonBackComponent],
    providers: [DestroyService],
})
export class CreateTestingPage implements OnInit {
    @Input() testingId?: number;

    public testingResponse?: GetTestingResponse;
    public formGroup: FormGroup;

    private testingService = inject(TestingService);
    private destroyService = inject(DestroyService);
    private notifierService = inject(NotifierService);
    private router = inject(Router);

    public ngOnInit(): void {
        if (this.testingId) {
            this.testingService
                .getById(this.testingId)
                .pipe(takeUntil(this.destroyService.$destroy))
                .subscribe((res) => {
                    this.testingResponse = res;
                });
        }
    }

    public ngOnSaveTesting(): void {
        if (this.formGroup.invalid) {
            this.formGroup.markAllAsTouched();
            return;
        }
        const testing = this.formGroup.getRawValue();
        if (this.testingResponse) {
            this.testingService
                .updateTesting({
                    ...testing,
                    id: this.testingId,
                })
                .pipe(takeUntil(this.destroyService.$destroy))
                .subscribe((res) => {
                    this.notifierService
                        .success('Cập nhật câu hỏi thành công')
                        .then((x) => {
                            if (x.isConfirmed) {
                                this.router.navigate(['testing']);
                            }
                        });
                });
        } else {
            this.testingService
                .createTesting(testing)
                .pipe(takeUntil(this.destroyService.$destroy))
                .subscribe((res) => {
                    this.notifierService
                        .success('Tạo câu hỏi thành công')
                        .then((x) => {
                            if (x.isConfirmed) {
                                this.router.navigate(['testing']);
                            }
                        });
                });
        }
    }
}
