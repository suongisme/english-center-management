import { Language } from '../interface/language.interface';

export const LANGUAGES: Language[] = [
    {
        label: 'COMMON.LANGUAGE.VN',
        value: 'vn',
        iconUrl: 'assets/img/flags/vietnam.png',
        resourceUrl: 'assets/i18n/vn.json',
    },
    {
        label: 'COMMON.LANGUAGE.EN',
        value: 'en',
        iconUrl: 'assets/img/flags/american-flag.png',
        resourceUrl: 'assets/i18n/en.json',
    },
];

export const STATUS = [
    {
        id: 0,
        label: 'Không hoạt động',
    },
    {
        id: 1,
        label: 'Đang hoạt động',
    },
];
