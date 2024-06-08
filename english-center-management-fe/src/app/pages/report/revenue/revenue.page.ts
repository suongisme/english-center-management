import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { BillService, StatisticBillResponse } from '@ecm-module/bill';
import {
    EcmBoxComponent,
    EcmInputComponent,
    EcmSelectComponent,
    MoneyPipe,
} from '@ecm-module/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
    ApexAxisChartSeries,
    ApexChart,
    ApexDataLabels,
    ApexGrid,
    ApexStroke,
    ApexTitleSubtitle,
    ApexXAxis,
    NgApexchartsModule,
} from 'ng-apexcharts';
import { forkJoin } from 'rxjs';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    grid: ApexGrid;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
};

@Component({
    selector: 'revenue-page',
    templateUrl: './revenue.page.html',
    standalone: true,
    imports: [
        NgApexchartsModule,
        EcmBoxComponent,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        EcmInputComponent,
        EcmSelectComponent,
        NgIf,
        NgFor,
        MoneyPipe,
    ],
})
export class RevenuePage implements OnInit {
    private fb = inject(FormBuilder);
    private billService = inject(BillService);

    public formGroup = this.fb.group({
        type: ['YEAR'],
        year: [new Date().getFullYear(), [Validators.required]],
        quarter: [1],
    });

    public type = [
        {
            value: 'YEAR',
            label: 'Năm',
        },
        {
            value: 'QUARTER',
            label: 'Quý',
        },
    ];

    public quarters = [
        {
            label: 'Quý I',
            value: 1,
        },
        {
            label: 'Quý II',
            value: 2,
        },
        {
            label: 'Quý III',
            value: 3,
        },
        {
            label: 'Quý IV',
            value: 4,
        },
    ];

    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    title: ApexTitleSubtitle;
    statistic: StatisticBillResponse[] = [];
    ngOnInit(): void {
        this.title = {
            align: 'left',
            text: 'Tổng doanh thu',
        };
        this.chart = {
            animations: {
                enabled: true,
                easing: 'linear',
            },
            height: 350,
            type: 'line',
            zoom: {
                enabled: false,
            },
        };
        forkJoin([
            this.billService.statisticBill({ date: null }),
            this.billService.statisticBill({ date: new Date() }),
        ]).subscribe(([res1, res2]) => {
            this.statistic = [
                {
                    ...res1,
                    label: 'Tổng doanh thu',
                },
                {
                    ...res2,
                    label: 'Doanh thu hôm nay',
                },
            ];
        });
        this.ngSubmit();
    }

    ngSubmit(): void {
        this.billService
            .statisticRevenue(this.formGroup.getRawValue())
            .subscribe((res) => {
                const { categories, data } = res.reduce(
                    (revenue, cur) => {
                        revenue.categories.push(`Tháng ${cur.label}`);
                        revenue.data.push(cur.value);
                        return revenue;
                    },
                    { categories: [], data: [] },
                );
                this.series = [
                    {
                        data: data,
                    },
                ];
                this.xaxis = {
                    categories: categories,
                };
            });
    }
}
