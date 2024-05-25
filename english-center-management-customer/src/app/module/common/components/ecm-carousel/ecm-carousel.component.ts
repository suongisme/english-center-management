import { NgFor, NgTemplateOutlet } from '@angular/common';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
    selector: 'ecm-carousel',
    templateUrl: './ecm-carousel.component.html',
    standalone: true,
    imports: [NgFor, SlickCarouselModule, NgTemplateOutlet],
})
export class EcmCarouselComponent implements OnInit {
    @Input({ required: true }) data: any[];
    @Input({ required: true }) itemTemplate: TemplateRef<any>;
    @Input() config: any;
    @Input({ required: true }) trackByFn: (index: number, data: any) => any;

    public baseConfig = {
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
    public ngOnInit(): void {
        this.baseConfig = {
            ...this.baseConfig,
            ...(this.config ?? {}),
        };
    }
}
