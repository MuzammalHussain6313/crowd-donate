import {Component} from '@angular/core';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

<<<<<<< HEAD
    projects: Project[] = [];
    loading: any;
    user: User;
    channels: any = [];

    constructor(private loadingCtrl: LoadingController,
                private alertCtrl: AlertController,
                private service: ProjectService,
                private userService: UserService,
                private projectService: ProjectService,
                private navCtrl: NavController) {
        this.loadData();
        this.user = userService.getUser();
        this.channels = projectService.channels;
        // this.insertDummyData();
    }

    ngOnInit() {
    }

    addProject() {
        this.navCtrl.navigateForward(['/add-project']);
    }

    addDonation(i) {
        // tslint:disable-next-line:no-debugger
        debugger;
        const length = this.projects[i].donationsRequired.length;
        this.service.setLength(length);
        const uid = this.projects[i].uid;
        console.log('uid: ', uid);
        console.log('length: ', length);
        this.service.setUid(uid);
        this.navCtrl.navigateForward(['/add-donation']);
    }

    async loadData() {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        firebase.database().ref('/projects')
            .on('value', snapshot => {
                this.projects = [];
                snapshot.forEach((node) => {
                    const project = node.val();
                    project.user = this.loadUser(project.userId);
                    this.projects.push(project);
                    console.log(this.projects);
                });
                this.service.setProjects(this.projects);
                console.log('projects before', this.projects[0].donationsRequired);
                this.projects.forEach((project) => {
                    project.show = false;
                    project.donationsRequired.forEach(donation => {
                        donation.show = false;
                    });
                });
                console.log('projects', this.projects);
                if (this.loading) {
                    this.loading.dismiss();
                }
            }, err => {
                console.log('error: ', err);
                this.projects = this.service.getProjects();
            });
    }

    loadUser(id: any) {
        debugger;
        const us = this.userService.allUsers;
        const users = this.userService.allUsers.filter(user => {
            return user.uid === id;
        });
        return users[0];
    }

    expandCLick(item: Project) {
        item.show = !item.show;
    }

    expandDonation(donation: Donations) {
        donation.show = !donation.show;
    }

    insertDummyData() {
        const id = '823c6r7767x763r6gc2b76gb76r2b376';
        const id1 = '903c6r7767x763r6gc2b76gb76r2b390';
        firebase.database().ref(`/projects/${id1}`).set({
            uid: id1,
            name: 'Aftari Programm',
            dependents: '150',
            startDate: '1603201603468',
            endDate: '2003201603468',
            donationsRequired: [
                {
                    itemName: 'coca cola drink',
                    quantity: '150',
                    quantityUnit: 'pet',
                    time: '1603201603468',
                    type: 'fod',
                },
                {
                    itemName: 'carpet',
                    quantity: '5',
                    quantityUnit: 'piece',
                    time: '1603201603468',
                    type: 'stuff',
                },
            ]
        });
        firebase.database().ref(`/projects/${id}`).set({
            uid: id,
            name: 'child laborer',
            dependents: '50',
            startDate: '1603201603468',
            endDate: '1603201603468',
            donationsRequired: [
                {
                    itemName: 'Casual dress',
                    quantity: '1500',
                    quantityUnit: 'piece',
                    time: '1603201603468',
                    type: 'clothes',
                },
                {
                    itemName: 'formal dress',
                    quantity: '500',
                    quantityUnit: 'piece',
                    time: '1603201603468',
                    type: 'clothes',
                },
            ]
        }).then(res => {
            if (this.loading) {
                this.loading.dismiss();
            }
            this.navCtrl.back();
        }).catch(err => {
            if (this.loading) {
                this.loading.dismiss();
            }
            alert(err);
        });

    }

    async editQuantity(i: number, j: number) {
        const quantity = this.projects[i].donationsRequired[j].quantity;
        const alert = await this.alertCtrl.create({
=======
    courseName = 'Data Mining';

    constructor(private alertController: AlertController) {
    }

    async joinClass() {
        const alert = await this.alertController.create({
>>>>>>> 8869fc7e5629414af878c92babc7863e66e49bb0
            cssClass: 'my-custom-class',
            header: 'Join ' + this.courseName + ' !!!',
            inputs: [
                {
                    name: 'join',
                    type: 'text',
                    placeholder: 'Enter Class Code'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Ok',
                    handler: () => {
                        console.log('Confirm Ok');
                    }
                }
            ]
        });
        await alert.present();
    }

<<<<<<< HEAD
    async updateQuantityInFirebase(quantity, i, j) {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        const uid = this.projects[i].uid;
        this.projects[i].donationsRequired[j].quantity = quantity;
        const donationsRequired: Donations[] = this.projects[i].donationsRequired;
        firebase.database().ref(`/projects/${uid}`).update({
            donationsRequired
        }).then(() => {
            if (this.loading) {
                this.loading.dismiss();
            }
        }).catch((error) => {
            if (this.loading) {
                this.loading.dismiss();
            }
            alert(error);
        });
    }

    sendDonation() {
        this.navCtrl.navigateForward(['/add-donation']);
    }

    openChat(user: any) {
        localStorage.setItem('ngoEmail', user?.email);
        const channel: any = {};
        channel.sender = user?.email;
        channel.reciever = this.user.email;
        let found = false;
        for (let i = 0; i < this.channels.length; i++) {
            if (this.channels[i].sender === user?.email && this.channels[i].receiver === this.user.email) {
                found = true;
                break;
            }
        }
        if (!found) {
            const key = firebase.database().ref('/channels').key;
            firebase.database().ref('/channels').child(key).set(channel);
        } else {
            this.navCtrl.navigateForward(['/ngo-chat']);
        }
    }
=======
>>>>>>> 8869fc7e5629414af878c92babc7863e66e49bb0
}
