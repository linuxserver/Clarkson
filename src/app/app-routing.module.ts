import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { RegistrationGuard } from './guards/registration.guard';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FuelListComponent } from './components/fuel-list/fuel-list.component';
import { FillUpsComponent } from './components/fill-ups/fill-ups.component';
import { FuelLogEditComponent } from './components/fuel-log-edit/fuel-log-edit.component';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent, canActivate: [ RegistrationGuard ]},
    { path: 'settings', component: SettingsComponent, canActivate: [ AuthGuard ]},
    { path: 'vehicles', component: VehiclesComponent, canActivate: [ AuthGuard ]},
    { path: 'fill-ups', component: FillUpsComponent, canActivate: [ AuthGuard ], children: [
        { path: ':vehicleId', component: FuelListComponent }
    ]},
    { path: 'fill-ups/:vehicleId/new', component: FuelLogEditComponent, canActivate: [ AuthGuard ]},
    { path: 'fill-ups/:vehicleId/edit/:id', component: FuelLogEditComponent, canActivate: [ AuthGuard ]},
    { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuard ]},
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    exports: [ RouterModule ],
    imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
