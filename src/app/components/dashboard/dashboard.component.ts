import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../../services/dashboard.service';
import { FuelService } from '../../services/fuel.service';
import { VehicleService } from '../../services/vehicle.service';
import { UserService } from '../../services/user.service';

import { UserPreferences } from '../../model/user-preferences';
import { DashboardTopStats } from '../../model/dashboard-top-stats';
import { Vehicle } from '../../model/vehicle';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    public dashboardTopStats: DashboardTopStats[];
    public userPreferences: UserPreferences;

    public totalVehicles: number;
    public totalDistance: number;
    public totalFillUps: number;
    public totalSpent: number;

    public chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    public chartData = [];
    public chartType = 'line';

    constructor(private userService: UserService, private dashboardService: DashboardService,
        private fuelService: FuelService, private vehicleService: VehicleService) { }

    ngOnInit() {

        this.userService.getUser().subscribe(userData => {

            this.userPreferences = userData.user.preferences;

            this.dashboardService.getTopStats().subscribe(data => {
                this.buildTopStats(data.topStats);
            });

            this.vehicleService.getVehicles().subscribe(vehicles => {
                this.buildConsumptionCharts(vehicles.vehicles);
            });
        });
    }

    private buildTopStats(topStats: DashboardTopStats[]) {

        this.dashboardTopStats = topStats;
        this.totalVehicles = this.dashboardTopStats.length;
        this.totalDistance = this.sumDistance(this.dashboardTopStats);
        this.totalFillUps = this.sumFillUps(this.dashboardTopStats);
        this.totalSpent = this.sumSpend(this.dashboardTopStats);
    }

    private buildConsumptionCharts(vehicles: Vehicle[]) {

        for (const vehicle of vehicles) {

            const vehicleChartData = {

                labels: [],
                vehicleName: vehicle.name,
                dataset: [
                    {
                        data: [],
                        label: this.userPreferences.fuelConsumptionUnit.unitName,
                    }
                ]
            };

            this.fuelService.getFuelForVehicle(vehicle.id, this.userPreferences).subscribe(fuel => {

                for (let i = 1; i < fuel.fuel.length; i++) {

                    vehicleChartData.labels.push(fuel.fuel[i].date);
                    vehicleChartData.dataset[0].data.push(fuel.fuel[i].consumption);
                }

                this.chartData.push(vehicleChartData);
            });
        }
    }

    private sumDistance(stats: DashboardTopStats[]) {

        let distance = 0;
        for (const stat of stats) {
            distance += stat.totalDistance;
        }
        return distance;
    }

    private sumFillUps(stats: DashboardTopStats[]) {

        let fillUps = 0;
        for (const stat of stats) {
            fillUps += stat.totalFillUps;
        }
        return fillUps;
    }

    private sumSpend(stats: DashboardTopStats[]) {

        let spend = 0;
        for (const stat of stats) {
            spend += stat.totalSpent;
        }
        return spend;
    }

}
