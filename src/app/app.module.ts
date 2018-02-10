import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { VehicleEditComponent } from './components/vehicle-edit/vehicle-edit.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { FuelListComponent } from './components/fuel-list/fuel-list.component';
import { FillUpsComponent } from './components/fill-ups/fill-ups.component';
import { FuelLogEditComponent } from './components/fuel-log-edit/fuel-log-edit.component';

import { VehicleService } from './services/vehicle.service';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { UnitService } from './services/unit.service';
import { FuelService } from './services/fuel.service';
import { DashboardService } from './services/dashboard.service';

import { AuthGuard } from './guards/auth.guard';
import { RegistrationGuard } from './guards/registration.guard';

import { TokenInterceptor } from './interceptors/token.interceptor';
import { UnauthorisedResponseInterceptor } from './interceptors/unauthorised-response.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        VehiclesComponent,
        LoginComponent,
        DashboardComponent,
        NavComponent,
        PageNotFoundComponent,
        RegisterComponent,
        VehicleEditComponent,
        SettingsComponent,
        FuelListComponent,
        FillUpsComponent,
        FuelLogEditComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule,
        ChartsModule
    ],
    providers: [
        VehicleService,
        ApiService,
        AuthService,
        UserService,
        UnitService,
        FuelService,
        DashboardService,
        AuthGuard,
        RegistrationGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UnauthorisedResponseInterceptor,
            multi: true
        }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
