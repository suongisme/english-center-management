import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
    ColDef,
    FirstDataRenderedEvent,
    GridApi,
    GridOptions,
    GridReadyEvent,
    GridSizeChangedEvent,
} from 'ag-grid-community';
import { Subject, takeUntil } from 'rxjs';
import { NoRowComponent } from './no-row/no-row.component';
import { Pagination } from '../../interface';

@Component({
    template: '',
})
export abstract class GridCore<T> implements OnInit, OnDestroy {
    @Input() rowData: T[];
    @Input() pagination: Pagination;
    @Input() readonly: boolean = false;

    public noRowComponent = NoRowComponent;

    protected columnDefs: ColDef[];
    protected gridOptions: GridOptions;

    protected unsubscribe$: Subject<void> = new Subject<void>();
    protected agGridApi: GridApi;
    protected translateService: TranslateService = inject(TranslateService);

    public ngOnInit(): void {
        this.listenLangChange();
        this.columnDefs = this.getColumnDefs();
        this.rowData = this.rowData ?? this.getRowData();
    }

    private listenLangChange(): void {
        this.translateService.onLangChange
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((lang) => {
                this.agGridApi.refreshHeader();
                this.agGridApi.refreshCells();
            });
    }

    public onGridReady(param: GridReadyEvent): void {
        this.agGridApi = param.api;
        setTimeout(() => {
            this.agGridApi.sizeColumnsToFit();
        });
    }

    public onGridSizeChanged(param: GridSizeChangedEvent): void {
        param.api.sizeColumnsToFit();
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    public abstract getColumnDefs(): ColDef[];
    public abstract getRowData(): T[];

    onFirstDataRendered(params: FirstDataRenderedEvent<T>) {}
}
