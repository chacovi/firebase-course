import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {first, map} from 'rxjs/operators';
import {Course} from '../model/course';
import {Observable} from 'rxjs';
import {convertSnaps} from './db-utils';
import {Lesson} from '../model/lesson';
import OrderByDirection = firebase.firestore.OrderByDirection;

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private db: AngularFirestore) {
  }

  loadAllCourses(): Observable<Course[]> {
    return this.db.collection('courses', ref => ref.orderBy('seqNo', 'desc'))
    // return this.db.collection('courses', ref => ref.where('categories', 'array-contains', 'BEGINNER'))
      .snapshotChanges()
      .pipe(map(snaps => convertSnaps<Course>(snaps)));
  }

  findCourseByUrl(courseUrl: string): Observable<Course> {
    return this.db.collection('courses',
      ref => ref.where('url', '==', courseUrl))
      .snapshotChanges()
      .pipe(map(snaps => {
          const courses = convertSnaps<Course>(snaps);
          return courses.length === 1 ? courses[0] : undefined;
        }),
        first()
      );
  }

  findLessons(courseId: String, sortOrder: OrderByDirection = 'asc', pageNumber = 0, pageSize = 3): Observable<Lesson[]> {
    return this.db.collection(`courses/${courseId}/lessons`,
      ref => ref.orderBy('seqNo', sortOrder)
        .limit(pageSize)
        .startAfter(pageNumber * pageSize))
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<Lesson>(snaps)),
        first()
      );
  }
}
