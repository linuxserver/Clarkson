import { Vehicle } from './vehicle';
import { User } from './user';
import { Fuel } from './fuel';
import { FuelType } from './fuel-type';
import { UserPreferences, Unit, CurrencyUnit } from './user-preferences';
import { DashboardTopStats } from './dashboard-top-stats';

export class DashboardTopStatsApiResponse {
    topStats: DashboardTopStats[];
}

export class FuelListApiResponse {

    preferences: UserPreferences;
    fuel: Fuel[];
}

export class FuelApiResponse {

    preferences: UserPreferences;
    fuel: Fuel;
}

export class FuelTypesApiResponse {
    fuelTypes: FuelType[];
}

export class FuelUnitsApiResponse {
    fuelUnits: Unit[];
}

export class FuelConsumptionUnitsApiResponse {
    fuelConsumptionUnits: Unit[];
}

export class DistanceUnitsApiResponse {
    distanceUnits: Unit[];
}

export class CurrencyUnitsApiResponse {
    currencyUnits: CurrencyUnit[];
}

export class GenericApiResponse {
    status: String;
}

export class VehiclesApiResponse {
    vehicles: Vehicle[];
}

export class VehicleApiResponse {
    vehicle: Vehicle;
}

export class TokenApiResponse {
    token: string;
}

export class UserApiResponse {
    user: User;
}
