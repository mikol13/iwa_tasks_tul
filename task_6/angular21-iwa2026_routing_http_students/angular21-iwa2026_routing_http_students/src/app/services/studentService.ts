import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Student } from '../models/student';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly http = inject(HttpClient);
  private readonly studentsUrl = 'http://localhost:8080/students';

  /** GET students from the server */
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl).pipe(
      tap((studentsList: Student[]) => this.log(`size of the list = ${studentsList.length}`)),
      catchError(this.handleError<Student[]>('getStudents', []))
    );
  }

  /** GET student by id. Will 404 if id not found */
  getStudent(id: number): Observable<Student> {
    const url = `${this.studentsUrl}/${id}`;
    return this.http.get<Student>(url).pipe(
      tap(() => this.log(`fetched student id=${id}`)),
      catchError(this.handleError<Student>(`getStudent id=${id}`))
    );
  }

  /** POST: add a new student to the server */
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentsUrl, student, httpOptions).pipe(
      tap((studentAdded: Student) => this.log(`added student id=${studentAdded.id}`)),
      catchError(this.handleError<Student>('addStudent'))
    );
  }

  /** DELETE: delete the student from the server */
  deleteStudent(student: Student | number): Observable<Student> {
    const id = typeof student === 'number' ? student : student.id;
    const url = `${this.studentsUrl}/${id}`;
    return this.http.delete<Student>(url, httpOptions).pipe(
      tap(() => this.log(`deleted student id=${id}`)),
      catchError(this.handleError<Student>('deleteStudent'))
    );
  }

  /** DELETE: delete all the students from the server */
  deleteStudents(): Observable<Student> {
    return this.http.delete<Student>(this.studentsUrl, httpOptions).pipe(
      tap(() => this.log('deleted students')),
      catchError(this.handleError<Student>('deleteStudents'))
    );
  }

  /** PUT: update the student on the server */
  updateStudent(student: Student, id: number): Observable<Student> {
    return this.http.put<Student>(`${this.studentsUrl}/${id}`, student, httpOptions).pipe(
      tap((studentUpdated: Student) => this.log(`updated student id=${studentUpdated.id}`)),
      catchError(this.handleError<Student>('updateStudent'))
    );
  }

  /** PUT: replace the complete collection */
  updateAllStudents(students: Student[]): Observable<Student[]> {
    return this.http.put<Student[]>(this.studentsUrl, students, httpOptions).pipe(
      tap((updated: Student[]) => this.log(`replaced ${updated.length} students`)),
      catchError(this.handleError<Student[]>('updateAllStudents', []))
    );
  }

  /** PATCH: update only selected student fields */
  patchStudent(id: number, updates: Partial<Student>): Observable<Student> {
    return this.http.patch<Student>(`${this.studentsUrl}/${id}`, updates, httpOptions).pipe(
      tap(() => this.log(`patched student id=${id}`)),
      catchError(this.handleError<Student>('patchStudent'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: unknown): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      const message = error instanceof Error ? error.message : String(error);
      this.log(`${operation} failed: ${message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a StudentService message with the MessageService */
  private log(message: string): void {
    console.log('StudentService: ' + message);
  }
}
