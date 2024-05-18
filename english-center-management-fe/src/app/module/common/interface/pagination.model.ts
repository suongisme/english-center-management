import { DEFAULT_PAGE_SIZE } from '../constant/pagination.const';

export class Pagination {
    page: number;
    pageSize: number;
    total: number;

    constructor(page: number, total: number) {
        this.page = page;
        this.total = total;
        this.pageSize = DEFAULT_PAGE_SIZE;
    }
}
