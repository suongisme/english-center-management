import { Component } from '@angular/core';
import { DestroyService } from '@ecm-module/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [DestroyService],
})
export class AppComponent {}
