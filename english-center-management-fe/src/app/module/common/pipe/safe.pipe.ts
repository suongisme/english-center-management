import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';

@Pipe({
    name: 'safe',
    standalone: true,
})
export class SafePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}

    transform(value: any, arg: 'HTML' | 'URL'): SafeHtml | SafeUrl | null {
        switch (arg) {
            case 'HTML':
                return this.sanitizer.bypassSecurityTrustHtml(value);
            case 'URL':
                return this.sanitizer.bypassSecurityTrustUrl(value);
            default:
                return null;
        }
    }
}
