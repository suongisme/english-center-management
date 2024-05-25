import { Component, OnInit, inject } from '@angular/core';
import { LANGUAGES } from '@ecm-module/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { Language } from '@ecm-module/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'select-language',
    templateUrl: './language-select.component.html',
    styleUrls: ['./language-select.component.scss'],
    standalone: true,
    imports: [NgSelectModule, TranslateModule, FormsModule],
})
export class LanguageComponent implements OnInit {
    private translateService: TranslateService = inject(TranslateService);

    public languages: Language[] = LANGUAGES;
    public language: string;

    public ngOnInit(): void {
        this.language =
            localStorage.getItem('language') ??
            this.translateService.getDefaultLang();
    }

    public onChangeLanguage(language: Language): void {
        this.translateService.use(language.value);
        localStorage.setItem('language', language.value);
    }
}
