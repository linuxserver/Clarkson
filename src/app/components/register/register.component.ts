import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { FlashMessagesService } from 'angular2-flash-messages';
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

    constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService,
        private flashMessageService: FlashMessagesService) {

        this.registrationForm = formBuilder.group({
            'username': [null, Validators.required],
            'emailAddress': [null, [Validators.required, Validators.email]],
            'password': [null, [Validators.required, Validators.minLength(6)]],
            'passwordConfirm': [null, [Validators.required, this.matchingPasswords]]
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
                this.flashMessageService.show('Registration Sucessful. You can now log in.', { cssClass: 'alert-success' });
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

    private matchingPasswords(input: FormControl) {

        if (!input.root || !input.root['controls']) {
            return null;
        }

        const exactMatch = input.root['controls'].password.value === input.value;
        return exactMatch ? null : { mismatchedPassword: true };
    }
}
