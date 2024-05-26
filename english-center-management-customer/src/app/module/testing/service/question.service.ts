import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../common/interface';
import { mappingDataResponse } from '../../common/utils';
import { Question } from '../interface';

@Injectable({
    providedIn: 'root',
})
export class QuestionService {
    private endpoint = `${environment.BE_URL}/questions`;

    public httpClient = inject(HttpClient);
    public getByTestingId(testingId: number): Observable<Question[]> {
        const apiResponse = this.httpClient.get<ApiResponse>(
            this.endpoint + '/testing',
            {
                params: {
                    testingId: testingId,
                },
            },
        );
        return mappingDataResponse(apiResponse);
    }
}
