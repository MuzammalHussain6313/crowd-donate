import {Injectable} from '@angular/core';
import {User} from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    user: User;

    constructor() {
      this.user = new User();
    }

    setUser(user: any) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
    }

    getUser() {
        this.user = JSON.parse(localStorage.getItem('user'));
        return this.user;
    }
}
