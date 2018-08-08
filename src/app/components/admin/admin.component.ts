import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

import { User } from '../../model/user';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

    public users: User[];
    public selectedUser: User;

    constructor(private authService: AuthService, private userService: UserService) {
    }

    ngOnInit() {

        this.userService.getAllUsers().subscribe(response => {
            this.users = response.users;
        });
    }

    public selectUser(user: User) {
        this.selectedUser = user;
    }

    public isUserYou(user: User) {
        return this.authService.getUserId() === user.id;
    }

    public isUserAdmin(user: User) {
        return user.admin;
    }

    public removeUser(userId: string) {
        this.users = this.users.filter(u => u.id !== userId);
    }

    public clearUser(userId: string) {
        console.log("User data cleared for " + userId);
    }
}
