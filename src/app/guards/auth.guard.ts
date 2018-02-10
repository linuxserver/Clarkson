import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate() {

        if (this.authService.isAuthenticated()) {
            return true;
        }

        this.router.navigate(['login']);
        return false;
    }
}
