import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

import {
    VehiclesApiResponse,
    VehicleApiResponse,
    TokenApiResponse,
    UserApiResponse,
    GenericApiResponse,
    FuelTypesApiResponse,
    FuelListApiResponse,
    FuelApiResponse,
    FuelUnitsApiResponse,
    FuelConsumptionUnitsApiResponse,
    DistanceUnitsApiResponse,
    CurrencyUnitsApiResponse,
    DashboardTopStatsApiResponse,
    DashboardMonthlyFuelCostsApiResponse
} from '../model/api';

import { AuthCredentials } from '../model/auth-credentials';
import { User } from '../model/user';
import { UserPreferences } from '../model/user-preferences';
import { Vehicle } from '../model/vehicle';
import { Fuel } from '../model/fuel';

@Injectable()
export class ApiService {

    private baseUrl: String;

    constructor(private httpClient: HttpClient) {
        this.baseUrl = `${environment.apiBaseUrl}`;
    }

    public getVehicles(): Observable<VehiclesApiResponse> {
        return this.httpClient.get<VehiclesApiResponse>(`${this.baseUrl}/vehicle`);
    }

    public getVehicle(vehicleId: String): Observable<VehicleApiResponse> {
        return this.httpClient.get<VehicleApiResponse>(`${this.baseUrl}/vehicle/${vehicleId}`);
    }

    public createVehicle(vehicle: Vehicle): Observable<VehicleApiResponse> {
        return this.httpClient.post<VehicleApiResponse>(`${this.baseUrl}/vehicle`, vehicle);
    }

    public updateVehicle(vehicle: Vehicle): Observable<VehicleApiResponse> {
        return this.httpClient.put<VehicleApiResponse>(`${this.baseUrl}/vehicle/${vehicle.id}`, vehicle);
    }

    public deleteVehicle(vehicleId: String): Observable<GenericApiResponse> {
        return this.httpClient.delete<GenericApiResponse>(`${this.baseUrl}/vehicle/${vehicleId}`);
    }

    public getFuelForVehicle(vehicleId: string): Observable<FuelListApiResponse> {
        return this.httpClient.get<FuelListApiResponse>(`${this.baseUrl}/vehicle/${vehicleId}/fuel`);
    }

    public createFuelLog(fuelLog: Fuel): Observable<FuelApiResponse> {
        return this.httpClient.post<FuelApiResponse>(`${this.baseUrl}/vehicle/${fuelLog.vehicle}/fuel`, fuelLog);
    }

    public getFuelLog(fuelLogId: String): Observable<FuelApiResponse> {
        return this.httpClient.get<FuelApiResponse>(`${this.baseUrl}/fuel/${fuelLogId}`);
    }

    public updateFuelLog(fuelLog: Fuel): Observable<FuelApiResponse> {
        return this.httpClient.put<FuelApiResponse>(`${this.baseUrl}/fuel/${fuelLog.id}`, fuelLog);
    }

    public deleteFuelLog(fuelLogId: string): Observable<GenericApiResponse> {
        return this.httpClient.delete<GenericApiResponse>(`${this.baseUrl}/fuel/${fuelLogId}`);
    }

    public login(credentials: AuthCredentials): Observable<TokenApiResponse> {
        return this.httpClient.post<TokenApiResponse>(`${this.baseUrl}/auth/authenticate`, credentials);
    }

    public registerUser(user: User): Observable<UserApiResponse> {
        return this.httpClient.post<UserApiResponse>(`${this.baseUrl}/user`, user);
    }

    public getUser(userId: string): Observable<UserApiResponse> {
        return this.httpClient.get<UserApiResponse>(`${this.baseUrl}/user/${userId}`);
    }

    public updateUserPreferences(userId: string, userPreferences: UserPreferences): Observable<UserApiResponse> {
        return this.httpClient.put<UserApiResponse>(`${this.baseUrl}/user/${userId}/updatePreferences`, userPreferences);
    }

    public getFuelTypes(): Observable<FuelTypesApiResponse> {
        return this.httpClient.get<FuelTypesApiResponse>(`${this.baseUrl}/units/fuelTypes`);
    }

    public getFuelUnits(): Observable<FuelUnitsApiResponse> {
        return this.httpClient.get<FuelUnitsApiResponse>(`${this.baseUrl}/units/fuelUnits`);
    }

    public getFuelConsumptionUnits(): Observable<FuelConsumptionUnitsApiResponse> {
        return this.httpClient.get<FuelConsumptionUnitsApiResponse>(`${this.baseUrl}/units/fuelConsumptionUnits`);
    }

    public getDistanceUnits(): Observable<DistanceUnitsApiResponse> {
        return this.httpClient.get<DistanceUnitsApiResponse>(`${this.baseUrl}/units/distanceUnits`);
    }

    public getCurrencyUnits(): Observable<CurrencyUnitsApiResponse> {
        return this.httpClient.get<CurrencyUnitsApiResponse>(`${this.baseUrl}/units/currencyUnits`);
    }

    public getDashboardTopStats(): Observable<DashboardTopStatsApiResponse> {
        return this.httpClient.get<DashboardTopStatsApiResponse>(`${this.baseUrl}/dashboard`);
    }

    public getMonthlyFuelCosts(): Observable<DashboardMonthlyFuelCostsApiResponse> {
        return this.httpClient.get<DashboardMonthlyFuelCostsApiResponse>(`${this.baseUrl}/dashboard/monthlyFuelCosts`);
    }
}
