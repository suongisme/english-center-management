import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'testing-slider',
    templateUrl: './testing-slider.component.html',
    styleUrls: ['./testing-slider.component.scss'],
    standalone: true,
    imports: [RouterLink],
})
export class TestingSliderComponent {}
