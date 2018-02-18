import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

import { UserPreferences } from '../../../../model/user-preferences';
import { DashboardService } from '../../../../services/dashboard.service';

@Component({
    selector: 'app-monthly-fuel-costs-chart',
    templateUrl: './monthly-fuel-costs.component.html'
})
export class MonthlyFuelCostsComponent implements OnInit {

    public baseChartOptions: any = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 30,
                right: 0,
                top: 0,
                bottom: 0
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                gridLines: {
                    display: true
                }
            }],
            xAxes: [{
                gridLines: {
                    display: false
                }
            }]
        }
    };

    public chartData = [];
    public chartType = 'bar';

    constructor(private dashboardService: DashboardService) { }

    ngOnInit() {

        this.dashboardService.getMonthlyFuelCosts().subscribe(data => {

            const years = Array.from(data.keys()).sort((n, m) => m - n);
            for (const year of years) {

                const vehicleChartData = {
                    year: year,
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    dataset: []
                };

                const vehicles = Array.from(data.get(year).vehicles.keys());
                for (const vehicle of vehicles) {

                    vehicleChartData.dataset.push({
                        label: vehicle,
                        data: data.get(year).vehicles.get(vehicle).monthlyFuelCosts
                    });
                }

                this.chartData.push(vehicleChartData);
            }
        });
    }
}
