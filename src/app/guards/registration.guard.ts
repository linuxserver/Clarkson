import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class RegistrationGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate() {

        if (this.authService.isAuthenticated()) {

            this.router.navigate([ '/dashboard' ]);
            return false;
        }

        return true;
    }
}
