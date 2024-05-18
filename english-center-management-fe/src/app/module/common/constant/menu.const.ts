import { Menu } from '../interface/menu.interface';
import {
    faTachometerAlt,
    faCog,
    faTable,
    faBell,
} from '@fortawesome/free-solid-svg-icons';

export const BASE_MENU: Menu[] = [
    {
        label: 'Dashboard',
        icon: faTachometerAlt,
        link: '/dashboard',
    },
    {
        title: 'Interface',
        label: 'Components',
        icon: faCog,
        children: [
            {
                icon: faCog,
                label: 'Buttons',
            },
            {
                icon: faCog,
                label: 'Cards',
            },
        ],
    },
    {
        label: 'Quản lý học sinh',
        icon: faTable,
        link: '/student',
    },
    {
        label: 'Quản lý giáo viên',
        icon: faTable,
        link: '/teacher',
    },
    {
        label: 'Quản lý thông báo',
        icon: faBell,
        link: 'notification',
    },
    {
        label: 'Quản lý lớp học',
        icon: faTable,
        link: 'class-room',
    },
    {
        label: 'Quản lý điểm',
        icon: faTable,
        link: 'grade',
    },
    {
        label: 'Quản lý lịch',
        icon: faTable,
        link: 'timetable',
    },
];
