import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent, LoadingController, NavController, ToastController} from '@ionic/angular';
import {UserService} from '../../services/user.service';
import * as firebase from 'firebase';

@Component({
    selector: 'app-ngo-chat',
    templateUrl: './ngo-chat.page.html',
    styleUrls: ['./ngo-chat.page.scss'],
})
export class NgoChatPage implements OnInit {

    messages = [];
    user: any;
    newMsg: '';
    loading: any;
    ngoEmail: any;
    @ViewChild(IonContent) content: IonContent;

    constructor(private readonly loadingCtrl: LoadingController,
                private navCtrl: NavController,
                private service: UserService) {
    }

    ngOnInit() {
        this.user = this.service.getUser();
        this.ngoEmail = localStorage.getItem('ngoEmail');
        console.log('receiver email: ', this.ngoEmail);
        // tslint:disable-next-line:no-debugger
        debugger;
        this.loadMessages();
    }

    loadMessages() {
        const ref = this.ngoEmail.split('.').join('') + '-' + this.user?.email.split('.').join('');
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
        const ref = this.ngoEmail.split('.').join('') + '-' + this.user?.email.split('.').join('');
        const key = firebase.database().ref().push().key;
        firebase.database().ref(`/channels-with-messages/${ref}`).child(key).set({
            sender: 'donor',
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

    openChannels() {
        this.navCtrl.navigateBack(['/donor-channels']);
    }
}
