import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService, LoginFormComponent } from '@ecm-module/auth';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    standalone: true,
    imports: [RouterLink, LoginFormComponent, TranslateModule],
})
export class LoginPage implements OnInit {
    private authService = inject(AuthService);

    public ngOnInit(): void {
        this.authService.loginResponse = null;
    }
}
