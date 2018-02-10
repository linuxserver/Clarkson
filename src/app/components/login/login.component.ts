import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { AuthCredentials } from '../../model/auth-credentials';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public loading: boolean;
    public loginForm: FormGroup;
    public errorResponse: string;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {

        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/dashboard']);
        }

        this.loginForm = formBuilder.group({
            'username': [null, Validators.required],
            'password': [null, Validators.required]
        });
    }

    ngOnInit() { }

    public logIn(value: any) {

        this.loading = true;
        this.authService.logIn(new AuthCredentials(value.username, value.password)).subscribe(

            data => {

                this.loading = false;
                this.authService.setToken(data.token);
                this.router.navigate(['/dashboard']);
            },

            err => {

                this.loading = false;
                this.errorResponse = err.error.message;
            }
        );
    }

    public registrationsEnabled() {
        return true;
    }
}
