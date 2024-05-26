import { QuestionComponent, TestingResultComponent } from '@ecm-module/testing';
import {
    CheckAnswerResponse,
    Question,
    SearchTestingResponse,
} from './../../module/testing/interface/index';
import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { TestingService } from 'src/app/module/testing/service';
import { DestroyService } from '@ecm-module/common';
import { Observable, of, takeUntil } from 'rxjs';
import { QuestionService } from 'src/app/module/testing/service/question.service';

@Component({
    selector: 'testing-page',
    templateUrl: './testing.page.html',
    standalone: true,
    imports: [
        QuestionComponent,
        NgFor,
        TestingResultComponent,
        AsyncPipe,
        NgIf,
    ],
    providers: [DestroyService],
})
export class TestingPage implements OnInit {
    private testingService = inject(TestingService);
    private destroyService = inject(DestroyService);
    private questionService = inject(QuestionService);

    public $question: Observable<Question[]>;
    public testing: SearchTestingResponse;
    public checkAnswer: CheckAnswerResponse;

    public ngOnInit(): void {
        this.testingService.selectTesting
            .asObservable()
            .pipe(takeUntil(this.destroyService.$destroy))
            .subscribe((testing) => {
                this.testing = testing;
                this.$question = this.questionService.getByTestingId(
                    testing.id,
                );
            });
    }

    public ngOnCheckQuestion(questions: Question[]): void {
        const questionMap = questions.reduce((map, question) => {
            map.set(question.id, question);
            return map;
        }, new Map<number, Question>());
        this.testingService
            .checkAnswer(this.testing.id, questions)
            .pipe(takeUntil(this.destroyService.$destroy))
            .subscribe((response) => {
                this.checkAnswer = response;
                this.checkAnswer.questions.forEach((x) => {
                    const question = questionMap.get(x.id);
                    x.selectedAnswer = question.selectedAnswer;
                    x.answers = question.answers;
                });
                this.$question = of(this.checkAnswer.questions);
            });
    }
}
