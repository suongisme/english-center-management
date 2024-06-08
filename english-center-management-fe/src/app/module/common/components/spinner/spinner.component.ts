import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { SpinnerService } from '../../service/sprinner.service';

@Component({
    selector: 'spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
    standalone: true,
    imports: [NgIf],
})
export class SpinnerComponent implements OnInit {
    private spinnerService = inject(SpinnerService);
    private changeDetectorRef = inject(ChangeDetectorRef);

    public loading: boolean;

    ngOnInit(): void {
        this.spinnerService.spinnerObservable.subscribe((res) => {
            this.loading = res;
            this.changeDetectorRef.detectChanges();
        });
    }
}
