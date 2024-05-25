import { CourseItem, CourseItemComponent } from '@ecm-module/course';
import { Component, OnInit } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { EcmCarouselComponent } from '@ecm-module/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'home-page',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    standalone: true,
    imports: [
        SlickCarouselModule,
        CourseItemComponent,
        EcmCarouselComponent,
        RouterLink,
    ],
})
export class HomePage implements OnInit {
    courses: CourseItem[] = [
        {
            id: 1,
            name: 'Fundamental of UX for Application design',
            avatar: 'assets/img/gallery/featured1.png',
            price: 135000,
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

    courseTrack = (index: number, data: CourseItem): number => {
        return data.id;
    };

    slideConfig = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 400,
        arrows: true,
        prevArrow:
            '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
        nextArrow:
            '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };
    ngOnInit(): void {}
}
