import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginFormComponent } from '@ecm-module/auth';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    standalone: true,
    imports: [RouterLink, LoginFormComponent, TranslateModule],
})
export class LoginPage implements OnInit {
    public ngOnInit(): void {}
}
