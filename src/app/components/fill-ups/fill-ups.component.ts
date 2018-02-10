import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Vehicle } from '../../model/vehicle';
import { Fuel } from '../../model/fuel';

import { VehicleService } from '../../services/vehicle.service';
import { FuelService } from '../../services/fuel.service';

@Component({
    selector: 'app-fill-ups',
    templateUrl: './fill-ups.component.html'
})
export class FillUpsComponent implements OnInit {

    public vehicles: Vehicle[];

    constructor(private vehicleService: VehicleService, private router: Router) { }

    ngOnInit() {

        this.vehicleService.getVehicles().subscribe(data => {
            this.vehicles = data.vehicles;
        });
    }

    public goToFuelLogs(vehicleId: string) {
        this.router.navigate(['/fill-ups', vehicleId]);
    }
}
