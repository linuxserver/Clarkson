import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { Vehicle } from '../model/vehicle';

@Injectable()
export class VehicleService {

    constructor(private apiService: ApiService) { }

    public getVehicles() {
        return this.apiService.getVehicles();
    }

    public getVehicle(vehicleId: String) {
        return this.apiService.getVehicle(vehicleId);
    }

    public createVehicle(vehicle: Vehicle) {
        return this.apiService.createVehicle(vehicle);
    }

    public updateVehicle(vehicle: Vehicle) {
        return this.apiService.updateVehicle(vehicle);
    }

    public deleteVehicle(vehicleId: String) {
        return this.apiService.deleteVehicle(vehicleId);
    }
}
