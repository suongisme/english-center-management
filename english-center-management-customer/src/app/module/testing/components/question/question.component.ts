import { Component, Input } from '@angular/core';
import { Answer, Question } from '../../interface';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'question',
    templateUrl: './question.component.html',
    standalone: true,
    imports: [NgFor, FormsModule, NgIf],
})
export class QuestionComponent {
    @Input({ required: true }) index: number;
    @Input({ required: true }) item: Question;

    public ngOnAnswer(answer: Answer): void {
        this.item.selectedAnswer = answer.id;
    }
}
