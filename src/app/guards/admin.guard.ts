import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate() {

        if (this.authService.isUserAdmin()) {
            return true;
        }

        this.router.navigate(['/dashboard']);
        return false;
    }
}
