export class FuelUnitConversionFactory {

    public static get(fuelUnit: string, fuelAmount: number) {

        if ('l' === fuelUnit) {
            return new LitresConversion(fuelAmount);
        }

        if ('gal' === fuelUnit) {
            return new GallonsConversion(fuelAmount);
        }

        return new GallonsUSConversion(fuelAmount);
    }
}

export interface FuelUnitConversion {

    toLitres();
    toGallons();
    toGallonsUS();
}

export class LitresConversion implements FuelUnitConversion {

    constructor(private fuelAmount: number) { }

    public toLitres() {
        return this.fuelAmount;
    }

    public toGallons() {
        return this.fuelAmount * 0.219969;
    }

    public toGallonsUS() {
        return this.fuelAmount * 0.264172;
    }
}

export class GallonsConversion implements FuelUnitConversion {

    constructor(private fuelAmount: number) { }

    public toLitres() {
        return this.fuelAmount * 4.54609;
    }

    public toGallons() {
        return this.fuelAmount;
    }

    public toGallonsUS() {
        return this.fuelAmount * 1.20095;
    }
}

export class GallonsUSConversion implements FuelUnitConversion {

    constructor(private fuelAmount: number) { }

    public toLitres() {
        return this.fuelAmount * 3.78541;
    }

    public toGallons() {
        return this.fuelAmount * 0.832674;
    }

    public toGallonsUS() {
        return this.fuelAmount;
    }
}
