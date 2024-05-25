import { Observable, map } from 'rxjs';
import { ApiBody, ApiResponse } from '../interface';

export function mappingDataResponse<T>(
    response: Observable<ApiResponse>,
): Observable<T> {
    return response.pipe(
        map<ApiResponse, ApiBody>((x) => x.apiBody),
        map<ApiBody, T>((x) => x.data),
    );
}
