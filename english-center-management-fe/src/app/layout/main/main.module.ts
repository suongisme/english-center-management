import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LanguageComponent } from '@ecm-module/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { MainHeaderComponent } from './components/header/header.component';
import { MainSidebarComponent } from './components/sidebar/sidebar.component';
import { MainLayout } from './main.layout';
import { routes } from './router';

const imports = [
    CommonModule,
    RouterModule.forChild(routes),
    NgbCollapse,
    FormsModule,
    TranslateModule,
    NgSelectModule,
    LanguageComponent,
    FontAwesomeModule,
];

const declarations = [MainLayout, MainHeaderComponent, MainSidebarComponent];

@NgModule({
    imports,
    declarations,
})
export class MainModule {}
