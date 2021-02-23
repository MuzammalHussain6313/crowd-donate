import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {UserService} from './services/user.service';
import {ProjectService} from './services/project.service';
import {FCM} from 'cordova-plugin-fcm-with-dependecy-updated/ionic';
import { AppLauncher, AppLauncherOptions } from '@ionic-native/app-launcher/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
<<<<<<< HEAD
    appState: any;
    user: User;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private service: UserService,
        private projectService: ProjectService,
        private navCtrl: NavController,
        private appLauncher: AppLauncher,
        // private fcm: FCM,
    ) {
        this.initializeApp();
        this.user = service.getUser();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.statusBar.backgroundColorByHexString('#dadada');
            // this.statusBar.backgroundColorByHexString('#3dc2ff');  // secondary
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.checkAppState();
            // this.saveDeviseTokens();
            // this.openEasypaisa();
        });
    }

    openEasypaisa() {
        const options: AppLauncherOptions = {
            packageName: 'pk.com.telenor.phoenix'
        };
        this.appLauncher.launch(options).then(res => {
            console.log('easypaisa alunched', res);
        }).catch(err => {
            console.log('error: ', err);
        });
    }
    saveDeviseTokens() {
        if (!FCM.hasPermission()) {
            FCM.requestPushPermission().then(res => {
                console.log('response: ', res);
            }).catch(error => {
                console.log('error: ', error);
            });
        }
        FCM.getToken().then(data => {
            console.log('ttttooookkkkeeeennnn.', data);
        }).catch(err => {
            console.log('error occured: ', err);
        });
        FCM.onNotification().subscribe(data => {
            console.log('notification data: ', data);
            if (data.wasTapped) {
                console.log('Received in background');
            } else {
                console.log('Received in foreground');
            }
        });

        // refresh the FCM token
        FCM.onTokenRefresh().subscribe(token => {
            console.log('token refreshed: ', token);
        });
        // FCM.getToken().then(token => {
        //     firebase.database().ref(`deviceTokens/`).set(token);
        // });
    }
=======
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private service: UserService
  ) {
    this.initializeApp();
  }
>>>>>>> 8869fc7e5629414af878c92babc7863e66e49bb0

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
