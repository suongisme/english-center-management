import { Component, inject } from '@angular/core';
import { SpinnerService } from '../../service/sprinner.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { take } from 'rxjs';

@Component({
    selector: 'spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
    standalone: true,
    imports: [NgIf, AsyncPipe],
})
export class SpinnerComponent {
    private spinnerService = inject(SpinnerService);

    public $spinner = this.spinnerService.spinnerObservable;
}
