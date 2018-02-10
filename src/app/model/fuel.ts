export class Fuel {

    id: string;
    vehicle: string;
    date: string;
    fuelAmount: number;
    totalCost: number;
    fuelUnitCost: number;
    locationLatitude: number;
    locationLongitude: number;
    odometerReading: number;
    tripDistance: number;
    notes: string;
    fullTank = true;
    missedFillUp: boolean;
    consumption: number;
}
