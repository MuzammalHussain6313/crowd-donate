import {Component} from '@angular/core';
import {LoadingController, NavController} from '@ionic/angular';
import * as firebase from 'firebase';
import {UserService} from '../services/user.service';
import {ProjectService} from '../services/project.service';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    donors = [];
    loading: any;
    close: boolean;
    open: boolean;

    constructor(private loadingCtrl: LoadingController,
                private service: UserService,
                private projectService: ProjectService,
                private navCtrl: NavController) {
        this.loadData();
    }

    expandCLick(item) {
        item.show = !item.show;
    }

    async loadData() {
        this.open = false;
        this.close = true;
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        firebase.database().ref('/users')
            .once('value').then(snapshot => {
            snapshot.forEach((node) => {
                const user = node.val();
                if (user.isDonor) {
                    this.donors.push(user);
                }
                if (this.loading) {
                    this.loading.dismiss();
                }
                console.log(this.donors);
            });
        }).catch(err => {
            if (this.loading) {
                this.loading.dismiss();
            }
            alert(err);
        });
    }

    openChat(email) {
        localStorage.setItem('donorEmail', email);
        const user = JSON.parse(localStorage.getItem('user'));
        const channel: any = {};
        channel.sender = user.email;
        channel.reciever = email;
        let found = false;
        const channels = this.projectService.channels;
        for (let i = 0; i < channels.length; i++) {
            if (channels[i].sender === user?.email && channels[i].receiver === email) {
                found = true;
                break;
            }
        }
        if (!found) {
            const key = firebase.database().ref('/channels').push().key;
            firebase.database().ref('/channels').child(key).set(channel);
            this.navCtrl.navigateForward(['/donor-chat']);
        } else {
            this.navCtrl.navigateForward(['/donor-chat']);
        }
    }
}
