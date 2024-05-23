import { Route } from '@angular/router';
import { Authority } from '@ecm-module/auth';

export const router: Route = {
    path: 'class-room',
    children: [
        {
            path: '',
            loadComponent: () =>
                import('./class-room.page').then((p) => p.ClassRoomPage),
            data: {
                title: 'Quản lý lớp học',
                role: [Authority.ADMIN],
            },
        },
    ],
};
