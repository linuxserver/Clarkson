import { Component, OnInit, Input } from '@angular/core';

import { Vehicle } from '../../../../model/vehicle';
import { Fuel } from '../../../../model/fuel';
import { UserPreferences } from '../../../../model/user-preferences';
import { FuelService } from '../../../../services/fuel.service';

@Component({
    selector: 'app-consumption-chart',
    templateUrl: './consumption.component.html'
})
export class ConsumptionComponent implements OnInit {

    public chartOptions: any = {
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
                ticks: {
                    beginAtZero: false
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
    public chartType = 'line';

    @Input()
    public vehicle: Vehicle;

    @Input()
    public userPreferences: UserPreferences;

    constructor(private fuelService: FuelService) { }

    ngOnInit() {

        this.chartOptions.scales.yAxes[0].scaleLabel.labelString = this.userPreferences.fuelConsumptionUnit.unit;

        this.fuelService.getFuelForVehicle(this.vehicle.id, this.userPreferences).subscribe(data => {
            this.buildConsumptionChart(data.fuel);
        });
    }

    private buildConsumptionChart(fuel: Fuel[]) {

        const vehicleChartData = {

            labels: [],
            vehicleName: this.vehicle.name,
            dataset: [
                {
                    data: [],
                    label: `${this.vehicle.name}`,
                }
            ]
        };

        for (let i = 1; i < fuel.length; i++) {

            vehicleChartData.labels.push('');
            vehicleChartData.dataset[0].data.push(fuel[i].consumption);
        }

        this.chartData = vehicleChartData;
    }
}
