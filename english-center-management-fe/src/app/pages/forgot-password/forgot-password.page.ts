import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ForgotPasswordFormComponent } from '@ecm-module/auth';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.page.html',
    styleUrls: ['./forgot-password.page.scss'],
    standalone: true,
    imports: [RouterLink, ForgotPasswordFormComponent, TranslateModule],
})
export class ForgotPasswordPage {}
