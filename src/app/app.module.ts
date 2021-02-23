import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
<<<<<<< HEAD
// import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { AppLauncher, AppLauncherOptions } from '@ionic-native/app-launcher/ngx';
=======
import * as firebase from 'firebase';
>>>>>>> 8869fc7e5629414af878c92babc7863e66e49bb0

const firebaseConfig = {
    apiKey: 'AIzaSyBop6vDS-Vyjujl71qcPYLui2ZxyrHDppc',
    authDomain: 'quiz-on-mobile-app.firebaseapp.com',
    projectId: 'quiz-on-mobile-app',
    storageBucket: 'quiz-on-mobile-app.appspot.com',
    messagingSenderId: '788525031845',
    appId: '1:788525031845:web:373436ebcb4702ddc0884c',
    measurementId: 'G-STC8219D5F'
};
firebase.initializeApp(firebaseConfig);

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
    providers: [
        StatusBar,
        SplashScreen,
        Camera,
<<<<<<< HEAD
        Facebook,
        GooglePlus,
        FirebaseX,
        LocalNotifications,
        // FCM,
=======
>>>>>>> 8869fc7e5629414af878c92babc7863e66e49bb0
        EmailComposer,
        AppLauncher,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
