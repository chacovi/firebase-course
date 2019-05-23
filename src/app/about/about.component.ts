import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Course} from '../model/course';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private  db: AngularFirestore) {
  }

  ngOnInit() {

  }

  async runTransaction() {
    const newCounter = await this.db.firestore.runTransaction(
      async transaction => {
        console.log('Running transaction...');
        const courseRef = this.db.doc('/courses/1LOt8LQs02WGL6ATfymn').ref;
        const snap = await transaction.get(courseRef);
        const course = <Course>snap.data();
        const lessonsCount = course.lessonsCount + 1;

        transaction.update(courseRef, {lessonsCount});

        return lessonsCount;
      });
    console.log('result lessons count = ', newCounter);
  }
}
