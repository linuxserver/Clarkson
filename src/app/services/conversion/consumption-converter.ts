import { FuelUnitConversionFactory } from './fuel-unit-conversion';
import { DistanceUnitConversionFactory } from './distance-unit-conversion';

import { UserPreferences } from '../../model/user-preferences';

export class ConsumptionConverter {

    constructor(private userPreferences: UserPreferences) { }

    public calculateConsumption(fuelAmount: number, tripDistance: number) {

        const consumptionUnit = this.userPreferences.fuelConsumptionUnit.unit;
        const fuelUnit = this.userPreferences.fuelUnit.unit;
        const distanceUnit = this.userPreferences.distanceUnit.unit;

        const fuelUnitConversion = FuelUnitConversionFactory.get(fuelUnit, fuelAmount);
        const distanceUnitConversion = DistanceUnitConversionFactory.get(distanceUnit, tripDistance);

        if ('mpg' === consumptionUnit) {
            return distanceUnitConversion.toMiles() / fuelUnitConversion.toGallons();
        }

        if ('l/100km' === consumptionUnit) {
            return (fuelUnitConversion.toLitres() / distanceUnitConversion.toKilometers()) * 100;
        }

        return 0;
    }
}
