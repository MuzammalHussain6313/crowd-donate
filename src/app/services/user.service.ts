import {Injectable} from '@angular/core';
import {User} from '../models/user';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor() {
        this.user = new User();
        this.loadAllUser();
    }

    selectedEmail: any;
    user: User;
    allUsers: any = [];

    setUser(user: any) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
    }

    getUser() {
        this.user = JSON.parse(localStorage.getItem('user'));
        return this.user;
    }

    loadAllUser() {
        this.allUsers = [];
<<<<<<< HEAD
        firebase.database().ref('/users').once('value', snapshot => {
=======
        firebase.database().ref('users').once('value', snapshot => {
>>>>>>> 8869fc7e5629414af878c92babc7863e66e49bb0
            const data = snapshot.val();
            snapshot.forEach(node => {
                this.allUsers.push(node.val());
            });
        });
    }
}
