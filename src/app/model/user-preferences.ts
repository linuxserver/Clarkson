export class Unit {

    id: number;
    unit: string;
    unitName: string;
}

export class CurrencyUnit extends Unit {
    symbol: string;
}

export class UserPreferences {

    fuelUnit: Unit;
    distanceUnit: Unit;
    fuelConsumptionUnit: Unit;
    currencyUnit: CurrencyUnit;
}
