import { AsyncPipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AddTimePipe, DestroyService } from '@ecm-module/common';
import { TimetableResponse, TimetableService } from '@ecm-module/timetable';
import { takeUntil } from 'rxjs';

export const DATE_OF_WEEK = [
    {
        id: 2,
        label: 'Thứ 2',
    },
    {
        id: 3,
        label: 'Thứ 3',
    },
    {
        id: 4,
        label: 'Thứ 4',
    },
    {
        id: 5,
        label: 'Thứ 5',
    },
    {
        id: 6,
        label: 'Thứ 6',
    },
    {
        id: 7,
        label: 'Thứ 7',
    },
    {
        id: 8,
        label: 'Chủ nhật',
    },
];

@Component({
    selector: 'timetable-page',
    templateUrl: './timetable.page.html',
    styleUrls: ['./timetable.page.scss'],
    standalone: true,
    imports: [NgIf, NgFor, AsyncPipe, KeyValuePipe, AddTimePipe],
    providers: [DestroyService],
})
export class TimetablePage implements OnInit {
    public days = DATE_OF_WEEK;

    public timetableMap: Map<string, TimetableResponse[]>;
    private readonly timetableService = inject(TimetableService);
    private readonly destroyService = inject(DestroyService);

    public ngOnInit(): void {
        this.timetableMap = new Map();
        this.timetableMap.set('13:00', [
            {
                classRoomName: 'Lop 1A',
                courseDuration: 2,
                courseName: 'Tieng anh co ban',
                id: 1,
                parentId: 1,
                status: 1,
                teacherName: 'giaovien1',
                day: 2,
                startTime: '13:00',
            },

            {
                classRoomName: 'Lop 1A',
                courseDuration: 2,
                courseName: 'Tieng anh co ban',
                id: 1,
                parentId: 1,
                status: 1,
                teacherName: 'giaovien1',
                day: 3,
                startTime: '13:00',
            },

            {
                classRoomName: 'Lop 1A',
                courseDuration: 2,
                courseName: 'Tieng anh co ban',
                id: 1,
                parentId: 1,
                status: 1,
                teacherName: 'giaovien1',
                day: 4,
                startTime: '13:00',
            },
            {
                classRoomName: 'Lop 1A',
                courseDuration: 2,
                courseName: 'Tieng anh co ban',
                id: 1,
                parentId: 1,
                status: 1,
                teacherName: 'giaovien1',
                day: 5,
                startTime: '13:00',
            },

            {
                classRoomName: 'Lop 1A',
                courseDuration: 2,
                courseName: 'Tieng anh co ban',
                id: 1,
                parentId: 1,
                status: 1,
                teacherName: 'giaovien1',
                day: 6,
                startTime: '13:00',
            },
            {
                classRoomName: 'Lop 1A',
                courseDuration: 2,
                courseName: 'Tieng anh co ban',
                id: 1,
                parentId: 1,
                status: 1,
                teacherName: 'giaovien1',
                day: 7,
                startTime: '13:00',
            },
            {
                classRoomName: 'Lop 1A',
                courseDuration: 2,
                courseName: 'Tieng anh co ban',
                id: 1,
                parentId: 1,
                status: 1,
                teacherName: 'giaovien1',
                day: 8,
                startTime: '13:00',
            },
        ]);

        this.timetableMap.set('16:00', [
            {
                classRoomName: 'Lop 1A',
                courseDuration: 2,
                courseName: 'Tieng anh co ban',
                id: 1,
                parentId: 1,
                status: 1,
                teacherName: 'giaovien1',
                day: 2,
                startTime: '13:00',
            },

            {
                classRoomName: 'Lop 1A',
                courseDuration: 2,
                courseName: 'Tieng anh co ban',
                id: 1,
                parentId: 1,
                status: 1,
                teacherName: 'giaovien1',
                day: 3,
                startTime: '13:00',
            },

            {
                classRoomName: 'Lop 1A',
                courseDuration: 2,
                courseName: 'Tieng anh co ban',
                id: 1,
                parentId: 1,
                status: 1,
                teacherName: 'giaovien1',
                day: 4,
                startTime: '13:00',
            },
            {
                classRoomName: 'Lop 1A',
                courseDuration: 2,
                courseName: 'Tieng anh co ban',
                id: 1,
                parentId: 1,
                status: 1,
                teacherName: 'giaovien1',
                day: 5,
                startTime: '13:00',
            },

            {
                classRoomName: 'Lop 1A',
                courseDuration: 2,
                courseName: 'Tieng anh co ban',
                id: 1,
                parentId: 1,
                status: 1,
                teacherName: 'giaovien1',
                day: 6,
                startTime: '13:00',
            },
            {
                classRoomName: 'Lop 1A',
                courseDuration: 2,
                courseName: 'Tieng anh co ban',
                id: 1,
                parentId: 1,
                status: 1,
                teacherName: 'giaovien1',
                day: 7,
                startTime: '13:00',
            },
            {
                classRoomName: 'Lop 1A',
                courseDuration: 2,
                courseName: 'Tieng anh co ban',
                id: 1,
                parentId: 1,
                status: 1,
                teacherName: 'giaovien1',
                day: 8,
                startTime: '13:00',
            },
        ]);
    }

    private loadTimetable(): void {
        this.timetableMap = new Map();
        this.timetableService
            .getByUserId({ userId: 1 })
            .pipe(takeUntil(this.destroyService.$destroy))
            .subscribe((res) => {
                res.forEach((x) => {
                    const value = this.timetableMap.get(x.startTime) ?? [];
                    value.push(x);
                    this.timetableMap.set(x.startTime, value);
                });
                this.timetableMap.forEach((value, key) => {
                    value.sort((x1, x2) => (x1.day > x2.day ? 1 : -1));
                });
            });
    }
}
