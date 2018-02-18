import { Component, OnInit, Input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

import { UserPreferences } from '../../../../model/user-preferences';
import { DashboardService, FuelCostsByYear } from '../../../../services/dashboard.service';

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
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        },
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true
                },
                stacked: true,
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

    public chartData;
    public chartType = 'bar';

    @Input()
    public userPreferences: UserPreferences;

    constructor(private dashboardService: DashboardService) { }

    ngOnInit() {

        this.baseChartOptions.scales.yAxes[0].scaleLabel.labelString = this.userPreferences.currencyUnit.unit;

        this.dashboardService.getMonthlyFuelCosts().subscribe(data => {
            this.buildChart(data);
        });
    }

    private buildChart(data: Map<number, FuelCostsByYear>) {

        const vehicleChartData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            dataset: []
        };

        const years = Array.from(data.keys()).sort((n, m) => n - m);
        for (let yearIndex = 0; yearIndex < years.length; yearIndex++) {

            const vehicles = Array.from(data.get(years[yearIndex]).vehicles.keys());
            for (let vehicleIndex = 0; vehicleIndex < vehicles.length; vehicleIndex++) {

                vehicleChartData.dataset.push({
                    label: `${vehicles[vehicleIndex]} (${years[yearIndex]})`,
                    data: data.get(years[yearIndex]).vehicles.get(vehicles[vehicleIndex]).monthlyFuelCosts,
                    stack: yearIndex + 1
                });
            }

        }

        this.chartData = vehicleChartData;
    }
}
