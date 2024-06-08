import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LanguageComponent } from '@ecm-module/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    NgbAccordionDirective,
    NgbAccordionModule,
    NgbCollapse,
    NgbCollapseModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { MainHeaderComponent } from './components/header/header.component';
import { MainSidebarComponent } from './components/sidebar/sidebar.component';
import { MainLayout } from './main.layout';
import { routes } from './router';
import { UserDropdownComponent } from './components/header/user-dropdown/user-dropdown.component';
import { MessageDropdownComponent } from './components/header/message-dropdown/message-dropdown.component';
import { NotificationDropdownComponent } from './components/header/notification-dropdown/notification-dropdown.component';

const imports = [
    CommonModule,
    RouterModule.forChild(routes),
    NgbCollapse,
    FormsModule,
    TranslateModule,
    NgSelectModule,
    LanguageComponent,
    FontAwesomeModule,
    NgbCollapseModule,
];

const declarations = [
    MainLayout,
    MainHeaderComponent,
    MainSidebarComponent,
    UserDropdownComponent,
    MessageDropdownComponent,
    NotificationDropdownComponent,
];

@NgModule({
    imports,
    declarations,
})
export class MainModule {}
