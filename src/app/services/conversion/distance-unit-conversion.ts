export class DistanceUnitConversionFactory {

    public static get(distanceUnit: string, distance: number) {

        if ('mi' === distanceUnit) {
            return new MilesUnitConversion(distance);
        }

        return new KilometerUnitConversion(distance);
    }
}

export interface DistanceUnitConversion {

    toMiles();
    toKilometers();
}

export class MilesUnitConversion implements DistanceUnitConversion {

    constructor(private distance: number) { }

    public toMiles() {
        return this.distance;
    }

    public toKilometers() {
        return this.distance * 1.60934;
    }
}

export class KilometerUnitConversion implements DistanceUnitConversion {

    constructor(private distance: number) { }

    public toMiles() {
        return this.distance * 0.621371;
    }

    public toKilometers() {
        return this.distance;
    }
}
