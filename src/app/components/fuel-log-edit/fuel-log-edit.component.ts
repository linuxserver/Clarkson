import {
    Component,
    OnInit,
    OnDestroy,
    AfterViewChecked,
    ChangeDetectorRef
} from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Fuel } from '../../model/fuel';
import { UserPreferences } from '../../model/user-preferences';
import { FuelService } from '../../services/fuel.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-fuel-log-edit',
    templateUrl: './fuel-log-edit.component.html'
})
export class FuelLogEditComponent implements OnInit, OnDestroy, AfterViewChecked {

    private static dateTimePattern = '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}(:[0-9]{2})?';

    private routeSubscription: any;
    private vehicleId: string;

    public fuelLog = new Fuel();
    public userPreferences: UserPreferences;

    public fuelLogForm: FormGroup;
    public errorResponse: string;

    constructor(private router: Router, private route: ActivatedRoute, private fuelService: FuelService,
        private userService: UserService, private formBuilder: FormBuilder, public changeDetector: ChangeDetectorRef) {

        this.fuelLogForm = formBuilder.group({

            'id': [null],
            'date': [null, [Validators.pattern(FuelLogEditComponent.dateTimePattern)]],
            'fuelAmount': [null, Validators.required],
            'totalCost': [null, Validators.required],
            'fuelUnitCost': [null, Validators.required],
            'locationLatitude': [null],
            'locationLongitude': [null],
            'odometerReading': [null, Validators.required],
            'notes': [null],
            'fullTank': [null],
            'missedFillUp': [null]
        });
    }

    ngOnInit() {

        this.routeSubscription = this.route.params.subscribe(params => {

            this.userService.getUser().subscribe(data => {
                this.userPreferences = data.user.preferences;
            });

            const fuelId = params['id'];
            this.vehicleId = params['vehicleId'];

            if (undefined !== fuelId) {

                this.fuelService.getFuelLog(fuelId).subscribe(fuelData => {
                    this.fuelLog = fuelData.fuel;
                });
            }
        });

    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    ngAfterViewChecked() {
        this.changeDetector.detectChanges();
    }

    public delete() {

        this.fuelService.deleteFuelLog(this.fuelLog.id).subscribe(data => {
            this.goBack();
        });
    }

    public save() {

        if (this.isEmptyOrNull(this.fuelLog.id)) {

            this.fuelLog.vehicle = this.vehicleId;
            this.fuelService.createFuelLog(this.fuelLog).subscribe(

                data => {
                    this.goBack();
                },

                err => {
                    this.showErrorMessage(err);
                }
            );

        } else {

            this.fuelService.updateFuelLog(this.fuelLog).subscribe(

                data => {
                    this.goBack();
                },

                err => {
                    this.showErrorMessage(err);
                }
            );

        }
    }

    public goBack() {
        this.router.navigate(['/fill-ups', this.vehicleId]);
    }

    public calculateFuelUnit() {
        this.fuelLog.fuelUnitCost = Math.round((this.fuelLog.totalCost / this.fuelLog.fuelAmount) * 1000) / 1000;

    }

    public calculateTotalCost() {
        this.fuelLog.totalCost = Math.round((this.fuelLog.fuelAmount * this.fuelLog.fuelUnitCost) * 100) / 100;
    }

    public showErrorMessage(err: any) {

        if (typeof err.error.message === 'string') {
            this.errorResponse = err.error.message;
        } else {
            this.errorResponse = err.error.message.sqlMessage;
        }
    }

    public isEmptyOrNull(value: String) {
        return value === null || value === '' || value === undefined;
    }
}
