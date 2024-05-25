import { QuestionComponent, TestingResultComponent } from '@ecm-module/testing';
import { Question } from './../../module/testing/interface/index';
import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
    selector: 'testing-page',
    templateUrl: './testing.page.html',
    standalone: true,
    imports: [QuestionComponent, NgFor, TestingResultComponent],
})
export class TestingPage {
    questions: Question[] = [
        {
            id: 1,
            title: 'Chọn từ đúng dưới đây để điền vào chỗ trống “Ruộng bốn bề không bằng…trong tay”',
            score: 1,
            answers: [
                {
                    id: 1,
                    title: 'A. nghề',
                },
                {
                    id: 2,
                    title: 'A. nghề',
                },
                {
                    id: 3,
                    title: 'A. nghề',
                },
                {
                    id: 4,
                    title: 'A. nghề',
                },
            ],
        },

        {
            id: 2,
            title: 'Chọn từ đúng dưới đây để điền vào chỗ trống “Ruộng bốn bề không bằng…trong tay”',
            score: 1,
            answers: [
                {
                    id: 1,
                    title: 'A. nghề',
                },
                {
                    id: 2,
                    title: 'A. nghề',
                },
                {
                    id: 3,
                    title: 'A. nghề',
                },
                {
                    id: 4,
                    title: 'A. nghề',
                },
            ],
        },

        {
            id: 3,
            title: 'Chọn từ đúng dưới đây để điền vào chỗ trống “Ruộng bốn bề không bằng…trong tay”',
            score: 1,
            answers: [
                {
                    id: 1,
                    title: 'A. nghề',
                },
                {
                    id: 2,
                    title: 'A. nghề',
                },
                {
                    id: 3,
                    title: 'A. nghề',
                },
                {
                    id: 4,
                    title: 'A. nghề',
                },
            ],
        },

        {
            id: 4,
            title: 'Chọn từ đúng dưới đây để điền vào chỗ trống “Ruộng bốn bề không bằng…trong tay”',
            score: 1,
            answers: [
                {
                    id: 1,
                    title: 'A. nghề',
                },
                {
                    id: 2,
                    title: 'A. nghề',
                },
                {
                    id: 3,
                    title: 'A. nghề',
                },
                {
                    id: 4,
                    title: 'A. nghề',
                },
            ],
        },
    ];
}
