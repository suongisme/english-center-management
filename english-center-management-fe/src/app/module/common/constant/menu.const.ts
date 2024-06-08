import { faDashboard, faTable } from '@fortawesome/free-solid-svg-icons';
import { Authority } from '../../auth/constant';
import { Menu } from '../interface/menu.interface';

export const MENU: { [name: string]: Menu[] } = {
    [Authority.ADMIN]: [
        {
            label: 'Thống kê',
            icon: faDashboard,
            role: [Authority.ADMIN],
            children: [
                {
                    label: 'Thông kê doanh thu',
                    link: '/report/revenue',
                    icon: faDashboard,
                },
                {
                    label: 'Thống kê khóa học',
                    link: '/report/course',
                    icon: faDashboard,
                },
                {
                    label: 'Thống kê học viên',
                    link: '/report/student',
                    icon: faDashboard,
                },
            ],
        },
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
            role: [Authority.ADMIN],
            children: [
                {
                    label: 'Học viên',
                    icon: faTable,
                    link: '/user/student',
                },
                {
                    label: 'Giáo viên',
                    icon: faTable,
                    link: '/user/teacher',
                },
                {
                    label: 'Quản lý',
                    icon: faTable,
                    link: '/user/admin',
                },
            ],
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
