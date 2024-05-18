import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './router';
import { AuthLayout } from './auth.layout';
import { LanguageComponent } from '@ecm-module/common';

const imports = [RouterModule.forChild(routes), LanguageComponent];

const declarations = [AuthLayout];

@NgModule({
    imports,
    declarations,
})
export class AuthModule {}
