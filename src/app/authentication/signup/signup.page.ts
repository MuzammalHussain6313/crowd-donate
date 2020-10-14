import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import * as firebase from 'firebase';
import {LoadingController, NavController} from '@ionic/angular';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
    constructor(private formBuilder: FormBuilder,
                private navCtrl: NavController,
                private loadingCtrl: LoadingController,
    ) {
    }

    signupForm: FormGroup;
    passwordType = 'password';
    passwordIcon = 'eye-off';
    loading: any;

    ngOnInit() {
        this.formInitializer();
    }

    hideShowPassword() {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }

    formInitializer() {
        const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/;
        this.signupForm = this.formBuilder.group({
            first_name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
            last_name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
            email: [null, [Validators.required, Validators.pattern(EMAILPATTERN)]],
            user_name: [null, [Validators.required]],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            confirm_password: ['', [
                Validators.required, Validators.minLength(6),
                this.mismatchedPasswords('password')]]
        });
    }

    async signUpUser() {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        const formData = this.signupForm.value;
        firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password).then(res => {
            this.saveUserInRealTime(res.user.uid, res.user.email);
            const auth = firebase.auth().currentUser;
            auth.sendEmailVerification();
            console.log(res);
            this.navCtrl.navigateRoot(['']);
            if (this.loading) {
                this.loading.dismiss();
            }
        }).catch(err => {
            if (this.loading) {
                this.loading.dismiss();
            }
            console.log(err);
        });
    }

    async saveUserInRealTime(uId, mail) {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        const formData = this.signupForm.value;
        firebase.database().ref(`/users/${uId}`).set({
            firstName: formData.first_name,
            lastName: formData.last_name,
            email: mail,
            username: formData.user_name,
            uid: uId
        });
        if (this.loading) {
            this.loading.dismiss();
        }
    }

    mismatchedPasswords(otherControlName: string) {
        return (control: AbstractControl): { [key: string]: any } => {
            const otherControl: AbstractControl = control.root.get(otherControlName);

            if (otherControl) {
                const subscription: Subscription = otherControl.valueChanges.subscribe(
                    () => {
                        control.updateValueAndValidity();
                        subscription.unsubscribe();
                    }
                );
            }
            return otherControl && control.value !== otherControl.value
                ? {match: true}
                : null;
        };
    }
}
