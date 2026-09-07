import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Grade,
  NewGrade,
  NewSubject,
  TeacherDashboard,
  TeacherSubject,
} from '../models/journal.models';

@Injectable({ providedIn: 'root' })
export class TeacherService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/teacher';

  getDashboard(): Observable<TeacherDashboard> {
    return this.http.get<TeacherDashboard>(`${this.apiUrl}/dashboard`);
  }

  addGrade(grade: NewGrade): Observable<Grade> {
    return this.http.post<Grade>(`${this.apiUrl}/grades`, grade);
  }

  addSubject(subject: NewSubject): Observable<TeacherSubject> {
    return this.http.post<TeacherSubject>(`${this.apiUrl}/subjects`, subject);
  }
}
