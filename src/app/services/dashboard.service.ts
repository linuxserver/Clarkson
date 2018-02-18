import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { ApiService } from './api.service';

@Injectable()
export class DashboardService {

    private static monthsInYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    constructor(private apiService: ApiService) { }

    public getTopStats() {
        return this.apiService.getDashboardTopStats();
    }

    public getMonthlyFuelCosts() {

        return this.apiService.getMonthlyFuelCosts().map(data => {

            const monthlyFuelCosts = new Map<number, FuelCostsByYear>();

            for (const line of data.monthlyFuelCosts) {

                if (!monthlyFuelCosts.get(line.year)) {
                    monthlyFuelCosts.set(line.year, new FuelCostsByYear());
                }

                const year = monthlyFuelCosts.get(line.year);

                if (!year.vehicles.get(line.vehicle)) {
                    year.vehicles.set(line.vehicle, new FuelCostsByVehicle());
                }

                const vehicle = year.vehicles.get(line.vehicle);
                vehicle.monthlyFuelCosts[line.month - 1] = line.totalCost;
            }

            return monthlyFuelCosts;
        });
    }
}

export class FuelCostsByYear {
    vehicles = new Map<string, FuelCostsByVehicle>();
}

export class FuelCostsByVehicle {
    monthlyFuelCosts = new Array<number>(12);
}
