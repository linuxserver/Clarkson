import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Fuel } from '../../model/fuel';
import { UserPreferences } from '../../model/user-preferences';

import { FuelService } from '../../services/fuel.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-fuel-list',
    templateUrl: './fuel-list.component.html'
})
export class FuelListComponent implements OnInit, OnDestroy {

    private routeSubscription: any;

    public vehicleId: string;
    public loading: boolean;

    public fuelLogs: Fuel[];
    public userPreferences: UserPreferences;

    constructor(private route: ActivatedRoute, private fuelService: FuelService, private userService: UserService) { }

    ngOnInit() {

        this.routeSubscription = this.route.params.subscribe(params => {

            this.vehicleId = params['vehicleId'];
            this.getFuelLogs(this.vehicleId);
        });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    public getFuelLogs(vehicleId: string) {

        this.fuelLogs = [];
        this.vehicleId = vehicleId;
        this.loading = true;

        this.userService.getUser().subscribe(user => {

            this.userPreferences = user.user.preferences;

            this.fuelService.getFuelForVehicle(vehicleId, this.userPreferences).subscribe(data => {

                this.loading = false;
                this.fuelLogs = data.fuel.reverse();
            });
        });
    }
}
