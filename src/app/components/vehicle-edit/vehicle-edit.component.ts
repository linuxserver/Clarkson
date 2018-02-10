import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    AfterViewChecked,
    ChangeDetectorRef,
    ViewChild,
    ElementRef
} from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Vehicle } from '../../model/vehicle';
import { FuelType } from '../../model/fuel-type';

import { VehicleService } from '../../services/vehicle.service';
import { UnitService } from '../../services/unit.service';

@Component({
    selector: 'app-vehicle-edit',
    templateUrl: './vehicle-edit.component.html',
    styleUrls: ['./vehicle-edit.component.css']
})
export class VehicleEditComponent implements OnInit, AfterViewChecked {

    @Input()
    public vehicle: Vehicle;

    @Output()
    public saveSuccess: EventEmitter<Vehicle> = new EventEmitter();

    @Output()
    public updateSuccess: EventEmitter<Vehicle> = new EventEmitter();

    @Output()
    public deleteSuccess: EventEmitter<string> = new EventEmitter();

    @ViewChild('closeVehicleEditModal')
    public closeVehicleEditModal: ElementRef;

    public fuelTypes: FuelType[];

    public vehicleForm: FormGroup;
    public errorResponse: string;

    constructor(private vehicleService: VehicleService, private formBuilder: FormBuilder,
        public changeDetector: ChangeDetectorRef, private unitService: UnitService) {

        this.vehicleForm = formBuilder.group({

            'id': [null],
            'name': [null, Validators.required],
            'registration': [null],
            'make': [null, Validators.required],
            'model': [null],
            'yearOfManufacture': [null],
            'vin': [null],
            'engineSizeCC': [null, Validators.pattern('[0-9]*')],
            'fuelType': [null, Validators.required]
        });
    }

    ngOnInit() {

        this.unitService.getFuelTypes().subscribe(data => {
            this.fuelTypes = data.fuelTypes;
        });
    }

    ngAfterViewChecked() {
        this.changeDetector.detectChanges();
    }

    public delete() {

        this.vehicleService.deleteVehicle(this.vehicle.id).subscribe(data => {

            this.closeModal();
            this.deleteSuccess.emit(this.vehicle.id);
        });
    }

    public save() {

        if (this.isEmptyOrNull(this.vehicle.id)) {

            this.vehicleService.createVehicle(this.vehicle).subscribe(

                data => {

                    this.closeModal();
                    this.saveSuccess.emit(data.vehicle);
                },

                err => {
                    this.showErrorMessage(err);
                }
            );

        } else {

            this.vehicleService.updateVehicle(this.vehicle).subscribe(

                data => {

                    this.closeModal();
                    this.updateSuccess.emit(data.vehicle);
                },

                err => {
                    this.showErrorMessage(err);
                }
            );

        }
    }

    public closeModal() {
        this.closeVehicleEditModal.nativeElement.click();
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
