import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent, LoadingController, NavController} from '@ionic/angular';
import {UserService} from '../../services/user.service';
import * as firebase from 'firebase';

@Component({
    selector: 'app-channels',
    templateUrl: './channels.page.html',
    styleUrls: ['./channels.page.scss'],
})
export class ChannelsPage implements OnInit {

    channels = [];
    user: any;
    loading: any;
    @ViewChild(IonContent) content: IonContent;

    constructor(private readonly loadingCtrl: LoadingController,
                private service: UserService,
                private navCtrl: NavController) {
    }

    ngOnInit() {
        this.user = this.service.getUser();
        this.loadChannels();
    }

    loadChannels() {
        const filter = this.user?.email.split('.').join('');
        firebase.database().ref(`/channels`).once('value', snapshot => {
            this.channels = [];
            snapshot.forEach((node) => {
                const data = node.val();
                if (data?.receiver === this.user?.email) {
                    this.channels.push(node.val());
                }
            });
        }, err => {
            alert(err);
        });
    }

    goToChat(email) {
        console.log('saving', email);
        localStorage.setItem('ngoEmail', email);
        this.navCtrl.navigateForward(['/ngo-chat']);
    }

    goHome() {
        this.navCtrl.navigateRoot(['/tabs/tab1']);
    }
}
