import {Component} from '@angular/core';
<<<<<<< HEAD
import {LoadingController, NavController} from '@ionic/angular';
import * as firebase from 'firebase';
import {UserService} from '../services/user.service';
import {ProjectService} from '../services/project.service';
=======
import {ActionSheetController, AlertController, NavController} from '@ionic/angular';
>>>>>>> 8869fc7e5629414af878c92babc7863e66e49bb0

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    student = true;
    faculty = false;

<<<<<<< HEAD
    constructor(private loadingCtrl: LoadingController,
                private service: UserService,
                private projectService: ProjectService,
=======
    constructor(private actionCtrl: ActionSheetController,
                private alertCtrl: AlertController,
>>>>>>> 8869fc7e5629414af878c92babc7863e66e49bb0
                private navCtrl: NavController) {
    }

    segmentChanged($event: CustomEvent) {
        this.student = !this.student;
        this.faculty = !this.faculty;
    }

<<<<<<< HEAD
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
=======
    async moreOptions() {
        const alert = await this.actionCtrl.create({
            header: 'More Options !!!',
            cssClass: 'my-custom-class',
            buttons: [
                {
                    text: 'View Details',
                    icon: 'eye',
                    cssClass: 'secondary',
                    handler: () => {
                        // this.navCtrl.navigateForward(['/result']);
                    }
                },
                {
                    text: 'Delete',
                    icon: 'trash',
                    cssClass: 'danger',
                    handler: () => {
                        this.navCtrl.navigateForward(['/add-quiz']);
                    }
                },
                {
                    text: 'Edit',
                    icon: 'pencil-sharp',
                    cssClass: 'primary',
                    handler: () => {
                        // this.navCtrl.navigateForward(['/students']);
                    }
>>>>>>> 8869fc7e5629414af878c92babc7863e66e49bb0
                }
            ]
        });
<<<<<<< HEAD
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
=======
        await alert.present();
>>>>>>> 8869fc7e5629414af878c92babc7863e66e49bb0
    }
}
