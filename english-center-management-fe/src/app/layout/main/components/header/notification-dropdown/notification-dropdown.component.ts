import { Component, EventEmitter, Output } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'notification-dropdown',
    templateUrl: './notification-dropdown.component.html',
})
export class NotificationDropdownComponent {
    @Output() toggle = new EventEmitter<NgbCollapse>();

    public toggleDropdown(self: NgbCollapse): void {
        this.toggle.emit(self);
    }
}
