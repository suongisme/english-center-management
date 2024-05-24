import { Authority } from '../../auth/constant';
import { Menu } from '../interface/menu.interface';
import {
    faTachometerAlt,
    faCog,
    faTable,
    faBell,
} from '@fortawesome/free-solid-svg-icons';

export const MENU: { [name: string]: Menu[] } = {
    [Authority.ADMIN]: [
        {
            label: 'Quản lý lớp học',
            icon: faTable,
            link: 'class-room',
            role: [Authority.ADMIN],
        },
        {
            label: 'Quản lý khóa học',
            icon: faTable,
            link: 'course',
            role: [Authority.ADMIN],
        },
        {
            label: 'Quản lý người dùng',
            icon: faTable,
            link: '/user',
            role: [Authority.ADMIN],
        },
        {
            label: 'Ngân hàng câu hỏi',
            icon: faTable,
            link: 'question',
            role: [Authority.ADMIN],
        },
        {
            label: 'Quản lý bài test',
            icon: faTable,
            link: 'testing',
            role: [Authority.ADMIN],
        },
    ],
    [Authority.TEACHER]: [
        {
            label: 'Lịch dạy và Điểm danh',
            icon: faTable,
            link: 'checkin',
            role: [Authority.TEACHER],
        },
        {
            label: 'Lịch sử điểm danh',
            icon: faTable,
            link: 'checkin-history',
            role: [Authority.TEACHER],
        },
        {
            label: 'Chấm điểm',
            icon: faTable,
            link: 'grade-book',
            role: [Authority.TEACHER],
        },
        {
            label: 'lịch sử chấm điểm',
            icon: faTable,
            link: 'grade-book-history',
            role: [Authority.TEACHER],
        },
    ],
};

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
];
