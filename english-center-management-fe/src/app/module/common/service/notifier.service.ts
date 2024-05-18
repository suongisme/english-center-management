import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
    providedIn: 'root',
})
export class NotifierService {
    public async success(
        message: string,
        title: string = 'Success',
    ): Promise<SweetAlertResult> {
        return Swal.fire({
            title: title,
            text: message,
            icon: 'success',
        });
    }

    public error(
        message: string,
        traceId?: string,
        title: string = 'Fail',
    ): Promise<SweetAlertResult> {
        return Swal.fire({
            icon: 'error',
            title: title,
            text: message,
            footer: traceId
                ? `<a href="javascript:void(0)">trace-id: ${traceId}</a>`
                : '',
        });
    }
}
