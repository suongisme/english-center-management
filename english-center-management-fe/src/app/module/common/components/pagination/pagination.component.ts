import { Pagination } from '../../interface/pagination.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { PAGE_LIST } from '../../constant/pagination.const';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    standalone: true,
    imports: [NgbPagination, NgSelectModule, FormsModule, TranslateModule],
})
export class PaginationComponent implements OnInit {
    @Input()
    public pagination: Pagination;

    @Output()
    public paginate: EventEmitter<Pagination> = new EventEmitter();

    @Output()
    public pageSizeChange: EventEmitter<Pagination> = new EventEmitter();

    public currentPageSize: number;
    public pageList: number[] = PAGE_LIST;

    public ngOnInit(): void {
        this.currentPageSize = this.pagination.pageSize;
    }

    public ngOnPageChange(page: number): void {
        this.pagination.page = page;
        this.paginate.emit(this.pagination);
    }
}
