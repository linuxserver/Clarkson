import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { FuelType } from '../model/fuel-type';

@Injectable()
export class UnitService {

    constructor(private apiService: ApiService) { }

    public getFuelTypes() {
        return this.apiService.getFuelTypes();
    }

    public getFuelUnits() {
        return this.apiService.getFuelUnits();
    }

    public getFuelConsumptionUnits() {
        return this.apiService.getFuelConsumptionUnits();
    }

    public getDistanceUnits() {
        return this.apiService.getDistanceUnits();
    }

    public getCurrencyUnits() {
        return this.apiService.getCurrencyUnits();
    }
}
