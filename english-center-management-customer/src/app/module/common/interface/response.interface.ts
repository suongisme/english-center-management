export interface ApiResponse {
    apiBody?: ApiBody;
    apiError?: ApiError;
    code: ErrorCode;
    status: Status;
    traceId: string;
    duration: number;
}

export interface ApiBody {
    [name: string]: any;
}

export interface ApiError {
    message: string;
    errors: { [name: string]: any };
}

export interface ErrorCode {
    code: string;
    message: string;
}

export interface Status {
    status: string;
    desc: string;
}
