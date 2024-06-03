import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './router';
import { AuthLayout } from './auth.layout';

const imports = [RouterModule.forChild(routes)];

const declarations = [AuthLayout];

@NgModule({
    imports,
    declarations,
})
export class AuthModule {}
