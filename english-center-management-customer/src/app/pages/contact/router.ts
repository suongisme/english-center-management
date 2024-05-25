import { Route } from '@angular/router';
import { ContactSliderComponent } from 'src/app/layout/main/components/slicer/contact-slider/contact-slider.component';

export const router: Route = {
    path: 'lien-he',
    title: 'Liên hệ chúng tôi',
    children: [
        {
            path: '',
            loadComponent: () =>
                import('./contact.page').then((p) => p.ContactPage),
        },
        {
            path: '',
            component: ContactSliderComponent,
            outlet: 'slider-area',
        },
    ],
};
