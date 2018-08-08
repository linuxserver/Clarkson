import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

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

    constructor(private authService: AuthService, private userService: UserService, private flashMessageService: FlashMessagesService) {
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

    public promote(user: User) {

        this.userService.promoteUser(user.id).subscribe(
            
            response => {

                const index = this.users.findIndex(u => u.id === response.user.id);

                if (index > -1) {
                    this.users[index] = response.user;
                }
            },

            error => {
                this.showErrorMessage(error);
            }
        );
    }

    public demote(user: User) {

        this.userService.demoteUser(user.id).subscribe(
            
            response => {

                const index = this.users.findIndex(u => u.id === response.user.id);

                if (index > -1) {
                    this.users[index] = response.user;
                }
            },

            error => {
                this.showErrorMessage(error);
            }
        );
    }

    public clearUser(userId: string) {
        console.log("User data cleared for " + userId);
    }

    public showErrorMessage(err: any) {

        if (typeof err.error.message === 'string') {
            this.flashMessageService.show(err.error.message, { cssClass: 'alert-danger' });
        } else {
            this.flashMessageService.show(err.error.message.sqlMessage, { cssClass: 'alert-danger' });
        }
    }
}
