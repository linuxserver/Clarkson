import { Injectable } from '@angular/core';

import { AuthCredentials } from '../model/auth-credentials';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

import { User } from '../model/user';
import { UserPreferences } from '../model/user-preferences';

@Injectable()
export class UserService {

    constructor(private authService: AuthService, private apiService: ApiService) { }

    registerUser(user: User) {
        return this.apiService.registerUser(user);
    }

    getUser() {
        return this.apiService.getUser(this.authService.getUserId());
    }

    updateUserPreferences(userId: string, userPreferences: UserPreferences) {
        return this.apiService.updateUserPreferences(userId, userPreferences);
    }
}
