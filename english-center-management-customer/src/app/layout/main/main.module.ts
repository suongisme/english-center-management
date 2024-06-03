import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MoneyPipe } from '@ecm-module/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { MainHeaderComponent } from './components/header/header.component';
import { MainLayout } from './main.layout';
import { routes } from './router';
import { MainFooterComponent } from './components/footer/footer.component';
import { HomeSliderComponent } from './components/slicer/home-slider/home-slider.component';
import { CourseSliderComponent } from './components/slicer/course-slider/course-slider.component';
import { ContactSliderComponent } from './components/slicer/contact-slider/contact-slider.component';
import { DetailSliderComponent } from './components/slicer/detail-slider/detail-slider.component';
import { ProfileDropdownComponent } from './components/header/profile-dropdown/profile-dropdown.component';
import { PaymentHistorySliderComponent } from './components/slicer/payment-history-slider/payment-history-slider.component';
import { TimetableSliderComponent } from './components/slicer/timetable-slider/timetable-slider.component';
import { PaymentSliderComponent } from './components/slicer/payment-slider/payment-slider.component';

const imports = [
    CommonModule,
    RouterModule.forChild(routes),
    NgbCollapse,
    FormsModule,
    TranslateModule,
    FontAwesomeModule,
    MoneyPipe,
    ProfileDropdownComponent,
];

const declarations = [
    MainLayout,
    MainHeaderComponent,
    MainFooterComponent,
    HomeSliderComponent,
    CourseSliderComponent,
    ContactSliderComponent,
    DetailSliderComponent,
    PaymentHistorySliderComponent,
    TimetableSliderComponent,
    PaymentSliderComponent,
];

@NgModule({
    imports,
    declarations,
})
export class MainModule {}
