import { AfterViewInit, Component } from '@angular/core';

@Component({
    selector: 'main-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class MainHeaderComponent implements AfterViewInit {
    ngAfterViewInit(): void {
        jQuery(window).on('scroll', function () {
            const scroll = jQuery(window).scrollTop();
            if (scroll < 400) {
                jQuery('.header-sticky').removeClass('sticky-bar');
                jQuery('#back-top').fadeOut(500);
            } else {
                jQuery('.header-sticky').addClass('sticky-bar');
                jQuery('#back-top').fadeIn(500);
            }
        });

        const menu = jQuery('ul#navigation');
        if (menu.length) {
            menu.slicknav({
                prependTo: '.mobile_menu',
                closedSymbol: '+',
                openedSymbol: '-',
            });
        }
    }
}
