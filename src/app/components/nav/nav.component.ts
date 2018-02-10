import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { User } from '../../model/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {

    public user: User;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {}

    logOut() {

        this.authService.logOut();
        this.router.navigate(['/login']);
    }

    isUserLoggedIn() {
        return this.authService.isAuthenticated();
    }
}
