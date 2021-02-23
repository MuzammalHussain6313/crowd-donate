import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent, LoadingController, ToastController} from '@ionic/angular';
import {UserService} from '../../services/user.service';
import * as firebase from 'firebase';

@Component({
    selector: 'app-donor-chat',
    templateUrl: './donor-chat.page.html',
    styleUrls: ['./donor-chat.page.scss'],
})
export class DonorChatPage implements OnInit {

    messages = [];
    user: any;
    newMsg: '';
    loading: any;
    donorEmail: any;
    @ViewChild(IonContent) content: IonContent;

    constructor(private readonly loadingCtrl: LoadingController,
                private service: UserService) {
    }

    ngOnInit() {
        this.user = this.service.getUser();
        this.donorEmail = localStorage.getItem('donorEmail');
        console.log('receiver email: ', this.donorEmail);
        // tslint:disable-next-line:no-debugger
        debugger;
        this.loadMessages();
    }

    loadMessages() {
        const ref = this.user?.email.split('.').join('') + '-' + this.donorEmail.split('.').join('');
        console.log(ref);
        firebase.database().ref(`/channels-with-messages/${ref}`).orderByChild('time').on('value', snapshot => {
            this.messages = [];
            // tslint:disable-next-line:no-debugger
            debugger;
            snapshot.forEach((node) => {
                this.messages.push(node.val());
                console.log(this.messages);
            });
        }, err => {
            alert(err);
        });
    }

    async sendMessage() {
        const ref = this.user?.email.split('.').join('') + '-' + this.donorEmail.split('.').join('');
        const key = firebase.database().ref().push().key;
        firebase.database().ref(`/channels-with-messages/${ref}`).child(key).set({
            sender: 'ngo',
            name: this.user.fullName,
            time: Date.now(),
            message: this.newMsg
        }).then(res => {
        }).catch(err => console.log(err));
        this.newMsg = '';
        setTimeout(() => {
            this.content.scrollToBottom(10);
        });
    }

}
