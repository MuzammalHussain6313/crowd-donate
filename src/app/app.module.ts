import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { Camera } from '@ionic-native/camera/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import * as firebase from 'firebase';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

const firebaseConfig = {
    apiKey: 'AIzaSyByWmLrevFgeDG13L52z6xWoT2IE0opZAE',
    authDomain: 'crowd-donate.firebaseapp.com',
    databaseURL: 'https://crowd-donate.firebaseio.com',
    projectId: 'crowd-donate',
    storageBucket: 'crowd-donate.appspot.com',
    messagingSenderId: '903770949561',
    appId: '1:903770949561:web:75a2d90379ec3aadf69868',
    measurementId: 'G-0E37E5KKFQ'
};
firebase.initializeApp(firebaseConfig);

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        IonicModule.forRoot(),
        AppRoutingModule],
    providers: [
        StatusBar,
        SplashScreen,
        Camera,
        Facebook,
        GooglePlus,
        FirebaseX,
        LocalNotifications,
        EmailComposer,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
