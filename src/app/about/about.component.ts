import {Component, OnInit} from '@angular/core';

import * as firebase from 'firebase';
import 'firebase/firestore';
import {Course} from '../model/course';

const config = {
  apiKey: 'AIzaSyAhBHyDk7P3r1wrHQJRtrBUcWYljuA_IIc',
  authDomain: 'fir-course-17eff.firebaseapp.com',
  databaseURL: 'https://fir-course-17eff.firebaseio.com',
  projectId: 'fir-course-17eff',
  storageBucket: 'fir-course-17eff.appspot.com',
  messagingSenderId: '857574139960',
  appId: '1:857574139960:web:fafd234e5ecec445'
};

firebase.initializeApp(config);
const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

    /*db.doc('courses/3ymtflumj0WVQ9y5coSu')
      .get()
      .then(snap => console.log(snap.data()));*/

    db.collection('courses')
      .get()
      .then(snaps => {
        // console.log(snaps);
        // console.log(snaps.docs.map(snap => snap.data()));
        const courses: Course[] = snaps.docs.map(snap => {
          return <Course>{
            id: snap.id,
            ...snap.data()
          };
        });
        console.log(courses);
      });
  }
}
