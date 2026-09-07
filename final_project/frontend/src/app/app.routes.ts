import { Routes } from '@angular/router';
import { studentGuard, teacherGuard } from './auth/auth.guards';
import { LoginComponent } from './pages/login/login.component';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './pages/teacher-dashboard/teacher-dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'student', component: StudentDashboardComponent, canActivate: [studentGuard] },
  { path: 'teacher', component: TeacherDashboardComponent, canActivate: [teacherGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' },
];
