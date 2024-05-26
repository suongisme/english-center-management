import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchTestingResponse } from '@ecm-module/testing';
import { Observable, map } from 'rxjs';
import { TestingService } from 'src/app/module/testing/service';

@Component({
    selector: 'testing-slider',
    templateUrl: './testing-slider.component.html',
    styleUrls: ['./testing-slider.component.scss'],
    standalone: true,
    imports: [RouterLink, AsyncPipe, NgIf, NgFor],
})
export class TestingSliderComponent implements OnInit {
    @Input() name: string;
    @Input() id: number;

    private testingService = inject(TestingService);

    public $testings: Observable<SearchTestingResponse[]>;

    public ngOnInit(): void {
        this.$testings = this.testingService
            .searchTesting({
                data: {
                    status: 1,
                    courseId: this.id,
                },
            })
            .pipe(map((x) => x.items));
    }

    public ngOnClickTesting(testing: SearchTestingResponse): void {
        this.testingService.selectTesting.next(testing);
    }
}
