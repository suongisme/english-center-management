import { Component, EventEmitter, Output } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'message-dropdown',
    templateUrl: './message-dropdown.component.html',
})
export class MessageDropdownComponent {
    @Output() toggle = new EventEmitter<NgbCollapse>();

    public toggleDropdown(self: NgbCollapse): void {
        this.toggle.emit(self);
    }
}
