import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Course} from '../model/course';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private db: AngularFirestore) {
  }

  loadAllCourses(): Observable<Course[]> {
    return this.db.collection('courses', ref => ref.orderBy('seqNo', 'desc'))
    //return this.db.collection('courses', ref => ref.where('categories', 'array-contains', 'BEGINNER'))
      .snapshotChanges()
      .pipe(map(snaps => {
        return snaps.map(snap => {
          return <Course>{
            id: snap.payload.doc.id,
            ...snap.payload.doc.data()
          };
        });
      }));
  }
}
