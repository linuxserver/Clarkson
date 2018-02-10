import { Component, OnInit } from '@angular/core';

import { Vehicle } from '../../model/vehicle';
import { VehicleService } from '../../services/vehicle.service';

@Component({
    selector: 'app-vehicle-list',
    templateUrl: './vehicles.component.html',
    styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

    public selectedVehicle: Vehicle;
    public vehicles: Vehicle[];

    constructor(private service: VehicleService) { }

    ngOnInit() {

        this.selectVehicle(new Vehicle());
        this.loadVehicles();
    }

    public selectVehicle(vehicle: Vehicle) {
        this.selectedVehicle = Object.assign({}, vehicle);
    }

    public clearSelectedVehicle() {
        this.selectVehicle(new Vehicle());
    }

    public loadVehicles(event?: any) {

        this.service.getVehicles().subscribe(data => {
            this.vehicles = data.vehicles;
        });
    }


    public addVehicle(vehicle: Vehicle) {
        this.vehicles.push(vehicle);
    }

    public updateVehicle(vehicle: Vehicle) {

        const index = this.vehicles.findIndex(v => v.id === vehicle.id);

        if (index > -1) {
            this.vehicles[index] = vehicle;
        }
    }

    public removeVehicle(vehicleId: string) {
        this.vehicles = this.vehicles.filter(v => v.id !== vehicleId);
    }
}
