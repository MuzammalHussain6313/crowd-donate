import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoadingController, NavController} from '@ionic/angular';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';
import {GooglePlus} from '@ionic-native/google-plus/ngx';

import * as firebase from 'firebase';
import {UserService} from '../../services/user.service';
import {PhoneService} from '../../services/phone.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    constructor(private formBuilder: FormBuilder,
                private service: UserService,
                private navCtrl: NavController,
                private fb: Facebook,
                private gp: GooglePlus,
                private phoneService: PhoneService,
                private readonly loadingCtrl: LoadingController) {
    }

    loading: any;
    loginWithPhoneForm: FormGroup;
    loginForm: FormGroup;
    passwordType = 'password';
    passwordIcon = 'eye-off';

    ngOnInit() {
        this.formInitializer();
        this.phoneFormInitializer();
    }

    hideShowPassword() {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }

    formInitializer() {
        const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/;
        this.loginForm = this.formBuilder.group({
            email: [null, [Validators.required, Validators.pattern(EMAILPATTERN)]],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
    }

    phoneFormInitializer() {
        this.loginWithPhoneForm = this.formBuilder.group({
            phone: ['', Validators.compose([Validators.required,
                Validators.minLength(10), Validators.maxLength(10)])]
        });
    }

    sendCode() {
        const data = this.loginWithPhoneForm.value;
        const isnum = /^\d+$/.test(data.phone);
        if (isnum) {
            this.phoneService.sendCode(data.phone);
        } else {
            alert('Please enter only digits.');
        }
    }

    async loginWithGooglePlus() {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        await this.loading.dismiss();
        this.gp.login({
            scopes: '',
            webClientId: '866280638179-m76bb3s7rht6vssj1foft5b00t3l6oku.apps.googleusercontent.com',
            offline: true
        }).then((res) => {
            console.log('Logged into Google Plus!', res);
            if (this.loading) {
                this.loading.dismiss();
            }
            this.navCtrl.navigateRoot(['/tabs']);
        }).catch(e => {
            console.log('Error logging into G+', e);
            if (this.loading) {
                this.loading.dismiss();
            }
        });
    }

    async loginWithFacebook() {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        await this.loading.dismiss();
        this.fb.login(['public_profile', 'email'])
            .then((res) => {
                console.log('Logged into Facebook!', res);
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.navCtrl.navigateRoot(['/tabs']);
            })
            .catch(e => {
                console.log('Error logging into Facebook', e);
                if (this.loading) {
                    this.loading.dismiss();
                }
            });
        if (this.loading) {
            await this.loading.dismiss();
        }
    }

    async login() {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        const formData = this.loginForm.value;
        firebase.auth().signInWithEmailAndPassword(formData.email, formData.password).then(res => {
            console.log(res);
            if (res.user.emailVerified) {
                this.saveUser(res.user.uid);
                this.navCtrl.navigateRoot(['/tabs']);
            } else {
                alert('Please verify your email first.');
            }
            if (this.loading) {
                this.loading.dismiss();
            }
        }).catch(error => {
            if (this.loading) {
                this.loading.dismiss();
            }
            alert(error);
        });
    }

    async saveUser(id) {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        firebase.database().ref(`/users/${id}`).on('value', snapshot => {
            this.service.setUser(snapshot.val());
            console.log(snapshot.val());
            if (this.loading) {
                this.loading.dismiss();
            }
        });
    }

    registerUser() {
        this.navCtrl.navigateForward(['/signup']);
    }

    forgotPassword() {
        this.navCtrl.navigateForward(['/forget-password']);
    }
}
