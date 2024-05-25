import { Component, Input } from '@angular/core';
import { Question } from '../../interface';
import { NgFor } from '@angular/common';

@Component({
    selector: 'question',
    templateUrl: './question.component.html',
    standalone: true,
    imports: [NgFor],
})
export class QuestionComponent {
    @Input({ required: true }) index: number;
    @Input({ required: true }) item: Question;
}
