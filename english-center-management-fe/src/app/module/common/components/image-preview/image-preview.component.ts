import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'image-preview',
    templateUrl: './image-preview.component.html',
    styleUrls: ['./image-preview.component.scss'],
    standalone: true,
    imports: [NgIf],
})
export class ImagePreviewComponent {
    @Input() url: string;
    @Input() readonly: boolean = false;
    @Input() size: {
        width?: string;
        height?: string;
    };

    @Output() remove = new EventEmitter();

    public onRemoveImage(): void {
        this.remove.emit();
    }
}
