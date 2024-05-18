import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { SingleSignOn } from 'src/app/module/auth/interface/sso.interface';

@Component({
    selector: 'sso-button',
    templateUrl: './sso-button.component.html',
    styleUrls: ['./sso-button.component.scss'],
    standalone: true,
    imports: [TranslateModule, FontAwesomeModule],
})
export class SsoButtonComponent {
    @Input()
    ssoProperty: SingleSignOn;
}
