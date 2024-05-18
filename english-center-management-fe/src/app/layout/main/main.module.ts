import { NgModule } from '@angular/core';
import { MainLayout } from './main.layout';
import { MainHeaderComponent } from './components/header/header.component';
import { MainSidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { routes } from './router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { LanguageComponent } from '@ecm-module/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
