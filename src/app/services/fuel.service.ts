import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import { ApiService } from './api.service';
import { Fuel } from '../model/fuel';
import { UserPreferences } from '../model/user-preferences';

import { ConsumptionConverter } from './conversion/consumption-converter';

@Injectable()
export class FuelService {

    constructor(private apiService: ApiService) { }

    public getFuelForVehicle(vehicleId: string, userPreferences: UserPreferences) {

        return this.apiService.getFuelForVehicle(vehicleId).map(apiResponse => {

            const consumptionConverter = new ConsumptionConverter(userPreferences);

            for (let i = 1; i < apiResponse.fuel.length; i++) {

                const fuelLog = apiResponse.fuel[i];
                const previousFuelLog = apiResponse.fuel[i - 1];

                if (previousFuelLog.fullTank && fuelLog.fullTank && !fuelLog.missedFillUp) {
                    fuelLog.consumption = consumptionConverter.calculateConsumption(fuelLog.fuelAmount, fuelLog.tripDistance);
                }
            }

            return apiResponse;
        });
    }

    public getFuelLog(fuelLogId: string) {
        return this.apiService.getFuelLog(fuelLogId);
    }

    public createFuelLog(fuelLog: Fuel) {
        return this.apiService.createFuelLog(fuelLog);
    }

    public updateFuelLog(fuelLog: Fuel) {
        return this.apiService.updateFuelLog(fuelLog);
    }

    public deleteFuelLog(fuelLogId: string) {
        return this.apiService.deleteFuelLog(fuelLogId);
    }
}
