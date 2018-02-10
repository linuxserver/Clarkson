import { UserPreferences } from './user-preferences';

export class User {

    id: string;
    username: string;
    password: string;
    email: string;
    admin: boolean;
    preferences: UserPreferences;
}
