import {Injectable} from '@angular/core';
import {Project} from '../models/donations';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    projects: Project[] = [];
    length: any;
    uid: any;
    channels: any = [];

    constructor() {
      this.locadChannels();
    }

    locadChannels() {
        this.channels = [];
        firebase.database().ref('/channels').on('value', snapshot => {
            snapshot.forEach(node => {
              this.channels.push(node.val());
            });
        });
    }

    setProjects(projects) {
        this.projects = projects;
        localStorage.setItem('projects', JSON.stringify(this.projects));
    }

    getProjects() {
        return this.projects;
    }

    getLength() {
        return this.length;
    }

    getUid() {
        return this.uid;
    }

    setUid(uid) {
        this.uid = uid;
    }

    setLength(length) {
        this.length = length;
    }
}
