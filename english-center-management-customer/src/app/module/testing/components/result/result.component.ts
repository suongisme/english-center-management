import { Component, Input } from '@angular/core';
import { CheckAnswerResponse } from '../../interface';

@Component({
    selector: 'testing-result',
    templateUrl: './result.component.html',
    standalone: true,
})
export class TestingResultComponent {
    @Input({ required: true }) checkAnswer: CheckAnswerResponse;
}
