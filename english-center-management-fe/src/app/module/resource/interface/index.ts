export interface CreateResourceRequest {
    keyId: number;
    type: string;
    file: File;
}

export interface SearchResourceResponse {
    id: number;
    keyId: number;
    type: string;
    createdDate: Date;
    createdBy: string;
    url: string;
    fileName: string;
}

export interface SearchResourceRequest {
    type: string;
    keyId: number;
}
