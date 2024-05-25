import { Component } from '@angular/core';
import { CourseItem, CourseItemContainerComponent } from '@ecm-module/course';

@Component({
    selector: 'course-page',
    templateUrl: './course.page.html',
    standalone: true,
    imports: [CourseItemContainerComponent],
})
export class CoursePage {
    courses: CourseItem[] = [
        {
            id: 1,
            name: 'Fundamental of UX for Application design',
            avatar: 'assets/img/gallery/featured1.png',
            price: 13500000,
            discount: 10,
            shortDescription:
                'The automated process all your website tasks. Discover tools and techniques to engage effectively with vulnerable children and young people.',
        },

        {
            id: 2,
            name: 'Fundamental of UX for Application design',
            avatar: 'assets/img/gallery/featured2.png',
            price: 135000,
            discount: 10,
            shortDescription:
                'The automated process all your website tasks. Discover tools and techniques to engage effectively with vulnerable children and young people.',
        },

        {
            id: 3,
            name: 'Fundamental of UX for Application design',
            avatar: 'assets/img/gallery/featured3.png',
            price: 135000,
            discount: 10,
            shortDescription:
                'The automated process all your website tasks. Discover tools and techniques to engage effectively with vulnerable children and young people.',
        },

        {
            id: 4,
            name: 'Fundamental of UX for Application design',
            avatar: 'assets/img/gallery/featured4.png',
            price: 135000,
            discount: 10,
            shortDescription:
                'The automated process all your website tasks. Discover tools and techniques to engage effectively with vulnerable children and young people.',
        },

        {
            id: 5,
            name: 'Fundamental of UX for Application design',
            avatar: 'assets/img/gallery/featured5.png',
            price: 135000,
            discount: 10,
            shortDescription:
                'The automated process all your website tasks. Discover tools and techniques to engage effectively with vulnerable children and young people.',
        },

        {
            id: 4,
            name: 'Fundamental of UX for Application design',
            avatar: 'assets/img/gallery/featured6.png',
            price: 135000,
            discount: 10,
            shortDescription:
                'The automated process all your website tasks. Discover tools and techniques to engage effectively with vulnerable children and young people.',
        },
    ];
}
