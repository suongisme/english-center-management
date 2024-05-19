import { Route } from '@angular/router';

export const router: Route = {
    path: 'class-room',
    children: [
        {
            path: '',
            loadComponent: () =>
                import('./class-room.page').then((p) => p.ClassRoomPage),
            data: {
                title: 'Quản lý lớp học',
            },
        },
    ],
};
