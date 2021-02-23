import {Component} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {ActionSheetController, AlertController, LoadingController, NavController} from '@ionic/angular';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

    user: User;
    loading: any;

    constructor(private service: UserService,
                private camera: Camera,
                private loadingCtrl: LoadingController,
                private alertCtrl: AlertController,
                private actionCtrl: ActionSheetController,
                private http: HttpClient,
                private navCtrl: NavController) {
        this.user = new User();
        this.user = service.getUser();
    }

    img: any;

    async logOut() {
        const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            message: 'Are you sure to logout?',
            buttons: [
                {
                    text: 'Cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                }, {
                    text: 'Ok',
                    handler: () => {
                        this.logOutFromFirebase();
                    }
                }
            ]
        });
        await alert.present();
    }

    async logOutFromFirebase() {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        firebase.auth().signOut().then((res) => {
            console.log(res);
            localStorage.clear();
            if (this.loading) {
                this.loading.dismiss();
            }
            this.navCtrl.navigateRoot(['']);
        }).catch((error) => {
            alert(error);
            if (this.loading) {
                this.loading.dismiss();
            }
        });
    }

    async moreOptions() {
        const alert = await this.actionCtrl.create({
            cssClass: 'my-custom-class',
            buttons: [
                {
                    text: 'Log Out',
                    icon: 'log-out',
                    cssClass: 'secondary',
                    handler: () => {
                        this.logOut();
                    }
                },
                {
                    text: 'Settings',
                    icon: 'settings',
                    cssClass: 'primary',
                    handler: () => {
                        this.navCtrl.navigateRoot(['/tabs/tab1']);
                    }
                },
                {
                    text: 'Change Password',
                    icon: 'lock-closed',
                    cssClass: 'primary',
                    handler: () => {
                        this.navCtrl.navigateForward(['/change-password']);
                        console.log('Destructive clicked');
                    }
                },
                {
                    text: 'Help Desk',
                    icon: 'mail',
                    cssClass: 'primary',
                    handler: () => {
                        console.log('Archive clicked');
                        if (this.user.isAdmin) {
                            this.navCtrl.navigateForward(['/admin-channels']);
<<<<<<< HEAD
                        } else if (this.user.isDonor) {
                            this.navCtrl.navigateForward(['/donor-help-desk']);
                        } else {
                            this.navCtrl.navigateForward(['/ngo-help-desk']);
=======
                        } else if (this.user.isStudent) {
                            this.navCtrl.navigateForward(['/student-help-desk']);
                        } else {
                            this.navCtrl.navigateForward(['/teacher-help-desk']);
>>>>>>> 8869fc7e5629414af878c92babc7863e66e49bb0
                        }
                    }
                },
                {
                    text: 'Cancel',
                    icon: 'backspace',
                    cssClass: 'primary',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        await alert.present();
    }

    goToPrivacy() {
        this.navCtrl.navigateForward((['/privacy']));
    }

    goToContactUs() {
        this.navCtrl.navigateForward(['/contact-us']);
    }

    goToNotifications() {
        this.navCtrl.navigateForward(['/notifications']);
    }

    goToEditProfile() {
        this.navCtrl.navigateForward(['/edit-profile']);
    }

    goToChangePassword() {
        this.navCtrl.navigateForward(['/change-password']);
    }

    goToTerms() {
        this.navCtrl.navigateForward(['/terms']);
    }

    async senNotification() {
        const data = {};
        await this.http.post('https://send-notification-api.herokuapp.com/send-notification', data)
            .subscribe(res => {
                this.showAlert();
            });
    }

    async showAlert() {
        const alert = await this.alertCtrl.create({
            header: 'Success!',
            message: '<strong>Notification successfully send</strong>!!!',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Okay',
                    handler: () => {
                        console.log('Confirm Okay');
                    }
                }
            ]
        });
        alert.present();
    }
}
