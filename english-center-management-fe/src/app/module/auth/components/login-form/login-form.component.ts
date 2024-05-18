import { CommonModule, NgFor } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { SingleSignOn } from '../../interface/sso.interface';
import { SsoService } from '../../service/sso.service';
import { SsoButtonComponent } from '../sso-button/sso-button.component';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgFor,
        TranslateModule,

        // components
        SsoButtonComponent,
    ],
})
export class LoginFormComponent implements OnInit, OnDestroy {
    private formBuilder: FormBuilder = inject(FormBuilder);
    private ssoService: SsoService = inject(SsoService);

    private ssoListener: Subscription;

    public loginFormGroup: FormGroup;
    public ssoList: SingleSignOn[];

    public ngOnInit(): void {
        this.buildForm();
        this.ssoListener = this.ssoService.listenSsoListChange((ssoList) => {
            this.ssoList = ssoList;
        });
    }

    private buildForm(): void {
        this.loginFormGroup = this.formBuilder.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.minLength(8)]],
        });
    }

    public ngOnDestroy(): void {
        this.ssoListener?.unsubscribe();
    }
}
