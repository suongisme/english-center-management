import { Menu } from '../interface/menu.interface';
import {
    faTachometerAlt,
    faCog,
    faTable,
    faBell,
} from '@fortawesome/free-solid-svg-icons';

export const BASE_MENU: Menu[] = [
    // {
    //     label: 'Dashboard',
    //     icon: faTachometerAlt,
    //     link: '/dashboard',
    // },
    // {
    //     title: 'Interface',
    //     label: 'Components',
    //     icon: faCog,
    //     children: [
    //         {
    //             icon: faCog,
    //             label: 'Buttons',
    //         },
    //         {
    //             icon: faCog,
    //             label: 'Cards',
    //         },
    //     ],
    // },
    {
        label: 'Quản lý lớp học',
        icon: faTable,
        link: 'class-room',
    },
    {
        label: 'Quản lý khóa học',
        icon: faTable,
        link: 'course',
    },
    {
        label: 'Quản lý người dùng',
        icon: faTable,
        link: '/user',
    },
    {
        label: 'Quản lý điểm',
        icon: faTable,
        link: 'grade',
    },
    {
        label: 'Quản lý bài test',
        icon: faTable,
        link: 'test',
    },
];
