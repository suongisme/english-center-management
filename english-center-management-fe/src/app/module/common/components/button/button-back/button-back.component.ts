import { Component, Input, inject } from '@angular/core';
import { Location, NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'button-back',
    templateUrl: './button-back.component.html',
    styleUrls: ['./button-back.component.scss'],
    standalone: true,
    imports: [TranslateModule, FontAwesomeModule, NgClass],
})
export class ButtonBackComponent {
    @Input() classes: string[] = ['btn', 'btn-light', 'border-dark'];

    @Input() size: 'sm' | 'md' | 'lg' = 'sm';

    private location: Location = inject(Location);

    public goBack(): void {
        this.location.back();
    }
}
