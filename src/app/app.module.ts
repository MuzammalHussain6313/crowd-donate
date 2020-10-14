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
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyBWDqc6lyYTTB2egUPWXnBI98cDfpfCeb4',
    authDomain: 'profile-86007.firebaseapp.com',
    databaseURL: 'https://profile-86007.firebaseio.com',
    projectId: 'profile-86007',
    storageBucket: 'profile-86007.appspot.com',
    messagingSenderId: '866280638179',
    appId: '1:866280638179:web:1d8230ee8c218a1da6a7d6',
    measurementId: 'G-5G3449NEMS'
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
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
