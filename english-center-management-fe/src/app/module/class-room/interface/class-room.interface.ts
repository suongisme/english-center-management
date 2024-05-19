export interface CreateClassRoomRequest {
    name: string;
    position: number;
    size: number;
    status: number;
}

export interface UpdateClassRoomRequest extends CreateClassRoomRequest {
    id: number;
}

export interface SearchClassRoomRequest {
    name?: string;
    position?: number;
    status?: number;
}

export interface SearchClassRoomResponse extends UpdateClassRoomRequest {
    createdDate: number;
    createdBy: string;
}
