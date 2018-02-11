import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { User } from '../../model/user';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

    public registrationForm: FormGroup;
    public errorResponse: string;
    public loading: boolean;

    constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {

        this.registrationForm = formBuilder.group({
            'username': [null, Validators.required],
            'emailAddress': [null, Validators.required],
            'password': [null, [Validators.required, Validators.minLength(6)]]
        });
    }

    ngOnInit() { }

    public register(value: any) {

        const user = new User();

        user.username = value.username;
        user.password = value.password;
        user.email = value.emailAddress;

        this.loading = true;
        this.userService.registerUser(user).subscribe(

            data => {

                this.loading = false;
                this.router.navigate(['/login']);
            },

            err => {

                this.loading = false;
                this.showErrorMessage(err);
            }
        );
    }

    public showErrorMessage(err: any) {

        if (typeof err.error.message === 'string') {
            this.errorResponse = err.error.message;
        } else {
            this.errorResponse = err.error.message.sqlMessage;
        }
    }
}
